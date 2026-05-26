import { onMount } from "solid-js";
import { gsap, ScrollTrigger } from "../lib/gsap";

export default function Philosophy() {
  let sectionRef!: HTMLElement;
  let headingRef!: HTMLDivElement;
  let pillarsRef!: HTMLDivElement;
  let quoteRef!: HTMLDivElement;
  let revealBarRef!: HTMLDivElement;

  onMount(() => {
    // ── Scrub-reveal on heading words ──
    const words = headingRef.querySelectorAll(".phil__word");
    gsap.from(words, {
      y: "100%",
      opacity: 0,
      duration: 1,
      stagger: 0.06,
      ease: "power4.out",
      scrollTrigger: {
        trigger: headingRef,
        start: "top 82%",
        toggleActions: "play none none none",
      },
    });

    // ── Animated reveal bar width on scroll ──
    gsap.fromTo(
      revealBarRef,
      { width: "0%" },
      {
        width: "100%",
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef,
          start: "top center",
          end: "bottom center",
          scrub: 1,
        },
      }
    );

    // ── Pillars stagger ──
    const pillars = pillarsRef.querySelectorAll(".phil__pillar");
    pillars.forEach((pillar, i) => {
      gsap.from(pillar, {
        y: 60,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        delay: i * 0.05,
        scrollTrigger: {
          trigger: pillar,
          start: "top 88%",
          toggleActions: "play none none none",
        },
      });
    });

    // ── Quote dramatic entrance ──
    gsap.from(quoteRef, {
      scale: 0.94,
      opacity: 0,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: quoteRef,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });

    // ── Quote text glow pulse ──
    const quoteText = quoteRef.querySelector(".phil__quote-text");
    if (quoteText) {
      gsap.to(quoteText, {
        textShadow: "0 0 40px rgba(99,102,241,0.35)",
        repeat: -1,
        yoyo: true,
        duration: 3,
        ease: "sine.inOut",
      });
    }

    // ── Parallax bg layers ──
    gsap.to(".phil__bg-orb--1", {
      y: -80,
      ease: "none",
      scrollTrigger: { trigger: sectionRef, start: "top bottom", end: "bottom top", scrub: true },
    });
    gsap.to(".phil__bg-orb--2", {
      y: 60,
      ease: "none",
      scrollTrigger: { trigger: sectionRef, start: "top bottom", end: "bottom top", scrub: true },
    });
  });

  const pillars = [
    {
      num: "01",
      title: "Focused",
      body: "We don't build bloated platforms. Every product is engineered around one clear purpose — nothing more, nothing less.",
      accent: "var(--accent-indigo-light)",
      bg: "rgba(99,102,241,0.06)",
      border: "rgba(99,102,241,0.18)",
    },
    {
      num: "02",
      title: "Engineered",
      body: "Precision over assumption. We analyse operational friction deeply before writing a single line of code or soldering a single component.",
      accent: "var(--accent-teal-light)",
      bg: "rgba(45,212,191,0.05)",
      border: "rgba(45,212,191,0.16)",
    },
    {
      num: "03",
      title: "Scalable",
      body: "Systems built to grow. From a single deployment to enterprise-wide rollout — architecture is never an afterthought.",
      accent: "#818CF8",
      bg: "rgba(129,140,248,0.05)",
      border: "rgba(129,140,248,0.16)",
    },
  ];

  const headlineWords = "Focused Technology. Nothing More.".split(" ");

  return (
    <section ref={sectionRef} id="philosophy" class="philosophy section">

      {/* Background */}
      <div class="phil__bg">
        <div class="phil__bg-orb phil__bg-orb--1" />
        <div class="phil__bg-orb phil__bg-orb--2" />
        <div class="phil__bg-grid" />
        <div class="phil__bg-scanline" />
      </div>

      <div class="container phil__inner">

        {/* Top label + scrub bar */}
        <div class="phil__top">
          <span class="section-label">Our Philosophy</span>
          <div ref={revealBarRef} class="phil__scrub-bar" />
        </div>

        {/* Headline with overflow clip */}
        <div ref={headingRef} class="phil__headline-wrap">
          <h2 class="phil__headline">
            {headlineWords.map((w) => (
              <span class="phil__word-wrap">
                <span class="phil__word">{w}</span>
              </span>
            ))}
          </h2>
          <p class="phil__subline">
            We believe focused systems — technology engineered around one clear purpose,
            executed with precision, scalability, and reliability — outperform everything else.
          </p>
        </div>

        {/* Pillars */}
        <div ref={pillarsRef} class="phil__pillars">
          {pillars.map((p) => (
            <div
              class="phil__pillar"
              style={{
                background: p.bg,
                border: `1px solid ${p.border}`,
              }}
            >
              <span class="phil__pillar-num" style={{ color: p.accent }}>{p.num}</span>
              <div class="phil__pillar-line" style={{ background: p.accent }} />
              <h3 class="phil__pillar-title" style={{ color: p.accent }}>{p.title}</h3>
              <p class="phil__pillar-body">{p.body}</p>
            </div>
          ))}
        </div>

        {/* Quote */}
        <div ref={quoteRef} class="phil__quote">
          <div class="phil__quote-mark">"</div>
          <blockquote class="phil__quote-text">
            Technology should reduce complexity, not create it.
          </blockquote>
          <div class="phil__quote-footer">
            <span class="phil__quote-dash">—</span>
            <span class="phil__quote-attr">Y2kSaaS Core Principle</span>
          </div>
          <div class="phil__quote-glow" />
        </div>

        {/* Bottom manifesto strip */}
        <div class="phil__manifesto">
          {["Identify Friction", "Engineer Clarity", "Scale the Solution", "Repeat"].map((item, i) => (
            <>
              <span class="phil__manifesto-item">{item}</span>
              {i < 3 && <span class="phil__manifesto-sep">→</span>}
            </>
          ))}
        </div>

      </div>

      <style>{`
        .philosophy {
          position: relative;
          overflow: hidden;
          background: linear-gradient(180deg, transparent 0%, rgba(99,102,241,0.02) 50%, transparent 100%);
        }

        /* ── Background ── */
        .phil__bg {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
        }

        .phil__bg-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(120px);
        }

        .phil__bg-orb--1 {
          width: 700px; height: 700px;
          background: radial-gradient(circle, rgba(99,102,241,0.08), transparent 60%);
          top: -20%; left: -15%;
        }

        .phil__bg-orb--2 {
          width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(45,212,191,0.05), transparent 60%);
          bottom: -10%; right: -10%;
        }

        .phil__bg-grid {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(rgba(99,102,241,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99,102,241,0.025) 1px, transparent 1px);
          background-size: 80px 80px;
          mask-image: radial-gradient(ellipse 90% 80% at 50% 50%, black, transparent);
          -webkit-mask-image: radial-gradient(ellipse 90% 80% at 50% 50%, black, transparent);
        }

        .phil__bg-scanline {
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(99,102,241,0.012) 2px,
            rgba(99,102,241,0.012) 4px
          );
          pointer-events: none;
        }

        /* ── Inner ── */
        .phil__inner {
          position: relative;
          z-index: 2;
          max-width: 1100px;
        }

        /* ── Top ── */
        .phil__top {
          display: flex;
          align-items: center;
          gap: 2rem;
          margin-bottom: 3rem;
        }

        .phil__scrub-bar {
          height: 1px;
          flex: 1;
          background: linear-gradient(90deg, var(--accent-indigo-light), var(--accent-teal-light));
          opacity: 0.5;
          border-radius: 1px;
        }

        /* ── Headline ── */
        .phil__headline-wrap {
          margin-bottom: 4rem;
        }

        .phil__headline {
          font-size: clamp(2.8rem, 7vw, 5.5rem);
          font-weight: 800;
          line-height: 1.05;
          letter-spacing: -0.04em;
          color: var(--text-primary);
          margin-bottom: 1.5rem;
          display: flex;
          flex-wrap: wrap;
          gap: 0.3em;
        }

        .phil__word-wrap {
          overflow: hidden;
          display: inline-block;
          line-height: 1.1;
        }

        .phil__word {
          display: inline-block;
        }

        .phil__subline {
          font-size: clamp(1rem, 1.6vw, 1.2rem);
          line-height: 1.75;
          color: var(--text-secondary);
          max-width: 680px;
        }

        /* ── Pillars ── */
        .phil__pillars {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
          margin-bottom: 4rem;
        }

        .phil__pillar {
          border-radius: 20px;
          padding: 2rem;
          position: relative;
          overflow: hidden;
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          transition: transform 0.4s var(--ease-out-expo), box-shadow 0.4s ease;
        }

        .phil__pillar:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 60px rgba(0,0,0,0.2);
        }

        .phil__pillar-num {
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          display: block;
          margin-bottom: 1rem;
          font-variant-numeric: tabular-nums;
        }

        .phil__pillar-line {
          width: 32px;
          height: 2px;
          border-radius: 1px;
          margin-bottom: 1rem;
          opacity: 0.7;
          transition: width 0.4s var(--ease-out-expo);
        }

        .phil__pillar:hover .phil__pillar-line {
          width: 60px;
        }

        .phil__pillar-title {
          font-size: 1.5rem;
          font-weight: 700;
          letter-spacing: -0.02em;
          margin-bottom: 0.75rem;
        }

        .phil__pillar-body {
          font-size: 0.9rem;
          line-height: 1.7;
          color: var(--text-muted);
        }

        /* ── Quote ── */
        .phil__quote {
          position: relative;
          padding: 3.5rem 4rem;
          border-radius: 24px;
          background: rgba(99,102,241,0.04);
          border: 1px solid rgba(99,102,241,0.14);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          overflow: hidden;
          margin-bottom: 3rem;
          text-align: center;
        }

        .phil__quote::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 24px;
          padding: 1px;
          background: linear-gradient(135deg, rgba(99,102,241,0.3), rgba(45,212,191,0.2), transparent 60%);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
        }

        .phil__quote-glow {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 60% 40% at 50% 50%, rgba(99,102,241,0.07), transparent);
          pointer-events: none;
        }

        .phil__quote-mark {
          font-size: 8rem;
          line-height: 0.5;
          color: rgba(99,102,241,0.15);
          font-family: Georgia, serif;
          user-select: none;
          margin-bottom: 1.5rem;
        }

        .phil__quote-text {
          font-size: clamp(1.4rem, 3vw, 2.2rem);
          font-weight: 700;
          font-style: normal;
          color: var(--text-primary);
          line-height: 1.3;
          letter-spacing: -0.02em;
          position: relative;
          z-index: 1;
          max-width: 700px;
          margin: 0 auto 1.5rem;
        }

        .phil__quote-footer {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }

        .phil__quote-dash {
          color: var(--accent-indigo-light);
          font-size: 1.2rem;
        }

        .phil__quote-attr {
          font-size: 0.8rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--text-dim);
        }

        /* ── Manifesto strip ── */
        .phil__manifesto {
          display: flex;
          align-items: center;
          gap: 1rem;
          flex-wrap: wrap;
          padding: 1.25rem 2rem;
          border-radius: 12px;
          background: rgba(255,255,255,0.02);
          border: 1px solid var(--border-subtle);
        }

        .phil__manifesto-item {
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--text-muted);
        }

        .phil__manifesto-sep {
          color: var(--accent-indigo-light);
          font-size: 0.9rem;
          opacity: 0.6;
        }

        @media (max-width: 900px) {
          .phil__pillars { grid-template-columns: 1fr; gap: 1rem; }
          .phil__quote { padding: 2.5rem 2rem; }
          .phil__quote-mark { font-size: 6rem; }
          .phil__manifesto { justify-content: center; }
        }

        @media (max-width: 600px) {
          .phil__headline { font-size: clamp(2.2rem, 8vw, 3rem); }
          .phil__quote { padding: 2rem 1.5rem; }
        }
      `}</style>
    </section>
  );
}
