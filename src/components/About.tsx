import { onMount } from "solid-js";
import { gsap, slideLeft, slideRight, fadeUp } from "../lib/gsap";
import Logo from "./Logo";

const _directives: unknown[] = [slideLeft, slideRight, fadeUp];
void _directives;

const capabilities = [
  "Embedded systems",
  "IoT infrastructure",
  "Cloud platforms",
  "SaaS applications",
  "Automation pipelines",
  "Remote device management",
  "Industrial monitoring",
  "Intelligent workflows",
];

export default function About() {
  let logoWrapRef!: HTMLDivElement;

  onMount(() => {
    // Single purposeful entrance — no loops, no float, no elastic
    gsap.from(logoWrapRef, {
      opacity: 0,
      y: 16,
      duration: 0.9,
      ease: "expo.out",
      scrollTrigger: {
        trigger: logoWrapRef,
        start: "top 86%",
        toggleActions: "play none none none",
      },
    });
  });

  return (
    <section id="about" class="section about">
      <div class="container">
        <div class="about__grid">

          {/* Left: text */}
          <div class="about__text" use:slideLeft>
            <p class="about__category">About Y2kSaaS</p>
            <h2 class="about__heading">
              Built around problems.<br />Engineered for scale.
            </h2>
            <p class="about__body">
              Y2kSaaS is a technology engineering company focused on building
              connected hardware and software systems for operational environments
              where reliability is the baseline, not the goal.
            </p>
            <p class="about__body">
              We develop scalable platforms, intelligent automation tools, embedded
              systems, and infrastructure technologies designed to solve specific
              real-world problems with precision and long-term maintainability.
            </p>

            {/* Capability domains — replaces the banned hero-metric stats template */}
            <div class="about__domains" use:fadeUp>
              {capabilities.map((cap) => (
                <span class="about__domain">{cap}</span>
              ))}
            </div>
          </div>

          {/* Right: brand mark — static, confident, weight-aware entrance */}
          <div class="about__visual" use:slideRight>
            <div ref={logoWrapRef} class="about__mark">
              <Logo size={240} variant="icon" animate={false} />
            </div>
          </div>

        </div>
      </div>

      <style>{`
        .about {
          background: var(--bg-secondary); /* subtle surface elevation */
        }

        .about__grid {
          display: grid;
          grid-template-columns: 1fr 300px;
          gap: clamp(3rem, 6vw, 6rem);
          align-items: center;
        }

        .about__category {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 0.72rem;
          font-weight: 500;
          letter-spacing: 0.07em;
          color: var(--text-muted);
          margin-bottom: 1.5rem;
        }

        .about__category::before {
          content: '';
          display: block;
          width: 18px;
          height: 1px;
          background: var(--text-dim);
          flex-shrink: 0;
        }

        .about__heading {
          font-size: clamp(1.8rem, 3.5vw, 2.8rem);
          font-weight: 700;
          line-height: 1.1;
          letter-spacing: -0.025em;
          color: var(--text-primary);
          margin-bottom: 1.5rem;
        }

        .about__body {
          font-size: 0.95rem;
          line-height: 1.65;
          color: var(--text-muted);
          max-width: 58ch;
          margin-bottom: 1rem;
        }

        .about__body:last-of-type {
          margin-bottom: 2rem;
        }

        /* Capability domains — plain taxonomy, no decorative boxes */
        .about__domains {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .about__domain {
          font-size: 0.72rem;
          font-weight: 500;
          letter-spacing: 0.04em;
          color: var(--text-muted);
          padding: 0.3rem 0.7rem;
          border: 1px solid var(--border-subtle);
          border-radius: 2px;
          font-feature-settings: "ss01" 1;
          transition: border-color 160ms var(--ease-expo);
        }

        .about__domain:hover {
          border-color: var(--border-moderate);
          color: var(--text-secondary);
        }

        /* Brand mark */
        .about__visual {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .about__mark {
          opacity: 0.85; /* Slightly muted — presence without spectacle */
          transition: opacity 300ms var(--ease-expo);
        }

        .about__mark:hover {
          opacity: 1;
        }

        @media (max-width: 900px) {
          .about__grid {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }

          .about__visual {
            order: -1;
          }

          .about__mark :global(svg) {
            width: 160px !important;
            height: 160px !important;
          }
        }
      `}</style>
    </section>
  );
}
