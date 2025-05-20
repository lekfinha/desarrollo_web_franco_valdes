from flask import Flask, render_template, request, redirect, url_for, flash
from database import db
from utils.validations import validate_actividad_form
import os
from werkzeug.utils import secure_filename
import math
from datetime import datetime

app = Flask(__name__)
app.secret_key = os.urandom(24)
app.config['UPLOAD_FOLDER'] = 'static/uploads'

@app.route('/')
def index():
    actividades = []
    for act in db.get_actividades(0):  
        id_a, comuna_id, nombre, email, celular, inicio, termino, descripcion = act
        comuna = db.get_comuna_nombre(comuna_id)
        temas = db.get_temas_actividad(id_a)
        fotos = db.get_fotos_actividad(id_a)
        
        actividades.append({
            'id': id_a,
            'comuna': comuna,
            'nombre': nombre,
            'inicio': inicio.strftime('%Y-%m-%d %H:%M'),
            'termino': termino.strftime('%Y-%m-%d %H:%M') if termino else '-',
            'tema': temas[0] if temas else '',
            'fotos': [url_for('static', filename=f) for f in fotos][:1]  
        })
    
    return render_template('index.html', actividades=actividades)
@app.route('/agregar', methods=['GET', 'POST'])
def agregar_actividad():
    comunas = db.get_all_comunas()  

    if request.method == 'POST':
        errores = validate_actividad_form(request.form, request.files)

        if errores:
            return render_template('agregar.html',
                                errores=errores,
                                form_data=request.form,
                                comunas=comunas)

        try:
            comuna_id = request.form['comuna']
            sector = request.form.get('sector', '')
            nombre = request.form['nombre']
            email = request.form['email']
            celular = request.form.get('celular', '')
            inicio = request.form['inicio']
            termino = request.form.get('termino', '')
            descripcion = request.form.get('descripcion', '')
            tema_id = request.form['tema']
            otro_tema = request.form.get('otro_tema', '')
            contacto_red = request.form.get('contacto_red', '')
            contacto_info = request.form.get('contacto_info', '')

            actividad_id = db.create_actividad(
                comuna_id, sector, nombre, email, celular,
                inicio, termino, descripcion
            )

            if tema_id == 'otro':
                db.add_tema_actividad(actividad_id, None, otro_tema)
            else:
                db.add_tema_actividad(actividad_id, tema_id)

            if contacto_red and contacto_info:
                db.add_contacto_actividad(actividad_id, contacto_red, contacto_info)

            fotos = request.files.getlist('fotos')
            for foto in fotos:
                if foto.filename:
                    filename = secure_filename(foto.filename)
                    unique_name = f"{datetime.now().timestamp()}_{filename}"
                    filepath = os.path.join('uploads', unique_name)
                    foto.save(os.path.join(app.config['UPLOAD_FOLDER'], unique_name))
                    db.add_foto_actividad(actividad_id, filepath, filename)

            flash('Actividad registrada exitosamente!', 'success')
            return redirect(url_for('index'))

        except Exception as e:
            flash(f'Error al registrar actividad: {str(e)}', 'danger')

    return render_template('agregar.html', comunas=comunas)
@app.route('/listado')
@app.route('/listado/<int:page>')
def listado_actividades(page=1):
    total_rows = db.get_actividades_count()
    page_size = 5
    total_pages = math.ceil(total_rows / page_size)
    next_page = page + 1 if page < total_pages else None
    prev_page = page - 1 if page > 1 else None
    
    actividades = []
    for act in db.get_actividades((page-1)*page_size):
        id_a, comuna_id, nombre, email, celular, inicio, termino, descripcion = act
        comuna = db.get_comuna_nombre(comuna_id)
        temas = db.get_temas_actividad(id_a)
        fotos = db.get_fotos_actividad(id_a)
        
        actividades.append({
            'id': id_a,
            'comuna': comuna,
            'nombre': nombre,
            'inicio': inicio.strftime('%Y-%m-%d %H:%M'),
            'termino': termino.strftime('%Y-%m-%d %H:%M') if termino else '-',
            'tema': temas[0] if temas else '',
            'fotos': [url_for('static', filename=f) for f in fotos][:1]  
        })
    
    return render_template('listado.html', 
                         actividades=actividades,
                         current_page=page,
                         total_pages=total_pages,
                         next_page=next_page,
                         prev_page=prev_page)

@app.route('/estadisticas')
def estadisticas():
    return render_template('estadisticas.html')

@app.route('/detalle/<int:id>')
def detalle_actividad(id):
    actividad = db.get_actividad(id)
    if not actividad:
        flash('Actividad no encontrada', 'danger')
        return redirect(url_for('index'))
    
    print(f"Valor de actividad: {actividad}")
    
    id_a, comuna_id, sector, nombre, email, celular, inicio, termino, descripcion = actividad
    comuna = db.get_comuna_nombre(comuna_id)
    region = db.get_region_nombre(comuna_id)
    temas = db.get_temas_actividad(id_a)
    fotos = db.get_fotos_actividad(id_a)
    
    actividad_data = {
        'id': id_a,
        'region': region,
        'comuna': comuna,
        'sector': sector,
        'nombre': nombre,
        'email': email,
        'celular': celular,
        'inicio': inicio.strftime('%Y-%m-%d %H:%M'),
        'termino': termino.strftime('%Y-%m-%d %H:%M') if termino else None,
        'descripcion': descripcion,
        'temas': temas,
        'fotos': [url_for('static', filename=f) for f in fotos]
    }
    
    return render_template('detalle.html', actividad=actividad_data)

if __name__ == '__main__':
    os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
    app.run(debug=True)