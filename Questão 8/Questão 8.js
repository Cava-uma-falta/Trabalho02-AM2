async function fetchImageInfo(id) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ id, author: `Autor ${id}`, description: `Descrição da imagem ${id}` });
        }, 500);
    });
}

async function getCachedImageInfo(id) {
    const cached = localStorage.getItem(`imgInfo_${id}`);
    if (cached) {
        return JSON.parse(cached);
    }
    try {
        const info = await fetchImageInfo(id);
        localStorage.setItem(`imgInfo_${id}`, JSON.stringify(info));
        return info;
    } catch (error) {
        console.error("Erro ao obter ou cachear info da imagem:", error);
        return null;
    }
}

async function showImageInfo(id) {
    const info = await getCachedImageInfo(id);
    if (info) {
        document.getElementById(`info-${id}`).textContent = `${info.author} - ${info.description}`;
    }
}
