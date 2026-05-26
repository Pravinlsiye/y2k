import { onMount } from "solid-js";
import { gsap, ScrollTrigger, fadeUp } from "../lib/gsap";

const _directives: unknown[] = [fadeUp];
void _directives;

const steps = [
  {
    number: "01",
    title: "Identify Friction",
    description:
      "Every industry has hidden inefficiencies. Some are small daily frustrations. Others cost organizations time, reliability, safety, and operational clarity.",
    icon: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",
  },
  {
    number: "02",
    title: "Engineer Clarity",
    description:
      "We build focused systems: technology engineered around one clear purpose, combining connected hardware, scalable software, and intelligent infrastructure.",
    icon: "M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z",
  },
  {
    number: "03",
    title: "Scale the Solution",
    description:
      "From lightweight utilities to enterprise-grade platforms, we deliver technology that reduces complexity, improves reliability, and enables smarter operations.",
    icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6",
  },
];

export default function WhyWeExist() {
  let timelineRef!: HTMLDivElement;
  let lineRef!: HTMLDivElement;

  onMount(() => {
    gsap.from(lineRef, {
      scaleY: 0,
      transformOrigin: "top",
      ease: "none",
      scrollTrigger: {
        trigger: timelineRef,
        start: "top 70%",
        end: "bottom 60%",
        scrub: 1,
      },
    });

    const items = timelineRef.querySelectorAll(".why__step");
    items.forEach((item, i) => {
      gsap.from(item, {
        y: 60,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        delay: i * 0.1,
        scrollTrigger: {
          trigger: item,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    });
  });

  return (
    <section class="section why">
      <div class="container">
        <div class="why__header" use:fadeUp>
          <span class="section-label">Purpose</span>
          <h2 class="section-title">Why We Exist</h2>
          <p class="section-text" style={{ "margin-left": "auto", "margin-right": "auto", "text-align": "center" }}>
            Every industry has hidden inefficiencies. We build systems for both
            the small daily frustrations and the ones that cost organizations
            time, reliability, and operational clarity.
          </p>
        </div>

        <div ref={timelineRef} class="why__timeline">
          <div ref={lineRef} class="why__line" />
          {steps.map((step) => (
            <div class="why__step">
              <div class="why__step-marker">
                <div class="why__step-dot">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d={step.icon} />
                  </svg>
                </div>
              </div>
              <div class="why__step-content glass-card">
                <span class="why__step-number">{step.number}</span>
                <h3 class="why__step-title">{step.title}</h3>
                <p class="why__step-desc">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .why__header {
          text-align: center;
          margin-bottom: 4rem;
        }

        .why__timeline {
          position: relative;
          max-width: 700px;
          margin: 0 auto;
          padding-left: 60px;
        }

        .why__line {
          position: absolute;
          left: 27px;
          top: 0;
          bottom: 0;
          width: 2px;
          background: linear-gradient(to bottom, var(--accent-indigo-light), var(--accent-teal-light), transparent);
          opacity: 0.4;
        }

        .why__step {
          position: relative;
          display: flex;
          gap: 1.5rem;
          margin-bottom: 2.5rem;
        }

        .why__step:last-child {
          margin-bottom: 0;
        }

        .why__step-marker {
          position: absolute;
          left: -60px;
          top: 1.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .why__step-dot {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: var(--bg-secondary);
          border: 2px solid rgba(99, 102, 241, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--accent-indigo-light);
          box-shadow: 0 0 20px rgba(99, 102, 241, 0.1);
          position: relative;
          z-index: 2;
        }

        .why__step-content {
          flex: 1;
        }

        .why__step-number {
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          color: var(--accent-indigo-light);
          margin-bottom: 0.5rem;
          display: block;
        }

        .why__step-title {
          font-size: 1.3rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 0.6rem;
        }

        .why__step-desc {
          font-size: 0.95rem;
          line-height: 1.7;
          color: var(--text-muted);
        }

        @media (max-width: 600px) {
          .why__timeline { padding-left: 48px; }
          .why__step-marker { left: -48px; }
          .why__step-dot { width: 36px; height: 36px; }
          .why__step-dot svg { width: 16px; height: 16px; }
          .why__line { left: 19px; }
        }
      `}</style>
    </section>
  );
}
