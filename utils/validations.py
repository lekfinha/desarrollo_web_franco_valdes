import re
import filetype
from datetime import datetime

def validate_foto(foto):
    ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg", "gif"}
    ALLOWED_MIMETYPES = {"image/jpeg", "image/png", "image/gif"}

    if foto is None or foto.filename == "":
        return False
    
    ftype_guess = filetype.guess(foto)
    if not ftype_guess or ftype_guess.extension not in ALLOWED_EXTENSIONS:
        return False
    if ftype_guess.mime not in ALLOWED_MIMETYPES:
        return False
    return True

def validate_nombre_actividad(nombre):
    if not nombre:
        return False, "El nombre de la actividad es requerido"
    if not 3 <= len(nombre) <= 80:
        return False, "El nombre de la actividad debe tener entre 3 y 80 caracteres"
    return True, ""

def validate_email(email):
    if not email:
        return False, "El email es requerido"
    if len(email) > 100:
        return False, "El email no puede tener más de 100 caracteres"
    if not re.match(r"[^@]+@[^@]+\.[^@]+", email):
        return False, "Formato de email inválido"
    return True, ""

def validate_celular(celular):
    if celular and not re.match(r'^\+569[0-9]{8}$', celular):
        return False, "El número de celular debe tener el formato +569XXXXXXXX"
    return True, ""

def validate_fechas(inicio, termino):
    if not inicio:
        return False, "La fecha de inicio es requerida"
    try:
        fecha_inicio = datetime.strptime(inicio, "%Y-%m-%dT%H:%M")
        fecha_actual = datetime.now()
        if fecha_inicio < fecha_actual:
            return False, "La fecha de inicio debe ser posterior a la fecha actual"
        
        if termino:
            fecha_termino = datetime.strptime(termino, "%Y-%m-%dT%H:%M")
            if fecha_termino <= fecha_inicio:
                return False, "La fecha de término debe ser posterior a la fecha de inicio"
        return True, ""
    except ValueError:
        return False, "Formato de fecha inválido"

def validate_tema(tema_id, otro_tema=None):
    if not tema_id:
        return False, "Debe seleccionar un tema"
    if tema_id == "otro" and (not otro_tema or not 3 <= len(otro_tema) <= 15):
        return False, "La descripción del tema debe tener entre 3 y 15 caracteres"
    return True, ""

def validate_contacto(tipo_contacto, valor_contacto):
    if tipo_contacto and not valor_contacto:
        return False, "Debe especificar el contacto"
    if valor_contacto and not 4 <= len(valor_contacto) <= 50:
        return False, "La información de contacto debe tener entre 4 y 50 caracteres"
    return True, ""

def validate_actividad_form(data, files):
    errores = {}
    
    # Validación de datos básicos
    val, msg = validate_nombre_actividad(data.get('nombre'))
    if not val: errores['nombre'] = msg
    
    val, msg = validate_email(data.get('email'))
    if not val: errores['email'] = msg
    
    val, msg = validate_celular(data.get('celular'))
    if not val: errores['celular'] = msg
    
    val, msg = validate_fechas(data.get('inicio'), data.get('termino'))
    if not val: errores['inicio'] = msg
    
    val, msg = validate_tema(data.get('tema'), data.get('otro_tema'))
    if not val: errores['tema'] = msg
    
    val, msg = validate_contacto(data.get('contacto_red'), data.get('contacto_info'))
    if not val: errores['contacto_red'] = msg
    
    # Validación de fotos (opcional)
    fotos = files.getlist('fotos')
    if fotos and any(foto.filename for foto in fotos):
        if len(fotos) > 5:
            errores['fotos'] = "Máximo 5 fotos permitidas"
        else:
            for i, foto in enumerate(fotos):
                if foto.filename and not validate_foto(foto):
                    errores[f'fotos'] = "Formato de imagen inválido"
    
    return errores