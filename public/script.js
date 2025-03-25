// Scroll event: Repülőgép animációja, bal és jobb oldali vertikális feliratok mozgatása
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  
  // Repülőgép animációja
  const plane = document.querySelector('.plane');
  if (plane) {
    plane.style.transform = `translateX(${scrollY}px) translateY(${-scrollY * 0.75}px)`;
  }
  
  // Bal oldali vertikális felirat mozgatása
  const verticalText = document.querySelector('.vertical-text');
  if (verticalText) {
    verticalText.style.transform = `translateY(calc(-25% - ${scrollY * 0.75}px))`;
  }
  
  // Betűk megjelenítése a bal oldali felirathoz
  const verticalTextSpans = document.querySelectorAll('.vertical-text span');
  const revealIndex = Math.floor(scrollY / 50);
  verticalTextSpans.forEach((span, index) => {
    if (index < revealIndex) {
      span.classList.add('visible');
    } else {
      span.classList.remove('visible');
    }
  });
  
  // Jobb oldali vertikális felirat mozgatása
  const verticalTextRight = document.querySelector('.vertical-text-right');
  if (verticalTextRight) {
    verticalTextRight.style.transform = `translateY(calc(-25% - ${scrollY}px))`;
  }
  
  // Betűk megjelenítése a jobb oldali felirathoz
  const verticalTextRightSpans = document.querySelectorAll('.vertical-text-right span');
  const revealIndexRight = Math.floor(scrollY / 50);
  verticalTextRightSpans.forEach((span, index) => {
    if (index < revealIndexRight) {
      span.classList.add('visible');
    } else {
      span.classList.remove('visible');
    }
  });
});

// Intersection Observer az egyéb animációkhoz (pl. .process-step, .team-bubble)
const options = {
  root: null,
  threshold: 0.1
};

const animatedElements = document.querySelectorAll('.hidden');

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.remove('hidden');
      entry.target.classList.add('show');
      observer.unobserve(entry.target);
    }
  });
}, options);

animatedElements.forEach(elem => observer.observe(elem));

// Dinamikus szövegszín beállítása a háttér kontrasztja alapján és Mobile navigation
window.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('section');
  sections.forEach(section => {
    setTextColorForSection(section);
  });
  
  // Mobile navigation toggle
  const navToggle = document.querySelector('.nav-toggle');
  const mainNav = document.querySelector('.main-nav');
  if (navToggle) {
    navToggle.addEventListener('click', () => {
      mainNav.classList.toggle('active');
    });
  }
  
  // Close hamburger menu automatically after clicking any nav link
  const navLinks = mainNav.querySelectorAll('a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('active');
    });
  });
});

// Portfolio Carousel – új funkció a végtelen körhinta jellegű képcsere megvalósításához
document.addEventListener('DOMContentLoaded', function() {
  const carouselTrack = document.querySelector('.carousel-track');
  const carouselContainer = document.querySelector('.carousel-container');
  
  if (carouselTrack && carouselContainer) {
    // Az eredeti diák listája
    const originalSlides = Array.from(carouselTrack.children);
    const numVisible = 3;
    
    // Klónozzuk az első numVisible elemet és fűzzük hozzá a végéhez
    originalSlides.slice(0, numVisible).forEach(slide => {
      carouselTrack.appendChild(slide.cloneNode(true));
    });
    
    let slideIndex = 0;
    // Számoljuk ki az egy kép szélességét (a konténer szélessége osztva a látható képek számával)
    const updateImageWidth = () => carouselContainer.offsetWidth / numVisible;
    let imageWidth = updateImageWidth();
    
    // Frissítjük a kép szélességét ablakméret változásakor
    window.addEventListener('resize', () => {
      imageWidth = updateImageWidth();
    });
    
    setInterval(() => {
      slideIndex++;
      carouselTrack.style.transition = "transform 0.5s ease-in-out";
      carouselTrack.style.transform = `translateX(-${slideIndex * imageWidth}px)`;
      // Ha az eredeti diák végére értünk, visszaállítjuk a kezdőpozíciót
      if (slideIndex >= originalSlides.length) {
        setTimeout(() => {
          carouselTrack.style.transition = "none";
          carouselTrack.style.transform = "translateX(0)";
          slideIndex = 0;
        }, 500);
      }
    }, 2000);
  }
});

function setTextColorForSection(section) {
  // Ha a section rendelkezik data-bg attribútummal, azt használjuk
  let bgType = section.getAttribute("data-bg");
  if(bgType === "dark") {
    section.style.color = "#fff";
  } else if(bgType === "light") {
    section.style.color = "#000";
  } else { 
    // Lekérjük a computed backgroundColor értéket
    let bgColor = window.getComputedStyle(section).backgroundColor;
    let rgb = bgColor.match(/\d+/g);
    if(rgb && rgb.length >= 3) {
      let r = parseInt(rgb[0]), g = parseInt(rgb[1]), b = parseInt(rgb[2]);
      // Percepció szerint számolva
      let luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
      section.style.color = luminance > 0.5 ? "#000" : "#fff";
    }
  }
}
