import { onMount } from "solid-js";
import { gsap, fadeUp } from "../lib/gsap";

const _directives: unknown[] = [fadeUp];
void _directives;

export default function VisionMission() {
  let sectionRef!: HTMLElement;

  onMount(() => {
    const cols = sectionRef.querySelectorAll(".vm-col");
    gsap.from(cols, {
      opacity: 0,
      y: 14,
      duration: 0.7,
      stagger: 0.12,
      ease: "expo.out",
      scrollTrigger: {
        trigger: sectionRef,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });
  });

  return (
    <section ref={sectionRef} class="section vm">
      <div class="container">

        {/* Header — left-aligned, no centered card */}
        <div class="vm-head" use:fadeUp>
          <p class="vm-head__label">Direction</p>
          <h2 class="vm-head__title">Vision and Mission</h2>
        </div>

        <hr class="vm-rule" />

        {/* Two-column editorial layout — no cards, no glass */}
        <div class="vm-grid">
          <div class="vm-col">
            <p class="vm-col__role">Vision</p>
            <p class="vm-col__statement">
              To build intelligent systems that bridge hardware, software, and
              human operations into reliable real-world experiences.
            </p>
            <p class="vm-col__support">
              We believe the future belongs to focused engineering: systems that
              are practical, scalable, and designed around actual operational needs,
              not feature roadmaps.
            </p>
          </div>

          <div class="vm-col">
            <p class="vm-col__role">Mission</p>
            <p class="vm-col__statement">
              To engineer technology products that solve overlooked operational
              problems through connected hardware, scalable software, and
              intelligent infrastructure.
            </p>
            <p class="vm-col__support">
              Our approach combines engineering discipline, practical system design,
              and long-term scalability to create products that deliver measurable
              impact across industries.
            </p>
          </div>
        </div>

      </div>

      <style>{`
        .vm {
          background: var(--bg-secondary); /* alternating surface */
        }

        .vm-head {
          margin-bottom: 2rem;
        }

        .vm-head__label {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 0.72rem;
          font-weight: 500;
          letter-spacing: 0.07em;
          color: var(--text-muted);
          margin-bottom: 1rem;
        }

        .vm-head__label::before {
          content: '';
          display: block;
          width: 18px;
          height: 1px;
          background: var(--text-dim);
        }

        .vm-head__title {
          font-size: clamp(1.8rem, 3.5vw, 2.8rem);
          font-weight: 700;
          line-height: 1.1;
          letter-spacing: -0.025em;
          color: var(--text-primary);
        }

        /* Simple horizontal rule — no gradient glow */
        .vm-rule {
          height: 1px;
          background: var(--border-moderate);
          border: none;
          margin: 0 0 3rem;
        }

        /* Two columns — pure typography, no card containers */
        .vm-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
        }

        .vm-col {
          position: relative;
        }

        /* Thin top-border for each column — structural, not decorative */
        .vm-col::before {
          content: '';
          display: block;
          width: 100%;
          height: 2px;
          background: var(--border-moderate);
          margin-bottom: 1.75rem;
        }

        .vm-col:first-child::before {
          background: var(--accent-indigo-light);
          opacity: 0.5;
        }

        .vm-col:last-child::before {
          background: var(--accent-teal-light);
          opacity: 0.5;
        }

        .vm-col__role {
          font-family: var(--font-mono);
          font-size: 0.68rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--text-dim);
          margin-bottom: 1rem;
        }

        .vm-col__statement {
          font-size: clamp(1rem, 1.6vw, 1.2rem);
          font-weight: 600;
          line-height: 1.45;
          letter-spacing: -0.01em;
          color: var(--text-primary);
          margin-bottom: 1rem;
        }

        .vm-col__support {
          font-size: 0.875rem;
          line-height: 1.65;
          color: var(--text-muted);
          max-width: 50ch;
        }

        @media (max-width: 768px) {
          .vm-grid {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }
        }
      `}</style>
    </section>
  );
}
