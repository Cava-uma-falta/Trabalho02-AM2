document.addEventListener('DOMContentLoaded', async () => {
    const info = await fetchImageInfo(0); 
    if (info) {
        const img = document.createElement('img');
        img.src = info.download_url;
        img.alt = `Imagem de ${info.author}`;
        document.body.appendChild(img);

        addTooltip(img, info);
    }
});

async function fetchImageInfo(id) {
    try {
        const response = await fetch(`https://picsum.photos/id/${id}/info`);
        const info = await response.json();
        return info;
    } catch (error) {
        console.error("Erro ao buscar info da imagem:", error);
        return null;
    }
}

function addTooltip(imageElement, info) {
    const tooltip = document.createElement("div");
    tooltip.classList.add("tooltip");
    tooltip.innerText = `Autor: ${info.author}\nDimensões: ${info.width} x ${info.height}`;
    
    imageElement.parentElement.appendChild(tooltip);
    
    imageElement.onmouseover = () => tooltip.style.display = 'block';
    imageElement.onmouseout = () => tooltip.style.display = 'none';
}