const coverWidth = 4;
const coverHeight = 6;
const coverDepth = 0.2;

const coverGeometry = new THREE.BoxGeometry(
  coverWidth,
  coverHeight,
  coverDepth
);

const coverMaterial = new THREE.MeshStandardMaterial({
  color: 0x4a2f1b
});

const topCover = new THREE.Mesh(coverGeometry, coverMaterial);
const topCoverPivot = new THREE.Group();
scene.add(topCoverPivot);
document.querySelectorAll(".card").forEach(card => {

    card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = -(y - centerY) / 15;
        const rotateY = (x - centerX) / 15;

        card.style.transform = `
            scale(${card.offsetWidth > 200 ? 1.02 : 1})
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
        `;
    });

    card.addEventListener("mouseleave", () => {
        card.style.transform = "rotateX(0) rotateY(0) scale(1)";
    });
    card.style.backgroundPosition = `${50 + rotateY * 2}% ${50 + rotateX * 2}%`;

});

// Scroll to top
const scrollBtn = document.getElementById("scrollTopBtn");

scrollBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});


