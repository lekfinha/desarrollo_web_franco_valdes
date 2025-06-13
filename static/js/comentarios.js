document.addEventListener('DOMContentLoaded', function() {
    const actividadId = window.location.pathname.split('/').pop();
    const comentarioForm = document.getElementById('comentario-form');
    const comentariosList = document.getElementById('comentarios-list');

    // Cargar comentarios existentes
    function cargarComentarios() {
        fetch(`/api/comentarios/${actividadId}`)
            .then(response => response.json())
            .then(comentarios => {
                comentariosList.innerHTML = '';
                comentarios.forEach(comentario => {
                    const comentarioElement = document.createElement('div');
                    comentarioElement.className = 'comentario';
                    comentarioElement.innerHTML = `
                        <div class="comentario-header">
                            <strong>${comentario.nombre}</strong>
                            <span class="fecha">${comentario.fecha}</span>
                        </div>
                        <div class="comentario-texto">
                            ${comentario.texto}
                        </div>
                    `;
                    comentariosList.appendChild(comentarioElement);
                });
            })
            .catch(error => {
                console.error('Error al cargar comentarios:', error);
            });
    }

    // Validar formulario
    function validarFormulario() {
        const nombre = document.getElementById('nombre').value;
        const texto = document.getElementById('texto').value;
        let esValido = true;

        // Limpiar mensajes de error
        document.getElementById('nombre-error').textContent = '';
        document.getElementById('texto-error').textContent = '';

        // Validar nombre
        if (nombre.length < 3 || nombre.length > 80) {
            document.getElementById('nombre-error').textContent = 'El nombre debe tener entre 3 y 80 caracteres';
            esValido = false;
        }

        // Validar texto
        if (texto.length < 5) {
            document.getElementById('texto-error').textContent = 'El comentario debe tener al menos 5 caracteres';
            esValido = false;
        }

        return esValido;
    }

    // Manejar envío del formulario
    comentarioForm.addEventListener('submit', function(e) {
        e.preventDefault();

        if (!validarFormulario()) {
            return;
        }

        const nombre = document.getElementById('nombre').value;
        const texto = document.getElementById('texto').value;

        fetch(`/api/comentarios/${actividadId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nombre, texto })
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                throw new Error(data.error);
            }
            // Limpiar formulario
            comentarioForm.reset();
            // Recargar comentarios
            cargarComentarios();
        })
        .catch(error => {
            console.error('Error al agregar comentario:', error);
            alert('Error al agregar el comentario. Por favor, intente nuevamente.');
        });
    });

    // Cargar comentarios al iniciar
    cargarComentarios();
}); 