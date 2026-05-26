import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

declare module "solid-js" {
  namespace JSX {
    interface Directives {
      fadeUp: true;
      fadeIn: true;
      slideLeft: true;
      slideRight: true;
      staggerUp: true;
      parallax: number;
      countUp: number;
      scaleIn: true;
    }
  }
}

export function fadeUp(el: Element) {
  gsap.from(el, {
    y: 60,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: el,
      start: "top 88%",
      toggleActions: "play none none none",
    },
  });
}

export function fadeIn(el: Element) {
  gsap.from(el, {
    opacity: 0,
    duration: 1.2,
    ease: "power2.out",
    scrollTrigger: {
      trigger: el,
      start: "top 90%",
      toggleActions: "play none none none",
    },
  });
}

export function slideLeft(el: Element) {
  gsap.from(el, {
    x: -80,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: el,
      start: "top 85%",
      toggleActions: "play none none none",
    },
  });
}

export function slideRight(el: Element) {
  gsap.from(el, {
    x: 80,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: el,
      start: "top 85%",
      toggleActions: "play none none none",
    },
  });
}

export function staggerUp(el: Element) {
  requestAnimationFrame(() => {
    const children = Array.from(el.children);
    if (!children.length) return;
    gsap.from(children, {
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: "power3.out",
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });
  });
}

export function scaleIn(el: Element) {
  gsap.from(el, {
    scale: 0.85,
    opacity: 0,
    duration: 0.9,
    ease: "power3.out",
    scrollTrigger: {
      trigger: el,
      start: "top 88%",
      toggleActions: "play none none none",
    },
  });
}

export function parallax(el: Element, accessor: () => number) {
  const speed = accessor();
  gsap.to(el, {
    y: () => speed * 100,
    ease: "none",
    scrollTrigger: {
      trigger: el,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
    },
  });
}

export function countUp(el: Element, accessor: () => number) {
  const target = accessor();
  const obj = { val: 0 };
  gsap.to(obj, {
    val: target,
    duration: 2,
    ease: "power2.out",
    scrollTrigger: {
      trigger: el,
      start: "top 85%",
      toggleActions: "play none none none",
    },
    onUpdate: () => {
      el.textContent = Math.round(obj.val).toString();
    },
  });
}

export { gsap, ScrollTrigger };
