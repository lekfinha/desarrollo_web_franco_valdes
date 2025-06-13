# Tarea 3 Actividades Sociales

Aplicación web para gestionar actividades sociales, desarrollada con Flask y MySQL.

## Características

- Registro y gestión de actividades sociales
- Validación de formularios en tiempo real
- Carga y visualización de imágenes
- Sistema de comentarios para cada actividad
- Estadísticas de actividades con gráficos interactivos
- Paginación de resultados
- Diseño responsivo

## Requisitos

- Python 3.8 o superior
- MySQL 8.0 o superior
- Navegador web moderno

## Instalación

1. Clonar el repositorio:
```bash
git clone https://github.com/lekfinha/desarrollo_web_franco_valdes.git
cd desarrollo_web_franco_valdes/Tareas/tarea2
```

2. Crear y activar entorno virtual:
```bash
python -m venv venv
source venv/bin/activate  # En Linux/Mac
# o
venv\Scripts\activate  # En Windows
```

3. Instalar dependencias:
```bash
pip install -r requirements.txt
```

4. Configurar la base de datos:
```bash
mysql -u admin -p
```
```sql
CREATE DATABASE tarea2;
USE tarea2;
source database/tabla-actividad.sql;
source database/poblar.sql;
source database/tabla-comentario.sql;
```

5. Configurar variables de entorno:
```bash
export FLASK_APP=app.py
export FLASK_ENV=development
```

## Ejecución

1. Iniciar el servidor:
```bash
python app.py
```

2. Abrir en el navegador:
```
http://localhost:5000
```

## Estructura del Proyecto

```
tarea2/
├── app.py                 # Aplicación principal Flask
├── database/
│   ├── db.py             # Funciones de base de datos
│   ├── tabla-actividad.sql
│   └── tabla-comentario.sql
├── static/
│   ├── css/
│   │   ├── main.css
│   │   ├── detalle.css
│   │   ├── comentarios.css
│   │   └── estadisticas.css
│   ├── js/
│   │   ├── validator.js
│   │   ├── comentarios.js
│   │   └── estadisticas.js
│   └── uploads/          # Imágenes subidas
├── templates/
│   ├── base.html
│   ├── index.html
│   ├── detalle.html
│   ├── agregar.html
│   └── estadisticas.html
├── utils/
│   └── validations.py    # Validaciones de formularios
└── requirements.txt
```

## Características Implementadas

### Gestión de Actividades
- Formulario de registro con validación en tiempo real
- Campos obligatorios y formatos específicos
- Carga de imágenes con validación de tipo y tamaño
- Visualización de actividades con paginación

### Sistema de Comentarios
- Comentarios por actividad
- Validación de nombre y texto
- Actualización asíncrona de comentarios
- Interfaz intuitiva y responsiva

### Estadísticas
- Gráfico de actividades por día
- Distribución de actividades por tema
- Análisis de actividades por mes y horario (Falta arreglar)
- Visualización interactiva con Highcharts

## Validaciones

### Formulario de Actividad
- Nombre: 3-80 caracteres
- Descripción: 5-300 caracteres
- Tema: selección obligatoria
- Fecha inicio: formato YYYY-MM-DD, posterior a hoy
- Fecha término: posterior a fecha inicio
- Hora inicio: formato HH:MM
- Hora término: posterior a hora inicio
- Teléfono: formato +569XXXXXXXX
- Email: formato válido
- Imagen: JPG/PNG, máximo 5MB

### Comentarios
- Nombre: 3-80 caracteres
- Texto: mínimo 5 caracteres, máximo 300 caracteres

## Tecnologías Utilizadas

- Backend: Python, Flask
- Base de datos: MySQL
- Frontend: HTML5, CSS3, JavaScript
- Gráficos: Highcharts
- Validación: JavaScript, Python
- Estilos: CSS

## Autor

Franco Valdés