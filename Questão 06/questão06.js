document.addEventListener('DOMContentLoaded', async () => {
    const gallery = document.querySelector('.gallery');
    const imageIds = [0, 1, 2, 3, 4];

    for (const id of imageIds) {
        const info = await fetchImageInfo(id);
        if (info) {
            const thumbnail = document.createElement('div');
            thumbnail.classList.add('thumbnail');

            const img = document.createElement('img');
            img.src = info.download_url;
            img.alt = `Imagem de ${info.author}`;

            const tooltip = document.createElement('div');
            tooltip.classList.add('tooltip');
            tooltip.innerText = `Autor: ${info.author}\nDimensões: ${info.width} x ${info.height}`;

            thumbnail.appendChild(img);
            thumbnail.appendChild(tooltip);
            gallery.appendChild(thumbnail);

            thumbnail.classList.add('fade-in');
        }
    }
});

async function fetchImageInfo(id) {
    try {
        const response = await fetch(`https://picsum.photos/id/${id}/info`);
        if (!response.ok) throw new Error('Erro ao buscar imagem');
        return response.json();
    } catch (error) {
        console.error(`Erro ao buscar info da imagem ID ${id}:`, error);
        return null;
    }
}