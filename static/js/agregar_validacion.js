// static/js/agregar_validacion.js

function validarNombre(nombre) {
    if (!nombre || nombre.trim() === "") {
        return "El nombre es obligatorio.";
    }
    return null; // Null significa que no hay error
}

function validarEmail(email) {
    if (!email || email.trim() === "") {
        return "El email es obligatorio.";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return "El formato del email no es válido.";
    }
    return null;
}

function validarFechaInicio(fechaInicio) {
    if (!fechaInicio) {
        return "La fecha y hora de inicio son obligatorias.";
    }
    // Aquí podríamos agregar validaciones más complejas, como verificar que la fecha no sea en el pasado.
    return null;
}

function validarTema(tema) {
    if (!tema || tema === "") {
        return "Debe seleccionar un tema.";
    }
    return null;
}

function validarOtroTema(temaSeleccionado, otroTema) {
    if (temaSeleccionado === 'otro' && (!otroTema || otroTema.trim() === "")) {
        return "Por favor, especifique el otro tema.";
    }
    return null;
}

function validarFotos(archivos) {
    if (!archivos || archivos.length === 0) {
        return "Debe agregar al menos una foto.";
    }
    if (archivos.length > 5) {
        return "Solo se permiten hasta 5 fotos.";
    }
    // Aquí podríamos agregar validaciones para el tipo y tamaño de los archivos.
    return null;
}

// Función principal para validar el formulario
function validarFormulario(formulario) {
    const nombre = formulario.nombre.value;
    const email = formulario.email.value;
    const inicio = formulario.inicio.value;
    const tema = formulario.tema.value;
    const otroTema = formulario['otro-tema'] ? formulario['otro-tema'].value : null; // El campo 'otro-tema' puede no existir
    const fotos = formulario['foto-actividad'];
    const archivosFotos = fotos instanceof HTMLInputElement ? (fotos.files.length > 0 ? [fotos.files[0]] : []) : Array.from(fotos).filter(input => input.files.length > 0).map(input => input.files[0]);


    let errores = {};

    let errorNombre = validarNombre(nombre);
    if (errorNombre) errores.nombre = errorNombre;

    let errorEmail = validarEmail(email);
    if (errorEmail) errores.email = errorEmail;

    let errorInicio = validarFechaInicio(inicio);
    if (errorInicio) errores.inicio = errorInicio;

    let errorTema = validarTema(tema);
    if (errorTema) errores.tema = errorTema;

    let errorOtroTema = validarOtroTema(tema, otroTema);
    if (errorOtroTema) errores['otro-tema'] = errorOtroTema;

    let errorFotos = validarFotos(archivosFotos);
    if (errorFotos) errores.fotos = errorFotos;

    return errores;
}

// Función para mostrar los errores en el formulario
function mostrarErrores(errores) {
    // Primero, eliminamos cualquier mensaje de error previo
    const mensajesErrorPrevios = document.querySelectorAll('.error-message');
    mensajesErrorPrevios.forEach(mensaje => mensaje.remove());

    // Luego, mostramos los nuevos errores
    for (const campo in errores) {
        const elementoCampo = document.getElementById(campo);
        if (elementoCampo) {
            const mensajeError = document.createElement('div');
            mensajeError.classList.add('error-message');
            mensajeError.textContent = errores[campo];
            elementoCampo.parentNode.insertBefore(mensajeError, elementoCampo.nextSibling);
        } else if (campo === 'fotos') {
            const contenedorFotos = document.getElementById('foto-container');
            if (contenedorFotos) {
                const mensajeError = document.createElement('div');
                mensajeError.classList.add('error-message');
                mensajeError.textContent = errores[campo];
                contenedorFotos.parentNode.insertBefore(mensajeError, contenedorFotos.nextSibling);
            }
        } else if (campo === 'otro-tema') {
            const otroTemaInput = document.getElementById('otro-tema');
            if (otroTemaInput) {
                const mensajeError = document.createElement('div');
                mensajeError.classList.add('error-message');
                mensajeError.textContent = errores[campo];
                otroTemaInput.parentNode.insertBefore(mensajeError, otroTemaInput.nextSibling);
            }
        }
    }
}

// Evento para validar el formulario antes de la confirmación
document.addEventListener('DOMContentLoaded', function () {
    const formularioActividad = document.getElementById('actividad-form');
    const confirmBox = document.getElementById('confirm-box');
    const submitButton = document.getElementById('submit-button');
    const confirmButton = document.getElementById('confirm-button');
    const denyButton = document.getElementById('deny-button');
    const returnBox = document.getElementById('return-box');
    const homeButton = document.getElementById('home-button');

    submitButton.addEventListener('click', function (event) {
        event.preventDefault(); // Evitar la envío automático del formulario

        const errores = validarFormulario(formularioActividad);

        if (Object.keys(errores).length === 0) {
            // Si no hay errores, mostrar la caja de confirmación
            confirmBox.removeAttribute('hidden');
        } else {
            // Si hay errores, mostrarlos
            mostrarErrores(errores);
        }
    });

    confirmButton.addEventListener('click', function () {
        // Aquí iría la lógica para enviar los datos del formulario
        // (por ejemplo, mediante una petición AJAX)
        console.log("Formulario confirmado para enviar.");
        confirmBox.setAttribute('hidden', 'true');
        returnBox.removeAttribute('hidden'); // Mostrar mensaje de éxito (temporal)
        formularioActividad.reset(); // Limpiar el formulario
    });

    denyButton.addEventListener('click', function () {
        // Volver al formulario
        confirmBox.setAttribute('hidden', 'true');
    });

    homeButton.addEventListener('click', function () {
        window.location.href = 'index.html'; // Redirigir a la página de inicio
    });
});