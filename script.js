document.addEventListener("DOMContentLoaded", () => {
    const zoomLevel = 2.5; // Niveau de grossissement réglable (2.0 = 200%, 3.0 = 300%)

    document.querySelectorAll(".project-img").forEach((img) => {
        // 1. Envelopper l'image si ce n'est pas déjà fait
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
            
            // Position de la souris par rapport à l'image
            let x = e.clientX - rect.left;
            let y = e.clientY - rect.top;

            // Dimensions de la bulle
            const lensRadius = lens.offsetWidth / 2;

            // Empêcher la lentille de sortir de l'image
            if (x > img.width) x = img.width;
            if (x < 0) x = 0;
            if (y > img.height) y = img.height;
            if (y < 0) y = 0;

            // Positionnement centré sur le curseur
            lens.style.left = (x - lensRadius) + "px";
            lens.style.top = (y - lensRadius) + "px";

            // Mise à jour de l'image zoomée à l'intérieur de la bulle
            lens.style.backgroundImage = `url('${img.src}')`;
            lens.style.backgroundSize = (img.width * zoomLevel) + "px " + (img.height * zoomLevel) + "px";
            lens.style.backgroundPosition = `-${(x * zoomLevel) - lensRadius}px -${(y * zoomLevel) - lensRadius}px`;
        }

        // Événements d'affichage et de suivi
        img.addEventListener("mouseenter", () => {
            lens.style.display = "block";
        });

        img.addEventListener("mouseleave", () => {
            lens.style.display = "none";
        });

        img.addEventListener("mousemove", moveLens);
    });
});