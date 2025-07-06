const expandImg = (image) => {
    let img = document.getElementById(image);
    
    // Verificar si ya hay una imagen expandida
    const existingOverlay = document.getElementById('image-overlay');
    if (existingOverlay) {
        // Si ya hay una imagen expandida, la cerramos
        closeExpandedImage();
        return;
    }
    
    // Crear overlay
    const overlay = document.createElement('div');
    overlay.id = 'image-overlay';
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.8);
        z-index: 9999;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
    `;
    
    // Crear contenedor de imagen
    const imageContainer = document.createElement('div');
    imageContainer.style.cssText = `
        position: relative;
        max-width: 90%;
        max-height: 90%;
        cursor: default;
    `;
    
    // Crear imagen expandida
    const expandedImg = document.createElement('img');
    expandedImg.src = img.src;
    expandedImg.alt = img.alt;
    expandedImg.style.cssText = `
        width: auto;
        height: auto;
        max-width: 100%;
        max-height: 100%;
        object-fit: contain;
        border-radius: 8px;
        box-shadow: 0 0 20px rgba(0,0,0,0.5);
    `;
    
    // Crear botón de cerrar
    const closeButton = document.createElement('button');
    closeButton.innerHTML = '×';
    closeButton.style.cssText = `
        position: absolute;
        top: -40px;
        right: 0;
        background: #ff4444;
        color: white;
        border: none;
        border-radius: 50%;
        width: 30px;
        height: 30px;
        font-size: 20px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
    `;
    
    // Agregar elementos al DOM
    imageContainer.appendChild(expandedImg);
    imageContainer.appendChild(closeButton);
    overlay.appendChild(imageContainer);
    document.body.appendChild(overlay);
    
    // Event listeners
    closeButton.addEventListener('click', (e) => {
        e.stopPropagation();
        closeExpandedImage();
    });
    
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            closeExpandedImage();
        }
    });
    
    // Agregar event listener para cerrar con ESC
    document.addEventListener('keydown', handleEscKey);
}

function closeExpandedImage() {
    const overlay = document.getElementById('image-overlay');
    if (overlay) {
        overlay.remove();
        document.removeEventListener('keydown', handleEscKey);
    }
}

function handleEscKey(event) {
    if (event.key === 'Escape') {
        closeExpandedImage();
    }
}

