// script.js - Versión completa para CC5002 Tarea 1

document.addEventListener('DOMContentLoaded', function() {
    // ==================== CONSTANTES Y VARIABLES ====================
    const MAX_FOTOS = 5;
    let fotoCount = 1;
    
    // Datos de ejemplo para regiones y comunas
    const regionesComunas = {
        'Metropolitana': ['Santiago', 'Providencia', 'Ñuñoa', 'Las Condes', 'Maipú', 'Recoleta'],
        'Valparaíso': ['Valparaíso', 'Viña del Mar', 'Quilpué', 'Villa Alemana'],
        'Biobío': ['Concepción', 'Talcahuano', 'Chiguayante']
    };

    // Datos de ejemplo para actividades (simulando "base de datos")
    let actividades = [
        {
            id: 1,
            region: 'Metropolitana',
            comuna: 'Santiago',
            sector: 'Beauchef 850, terraza',
            organizador: 'Club de Boxeo UChile',
            email: 'boxeo@uchile.cl',
            celular: '+569.12345678',
            inicio: '2025-03-28T12:00',
            termino: '2025-03-28T14:00',
            tema: 'deporte',
            descripcion: 'Clases introductorias de boxeo para principiantes',
            fotos: ['img/boxeo.jpg']
        },
        // ... más actividades de ejemplo
    ];

    // ==================== FUNCIONES GENERALES ====================
    function mostrarError(campo, mensaje) {
        const errorExistente = campo.nextElementSibling;
        if (errorExistente && errorExistente.classList.contains('error')) {
            errorExistente.remove();
        }
        
        const errorElement = document.createElement('div');
        errorElement.className = 'error';
        errorElement.textContent = mensaje;
        campo.parentNode.insertBefore(errorElement, campo.nextSibling);
        
        campo.focus();
        return false;
    }

    function limpiarErrores() {
        document.querySelectorAll('.error').forEach(el => el.remove());
    }

    function formatearFecha(fechaISO) {
        const opciones = { 
            year: 'numeric', 
            month: '2-digit', 
            day: '2-digit',
            hour: '2-digit', 
            minute: '2-digit'
        };
        return new Date(fechaISO).toLocaleString('es-CL', opciones);
    }

    // ==================== FUNCIONALIDAD DEL FORMULARIO ====================
    function inicializarFormulario() {
        const form = document.getElementById('actividad-form');
        if (!form) return;

        // Llenar select de regiones
        const regionSelect = document.getElementById('region');
        regionSelect.innerHTML = '<option value="">Seleccione región</option>';
        Object.keys(regionesComunas).forEach(region => {
            regionSelect.innerHTML += `<option value="${region}">${region}</option>`;
        });

        // Actualizar comunas al cambiar región
        regionSelect.addEventListener('change', function() {
            const comunaSelect = document.getElementById('comuna');
            comunaSelect.innerHTML = '<option value="">Seleccione comuna</option>';
            
            if (this.value) {
                regionesComunas[this.value].forEach(comuna => {
                    comunaSelect.innerHTML += `<option value="${comuna}">${comuna}</option>`;
                });
            }
        });

        // Manejar fotos dinámicas
        document.getElementById('agregar-foto').addEventListener('click', function(e) {
            e.preventDefault();
            if (fotoCount < MAX_FOTOS) {
                fotoCount++;
                const newInput = document.createElement('div');
                newInput.className = 'foto-input';
                newInput.innerHTML = `
                    <input type="file" name="foto${fotoCount}" accept="image/*" class="foto-actividad">
                    <button type="button" class="eliminar-foto">×</button>
                `;
                document.getElementById('foto-container').appendChild(newInput);
                
                newInput.querySelector('.eliminar-foto').addEventListener('click', function() {
                    this.parentElement.remove();
                    fotoCount--;
                });
            } else {
                alert(`Máximo ${MAX_FOTOS} fotos permitidas`);
            }
        });

        // Campos condicionales
        document.getElementById('tema').addEventListener('change', function() {
            document.getElementById('otro-tema-group').style.display = 
                this.value === 'otro' ? 'block' : 'none';
        });

        document.getElementById('contacto-red').addEventListener('change', function() {
            document.getElementById('contacto-info-group').style.display = 
                this.value ? 'block' : 'none';
        });

        // Prellenar fecha/hora de inicio
        const ahora = new Date();
        ahora.setMinutes(0, 0, 0); // Redondear a hora en punto
        document.getElementById('inicio').value = ahora.toISOString().slice(0, 16);
        
        // Prellenar término (inicio + 3 horas)
        const termino = new Date(ahora);
        termino.setHours(termino.getHours() + 3);
        document.getElementById('termino').value = termino.toISOString().slice(0, 16);

        // Validar envío del formulario
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            limpiarErrores();
            
            // Validar todos los campos
            if (!validarFormulario()) return;
            
            // Mostrar confirmación
            if (confirm('¿Está seguro que desea agregar esta actividad?')) {
                alert('Hemos recibido su información, muchas gracias y suerte en su actividad');
                window.location.href = 'index.html';
            }
        });
    }

    function validarFormulario() {
        let valido = true;

        // Validar sección "Dónde"
        const region = document.getElementById('region');
        if (!region.value) {
            mostrarError(region, 'Seleccione una región');
            valido = false;
        }

        const comuna = document.getElementById('comuna');
        if (!comuna.value) {
            mostrarError(comuna, 'Seleccione una comuna');
            valido = false;
        }

        const sector = document.getElementById('sector');
        if (sector.value.length > 100) {
            mostrarError(sector, 'Máximo 100 caracteres');
            valido = false;
        }

        // Validar sección "Organizador"
        const nombre = document.getElementById('nombre');
        if (!nombre.value || nombre.value.length > 200) {
            mostrarError(nombre, 'Nombre obligatorio (max 200 caracteres)');
            valido = false;
        }

        const email = document.getElementById('email');
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
            mostrarError(email, 'Ingrese un email válido');
            valido = false;
        }

        const celular = document.getElementById('celular');
        if (celular.value && !/^\+\d{3}\.\d{8}$/.test(celular.value)) {
            mostrarError(celular, 'Formato: +NNN.NNNNNNNN');
            valido = false;
        }

        const contactoInfo = document.getElementById('contacto-info');
        if (document.getElementById('contacto-red').value && (!contactoInfo.value || contactoInfo.value.length < 4 || contactoInfo.value.length > 50)) {
            mostrarError(contactoInfo, 'Info contacto debe tener entre 4-50 caracteres');
            valido = false;
        }

        // Validar sección "Actividad"
        const inicio = document.getElementById('inicio');
        if (!inicio.value) {
            mostrarError(inicio, 'Ingrese fecha/hora de inicio');
            valido = false;
        }

        const termino = document.getElementById('termino');
        if (termino.value && new Date(termino.value) <= new Date(inicio.value)) {
            mostrarError(termino, 'El término debe ser posterior al inicio');
            valido = false;
        }

        const tema = document.getElementById('tema');
        if (!tema.value) {
            mostrarError(tema, 'Seleccione un tema');
            valido = false;
        }

        const otroTema = document.getElementById('otro-tema');
        if (tema.value === 'otro' && (!otroTema.value || otroTema.value.length < 3 || otroTema.value.length > 15)) {
            mostrarError(otroTema, 'Especifique tema (3-15 caracteres)');
            valido = false;
        }

        const fotos = document.querySelectorAll('.foto-actividad');
        if (fotos.length === 0 || Array.from(fotos).every(input => !input.files[0])) {
            mostrarError(document.getElementById('foto-container'), 'Debe agregar al menos 1 foto');
            valido = false;
        }

        return valido;
    }

    // ==================== LISTADO DE ACTIVIDADES ====================
    function inicializarListado() {
        const tabla = document.getElementById('tabla-actividades');
        if (!tabla) return;

        // Generar filas con datos de ejemplo
        actividades.forEach(actividad => {
            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td>${formatearFecha(actividad.inicio)}</td>
                <td>${actividad.termino ? formatearFecha(actividad.termino) : '-'}</td>
                <td>${actividad.comuna}</td>
                <td>${actividad.sector || '-'}</td>
                <td>${actividad.tema}</td>
                <td><img src="${actividad.fotos[0]}" class="thumbnail" alt="Miniatura"></td>
            `;
            fila.addEventListener('click', () => mostrarDetalleActividad(actividad.id));
            tabla.querySelector('tbody').appendChild(fila);
        });
    }

    function mostrarDetalleActividad(id) {
        const actividad = actividades.find(a => a.id === id);
        if (!actividad) return;

        // Crear modal de detalle
        const modal = document.createElement('div');
        modal.className = 'modal-detalle';
        modal.innerHTML = `
            <div class="modal-contenido">
                <h2>Detalles de la actividad</h2>
                
                <div class="info-actividad">
                    <p><strong>Organizador:</strong> ${actividad.organizador}</p>
                    <p><strong>Contacto:</strong> ${actividad.email} ${actividad.celular ? `· ${actividad.celular}` : ''}</p>
                    <p><strong>Ubicación:</strong> ${actividad.comuna}, ${actividad.region} ${actividad.sector ? `· ${actividad.sector}` : ''}</p>
                    <p><strong>Fecha:</strong> ${formatearFecha(actividad.inicio)} ${actividad.termino ? `a ${formatearFecha(actividad.termino)}` : ''}</p>
                    <p><strong>Tema:</strong> ${actividad.tema} ${actividad.tema === 'otro' ? `(${actividad.otroTema})` : ''}</p>
                    ${actividad.descripcion ? `<p><strong>Descripción:</strong> ${actividad.descripcion}</p>` : ''}
                </div>
                
                <div class="galeria-fotos">
                    ${actividad.fotos.map(foto => `
                        <img src="${foto}" alt="Foto actividad" class="foto-miniatura" onclick="ampliarFoto('${foto}')">
                    `).join('')}
                </div>
                
                <div class="botones-modal">
                    <button onclick="cerrarModal()">Volver al listado</button>
                    <a href="index.html" class="boton-portada">Ir a portada</a>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }

    // ==================== FUNCIONES GLOBALES ====================
    window.ampliarFoto = function(url) {
        const overlay = document.createElement('div');
        overlay.className = 'foto-overlay';
        overlay.innerHTML = `
            <div class="foto-ampliada-container">
                <img src="${url}" class="foto-ampliada">
                <button onclick="cerrarFoto()" class="cerrar-foto">×</button>
            </div>
        `;
        document.body.appendChild(overlay);
    };

    window.cerrarFoto = function() {
        document.querySelector('.foto-overlay')?.remove();
    };

    window.cerrarModal = function() {
        document.querySelector('.modal-detalle')?.remove();
    };

    // ==================== INICIALIZACIÓN ====================
    inicializarFormulario();
    inicializarListado();
});