import { onMount } from "solid-js";
import { gsap } from "../lib/gsap";

export default function Hero() {
  let sectionRef!: HTMLElement;
  let taglineRef!: HTMLSpanElement;
  let headlineRef!: HTMLHeadingElement;
  let subtextRef!: HTMLParagraphElement;
  let ctaRef!: HTMLDivElement;
  let scrollRef!: HTMLDivElement;

  onMount(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.from(taglineRef, { y: 20, opacity: 0, duration: 0.8, delay: 0.5 })
      .from(
        headlineRef.querySelectorAll(".hero__word"),
        { y: 50, opacity: 0, duration: 0.7, stagger: 0.08 },
        "-=0.3"
      )
      .from(subtextRef, { y: 30, opacity: 0, duration: 0.8 }, "-=0.3")
      .from(
        ctaRef.children,
        { y: 20, opacity: 0, duration: 0.6, stagger: 0.15 },
        "-=0.4"
      )
      .from(scrollRef, { opacity: 0, duration: 0.8 }, "-=0.2");
  });

  const headline = "Engineering Connected Systems for the Real World";
  const words = headline.split(" ");

  return (
    <section ref={sectionRef} class="hero">
      <div class="hero__bg">
        <div class="hero__grid" />
        <div class="hero__glow hero__glow--1" />
        <div class="hero__glow hero__glow--2" />
      </div>

      <div class="hero__content container">
        <span ref={taglineRef} class="hero__tagline">
          HARDWARE &bull; SOFTWARE &bull; INTELLIGENCE
        </span>

        <h1 ref={headlineRef} class="hero__headline">
          {words.map((word) => (
            <span class="hero__word">{word}&nbsp;</span>
          ))}
        </h1>

        <p ref={subtextRef} class="hero__subtext">
          Focused technology products designed for automation, operational
          clarity, intelligent workflows, and scalable infrastructure.
        </p>

        <div ref={ctaRef} class="hero__cta-group">
          <a href="#about" class="hero__cta hero__cta--primary" onClick={(e) => { e.preventDefault(); document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" }); }}>
            Explore Our Work
          </a>
          <a href="#contact" class="hero__cta hero__cta--secondary" onClick={(e) => { e.preventDefault(); document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }); }}>
            Contact Us
          </a>
        </div>
      </div>

      <div ref={scrollRef} class="hero__scroll" onClick={() => document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" })}>
        <div class="hero__scroll-line" />
        <span>Scroll</span>
      </div>

      <style>{`
        .hero {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          padding-top: 80px;
        }

        .hero__bg {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .hero__grid {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(rgba(99, 102, 241, 0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99, 102, 241, 0.04) 1px, transparent 1px);
          background-size: 80px 80px;
          mask-image: radial-gradient(ellipse 70% 60% at 50% 40%, black 20%, transparent 70%);
          -webkit-mask-image: radial-gradient(ellipse 70% 60% at 50% 40%, black 20%, transparent 70%);
          animation: gridPulse 6s ease-in-out infinite;
        }

        .hero__glow {
          position: absolute;
          border-radius: 50%;
          filter: blur(100px);
        }

        .hero__glow--1 {
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(99, 102, 241, 0.12), transparent 70%);
          top: -10%;
          left: 50%;
          transform: translateX(-50%);
        }

        .hero__glow--2 {
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, rgba(45, 212, 191, 0.08), transparent 70%);
          bottom: 10%;
          right: 10%;
        }

        .hero__content {
          text-align: center;
          position: relative;
          z-index: 2;
        }

        .hero__tagline {
          display: inline-block;
          font-size: clamp(0.65rem, 1.2vw, 0.8rem);
          font-weight: 600;
          letter-spacing: 0.3em;
          color: var(--text-muted);
          margin-bottom: 1.5rem;
        }

        .hero__headline {
          font-size: clamp(2.2rem, 6vw, 4.5rem);
          font-weight: 800;
          line-height: 1.08;
          letter-spacing: -0.03em;
          color: var(--text-primary);
          margin-bottom: 1.5rem;
          max-width: 900px;
          margin-left: auto;
          margin-right: auto;
        }

        .hero__word {
          display: inline-block;
        }

        .hero__subtext {
          font-size: clamp(1rem, 1.5vw, 1.2rem);
          line-height: 1.7;
          color: var(--text-secondary);
          max-width: 600px;
          margin: 0 auto 2.5rem;
        }

        .hero__cta-group {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
        }

        .hero__cta {
          display: inline-flex;
          align-items: center;
          font-size: 0.95rem;
          font-weight: 600;
          padding: 0.85rem 2rem;
          border-radius: 10px;
          transition: all 0.35s ease;
        }

        .hero__cta--primary {
          background: linear-gradient(135deg, #4F46E5, #6366F1);
          color: white;
          box-shadow: 0 0 30px rgba(99, 102, 241, 0.2);
        }

        .hero__cta--primary:hover {
          box-shadow: 0 0 50px rgba(99, 102, 241, 0.35);
          transform: translateY(-2px);
        }

        .hero__cta--secondary {
          background: transparent;
          color: var(--text-secondary);
          border: 1px solid var(--border-subtle);
        }

        .hero__cta--secondary:hover {
          border-color: var(--text-muted);
          color: var(--text-primary);
          transform: translateY(-2px);
        }

        .hero__scroll {
          position: absolute;
          bottom: 2rem;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          cursor: pointer;
          color: var(--text-dim);
          font-size: 0.7rem;
          font-weight: 500;
          letter-spacing: 0.15em;
          text-transform: uppercase;
        }

        .hero__scroll-line {
          width: 1px;
          height: 40px;
          background: linear-gradient(to bottom, var(--text-dim), transparent);
          animation: bounceDown 2s ease-in-out infinite;
        }

        @media (max-width: 768px) {
          .hero { padding-top: 60px; }
          .hero__cta { padding: 0.75rem 1.5rem; font-size: 0.9rem; }
        }
      `}</style>
    </section>
  );
}
