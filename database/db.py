import pymysql
import os

DB_NAME = "tarea2"
DB_USERNAME = "cc5002"
DB_PASSWORD = "programacionweb"
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

def get_actividades(page_size):
    conn = get_conn()
    cursor = conn.cursor()
    cursor.execute("""
        SELECT a.id, a.comuna_id, a.nombre_organizador, a.email, a.celular, 
               a.fecha_inicio, a.fecha_termino, a.descripcion 
        FROM actividad a 
        ORDER BY a.fecha_inicio DESC 
        LIMIT %s, 5;
    """, (page_size,))
    actividades = cursor.fetchall()
    return actividades

def get_actividad(id):
    conn = get_conn()
    cursor = conn.cursor()
    cursor.execute("""
        SELECT a.id, a.comuna_id, a.sector, a.nombre_organizador, a.email, 
               a.celular, a.fecha_inicio, a.fecha_termino, a.descripcion 
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
        SELECT t.nombre 
        FROM actividad_tema at
        JOIN tema t ON at.tema_id = t.id
        WHERE at.actividad_id=%s;
    """, (id,))
    temas = cursor.fetchall()
    return [t[0] for t in temas]

def get_fotos_actividad(id):
    conn = get_conn()
    cursor = conn.cursor()
    cursor.execute("SELECT ruta_archivo FROM archivo WHERE actividad_id=%s;", (id,))
    fotos = cursor.fetchall()
    return [f[0] for f in fotos]

def create_actividad(comuna_id, sector, nombre, email, celular, inicio, termino, descripcion):
    conn = get_conn()
    cursor = conn.cursor()
    cursor.execute("""
        INSERT INTO actividad 
        (comuna_id, sector, nombre_organizador, email, celular, fecha_inicio, fecha_termino, descripcion) 
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s);
    """, (comuna_id, sector, nombre, email, celular, inicio, termino, descripcion))
    conn.commit()
    return cursor.lastrowid

def add_tema_actividad(actividad_id, tema_id, otro_tema=None):
    conn = get_conn()
    cursor = conn.cursor()
    cursor.execute("""
        INSERT INTO actividad_tema 
        (actividad_id, tema_id, otro_tema) 
        VALUES (%s, %s, %s);
    """, (actividad_id, tema_id, otro_tema))
    conn.commit()

def add_contacto_actividad(actividad_id, tipo_contacto, valor_contacto):
    conn = get_conn()
    cursor = conn.cursor()
    cursor.execute("""
        INSERT INTO contactar_por 
        (actividad_id, tipo, valor) 
        VALUES (%s, %s, %s);
    """, (actividad_id, tipo_contacto, valor_contacto))
    conn.commit()

def add_foto_actividad(actividad_id, ruta_archivo, nombre_archivo):
    conn = get_conn()
    cursor = conn.cursor()
    cursor.execute("""
        INSERT INTO archivo 
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