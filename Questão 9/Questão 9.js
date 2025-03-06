async function fetchImageInfo(id) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                id,
                author: `Autor ${id}`,
                width: 1920,
                height: 1080,
                url: `https://example.com/image${id}.jpg`
            });
        }, 500);
    });
}

async function showImageDetails(id) {
    try {
        const info = await fetchImageInfo(id);
        document.getElementById("modal-author").innerText = `Autor: ${info.author}`;
        document.getElementById("modal-dimensions").innerText = `Dimensões: ${info.width} x ${info.height}`;
        document.getElementById("modal-url").innerText = `URL: ${info.url}`;
        document.getElementById("details-modal").style.display = "flex";
    } catch (error) {
        console.error("Erro ao mostrar detalhes da imagem:", error);
    }
}
