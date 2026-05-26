import { onMount } from "solid-js";
import { gsap, ScrollTrigger, fadeUp, parallax } from "../lib/gsap";

const _directives: unknown[] = [fadeUp, parallax];
void _directives;

export default function Philosophy() {
  let sectionRef!: HTMLElement;
  let linesRef!: HTMLDivElement;

  onMount(() => {
    const lines = linesRef.querySelectorAll(".philosophy__line");
    lines.forEach((line, i) => {
      gsap.from(line, {
        x: i % 2 === 0 ? -40 : 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: line,
          start: "top 88%",
          toggleActions: "play none none none",
        },
      });
    });
  });

  return (
    <section ref={sectionRef} id="philosophy" class="section philosophy">
      <div class="philosophy__bg" use:parallax={-0.3} />

      <div class="container philosophy__content">
        <span class="section-label" use:fadeUp>Our Philosophy</span>
        <h2 class="section-title" use:fadeUp>Focused Technology</h2>

        <hr class="glow-line philosophy__divider" use:fadeUp />

        <div ref={linesRef} class="philosophy__lines">
          <p class="philosophy__line philosophy__line--large">
            We don't believe in building bloated platforms trying to solve everything.
          </p>
          <p class="philosophy__line philosophy__line--large">
            We believe in focused systems:
          </p>
          <p class="philosophy__line philosophy__line--accent">
            technology engineered around one clear purpose,
          </p>
          <p class="philosophy__line philosophy__line--accent">
            executed with precision, scalability, and reliability.
          </p>
        </div>

        <div class="philosophy__quote" use:fadeUp>
          <blockquote>
            "Technology should reduce complexity, not create it."
          </blockquote>
        </div>
      </div>

      <style>{`
        .philosophy {
          position: relative;
          overflow: hidden;
        }

        .philosophy__bg {
          position: absolute;
          inset: -20% 0;
          background: radial-gradient(ellipse 80% 50% at 50% 50%, rgba(99, 102, 241, 0.04), transparent);
          pointer-events: none;
        }

        .philosophy__content {
          position: relative;
          z-index: 2;
          max-width: 800px;
        }

        .philosophy__divider {
          margin: 2rem 0 3rem;
        }

        .philosophy__lines {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-bottom: 3rem;
        }

        .philosophy__line {
          line-height: 1.6;
          color: var(--text-secondary);
        }

        .philosophy__line--large {
          font-size: clamp(1.1rem, 2vw, 1.4rem);
          font-weight: 500;
        }

        .philosophy__line--accent {
          font-size: clamp(1rem, 1.8vw, 1.25rem);
          color: var(--text-muted);
          padding-left: 1.5rem;
          border-left: 2px solid var(--accent-indigo-light);
        }

        .philosophy__quote {
          position: relative;
          padding: 2rem 2.5rem;
          background: var(--bg-glass);
          border: 1px solid var(--border-subtle);
          border-radius: 16px;
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }

        .philosophy__quote blockquote {
          font-size: clamp(1.2rem, 2.5vw, 1.6rem);
          font-weight: 600;
          font-style: italic;
          color: var(--text-primary);
          line-height: 1.4;
          letter-spacing: -0.01em;
        }

        .philosophy__quote::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, var(--accent-indigo-light), var(--accent-teal-light), transparent);
          border-radius: 16px 16px 0 0;
          opacity: 0.6;
        }
      `}</style>
    </section>
  );
}
