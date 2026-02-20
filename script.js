const links = document.querySelectorAll('.nav-menu a');

links.forEach(link => {
    link.addEventListener('click', () => {
        links.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
    });
});
const slides = document.querySelectorAll(".slide");
const leftArrow = document.querySelector(".arrow.left");
const rightArrow = document.querySelector(".arrow.right");

let currentIndex = 0;
let isAnimating = false;
const intervalTime = 7000;

function showSlide(newIndex, direction = "right") {
    if (isAnimating || newIndex === currentIndex) return;
    isAnimating = true;

    const currentSlide = slides[currentIndex];
    const nextSlide = slides[newIndex];

    currentSlide.classList.remove("active");
    currentSlide.classList.add(
        direction === "right" ? "exit-left" : "exit-right"
    );

    nextSlide.classList.add("active");

    setTimeout(() => {
        currentSlide.classList.remove("exit-left", "exit-right");
        currentIndex = newIndex;
        isAnimating = false;
    }, 900);
}

function nextSlide() {
    const nextIndex = (currentIndex + 1) % slides.length;
    showSlide(nextIndex, "right");
}

function prevSlide() {
    const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
    showSlide(prevIndex, "left");
}

rightArrow.addEventListener("click", nextSlide);
leftArrow.addEventListener("click", prevSlide);

setInterval(nextSlide, intervalTime);

document.addEventListener("DOMContentLoaded", () => {
    const slider = document.getElementById("slider");
    const loader = document.getElementById("sliderLoader");
    const images = slider.querySelectorAll("img");

    let loadedCount = 0;

    images.forEach(img => {
        if (img.complete) {
            loadedCount++;
        } else {
            img.addEventListener("load", imageLoaded);
            img.addEventListener("error", imageLoaded);
        }
    });

    function imageLoaded() {
        loadedCount++;
        if (loadedCount === images.length) {
            setTimeout(() => {
                loader.classList.add("hidden");
            }, 400); // smooth premium fade
        }
    }

    // Cached images case
    if (loadedCount === images.length) {
        loader.classList.add("hidden");
    }
});
const slider = document.getElementById("slider");
const slidesParallax = document.querySelectorAll(".slide");

slider.addEventListener("mousemove", (e) => {
    const rect = slider.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const moveX = (x - centerX) / 40;
    const moveY = (y - centerY) / 40;

    slidesParallax.forEach(slide => {
        if (slide.classList.contains("active")) {
            slide.style.transform =
                `scale(1.05) translate(${moveX}px, ${moveY}px)`;
        }
    });
});

slider.addEventListener("mouseleave", () => {
    slidesParallax.forEach(slide => {
        slide.style.transform = "scale(1)";
    });
});
const magneticLinks = document.querySelectorAll(".banner-track a");

magneticLinks.forEach(link => {
    let boundingRect;

    link.addEventListener("mouseenter", () => {
        boundingRect = link.getBoundingClientRect();
    });

    link.addEventListener("mousemove", (e) => {
        const x = e.clientX - boundingRect.left;
        const y = e.clientY - boundingRect.top;

        const centerX = boundingRect.width / 2;
        const centerY = boundingRect.height / 2;

        const moveX = (x - centerX) * 0.25;
        const moveY = (y - centerY) * 0.25;

        link.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.06)`;
    });

    link.addEventListener("mouseleave", () => {
        link.style.transform = "translate(0, 0) scale(1)";
    });
});
const banner = document.querySelector(".banner-marquee");

magneticLinks.forEach(link => {
    link.addEventListener("mouseenter", () => {
        banner.style.animationPlayState = "paused";
    });

    link.addEventListener("mouseleave", () => {
        banner.style.animationPlayState = "running";
    });
});
document.querySelectorAll(".stat-card").forEach(card => {
    card.addEventListener("mousemove", e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.transform =
            `rotateX(${-(y - rect.height/2)/20}deg)
             rotateY(${(x - rect.width/2)/20}deg)
             scale(1.05)`;
    });

    card.addEventListener("mouseleave", () => {
        card.style.transform = "scale(1)";
    });
});
const reveals = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.15
    }
);

reveals.forEach(el => observer.observe(el));
const adminItems = document.querySelectorAll('.announcement-item, .principal-card-new');

adminItems.forEach((item, index) => {
    item.style.opacity = "0";
    item.style.transform = "translateY(30px)";
    item.style.transition = "0.6s ease";

    setTimeout(() => {
        item.style.opacity = "1";
        item.style.transform = "translateY(0)";
    }, index * 150);
});
const items = document.querySelectorAll('.admin-item');

items.forEach(item => {
  item.addEventListener('mousemove', e => {
    const rect = item.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const moveX = (x - rect.width / 2) / 20;
    const moveY = (y - rect.height / 2) / 20;

    item.style.transform =
      `translateY(-8px) translate(${moveX}px, ${moveY}px)`;
  });

  item.addEventListener('mouseleave', () => {
    item.style.transform = "translateY(0)";
  });
});

/* Footer Reveal Animation */
const footerItems = document.querySelectorAll(".reveal-footer");

const revealOnScroll = () => {
  const trigger = window.innerHeight * 0.85;

  footerItems.forEach(item => {
    const top = item.getBoundingClientRect().top;
    if(top < trigger){
      item.style.opacity = "1";
      item.style.transform = "translateY(0)";
    }
  });
};

footerItems.forEach(item => {
  item.style.opacity = "0";
  item.style.transform = "translateY(60px)";
  item.style.transition = "all 0.8s ease";
});

window.addEventListener("scroll", revealOnScroll);

/* Scroll to Top */
document.querySelector(".scroll-top")
.addEventListener("click", () => {
  window.scrollTo({ top:0, behavior:"smooth" });
});
const hamburger = document.getElementById("hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
  console.log("clicked");   // 👈 add this
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("open");
});