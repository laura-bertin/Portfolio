document.addEventListener("DOMContentLoaded", () => {
    const zoomLevel = 2; // 2 = image deux fois plus grande au survol

    document.querySelectorAll(".project-img").forEach((img) => {
        let container = img.parentElement;
        if (!container.classList.contains("img-zoom-container")) {
            container = document.createElement("div");
            container.classList.add("img-zoom-container");
            img.parentNode.insertBefore(container, img);
            container.appendChild(img);
        }

        function moveZoom(e) {
            const rect = img.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;

            img.style.transformOrigin = `${x}% ${y}%`;
            img.style.transform = `scale(${zoomLevel})`;
        }

        container.addEventListener("mousemove", moveZoom);

        container.addEventListener("mouseleave", () => {
            img.style.transform = "scale(1)";
        });
    });
});