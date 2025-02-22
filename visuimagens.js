let currentPage = 1;
const limit = 20;
const totalPages = 5;

async function loadImages(page = 1) {
    try {
        const response = await fetch(`https://picsum.photos/v2/list?page=${page}&limit=${limit}`);
        if (!response.ok) {
            throw new Error("Erro ao carregar imagens");
        }

        const images = await response.json();
        const grid = document.getElementById("image-grid");

        grid.innerHTML = ''; // Limpa a grid antes de adicionar novas imagens

        images.forEach(image => {
            const div = document.createElement("div");
            div.classList.add("image-container");

            div.innerHTML = `
                <img src="${image.download_url}" class="thumbnail" onclick="openLightbox('${image.download_url}')"/>
            `;
            grid.appendChild(div);
        });

        updatePaginationButtons();
    } catch (error) {
        console.error("Erro ao carregar as imagens:", error);
    }
}

function nextPage() {
    if (currentPage < totalPages) {
        currentPage++;
        loadImages(currentPage);
    }
}

function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        loadImages(currentPage);
    }
}

function updatePaginationButtons() {
    document.getElementById("prev-btn").disabled = currentPage === 1;
    document.getElementById("next-btn").disabled = currentPage === totalPages;
}

// Função para abrir o Lightbox
function openLightbox(imageUrl) {
    const lightbox = document.getElementById("lightbox");
    const lightboxImage = document.getElementById("lightbox-image");

    lightboxImage.src = imageUrl;
    lightbox.style.display = "flex";
}

// Função para fechar o Lightbox
function closeLightbox() {
    document.getElementById("lightbox").style.display = "none";
}

document.getElementById("prev-btn").addEventListener("click", prevPage);
document.getElementById("next-btn").addEventListener("click", nextPage);

// Carrega as imagens na página inicial
loadImages(currentPage);
