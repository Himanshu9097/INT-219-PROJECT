import { initThreeBackground } from './three-bg.js';

export function initScrollAnimations() {
  if (!window.gsap || !window.ScrollTrigger) {
    console.warn('GSAP or ScrollTrigger not loaded!');
    return;
  }
  
  gsap.registerPlugin(ScrollTrigger);

  // Animate elements with .reveal class
  const revealElements = document.querySelectorAll('.reveal');
  revealElements.forEach(el => {
    gsap.fromTo(el, 
      { autoAlpha: 0, y: 50 }, 
      { 
        duration: 1, 
        autoAlpha: 1, 
        y: 0, 
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      }
    );
  });

  // Staggering cards in grid
  const grids = document.querySelectorAll('.artwork-grid, .artist-grid');
  grids.forEach(grid => {
    gsap.fromTo(grid.children, 
      { autoAlpha: 0, y: 30 }, 
      {
        duration: 0.8,
        autoAlpha: 1,
        y: 0,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: grid,
          start: "top 85%"
        }
      }
    );
  });
}

export function init3DTilt() {
  if (window.VanillaTilt) {
    const cards = document.querySelectorAll('.artwork-card, .artist-card, .card, .dash-stat-card, .highlight-card');
    window.VanillaTilt.init(cards, {
      max: 10,
      speed: 400,
      glare: true,
      "max-glare": 0.15,
      perspective: 1000,
      scale: 1.02
    });
  }
}

export function initHighlightAnimations() {
  if (!window.gsap || !window.ScrollTrigger) return;
  const sliders = document.querySelectorAll('.highlight-slider:not(.gsap-animated)');
  sliders.forEach(slider => {
    slider.classList.add('gsap-animated');
    const track = slider.querySelector('.highlight-track');
    if (!track) return;
    
    // Official GSAP feeling: stagger slides entering from the right with a smooth scale back
    gsap.fromTo(track.children, 
      { autoAlpha: 0, x: 120, scale: 0.8 },
      {
        duration: 1.2,
        autoAlpha: 1,
        x: 0,
        scale: 1,
        stagger: 0.15,
        ease: "expo.out",
        scrollTrigger: {
          trigger: slider,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      }
    );
  });
}

export function observeDynamicCards() {
  const mo = new MutationObserver((mutations) => {
    let newCards = false;
    for(let m of mutations) {
      if(m.addedNodes.length > 0) newCards = true;
    }
    if(newCards) {
      init3DTilt();
      if(window.ScrollTrigger) {
        ScrollTrigger.refresh();
      }
    }
  });

  const contentGrids = document.querySelectorAll('.artwork-grid, .artist-grid, #community-feed');
  contentGrids.forEach(grid => mo.observe(grid, { childList: true, subtree: true }));
}

export function initGlobalAnimations() {
  initThreeBackground();
  initScrollAnimations();
  initHighlightAnimations();
  init3DTilt();
  observeDynamicCards();
}
