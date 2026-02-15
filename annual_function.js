/* =========================
   INTRO
========================= */

const intro = document.querySelector(".intro-overlay");
document.body.style.overflow = "hidden";

window.addEventListener("load", () => {
  setTimeout(() => {
    intro.classList.add("hide");
    document.body.style.overflow = "auto";

    const heroText = document.querySelector(".hero-text");
    heroText.classList.add("reveal");
  }, 2500);
});


/* =========================
   SELECTORS
========================= */

const track = document.querySelector(".cinema-track");
const items = document.querySelectorAll(".cinema-item");
const heroImg = document.querySelector(".hero-item img");
const progressBar = document.querySelector(".progress-bar");
const section = document.querySelector(".cinema");

const endOverlay = document.querySelector(".end-overlay");
const endOverlayLogo = document.querySelector(".end-overlay-logo");

const viewer = document.querySelector(".image-viewer");
const viewerImg = viewer.querySelector("img");


/* =========================
   SCROLL VARIABLES
========================= */

let current = 0;
let target = 0;

let sectionTop = 0;
let sectionHeight = 0;
let maxTranslate = 0;

const smoothness = 0.08;


/* =========================
   CALCULATE DIMENSIONS
========================= */

function calculate() {
  sectionTop = section.offsetTop;
  sectionHeight = section.offsetHeight - window.innerHeight;

  const lastItem = items[items.length - 1];

  maxTranslate =
    track.scrollWidth -
    window.innerWidth +
    (window.innerWidth - lastItem.offsetWidth) / 2;
}

calculate();
window.addEventListener("resize", calculate);


/* =========================
   ANIMATION LOOP
========================= */

function animate() {

  target = window.scrollY;
  current += (target - current) * smoothness;

  const scrollY = current - sectionTop;
  const scrollFraction = Math.min(Math.max(scrollY / sectionHeight, 0), 1);
  const velocity = target - current;

  track.style.filter =
    `blur(${Math.min(Math.abs(velocity) / 400, 3)}px)`;

  const introEnd = 0.35;
  const heroItem = document.querySelector(".hero-item");
  const heroText = document.querySelector(".hero-text");

  let translateX = 0;

  /* HERO SHRINK */

  if (scrollFraction < introEnd) {

    const progress = scrollFraction / introEnd;
    const eased = 1 - Math.pow(1 - progress, 4);

    const scale = 1 - eased * 0.15;
    const radius = eased * 28;

    heroItem.style.transform = `scale(${scale})`;
    heroItem.style.borderRadius = `${radius}px`;

    heroImg.style.filter =
      `brightness(${1 - progress * 0.2})`;

    heroText.style.opacity =
      1 - Math.pow(progress, 1.5);

    heroText.style.transform =
      `translateY(${progress * -40}px)`;

  } else {

    heroItem.style.transform = `scale(0.85)`;
    heroItem.style.borderRadius = `28px`;
    heroText.style.opacity = 0;
    heroImg.style.filter = `brightness(0.8)`;

    const galleryProgress =
      (scrollFraction - introEnd) / (1 - introEnd);

    translateX = -galleryProgress * maxTranslate;
  }

  /* TRACK MOVE */

  const driftY = scrollFraction * 40;

  track.style.transform =
    `translate3d(${translateX}px, ${driftY}px, 0)`;


  /* MAGNETIC CENTER */

  const viewportCenter = window.innerWidth / 2;

  items.forEach(item => {

    const rect = item.getBoundingClientRect();
    const itemCenter = rect.left + rect.width / 2;
    const distance =
      (itemCenter - viewportCenter) / window.innerWidth;

    const influence =
      Math.exp(-Math.pow(distance * 4, 2));

    const scale = 0.85 + influence * 0.15;
    const opacity = 0.4 + influence * 0.6;

    item.style.setProperty("--scale", scale);
    item.style.opacity = opacity;
  });


  /* END OVERLAY */

  if (scrollFraction > 0.98) {

    endOverlay.style.opacity = "1";
    endOverlay.style.pointerEvents = "auto";

    endOverlayLogo.style.opacity = "1";
    endOverlayLogo.style.transform = "scale(1)";

  } else {

    endOverlay.style.opacity = "0";
    endOverlay.style.pointerEvents = "none";

    endOverlayLogo.style.opacity = "0";
    endOverlayLogo.style.transform = "scale(0.8)";
  }

  progressBar.style.width =
    `${scrollFraction * 100}%`;

  requestAnimationFrame(animate);
}

animate();


/* =========================
   HOVER EFFECTS
========================= */

items.forEach(item => {

  const img = item.querySelector("img");

  item.addEventListener("mouseenter", () => {
    item.style.setProperty("--hoverScale", "1.08");
  });

  item.addEventListener("mousemove", e => {

    const rect = item.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = -(y - centerY) / 25;
    const rotateY = (x - centerX) / 25;

    item.style.setProperty("--tiltX", `${rotateX}deg`);
    item.style.setProperty("--tiltY", `${rotateY}deg`);

    img.style.transform =
      `scale(1.08) translate(
        ${(x - centerX)/30}px,
        ${(y - centerY)/30}px
      )`;
  });

  item.addEventListener("mouseleave", () => {

    item.style.setProperty("--tiltX", "0deg");
    item.style.setProperty("--tiltY", "0deg");
    item.style.setProperty("--hoverScale", "1");

    img.style.transform = "scale(1)";
  });
});


/* =========================
   IMAGE VIEWER
========================= */

items.forEach(item => {
  const img = item.querySelector("img");

  item.addEventListener("click", () => {
    viewerImg.src = img.src;
    viewer.classList.add("active");
    document.body.style.overflow = "hidden";
  });
});

viewer.addEventListener("click", () => {
  viewer.classList.remove("active");
  document.body.style.overflow = "auto";
});


/* =========================
   LOGO CLICK → HOME
========================= */

if (endOverlayLogo) {
  endOverlayLogo.addEventListener("click", () => {

    document.body.style.transition =
      "opacity 0.6s ease";
    document.body.style.opacity = "0";

    setTimeout(() => {
      window.location.href = "index.html";
    }, 600);
  });
}
