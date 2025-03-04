// Görgetés esemény: Repülőgép animációja, bal és jobb oldali vertikális feliratok mozgatása
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

// Intersection Observer az egyéb animációkhoz (pl. .process-step, .team-member, .reference-item)
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
