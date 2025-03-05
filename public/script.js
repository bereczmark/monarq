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

// Dinamikus szövegszín beállítása a háttér kontrasztja alapján
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

function setTextColorForSection(section) {
  // Ha a section rendelkezik data-bg attribútummal, azt használjuk
  let bgType = section.getAttribute("data-bg");
  if(bgType === "dark") {
    section.style.color = "#fff";
  } else if(bgType === "light") {
    section.style.color = "#000";
  } else {
    // Próbáljuk meg lekérni a computed backgroundColor értéket
    let bgColor = window.getComputedStyle(section).backgroundColor;
    let rgb = bgColor.match(/\d+/g);
    if(rgb && rgb.length >= 3) {
      let r = parseInt(rgb[0]), g = parseInt(rgb[1]), b = parseInt(rgb[2]);
      // Egyszerű luminancia számítás (percepció szerint)
      let luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
      section.style.color = luminance > 0.5 ? "#000" : "#fff";
    }
  }
}
