document.addEventListener("DOMContentLoaded", () => {
    const zoomLevel = 1.5; // Grossissement (2.5 = 250%)

    document.querySelectorAll(".project-img").forEach((img) => {
        // 1. Envelopper l'image dans un conteneur relatif si absent
        let container = img.parentElement;
        if (!container.classList.contains("img-zoom-container")) {
            container = document.createElement("div");
            container.classList.add("img-zoom-container");
            img.parentNode.insertBefore(container, img);
            container.appendChild(img);
        }

        // 2. Créer la bulle grossissante
        const lens = document.createElement("div");
        lens.classList.add("img-zoom-lens");
        container.appendChild(lens);

        function moveLens(e) {
            e.preventDefault();
            const rect = img.getBoundingClientRect();

            let x = e.clientX - rect.left;
            let y = e.clientY - rect.top;

            const lensWidth = lens.offsetWidth;
            const lensHeight = lens.offsetHeight;

            const imgWidth = img.clientWidth;
            const imgHeight = img.clientHeight;

            // Empêche le curseur "virtuel" de sortir des limites de l'image
            x = Math.max(0, Math.min(x, imgWidth));
            y = Math.max(0, Math.min(y, imgHeight));

            // Empêche la bulle elle-même de dépasser les bords de l'image
            let lensX = x - lensWidth / 2;
            let lensY = y - lensHeight / 2;
            lensX = Math.max(0, Math.min(lensX, imgWidth - lensWidth));
            lensY = Math.max(0, Math.min(lensY, imgHeight - lensHeight));

            lens.style.left = lensX + "px";
            lens.style.top = lensY + "px";

            lens.style.backgroundImage = `url('${img.src}')`;
            lens.style.backgroundSize = `${imgWidth * zoomLevel}px ${imgHeight * zoomLevel}px`;
            lens.style.backgroundPosition = `-${(x * zoomLevel) - lensWidth / 2}px -${(y * zoomLevel) - lensHeight / 2}px`;
            }
                

        // Affichage au survol
        container.addEventListener("mouseenter", () => {
            lens.style.display = "block";
        });

        container.addEventListener("mouseleave", () => {
            lens.style.display = "none";
        });

        container.addEventListener("mousemove", moveLens);
    });
});