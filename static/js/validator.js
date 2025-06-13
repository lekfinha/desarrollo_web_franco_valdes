// static/js/validator.js

document.addEventListener('DOMContentLoaded', function () {
    // Cargar regiones al inicio
    loadRegiones();

    // Configurar event listeners
    const regionSelect = document.getElementById('region');
    if (regionSelect) {
        regionSelect.addEventListener('change', loadComunas);
    }

    // Mostrar/ocultar campo de otro tema
    const temaSelect = document.getElementById('tema');
    const otroTemaInput = document.getElementById('otroTemaInput');
    if (temaSelect && otroTemaInput) {
        temaSelect.addEventListener('change', function() {
            otroTemaInput.style.display = this.value === 'otro' ? 'block' : 'none';
        });
    }

    // Mostrar/ocultar campo de contacto
    const contactoRadios = document.querySelectorAll('input[name="contacto_red"]');
    const contactoInfo = document.getElementById('contacto_info');
    if (contactoRadios && contactoInfo) {
        contactoRadios.forEach(radio => {
            radio.addEventListener('change', function() {
                contactoInfo.style.display = this.checked ? 'inline-block' : 'none';
            });
        });
    }

    // Validar formulario al enviar
    const form = document.querySelector('.activity-form');
    if (form) {
        form.addEventListener('submit', validateForm);
    }
});

/**
 * Carga las regiones desde el backend (/api/regiones) y llena el selector de regiones.
 * Espera datos como una lista de tuplas: [[id, nombre], [id, nombre], ...]
 */
async function loadRegiones() {
    const regionSelect = document.getElementById('region');
    if (!regionSelect) {
        console.error('loadRegiones: Elemento #region no encontrado!');
        return;
    }

    try {
        const response = await fetch('/api/regiones');
        if (!response.ok) {
            throw new Error(`Error HTTP! Estado: ${response.status}`);
        }
        const regiones = await response.json(); // regiones será una lista de tuplas (ej. [[1, "Región A"], [2, "Región B"]])
        console.log('Regiones cargadas desde la API:', regiones); // Para depuración

        regionSelect.innerHTML = '<option value="">Seleccione una región</option>'; // Opción por defecto
        regiones.forEach(region => {
            const option = document.createElement('option');
            option.value = region[0]; // region[0] es el ID de la región
            option.textContent = region[1]; // region[1] es el nombre de la región
            regionSelect.appendChild(option);
        });

    } catch (error) {
        console.error('Error al cargar regiones:', error);
        alert('No se pudieron cargar las regiones. Por favor, intente de nuevo más tarde.');
    }
}

/**
 * Carga las comunas de la región seleccionada desde el backend (/api/comunas/<region_id>)
 * y llena el selector de comunas.
 * Espera datos como una lista de tuplas: [[id, nombre], [id, nombre], ...]
 */
async function loadComunas() {
    const regionSelect = document.getElementById('region');
    const comunaSelect = document.getElementById('comuna');
    if (!regionSelect || !comunaSelect) {
        console.error('loadComunas: Elementos #region o #comuna no encontrados!');
        return;
    }

    const selectedRegionId = regionSelect.value;
    comunaSelect.innerHTML = '<option value="">Seleccione una comuna</option>'; // Restablecer comunas

    if (selectedRegionId) { // Solo si una región ha sido seleccionada
        try {
            const response = await fetch(`/api/comunas/${selectedRegionId}`);
            if (!response.ok) {
                throw new Error(`Error HTTP! Estado: ${response.status}`);
            }
            const comunas = await response.json(); // comunas será una lista de tuplas
            console.log(`Comunas cargadas para región ${selectedRegionId}:`, comunas); // Para depuración

            comunas.forEach(comuna => {
                const option = document.createElement('option');
                option.value = comuna[0]; // comuna[0] es el ID de la comuna
                option.textContent = comuna[1]; // comuna[1] es el nombre de la comuna
                comunaSelect.appendChild(option);
            });
        } catch (error) {
            console.error('Error al cargar comunas:', error);
            alert('No se pudieron cargar las comunas. Por favor, intente de nuevo más tarde.');
        }
    } else {
        console.log('No hay región seleccionada, no se cargan comunas.');
    }
}

// Funciones de validación
function validateNombre(nombre) {
    if (!nombre || nombre.trim().length === 0) {
        return 'El nombre de la actividad es requerido';
    }
    if (nombre.length > 80) {
        return 'El nombre de la actividad no puede tener más de 80 caracteres';
    }
    return '';
}

function validateEmail(email) {
    if (!email || email.trim().length === 0) {
        return 'El email es requerido';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return 'El email no es válido';
    }
    return '';
}

function validateCelular(celular) {
    if (!celular) return ''; // Es opcional
    const celularRegex = /^\+569[0-9]{8}$/;
    if (!celularRegex.test(celular)) {
        return 'El número de celular debe tener el formato +569XXXXXXXX';
    }
    return '';
}

function validateFechaInicio(inicio) {
    if (!inicio) {
        return 'La fecha de inicio es requerida';
    }
    const fechaInicio = new Date(inicio);
    const ahora = new Date();
    if (fechaInicio < ahora) {
        return 'La fecha de inicio no puede ser en el pasado';
    }
    return '';
}

function validateFechaTermino(inicio, termino) {
    if (!termino) return ''; // Es opcional
    const fechaInicio = new Date(inicio);
    const fechaTermino = new Date(termino);
    if (fechaTermino <= fechaInicio) {
        return 'La fecha de término debe ser posterior a la fecha de inicio';
    }
    return '';
}

function validateTema(tema, otroTema) {
    if (!tema) {
        return 'El tema es requerido';
    }
    if (tema === 'otro' && (!otroTema || otroTema.trim().length === 0)) {
        return 'Debe especificar el otro tema';
    }
    return '';
}

function validateContacto(contactoRed, contactoInfo) {
    if (!contactoRed && !contactoInfo) return ''; // Es opcional
    if (contactoRed && !contactoInfo) {
        return 'Debe especificar el contacto';
    }
    if (contactoInfo && contactoInfo.length > 150) {
        return 'El contacto no puede tener más de 150 caracteres';
    }
    return '';
}

function validateFotos(fotos) {
    if (!fotos || fotos.length === 0) return ''; // Es opcional
    
    const maxSize = 5 * 1024 * 1024; // 5MB
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    
    for (let foto of fotos) {
        if (foto.size > maxSize) {
            return 'Las fotos no pueden pesar más de 5MB';
        }
        if (!allowedTypes.includes(foto.type)) {
            return 'Solo se permiten archivos JPG y PNG';
        }
    }
    return '';
}

function validateForm(event) {
    event.preventDefault();
    
    // Obtener valores del formulario
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const celular = document.getElementById('celular').value;
    const inicio = document.getElementById('inicio').value;
    const termino = document.getElementById('termino').value;
    const tema = document.getElementById('tema').value;
    const otroTema = document.getElementById('otro_tema').value;
    const contactoRed = document.querySelector('input[name="contacto_red"]:checked')?.value;
    const contactoInfo = document.getElementById('contacto_info').value;
    const fotos = document.getElementById('fotos').files;

    // Realizar validaciones
    const errores = {
        nombre: validateNombre(nombre),
        email: validateEmail(email),
        celular: validateCelular(celular),
        inicio: validateFechaInicio(inicio),
        termino: validateFechaTermino(inicio, termino),
        tema: validateTema(tema, otroTema),
        contacto: validateContacto(contactoRed, contactoInfo),
        fotos: validateFotos(fotos)
    };

    // Verificar si hay errores
    const hayErrores = Object.values(errores).some(error => error !== '');
    
    if (hayErrores) {
        // Mostrar errores
        Object.entries(errores).forEach(([campo, error]) => {
            if (error) {
                const errorDiv = document.createElement('div');
                errorDiv.className = 'error';
                errorDiv.textContent = error;
                const input = document.getElementById(campo);
                if (input) {
                    input.parentNode.appendChild(errorDiv);
                }
            }
        });
    } else {
        // Si no hay errores, enviar el formulario
        event.target.submit();
    }
}