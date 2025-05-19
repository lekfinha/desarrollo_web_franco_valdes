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

def validate_nombre_organizador(nombre):
    if not 3 <= len(nombre) <= 200:
        return False, "Nombre debe tener entre 3 y 200 caracteres"
    return True, ""

def validate_email(email):
    if len(email) > 100:
        return False, "Email demasiado largo"
    if not re.match(r"[^@]+@[^@]+\.[^@]+", email):
        return False, "Formato de email inválido"
    return True, ""

def validate_celular(celular):
    if celular and not re.match(r"^\+\d{3}\.\d{8}$", celular):
        return False, "Formato debe ser +NNN.NNNNNNNN"
    return True, ""

def validate_fechas(inicio, termino):
    try:
        fecha_inicio = datetime.strptime(inicio, "%Y-%m-%dT%H:%M")
        if termino:
            fecha_termino = datetime.strptime(termino, "%Y-%m-%dT%H:%M")
            if fecha_termino <= fecha_inicio:
                return False, "Fecha término debe ser posterior a inicio"
        return True, ""
    except ValueError:
        return False, "Formato de fecha inválido"

def validate_tema(tema_id, otro_tema=None):
    if not tema_id:
        return False, "Seleccione un tema"
    if tema_id == "otro" and (not otro_tema or not 3 <= len(otro_tema) <= 15):
        return False, "Descripción de tema debe tener entre 3-15 caracteres"
    return True, ""

def validate_contacto(tipo_contacto, valor_contacto):
    if tipo_contacto and (not valor_contacto or not 4 <= len(valor_contacto) <= 50):
        return False, "Información de contacto debe tener entre 4-50 caracteres"
    return True, ""

def validate_actividad_form(data, files):
    errores = {}
    
    # Validación de datos básicos
    val, msg = validate_nombre_organizador(data.get('nombre'))
    if not val: errores['nombre'] = msg
    
    val, msg = validate_email(data.get('email'))
    if not val: errores['email'] = msg
    
    val, msg = validate_celular(data.get('celular'))
    if not val: errores['celular'] = msg
    
    val, msg = validate_fechas(data.get('inicio'), data.get('termino'))
    if not val: errores['fechas'] = msg
    
    val, msg = validate_tema(data.get('tema'), data.get('otro_tema'))
    if not val: errores['tema'] = msg
    
    val, msg = validate_contacto(data.get('contacto_red'), data.get('contacto_info'))
    if not val: errores['contacto'] = msg
    
    # Validación de fotos
    fotos = files.getlist('fotos')
    if not fotos or all(not foto.filename for foto in fotos):
        errores['fotos'] = "Debe subir al menos una foto"
    elif len(fotos) > 5:
        errores['fotos'] = "Máximo 5 fotos permitidas"
    else:
        for i, foto in enumerate(fotos):
            if foto.filename and not validate_foto(foto):
                errores[f'foto_{i}'] = "Formato de imagen inválido"
    
    return errores