document.addEventListener("DOMContentLoaded", () => {
    const zoomLevel = 2.5; // Grossissement (2.5 = 250%)

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

            // Position du curseur par rapport à l'image affichée
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const lensRadius = lens.offsetWidth / 2;

            // Dimensions de l'image affichée
            const imgWidth = img.clientWidth;
            const imgHeight = img.clientHeight;

            // Positionnement de la bulle
            lens.style.left = (x - lensRadius) + "px";
            lens.style.top = (y - lensRadius) + "px";

            // Calcul du fond zoomé
            lens.style.backgroundImage = `url('${img.src}')`;
            lens.style.backgroundSize = `${imgWidth * zoomLevel}px ${imgHeight * zoomLevel}px`;
            lens.style.backgroundPosition = `-${(x * zoomLevel) - lensRadius}px -${(y * zoomLevel) - lensRadius}px`;
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