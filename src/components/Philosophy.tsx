import { onMount } from "solid-js";
import { gsap, fadeUp } from "../lib/gsap";

const _directives: unknown[] = [fadeUp];
void _directives;

const pillars = [
  {
    num: "01",
    title: "Focused",
    body: "We don't build bloated platforms. Every product is engineered around one clear purpose, nothing more, nothing less.",
    accent: "var(--accent-indigo-light)",
    border: "var(--border-moderate)",
  },
  {
    num: "02",
    title: "Engineered",
    body: "Precision over assumption. We analyse operational friction deeply before writing a single line of code or soldering a single component.",
    accent: "var(--accent-teal-light)",
    border: "var(--border-moderate)",
  },
  {
    num: "03",
    title: "Scalable",
    body: "Systems built to grow. From a single deployment to enterprise-wide rollout, architecture is never an afterthought.",
    accent: "oklch(0.64 0.15 275)",
    border: "var(--border-moderate)",
  },
];

export default function Philosophy() {
  let sectionRef!: HTMLElement;
  let headingRef!: HTMLDivElement;
  let pillarsRef!: HTMLDivElement;
  let quoteRef!: HTMLDivElement;
  let scrubBarRef!: HTMLDivElement;

  onMount(() => {
    // Scrub progress bar — purposeful: shows reading progress through the section
    gsap.fromTo(
      scrubBarRef,
      { scaleX: 0 },
      {
        scaleX: 1,
        transformOrigin: "left",
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef,
          start: "top center",
          end: "bottom center",
          scrub: 1,
        },
      }
    );

    // Headline lines — opacity + y, no scale, expo.out
    const lines = headingRef.querySelectorAll(".phil-line");
    gsap.from(lines, {
      opacity: 0,
      y: 16,
      duration: 0.7,
      stagger: 0.1,
      ease: "expo.out",
      scrollTrigger: {
        trigger: headingRef,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });

    // Pillars stagger
    const pillarsEl = pillarsRef.querySelectorAll(".phil-pillar");
    pillarsEl.forEach((p, i) => {
      gsap.from(p, {
        opacity: 0,
        y: 14,
        duration: 0.65,
        ease: "expo.out",
        delay: i * 0.06,
        scrollTrigger: {
          trigger: p,
          start: "top 89%",
          toggleActions: "play none none none",
        },
      });
    });

    // Quote — simple opacity entry, no scale pop
    gsap.from(quoteRef, {
      opacity: 0,
      y: 16,
      duration: 0.8,
      ease: "expo.out",
      scrollTrigger: {
        trigger: quoteRef,
        start: "top 86%",
        toggleActions: "play none none none",
      },
    });
  });

  return (
    <section ref={sectionRef} id="philosophy" class="section philosophy">

      {/* Static grid texture — scoped to this section */}
      <div class="phil-texture" aria-hidden="true" />

      <div class="container phil-inner">

        {/* Header with scrub progress */}
        <div class="phil-top" use:fadeUp>
          <p class="phil-top__label">Our Philosophy</p>
          <div class="phil-top__track">
            <div ref={scrubBarRef} class="phil-top__bar" />
          </div>
        </div>

        {/* Headline */}
        <div ref={headingRef} class="phil-headline-wrap">
          <h2 class="phil-headline">
            <span class="phil-line phil-line--1">Focused Technology.</span>
            <span class="phil-line phil-line--2">Nothing More.</span>
          </h2>
          <p class="phil-subline">
            We believe focused systems outperform everything else: technology
            engineered around one clear purpose, executed with precision,
            scalability, and reliability.
          </p>
        </div>

        {/* Pillars — sharp borders, no glass, no backdrop-filter */}
        <div ref={pillarsRef} class="phil-pillars">
          {pillars.map((p) => (
            <div class="phil-pillar">
              <div class="phil-pillar__top-edge" style={{ background: p.accent }} />
              <span class="phil-pillar__num" style={{ color: p.accent }}>{p.num}</span>
              <h3 class="phil-pillar__title">{p.title}</h3>
              <p class="phil-pillar__body">{p.body}</p>
            </div>
          ))}
        </div>

        {/* Quote — editorial, no glass, no glow pulse, no em-dash */}
        <div ref={quoteRef} class="phil-quote">
          <p class="phil-quote__text">
            Technology should reduce complexity, not create it.
          </p>
          <p class="phil-quote__attr">
            <span class="phil-quote__dash" aria-hidden="true">-</span>
            Y2kSaaS Core Principle
          </p>
        </div>

        {/* Process manifesto — plain text row */}
        <div class="phil-process" use:fadeUp>
          {["Identify Friction", "Engineer Clarity", "Scale the Solution", "Repeat"].map((step, i, arr) => (
            <>
              <span class="phil-process__step">{step}</span>
              {i < arr.length - 1 && (
                <span class="phil-process__sep" aria-hidden="true">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </span>
              )}
            </>
          ))}
        </div>

      </div>

      <style>{`
        .philosophy {
          position: relative;
          overflow: hidden;
          background: var(--bg-primary); /* base — no gradient tint */
        }

        .phil-texture {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(oklch(0.56 0.21 264 / 0.02) 1px, transparent 1px),
            linear-gradient(90deg, oklch(0.56 0.21 264 / 0.02) 1px, transparent 1px);
          background-size: 72px 72px;
          mask-image: radial-gradient(ellipse 80% 70% at 30% 50%, oklch(0 0 0), transparent 70%);
          -webkit-mask-image: radial-gradient(ellipse 80% 70% at 30% 50%, oklch(0 0 0), transparent 70%);
          pointer-events: none;
        }

        .phil-inner {
          position: relative;
          z-index: 2;
          max-width: 1000px;
        }

        /* ── Header ── */
        .phil-top {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          margin-bottom: 3rem;
        }

        .phil-top__label {
          font-size: 0.72rem;
          font-weight: 500;
          letter-spacing: 0.07em;
          color: var(--text-muted);
          white-space: nowrap;
        }

        .phil-top__track {
          flex: 1;
          height: 1px;
          background: var(--border-subtle);
          overflow: hidden;
        }

        .phil-top__bar {
          height: 100%;
          background: var(--accent-indigo-light);
          width: 100%;
          transform-origin: left;
          opacity: 0.5;
        }

        /* ── Headline ── */
        .phil-headline-wrap {
          margin-bottom: 3.5rem;
        }

        .phil-headline {
          display: flex;
          flex-direction: column;
          margin-bottom: 1.25rem;
        }

        .phil-line {
          display: block;
          font-size: clamp(2.6rem, 5.5vw, 4.2rem);
          font-weight: 700;
          letter-spacing: -0.035em;
          line-height: 1.04;
        }

        .phil-line--1 {
          color: var(--text-secondary);
        }

        .phil-line--2 {
          color: var(--text-primary);
        }

        .phil-subline {
          font-size: clamp(0.95rem, 1.35vw, 1.05rem);
          line-height: 1.65;
          color: var(--text-muted);
          max-width: 56ch;
        }

        /* ── Pillars — no glass, no backdrop-filter, sharp radii ── */
        .phil-pillars {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1px; /* gap via borders, not margin */
          border: 1px solid var(--border-subtle);
          border-radius: 3px;
          overflow: hidden;
          margin-bottom: 3.5rem;
        }

        .phil-pillar {
          position: relative;
          padding: 2rem 1.75rem;
          background: var(--bg-card);
          transition: background 200ms var(--ease-expo);
        }

        /* Right border between pillars via box-shadow within the gap */
        .phil-pillar:not(:last-child) {
          border-right: 1px solid var(--border-subtle);
        }

        .phil-pillar:hover {
          background: var(--bg-secondary);
        }

        /* Top accent line — NOT a side-stripe, it's a top edge */
        .phil-pillar__top-edge {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          opacity: 0.6;
        }

        .phil-pillar__num {
          display: block;
          font-family: var(--font-mono);
          font-size: 0.68rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          margin-bottom: 1.25rem;
          font-variant-numeric: tabular-nums;
        }

        .phil-pillar__title {
          font-size: 1.2rem;
          font-weight: 700;
          letter-spacing: -0.02em;
          color: var(--text-primary);
          margin-bottom: 0.75rem;
        }

        .phil-pillar__body {
          font-size: 0.875rem;
          line-height: 1.65;
          color: var(--text-muted);
        }

        /* ── Quote — editorial, no glass, no glow ── */
        .phil-quote {
          padding: 2.5rem 3rem;
          border: 1px solid var(--border-moderate);
          border-radius: 3px;
          margin-bottom: 3rem;
          background: var(--bg-card);
          position: relative;
        }

        /* Single top-edge accent line — physically motivated */
        .phil-quote::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: var(--accent-indigo-light);
          opacity: 0.4;
          border-radius: 3px 3px 0 0;
        }

        .phil-quote__text {
          font-size: clamp(1.2rem, 2.5vw, 1.8rem);
          font-weight: 600;
          line-height: 1.3;
          letter-spacing: -0.02em;
          color: var(--text-primary);
          margin-bottom: 1rem;
          max-width: 58ch;
        }

        .phil-quote__attr {
          font-size: 0.72rem;
          font-weight: 500;
          letter-spacing: 0.07em;
          color: var(--text-dim);
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }

        .phil-quote__dash {
          color: var(--text-dim);
        }

        /* ── Process strip ── */
        .phil-process {
          display: flex;
          align-items: center;
          gap: 1rem;
          flex-wrap: wrap;
          padding: 1rem 1.5rem;
          border: 1px solid var(--border-subtle);
          border-radius: 2px;
        }

        .phil-process__step {
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--text-muted);
        }

        .phil-process__sep {
          color: var(--text-dim);
          display: flex;
          align-items: center;
          opacity: 0.5;
        }

        .phil-process__sep svg {
          display: inline-block;
        }

        @media (max-width: 860px) {
          .phil-pillars {
            grid-template-columns: 1fr;
          }

          .phil-pillar:not(:last-child) {
            border-right: none;
            border-bottom: 1px solid var(--border-subtle);
          }

          .phil-quote {
            padding: 2rem 1.75rem;
          }

          .phil-process {
            justify-content: center;
          }
        }

        @media (max-width: 600px) {
          .phil-line { font-size: clamp(2rem, 8vw, 2.6rem); }
        }

        @media (prefers-reduced-motion: reduce) {
          .phil-top__bar { transform: none; }
        }
      `}</style>
    </section>
  );
}
