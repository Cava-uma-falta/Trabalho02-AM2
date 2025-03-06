function filterImages() {
    const search = document.getElementById("search").value.toLowerCase();
    const containers = document.querySelectorAll(".image-container");
    
    containers.forEach(container => {
        const author = container.dataset.author.toLowerCase();
        if (author.includes(search)) {
            container.style.display = "block";
        } else {
            container.style.display = "none";
        }
    });
}
