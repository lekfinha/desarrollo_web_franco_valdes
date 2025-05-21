// static/js/validator.js

document.addEventListener('DOMContentLoaded', async function () {
    // 1. Cargar regiones al cargar la página
    // Esto llamará a /api/regiones y llenará el selector de regiones
    await loadRegiones();

    // 2. Configurar el event listener para el cambio de región
    // Cada vez que la región cambie, se llamará a loadComunas para actualizar el selector de comunas
    const regionSelect = document.getElementById('region');
    if (regionSelect) {
        regionSelect.addEventListener('change', loadComunas);
    }

    // --- El resto de tu lógica DOMContentLoaded existente ---
    // (Asegúrate de que cualquier otra inicialización o listeners que tengas
    // para los elementos de contacto por, validación de formulario, etc.,
    // estén aquí dentro de este único DOMContentLoaded)

    // Aquí iría el código para el botón de submit (si lo tienes en el DOMContentLoaded original)
    let submitBtn = document.getElementById("submit-button");
    if (submitBtn) {
        submitBtn.addEventListener("click", ValidateForm);
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

// --- Tus funciones de validación existentes (mantenerlas tal cual) ---
new MultiSelectTag('sports') // Si 'sports' es el ID de tu campo multiselect

// No necesitas re-definir displayRegion y updateComunas aquí.
// Las funciones asíncronas loadRegiones y loadComunas se encargan de esto.

const ValidateSelect = (value) => { /* ... tu código ... */ };
const ValidateTextBox80 = (string) => { /* ... tu código ... */ };
const ValidateSports = (value) => { /* ... tu código ... */ };
const ValidateEmail = (email) => { /* ... tu código ... */ };
const ValidateContacto = (contacto) => { /* ... tu código ... */ };
const ValidateNombre = (nombre) => { /* ... tu código ... */ };
const validateFotos = (fotos) => { /* ... tu código ... */ };
const ValidateForm = () => { /* ... tu código ... */ };

// Elimina estas líneas duplicadas si estaban fuera del DOMContentLoaded:
// document.getElementById("region").addEventListener("change", updateComunas);
// displayRegion(); // Esto ya no es necesario aquí.