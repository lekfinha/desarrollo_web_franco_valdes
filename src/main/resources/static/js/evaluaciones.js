document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('modal-evaluacion');
    const closeBtn = document.querySelector('.close');
    const form = document.getElementById('form-evaluacion');
    let actividadIdActual = null;

    // Función para abrir modal (llamada desde el onclick del botón)
    window.abrirModalEvaluacion = function(button) {
        actividadIdActual = button.getAttribute('data-actividad-id');
        const actividadNombre = button.getAttribute('data-actividad-nombre');
        
        document.getElementById('actividad-nombre').textContent = actividadNombre;
        modal.style.display = 'block';
    };

    // Cerrar modal con X
    closeBtn.addEventListener('click', function() {
        cerrarModal();
    });

    // Cerrar modal al hacer clic fuera
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            cerrarModal();
        }
    });

    // Manejar envío del formulario
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const nota = document.getElementById('nota').value;
        
        if (!nota) {
            alert('Por favor selecciona una nota');
            return;
        }
        
        // Validar que la nota esté entre 1 y 7
        const notaNum = parseInt(nota);
        if (notaNum < 1 || notaNum > 7) {
            alert('La nota debe estar entre 1 y 7');
            return;
        }
        
        // Enviar evaluación de forma asíncrona
        fetch('/api/evaluaciones/agregar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                actividadId: actividadIdActual,
                nota: notaNum
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Actualizar la nota en la tabla
                const notaCell = document.querySelector(`.nota-cell[data-actividad-id="${actividadIdActual}"]`);
                if (notaCell) {
                    notaCell.textContent = data.nuevaNota;
                }
                
                alert('Evaluación agregada correctamente');
                cerrarModal();
            } else {
                alert('Error: ' + data.error);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error al agregar la evaluación');
        });
    });
});

function cerrarModal() {
    const modal = document.getElementById('modal-evaluacion');
    modal.style.display = 'none';
    
    // Limpiar el formulario
    document.getElementById('form-evaluacion').reset();
    document.getElementById('actividad-nombre').textContent = '';
} 