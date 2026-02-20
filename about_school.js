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

reveals.forEach(el => observer.observe(el));
/* ================= COUNTER ANIMATION ================= */

const counters = document.querySelectorAll(".counter");

const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            const target = +counter.getAttribute("data-target");
            let count = 0;
            const speed = target / 100;

            const updateCount = () => {
                if (count < target) {
                    count += speed;
                    counter.innerText = Math.ceil(count);
                    requestAnimationFrame(updateCount);
                } else {
                    counter.innerText = target;
                }
            };

            updateCount();
            counterObserver.unobserve(counter);
        }
    });
}, { threshold: 0.6 });

counters.forEach(counter => counterObserver.observe(counter));
/* ================= CINEMATIC PARALLAX ================= */

const hero = document.querySelector(".page-hero");

window.addEventListener("scroll", () => {
    let scroll = window.pageYOffset;

    hero.style.backgroundPositionY = scroll * 0.5 + "px";

    const content = document.querySelector(".hero-content");
    content.style.transform = `translateY(${scroll * 0.2}px)`;
});

/* ================= NAVBAR SCROLL EFFECT ================= */

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
    if (window.scrollY > 80) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});
const pageContent = document.querySelector(".page-content");

const lineObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            pageContent.style.setProperty("--lineHeight", "100%");
            pageContent.classList.add("line-active");
        }
    });
}, { threshold: 0.2 });

lineObserver.observe(pageContent);

/* ================= MOBILE MENU TOGGLE ================= */

const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-menu");

menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");
});