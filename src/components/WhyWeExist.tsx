import { onMount } from "solid-js";
import { gsap, fadeUp } from "../lib/gsap";

const _directives: unknown[] = [fadeUp];
void _directives;

const steps = [
  {
    number: "01",
    title: "Identify Friction",
    description:
      "Every industry has hidden inefficiencies. Some are small daily frustrations. Others cost organizations time, reliability, safety, and operational clarity.",
  },
  {
    number: "02",
    title: "Engineer Clarity",
    description:
      "We build focused systems: technology engineered around one clear purpose, combining connected hardware, scalable software, and intelligent infrastructure.",
  },
  {
    number: "03",
    title: "Scale the Solution",
    description:
      "From a single deployment to enterprise-wide rollout, we deliver technology that reduces complexity, improves reliability, and enables smarter operations.",
  },
];

export default function WhyWeExist() {
  let timelineRef!: HTMLDivElement;
  let lineRef!: HTMLDivElement;

  onMount(() => {
    // Scrub the connecting line as user scrolls through steps
    gsap.from(lineRef, {
      scaleY: 0,
      transformOrigin: "top",
      ease: "none",
      scrollTrigger: {
        trigger: timelineRef,
        start: "top 72%",
        end: "bottom 62%",
        scrub: 1,
      },
    });

    const steps = timelineRef.querySelectorAll(".why-step");
    steps.forEach((step, i) => {
      gsap.from(step, {
        opacity: 0,
        y: 14,
        duration: 0.65,
        ease: "expo.out",
        delay: i * 0.06,
        scrollTrigger: {
          trigger: step,
          start: "top 88%",
          toggleActions: "play none none none",
        },
      });
    });
  });

  return (
    <section class="section why">
      <div class="container">

        <div class="why-header" use:fadeUp>
          <p class="why-header__label">Why We Exist</p>
          <h2 class="why-header__title">
            Operational problems require<br />operational thinking.
          </h2>
          <p class="why-header__sub">
            Every industry has hidden inefficiencies. We build systems for both
            the small daily frustrations and the operational failures that cost
            organizations reliability, time, and clarity.
          </p>
        </div>

        <div ref={timelineRef} class="why-timeline">
          {/* Vertical connecting line — scrub-animated */}
          <div ref={lineRef} class="why-line" />

          {steps.map((step) => (
            <div class="why-step">
              <div class="why-step__marker">
                <span class="why-step__num">{step.number}</span>
              </div>
              <div class="why-step__content">
                <h3 class="why-step__title">{step.title}</h3>
                <p class="why-step__desc">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

      </div>

      <style>{`
        .why-header {
          margin-bottom: 4rem;
          max-width: 680px;
        }

        .why-header__label {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 0.72rem;
          font-weight: 500;
          letter-spacing: 0.07em;
          color: var(--text-muted);
          margin-bottom: 1rem;
        }

        .why-header__label::before {
          content: '';
          display: block;
          width: 18px;
          height: 1px;
          background: var(--text-dim);
        }

        .why-header__title {
          font-size: clamp(1.8rem, 3.5vw, 2.8rem);
          font-weight: 700;
          line-height: 1.1;
          letter-spacing: -0.025em;
          color: var(--text-primary);
          margin-bottom: 1rem;
        }

        .why-header__sub {
          font-size: 0.95rem;
          line-height: 1.65;
          color: var(--text-muted);
          max-width: 55ch;
        }

        .why-timeline {
          position: relative;
          max-width: 640px;
          padding-left: 56px;
        }

        /* Connecting line — solid single color, no gradient */
        .why-line {
          position: absolute;
          left: 15px;
          top: 16px;
          bottom: 16px;
          width: 1px;
          background: var(--border-moderate);
          transform-origin: top;
        }

        .why-step {
          display: flex;
          gap: 1.75rem;
          margin-bottom: 2.5rem;
          position: relative;
        }

        .why-step:last-child {
          margin-bottom: 0;
        }

        /* Step marker — square, not circle. Engineered. */
        .why-step__marker {
          position: absolute;
          left: -56px;
          top: 0;
          display: flex;
          align-items: flex-start;
          justify-content: center;
          padding-top: 2px;
        }

        .why-step__num {
          font-family: var(--font-mono);
          font-size: 0.68rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          color: var(--accent-indigo-light);
          background: var(--bg-card);
          border: 1px solid var(--border-moderate);
          border-radius: 2px;
          padding: 0.2rem 0.4rem;
          display: inline-block;
          position: relative;
          z-index: 2;
          font-variant-numeric: tabular-nums;
        }

        /* Step content — no glass card, just surface */
        .why-step__content {
          padding: 1.5rem 1.75rem;
          background: var(--bg-card);
          border: 1px solid var(--border-subtle);
          border-radius: 3px;
          flex: 1;
          transition: border-color 200ms var(--ease-expo);
        }

        .why-step__content:hover {
          border-color: var(--border-moderate);
        }

        .why-step__title {
          font-size: 1.05rem;
          font-weight: 600;
          letter-spacing: -0.015em;
          color: var(--text-primary);
          margin-bottom: 0.5rem;
        }

        .why-step__desc {
          font-size: 0.875rem;
          line-height: 1.65;
          color: var(--text-muted);
        }

        @media (max-width: 600px) {
          .why-timeline { padding-left: 44px; }
          .why-step__marker { left: -44px; }
          .why-line { left: 11px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .why-line { transform: none; }
        }
      `}</style>
    </section>
  );
}
