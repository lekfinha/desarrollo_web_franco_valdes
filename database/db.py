import pymysql
import os

DB_NAME = "tarea2"
DB_USERNAME = "admin"
DB_PASSWORD = "admin"
DB_HOST = "localhost"
DB_PORT = 3306
DB_CHARSET = "utf8"

def get_conn():
    conn = pymysql.connect(
        db=DB_NAME,
        user=DB_USERNAME,
        passwd=DB_PASSWORD,
        host=DB_HOST,
        port=DB_PORT,
        charset=DB_CHARSET
    )
    return conn

def get_actividades_count():
    conn = get_conn()
    cursor = conn.cursor()
    cursor.execute("SELECT COUNT(*) FROM actividad;")
    count = cursor.fetchone()
    return count[0]

def get_actividades(page):
    conn = get_conn()
    cursor = conn.cursor()
    page_size = 5
    offset = (page - 1) * page_size
    cursor.execute("""
        SELECT a.id, a.comuna_id, a.sector, a.nombre, a.email, a.celular,
        a.dia_hora_inicio AS fecha_inicio, a.dia_hora_termino AS fecha_termino, a.descripcion
        FROM actividad a 
        ORDER BY a.dia_hora_inicio DESC
        LIMIT %s, %s;
    """, (offset, page_size))
    actividades = cursor.fetchall()
    return actividades

def get_actividad(id):
    conn = get_conn()
    cursor = conn.cursor()
    cursor.execute("""
        SELECT a.id, a.comuna_id, a.sector, a.nombre, a.email,
        a.celular, a.dia_hora_inicio AS fecha_inicio, a.dia_hora_termino AS fecha_termino, a.descripcion 
        FROM actividad a 
        WHERE a.id=%s;
    """, (id,))
    actividad = cursor.fetchone()
    return actividad

def get_comuna_nombre(id):
    conn = get_conn()
    cursor = conn.cursor()
    cursor.execute("SELECT nombre FROM comuna WHERE id=%s;", (id,))
    nombre = cursor.fetchone()
    return nombre[0] if nombre else None

def get_all_comunas():
    conn = get_conn()
    cursor = conn.cursor()
    cursor.execute("SELECT id, nombre FROM comuna ORDER BY nombre;")
    comunas = cursor.fetchall()
    return comunas

def get_all_regiones():
    conn = get_conn()
    cursor = conn.cursor()
    cursor.execute("SELECT id, nombre FROM region ORDER BY id;")
    regiones = cursor.fetchall()
    return regiones

def get_comunas_by_region_id(region_id):
    conn = get_conn()
    cursor = conn.cursor()
    cursor.execute("SELECT id, nombre FROM comuna WHERE region_id = %s ORDER BY nombre;", (region_id,))
    comunas = cursor.fetchall()
    conn.close() 
    return comunas

def get_region_nombre(comuna_id):
    conn = get_conn()
    cursor = conn.cursor()
    cursor.execute("""
        SELECT r.nombre 
        FROM region r 
        JOIN comuna c ON r.id = c.region_id 
        WHERE c.id=%s;
    """, (comuna_id,))
    region = cursor.fetchone()
    return region[0] if region else None

def get_temas_actividad(id):
    conn = get_conn()
    cursor = conn.cursor()
    cursor.execute("""
        SELECT tema, glosa_otro
        FROM actividad_tema
        WHERE actividad_id=%s;
    """, (id,))
    temas_data = cursor.fetchall()
    temas = []
    for tema, glosa_otro in temas_data:
        if tema == 'otro' and glosa_otro:
            temas.append(glosa_otro)
        else:
            temas.append(tema)
    return temas

def get_fotos_actividad(id):
    conn = get_conn()
    cursor = conn.cursor()
    cursor.execute("SELECT ruta_archivo FROM foto WHERE actividad_id=%s;", (id,))
    fotos = cursor.fetchall()
    return [f[0] for f in fotos]

# Añadir

def create_actividad(comuna_id, sector, nombre, email, celular, inicio, termino, descripcion):
    conn = get_conn()
    cursor = conn.cursor()
    cursor.execute("""
        INSERT INTO actividad 
        (comuna_id, sector, nombre, email, celular, dia_hora_inicio, dia_hora_termino, descripcion) 
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s);
    """, (comuna_id, sector, nombre, email, celular, inicio, termino, descripcion))
    conn.commit()
    return cursor.lastrowid

def add_tema_actividad(actividad_id, tema, glosa_otro=None):
    conn = get_conn()
    cursor = conn.cursor()
    cursor.execute("""
        INSERT INTO actividad_tema 
        (actividad_id, tema, glosa_otro) 
        VALUES (%s, %s, %s);
    """, (actividad_id, tema, glosa_otro))
    conn.commit()

def add_contacto_actividad(actividad_id, nombre, valor_contacto):
    conn = get_conn()
    cursor = conn.cursor()
    cursor.execute("""
        INSERT INTO contactar_por 
        (actividad_id, nombre, identificador) 
        VALUES (%s, %s, %s);
    """, (actividad_id, nombre, valor_contacto))
    conn.commit()

def add_foto_actividad(actividad_id, ruta_archivo, nombre_archivo):
    conn = get_conn()
    cursor = conn.cursor()
    cursor.execute("""
        INSERT INTO foto
        (actividad_id, ruta_archivo, nombre_archivo)
        VALUES (%s, %s, %s);
    """, (actividad_id, ruta_archivo, nombre_archivo))
    conn.commit()

def validate_comuna_region(comuna_id, region_id):
    conn = get_conn()
    cursor = conn.cursor()
    cursor.execute("""
        SELECT 1 FROM comuna 
        WHERE id=%s AND region_id=%s;
    """, (comuna_id, region_id))
    return cursor.fetchone() is not None