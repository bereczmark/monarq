// script.js

// Segédfüggvény: mobil/nem-mobil detektálása breakpoint alapján
function isMobile() {
  return window.matchMedia('(max-width: 800px)').matches;
}

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
  document.querySelectorAll('.vertical-text span').forEach((span, index) => {
    span.classList.toggle('visible', index < Math.floor(scrollY / 50));
  });
  
  // Jobb oldali vertikális felirat mozgatása
  const verticalTextRight = document.querySelector('.vertical-text-right');
  if (verticalTextRight) {
    verticalTextRight.style.transform = `translateY(calc(-25% - ${scrollY}px))`;
  }
  
  // Betűk megjelenítése a jobb oldali felirathoz
  document.querySelectorAll('.vertical-text-right span').forEach((span, index) => {
    span.classList.toggle('visible', index < Math.floor(scrollY / 50));
  });
});

// Intersection Observer az animációkhoz
const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      obs.unobserve(entry.target);
    }
  });
}, { root: null, threshold: 0.1 });
document.querySelectorAll('.hidden, .hidden-left, .hidden-right')
  .forEach(elem => observer.observe(elem));

// Mobil navigáció és dinamikus szöveg-szín beállítása
window.addEventListener('DOMContentLoaded', () => {
  // Szövegszín beállítása
  document.querySelectorAll('section').forEach(setTextColorForSection);

  // Hamburger toggle
  const navToggle = document.querySelector('.nav-toggle');
  const mainNav = document.querySelector('.main-nav');
  if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => mainNav.classList.toggle('active'));
    mainNav.querySelectorAll('a').forEach(link =>
      link.addEventListener('click', () => mainNav.classList.remove('active'))
    );
  }
});

// Portfolio Carousel – végtelen körhintás
document.addEventListener('DOMContentLoaded', () => {
  const track = document.querySelector('.carousel-track');
  const container = document.querySelector('.carousel-container');
  if (!track || !container) return;

  const slides = Array.from(track.children);
  const numVisible = 4;
  slides.slice(0, numVisible).forEach(slide => {
    track.appendChild(slide.cloneNode(true));
  });

  let index = 0;
  const slideWidth = () => container.offsetWidth / numVisible;
  let w = slideWidth();
  window.addEventListener('resize', () => { w = slideWidth(); });

  setInterval(() => {
    index++;
    track.style.transition = 'transform 0.5s ease-in-out';
    track.style.transform = `translateX(-${index * w}px)`;
    if (index >= slides.length) {
      setTimeout(() => {
        track.style.transition = 'none';
        track.style.transform = 'translateX(0)';
        index = 0;
      }, 500);
    }
  }, 2000);
});

// Testimonial Carousel – pozitív irányú, végtelen körbefutás, reszponzív numVisible
document.addEventListener('DOMContentLoaded', () => {
  const track = document.querySelector('.testimonial-carousel-track');
  const container = document.querySelector('.testimonial-carousel-container');
  if (!track || !container) return;

  // Mobilon 1, gépen 2 elem látható
  const numVisible = isMobile() ? 1 : 2;
  const originals = Array.from(track.children);

  // Klónozzuk az utolsó numVisible elemet, prepend-ként
  originals.slice(-numVisible).forEach(item => {
    track.insertBefore(item.cloneNode(true), track.firstChild);
  });

  let idx = 0;
  const itemWidth = () => container.offsetWidth / numVisible;
  let iw = itemWidth();

  // Kezdeti offset a klónok miatt
  track.style.transform = `translateX(-${iw * numVisible}px)`;

  window.addEventListener('resize', () => {
    iw = itemWidth();
    track.style.transition = 'none';
    track.style.transform = `translateX(-${iw * numVisible}px)`;
  });

  setInterval(() => {
    idx++;
    track.style.transition = 'transform 0.5s ease-in-out';
    track.style.transform = `translateX(-${iw * numVisible - idx * iw}px)`;
    if (idx >= originals.length) {
      setTimeout(() => {
        track.style.transition = 'none';
        idx = 0;
        track.style.transform = `translateX(-${iw * numVisible}px)`;
      }, 500);
    }
  }, 2500);
});

// Segédfüggvény: szövegszín beállítása a háttér alapján
function setTextColorForSection(section) {
  const bgType = section.getAttribute('data-bg');
  if (bgType === 'dark') {
    section.style.color = '#fff';
  } else if (bgType === 'light') {
    section.style.color = '#000';
  } else {
    const bgColor = window.getComputedStyle(section).backgroundColor;
    const rgb = bgColor.match(/\d+/g);
    if (rgb && rgb.length >= 3) {
      const [r, g, b] = rgb.map(Number);
      const luminance = (0.299*r + 0.587*g + 0.114*b) / 255;
      section.style.color = luminance > 0.5 ? '#000' : '#fff';
    }
  }
}
