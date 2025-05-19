// listado.js
document.querySelectorAll('.ver-detalle').forEach(button => {
    button.addEventListener('click', () => {
        // Obtener datos de la actividad
        const actividad = {
            fotos: ['img/ejemplo1.jpg', 'img/ejemplo2.jpg'],
            // ... otros datos
        };

        // Generar HTML dinámico
        const modal = `
            <div class="detalle-actividad">
                <h2>Detalles completos</h2>
                <div class="galeria">
                    ${actividad.fotos.map(foto => `
                        <img src="${foto}" class="miniatura" onclick="ampliarFoto('${foto}')">
                    `).join('')}
                </div>
                <div class="botones">
                    <button onclick="history.back()">Volver al listado</button>
                    <a href="index.html">Portada</a>
                </div>
            </div>
        `;
        document.body.innerHTML += modal;
    });
});

function ampliarFoto(url) {
    // Lógica para mostrar foto en 800x600px
}S