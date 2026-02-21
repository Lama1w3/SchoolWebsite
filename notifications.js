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

const __SITE_OWNER__ = {
  maker: "Abhimanyu Lama",
  role: "Frontend Developer + Backend Developer",
  year: "2026"
};

Object.defineProperty(window, "whoMadeThis", {
  get() {
    console.log(
      "%cSite crafted with  by " + __SITE_OWNER__.maker,
      "color: #6e8cff; font-size: 14px; font-weight: 500;"
    );
    return __SITE_OWNER__;
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

reveals.forEach(el => observer.observe(el));


// ================= HAMBURGER =================
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

if (hamburger) {
    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
    });
}

document.querySelectorAll(".nav-menu a").forEach(link => {
    link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
    });
});