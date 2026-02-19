/* =========================
   NAVBAR ACTIVE LINK
========================= */

const navLinks = document.querySelectorAll(".nav-menu a");
const currentPage = window.location.pathname.split("/").pop();

navLinks.forEach(link => {
    if(link.getAttribute("href") === currentPage){
        link.classList.add("active");
    }
});

/* =========================
   SCROLL REVEAL
========================= */

const reveals = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            entry.target.classList.add("active");
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });
reveals.forEach(reveal => {
    observer.observe(reveal);
});
window.addEventListener("scroll", () => {
    const hero = document.querySelector(".principal-hero");
    let offset = window.scrollY;
    hero.style.backgroundPositionY = offset * 0.5 + "px";
});
document.querySelectorAll(".copy-btn").forEach(button => {
    button.addEventListener("click", function () {
        const text = this.parentElement.innerText.replace("content_copy", "").trim();
        navigator.clipboard.writeText(text);

        this.innerHTML = '<i class="fa-solid fa-check"></i>';
        this.style.color = "#10a37f";

        setTimeout(() => {
            this.innerHTML = '<i class="fa-regular fa-copy"></i>';
            this.style.color = "#9ca3af";
        }, 1500);
    });
});
