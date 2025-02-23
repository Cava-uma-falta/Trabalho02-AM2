let currentPage = 1;
const limit = 20;
const totalPages = 5;
let db;

// Inicializa IndexedDB
function initDB() {
    let request = indexedDB.open("ImageRatingsDB", 1);

    request.onupgradeneeded = function(event) {
        let db = event.target.result;
        if (!db.objectStoreNames.contains("ratings")) {
            db.createObjectStore("ratings", { keyPath: "imageUrl" });
        }
    };

    request.onsuccess = function(event) {
        db = event.target.result;
        loadImages(currentPage);
    };

    request.onerror = function() {
        console.error("Erro ao abrir IndexedDB");
    };
}

// Carrega as imagens
async function loadImages(page = 1) {
    try {
        const response = await fetch(`https://picsum.photos/v2/list?page=${page}&limit=${limit}`);
        if (!response.ok) {
            throw new Error("Erro ao carregar imagens");
        }

        const images = await response.json();
        const grid = document.getElementById("image-grid");
        grid.innerHTML = '';

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

// Abre o lightbox e carrega o rating
function openLightbox(imageUrl) {
    const lightbox = document.getElementById("lightbox");
    const lightboxImage = document.getElementById("lightbox-image");
    const ratingStars = document.getElementById("rating-stars");

    lightboxImage.src = imageUrl;
    lightbox.style.display = "flex";

    getRating(imageUrl, rating => {
        updateStarRating(rating);
    });

    ratingStars.setAttribute("data-image-url", imageUrl);
}

// Fecha o lightbox
function closeLightbox() {
    document.getElementById("lightbox").style.display = "none";
}

// Salva a avaliação no IndexedDB
function saveRating(rating) {
    const imageUrl = document.getElementById("rating-stars").getAttribute("data-image-url");

    let transaction = db.transaction(["ratings"], "readwrite");
    let store = transaction.objectStore("ratings");
    store.put({ imageUrl, rating });

    transaction.oncomplete = function() {
        console.log("Rating salvo:", imageUrl, rating);
    };
}

// Obtém a avaliação do IndexedDB
function getRating(imageUrl, callback) {
    let transaction = db.transaction(["ratings"], "readonly");
    let store = transaction.objectStore("ratings");
    let request = store.get(imageUrl);

    request.onsuccess = function() {
        callback(request.result ? request.result.rating : 0);
    };
}

// Atualiza a exibição das estrelas
function updateStarRating(rating) {
    const stars = document.querySelectorAll(".star");
    stars.forEach((star, index) => {
        star.classList.toggle("filled", index < rating);
    });
}

// Manipula o clique nas estrelas
document.querySelectorAll(".star").forEach((star, index) => {
    star.addEventListener("click", () => {
        updateStarRating(index + 1);
        saveRating(index + 1);
    });
});

document.getElementById("prev-btn").addEventListener("click", () => { if (currentPage > 1) loadImages(--currentPage); });
document.getElementById("next-btn").addEventListener("click", () => { if (currentPage < totalPages) loadImages(++currentPage); });

initDB();
