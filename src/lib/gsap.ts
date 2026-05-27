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

const ease = "expo.out";

export function fadeUp(el: Element) {
  gsap.from(el, {
    y: 16,
    opacity: 0,
    duration: 0.75,
    ease,
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
    duration: 0.9,
    ease,
    scrollTrigger: {
      trigger: el,
      start: "top 90%",
      toggleActions: "play none none none",
    },
  });
}

export function slideLeft(el: Element) {
  gsap.from(el, {
    x: -32,
    opacity: 0,
    duration: 0.8,
    ease,
    scrollTrigger: {
      trigger: el,
      start: "top 86%",
      toggleActions: "play none none none",
    },
  });
}

export function slideRight(el: Element) {
  gsap.from(el, {
    x: 32,
    opacity: 0,
    duration: 0.8,
    ease,
    scrollTrigger: {
      trigger: el,
      start: "top 86%",
      toggleActions: "play none none none",
    },
  });
}

export function staggerUp(el: Element) {
  requestAnimationFrame(() => {
    const children = Array.from(el.children);
    if (!children.length) return;
    gsap.from(children, {
      y: 14,
      opacity: 0,
      duration: 0.7,
      stagger: 0.07,
      ease,
      scrollTrigger: {
        trigger: el,
        start: "top 86%",
        toggleActions: "play none none none",
      },
    });
  });
}

export function scaleIn(el: Element) {
  gsap.from(el, {
    scale: 0.97,
    opacity: 0,
    duration: 0.75,
    ease,
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
    y: () => speed * 80,
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
    duration: 1.6,
    ease,
    scrollTrigger: {
      trigger: el,
      start: "top 86%",
      toggleActions: "play none none none",
    },
    onUpdate: () => {
      el.textContent = Math.round(obj.val).toString();
    },
  });
}

export { gsap, ScrollTrigger };
