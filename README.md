# Tarea 2 - Página de Registro de Actividades Sociales

Este sistema permite registrar y gestionar actividades comunitarias, incluyendo su ubicación, detalles de contacto, temas y fotos.

## Requisitos Previos

- Python 3.x
- MariaDB/MySQL
- pip (gestor de paquetes de Python)

## Configuración de la Base de Datos

1. Crear la base de datos y el usuario:
```sql
CREATE DATABASE tarea2;
CREATE USER 'admin'@'localhost' IDENTIFIED BY 'admin';
GRANT ALL PRIVILEGES ON tarea2.* TO 'admin'@'localhost';
FLUSH PRIVILEGES;
```

2. Importar la estructura de la base de datos:
```bash
mysql -u admin -p tarea2 < database/schema.sql
```

3. Poblar la base de datos con datos iniciales:
```bash
mysql -u admin -p tarea2 < database/poblar.sql
```

## Configuración del Entorno Virtual

1. Crear y activar el entorno virtual:
```bash
python -m venv venv
source venv/bin/activate  # En Linux/Mac
# o
venv\Scripts\activate  # En Windows
```

2. Instalar las dependencias:
```bash
pip install -r requirements.txt
```

## Ejecutar la Aplicación

1. Asegurarse de que el entorno virtual está activado
2. Ejecutar la aplicación:
```bash
python app.py
```
3. Abrir el navegador en `http://localhost:5000`

## Estructura del Proyecto

```
tarea2/
├── app.py              # Aplicación principal Flask
├── database/
│   ├── db.py          # Funciones de base de datos
│   ├── schema.sql     # Estructura de la base de datos
│   └── poblar.sql     # Datos iniciales
├── static/
│   ├── css/          # Estilos CSS
│   ├── js/           # JavaScript
│   └── uploads/      # Carpeta para fotos subidas
├── templates/        # Plantillas HTML
└── utils/
    └── validations.py # Validaciones del formulario
```

## Características Principales

- Registro de actividades con ubicación (región/comuna)
- Gestión de temas y temas personalizados
- Múltiples métodos de contacto
- Subida de fotos (hasta 5 por actividad)
- Validación de formularios
- Listado paginado de actividades
- Vista detallada de cada actividad

## Notas Importantes

- Las fotos se guardan en `static/uploads/`
- El formato de celular debe ser: +569XXXXXXXX
- Las fechas de inicio deben ser posteriores a la fecha actual
- Se pueden subir hasta 5 fotos por actividad
- Los temas personalizados deben tener entre 3 y 15 caracteres
