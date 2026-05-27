import { onMount } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { gsap } from "../lib/gsap";

/* ── System topology schematic ─────────────────────────────────── */

function SystemTopology() {
  return (
    <svg
      class="hero-topo"
      viewBox="0 0 280 372"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Y2kSaaS system topology: Hardware, Software, and Intelligence layers connected as one integrated system"
    >
      {/* Node: HARDWARE */}
      <rect class="topo-node" x="0" y="0" width="256" height="82" rx="2" />
      <line class="topo-node-edge" x1="0" y1="0" x2="256" y2="0" />
      <text class="topo-label" x="18" y="28">HARDWARE</text>
      <text class="topo-sub" x="18" y="48">Embedded · IoT · Remote Device</text>
      <circle class="topo-dot topo-dot--on" cx="230" cy="30" r="3" />
      <circle class="topo-dot topo-dot--on" cx="244" cy="30" r="3" />
      <circle class="topo-dot" cx="230" cy="50" r="3" />
      <circle class="topo-dot topo-dot--on" cx="244" cy="50" r="3" />

      {/* Connector H → S */}
      <line class="topo-conn" x1="128" y1="82" x2="128" y2="134" />
      <path class="topo-arrow" d="M123 128 L128 136 L133 128" />

      {/* Node: SOFTWARE */}
      <rect class="topo-node" x="0" y="138" width="256" height="82" rx="2" />
      <line class="topo-node-edge" x1="0" y1="138" x2="256" y2="138" />
      <text class="topo-label" x="18" y="166">SOFTWARE</text>
      <text class="topo-sub" x="18" y="186">SaaS Platform · API · Infrastructure</text>
      <circle class="topo-dot topo-dot--on" cx="230" cy="168" r="3" />
      <circle class="topo-dot topo-dot--on" cx="244" cy="168" r="3" />
      <circle class="topo-dot topo-dot--on" cx="230" cy="188" r="3" />
      <circle class="topo-dot" cx="244" cy="188" r="3" />

      {/* Connector S → I */}
      <line class="topo-conn" x1="128" y1="220" x2="128" y2="272" />
      <path class="topo-arrow" d="M123 266 L128 274 L133 266" />

      {/* Node: INTELLIGENCE */}
      <rect class="topo-node" x="0" y="276" width="256" height="82" rx="2" />
      <line class="topo-node-edge" x1="0" y1="276" x2="256" y2="276" />
      <text class="topo-label" x="18" y="304">INTELLIGENCE</text>
      <text class="topo-sub" x="18" y="324">Automation · Analytics · Workflows</text>
      <circle class="topo-dot" cx="230" cy="306" r="3" />
      <circle class="topo-dot topo-dot--on" cx="244" cy="306" r="3" />
      <circle class="topo-dot topo-dot--on" cx="230" cy="326" r="3" />
      <circle class="topo-dot topo-dot--on" cx="244" cy="326" r="3" />

      {/* Right rail: system bus */}
      <line class="topo-rail" x1="270" y1="4" x2="270" y2="354" />
      <circle class="topo-rail-node" cx="270" cy="41" r="2.5" />
      <circle class="topo-rail-node" cx="270" cy="179" r="2.5" />
      <circle class="topo-rail-node" cx="270" cy="317" r="2.5" />

      {/* Rail connectors to nodes */}
      <line class="topo-rail-tap" x1="256" y1="41" x2="270" y2="41" />
      <line class="topo-rail-tap" x1="256" y1="179" x2="270" y2="179" />
      <line class="topo-rail-tap" x1="256" y1="317" x2="270" y2="317" />
    </svg>
  );
}

/* ── Arrow icon ────────────────────────────────────────────────── */

function ArrowRight() {
  return (
    <svg
      class="hero-link__arrow"
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

/* ── Hero ──────────────────────────────────────────────────────── */

export default function Hero() {
  const navigate = useNavigate();

  let categoryRef!: HTMLParagraphElement;
  let line1Ref!: HTMLSpanElement;
  let line2Ref!: HTMLSpanElement;
  let bodyRef!: HTMLParagraphElement;
  let actionsRef!: HTMLDivElement;
  let statusRef!: HTMLParagraphElement;
  let schematicRef!: HTMLElement;

  onMount(() => {
    const ease = "expo.out";

    // Set initial hidden state — prevents flash before JS animation starts
    gsap.set([categoryRef, line1Ref, line2Ref, bodyRef, actionsRef, statusRef], {
      opacity: 0,
      y: 14,
    });
    gsap.set(schematicRef, { opacity: 0 });

    const tl = gsap.timeline();

    // Progressive sequential reveal — weight-aware, no scale, no bounce
    tl
      .to(categoryRef, { opacity: 1, y: 0, duration: 0.5,  ease }, 0.35)
      .to(line1Ref,    { opacity: 1, y: 0, duration: 0.65, ease }, 0.55)
      .to(line2Ref,    { opacity: 1, y: 0, duration: 0.65, ease }, 0.70)
      .to(bodyRef,     { opacity: 1, y: 0, duration: 0.65, ease }, 0.96)
      .to(actionsRef,  { opacity: 1, y: 0, duration: 0.55, ease }, 1.13)
      .to(statusRef,   { opacity: 1, y: 0, duration: 0.5,  ease }, 1.30)
      // Schematic reveals slower — it's secondary context, not primary content
      .to(schematicRef, { opacity: 1, duration: 1.4, ease: "power2.out" }, 0.7);
  });

  const goDemo = (e: MouseEvent) => { e.preventDefault(); navigate("/demo"); };
  const goTalk = (e: MouseEvent) => { e.preventDefault(); navigate("/talk"); };

  return (
    <section class="hero">
      {/* Subtle structural grid — not animated, not glowing */}
      <div class="hero-texture" aria-hidden="true" />

      <div class="container hero-layout">

        {/* ── Left: editorial content ── */}
        <div class="hero-content">

          <p ref={categoryRef} class="hero-category">
            Systems Engineering Company
          </p>

          <h1 class="hero-headline">
            <span ref={line1Ref} class="hero-line hero-line--1">
              Hardware. Software.
            </span>
            <span ref={line2Ref} class="hero-line hero-line--2">
              Engineered as one.
            </span>
          </h1>

          <p ref={bodyRef} class="hero-body">
            Y2kSaaS engineers hardware and software as a single integrated
            system: embedded infrastructure, scalable cloud platforms, and
            intelligent automation for industries where reliability is the
            baseline requirement.
          </p>

          <div ref={actionsRef} class="hero-actions">
            <a
              class="hero-btn"
              href="/demo"
              onClick={goDemo}
            >
              Request a Demo
            </a>
            <a
              class="hero-link"
              href="/talk"
              onClick={goTalk}
            >
              Talk to an engineer
              <ArrowRight />
            </a>
          </div>

          <p ref={statusRef} class="hero-status">
            <span class="hero-status__dot" role="img" aria-label="Operational" />
            <span>Systems operational</span>
            <span class="hero-status__sep" aria-hidden="true">·</span>
            <span>hardware + software + intelligence</span>
          </p>

        </div>

        {/* ── Right: system topology schematic ── */}
        <aside
          ref={schematicRef}
          class="hero-schematic"
          aria-hidden="true"
        >
          <SystemTopology />
        </aside>

      </div>

      <style>{`
        /* ── Section ─────────────────────────────────────────────── */

        .hero {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          overflow: hidden;
          padding-top: 72px; /* navbar clearance */
        }

        /* Structural grid texture — static, no animation */
        .hero-texture {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background-image:
            linear-gradient(oklch(0.56 0.21 264 / 0.025) 1px, transparent 1px),
            linear-gradient(90deg, oklch(0.56 0.21 264 / 0.025) 1px, transparent 1px);
          background-size: 64px 64px;
          mask-image: radial-gradient(
            ellipse 80% 70% at 20% 50%,
            oklch(0 0 0) 0%,
            transparent 70%
          );
          -webkit-mask-image: radial-gradient(
            ellipse 80% 70% at 20% 50%,
            oklch(0 0 0) 0%,
            transparent 70%
          );
        }

        /* ── Two-column layout ───────────────────────────────────── */

        .hero-layout {
          display: grid;
          grid-template-columns: 1fr 320px;
          gap: clamp(3rem, 7vw, 7rem);
          align-items: center;
          padding-top: clamp(80px, 14vh, 140px);
          padding-bottom: clamp(64px, 10vh, 100px);
          position: relative;
          z-index: 1;
        }

        /* ── Category label ──────────────────────────────────────── */

        .hero-category {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 0.72rem;
          font-weight: 500;
          letter-spacing: 0.07em;
          color: var(--text-muted);
          margin-bottom: 1.75rem;
          font-variant-numeric: tabular-nums;
          font-feature-settings: "ss01" 1;
        }

        .hero-category::before {
          content: '';
          display: block;
          width: 20px;
          height: 1px;
          background: var(--text-dim);
          flex-shrink: 0;
        }

        /* ── Headline ─────────────────────────────────────────────── */

        .hero-headline {
          display: flex;
          flex-direction: column;
          margin-bottom: 1.75rem;
        }

        .hero-line {
          display: block;
          font-size: clamp(2.6rem, 5.2vw, 4rem);
          font-weight: 700;
          letter-spacing: -0.035em;
          line-height: 1.04;
        }

        /* First line: secondary weight — sets up the second line */
        .hero-line--1 {
          color: var(--text-secondary);
        }

        /* Second line: primary — the declaration */
        .hero-line--2 {
          color: var(--text-primary);
        }

        /* ── Body copy ────────────────────────────────────────────── */

        .hero-body {
          font-size: clamp(0.95rem, 1.35vw, 1.05rem);
          line-height: 1.65;
          color: var(--text-muted);
          max-width: 58ch;
          margin-bottom: 2.25rem;
        }

        /* ── Actions ─────────────────────────────────────────────── */

        .hero-actions {
          display: flex;
          align-items: center;
          gap: 1.75rem;
          flex-wrap: wrap;
          margin-bottom: 2.25rem;
        }

        /* Primary CTA — solid indigo fill, no gradient */
        .hero-btn {
          display: inline-flex;
          align-items: center;
          padding: 0.65rem 1.5rem;
          font-size: 0.875rem;
          font-weight: 600;
          color: oklch(0.96 0.006 265);
          background: var(--accent-indigo-light);
          border-radius: 3px;
          transition:
            opacity  160ms var(--ease-expo),
            transform 160ms var(--ease-expo);
          white-space: nowrap;
        }

        .hero-btn:hover {
          opacity: 0.88;
        }

        /* Active feedback — Emil's rule: every pressable element must respond */
        .hero-btn:active {
          transform: scale(0.97);
        }

        /* Ghost secondary — text link with arrow */
        .hero-link {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--text-muted);
          transition:
            color    160ms var(--ease-expo),
            transform 160ms var(--ease-expo);
          white-space: nowrap;
        }

        .hero-link:hover {
          color: var(--text-secondary);
        }

        .hero-link:active {
          transform: scale(0.98);
        }

        .hero-link__arrow {
          display: inline-block;
          flex-shrink: 0;
          transition: transform 160ms var(--ease-expo);
        }

        .hero-link:hover .hero-link__arrow {
          transform: translateX(3px);
        }

        /* ── Status line ─────────────────────────────────────────── */

        .hero-status {
          display: flex;
          align-items: center;
          gap: 0.55rem;
          font-size: 0.7rem;
          font-weight: 400;
          color: var(--text-dim);
          font-variant-numeric: tabular-nums;
          font-feature-settings: "ss01" 1;
        }

        .hero-status__dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--accent-teal-light);
          flex-shrink: 0;
          position: relative;
        }

        /* Pulse ring — teal, subtle, single loop */
        .hero-status__dot::after {
          content: '';
          position: absolute;
          inset: -2px;
          border-radius: 50%;
          background: var(--accent-teal-light);
          opacity: 0.35;
          animation: pulseRing 2.8s var(--ease-expo) infinite;
        }

        .hero-status__sep {
          opacity: 0.3;
          user-select: none;
        }

        /* ── Schematic ───────────────────────────────────────────── */

        .hero-schematic {
          display: flex;
          align-items: center;
          justify-content: flex-end;
        }

        .hero-topo {
          width: 100%;
          max-width: 280px;
        }

        /* SVG node styles — OKLCH via currentColor and CSS vars */
        .topo-node {
          fill: var(--bg-secondary);
          stroke: var(--border-moderate);
          stroke-width: 1;
        }

        /* Top edge highlight — physically motivated surface edge */
        .topo-node-edge {
          stroke: oklch(0.96 0.006 265 / 0.18);
          stroke-width: 1;
        }

        .topo-label {
          font-family: var(--font-mono);
          font-size: 9.5px;
          font-weight: 600;
          fill: var(--text-secondary);
          letter-spacing: 0.1em;
        }

        .topo-sub {
          font-family: var(--font-sans);
          font-size: 8.5px;
          fill: var(--text-dim);
          letter-spacing: 0.02em;
        }

        .topo-dot {
          fill: var(--text-dim);
        }

        .topo-dot--on {
          fill: var(--accent-teal-light);
        }

        .topo-conn {
          stroke: var(--border-subtle);
          stroke-width: 1;
          stroke-dasharray: 3 3;
        }

        .topo-arrow {
          fill: oklch(0.56 0.21 264 / 0.45);
          stroke: none;
        }

        .topo-rail {
          stroke: oklch(0.56 0.21 264 / 0.25);
          stroke-width: 1;
        }

        .topo-rail-node {
          fill: oklch(0.56 0.21 264 / 0.55);
        }

        .topo-rail-tap {
          stroke: oklch(0.56 0.21 264 / 0.18);
          stroke-width: 1;
        }

        /* ── Responsive ──────────────────────────────────────────── */

        @media (max-width: 960px) {
          .hero-layout {
            grid-template-columns: 1fr;
            gap: 3rem;
          }

          .hero-schematic {
            justify-content: flex-start;
            opacity: 0.65;
          }

          .hero-topo {
            max-width: 220px;
          }

          .hero-line {
            font-size: clamp(2.2rem, 7.5vw, 3rem);
          }

          .hero-body {
            max-width: 100%;
          }
        }

        @media (max-width: 600px) {
          .hero-actions {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }

          .hero-schematic {
            display: none;
          }
        }

        /* Respect reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .hero-status__dot::after {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
