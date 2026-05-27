import { onMount } from "solid-js";
import { gsap, fadeUp } from "../lib/gsap";

const _directives: unknown[] = [fadeUp];
void _directives;

interface Service {
  num: string;
  title: string;
  description: string;
  tags: string[];
}

const services: Service[] = [
  {
    num: "01",
    title: "Connected Hardware",
    description:
      "Embedded systems and IoT infrastructure designed for reliability in demanding operational environments. From circuit design to firmware to remote device management.",
    tags: ["Embedded", "IoT", "Remote Mgmt"],
  },
  {
    num: "02",
    title: "Scalable Software",
    description:
      "SaaS platforms and enterprise applications built for performance, long-term security, and maintainability. Architecture decisions made for production, not prototypes.",
    tags: ["SaaS", "API", "Platform"],
  },
  {
    num: "03",
    title: "Cloud Systems",
    description:
      "Distributed cloud infrastructure with intelligent scaling and operational analytics. Built for the specific reliability requirements of each deployment, not generic defaults.",
    tags: ["Infrastructure", "Monitoring", "Scale"],
  },
  {
    num: "04",
    title: "Automation",
    description:
      "Workflow automation systems that eliminate manual operations and process bottlenecks. We identify the friction before writing the automation.",
    tags: ["Pipelines", "Orchestration", "CI/CD"],
  },
  {
    num: "05",
    title: "Intelligent Workflows",
    description:
      "AI-assisted decision systems and smart pipelines that transform operational data into actionable clarity. Not AI for its own sake: AI applied to real problems.",
    tags: ["AI/ML", "Data", "Decision Systems"],
  },
];

export default function Services() {
  let listRef!: HTMLDivElement;

  onMount(() => {
    const rows = listRef.querySelectorAll(".svc-row");
    rows.forEach((row, i) => {
      gsap.from(row, {
        opacity: 0,
        y: 14,
        duration: 0.65,
        ease: "expo.out",
        delay: i * 0.06,
        scrollTrigger: {
          trigger: row,
          start: "top 89%",
          toggleActions: "play none none none",
        },
      });
    });
  });

  return (
    <section id="services" class="section services">
      <div class="container">

        <div class="svc-header" use:fadeUp>
          <p class="svc-header__label">Engineering Services</p>
          <h2 class="svc-header__title">
            Five engineering domains.<br />One integrated system.
          </h2>
        </div>

        <div ref={listRef} class="svc-list">
          {services.map((svc) => (
            <div class="svc-row">
              <span class="svc-num">{svc.num}</span>

              <div class="svc-main">
                <div class="svc-title-row">
                  <h3 class="svc-title">{svc.title}</h3>
                  <span class="svc-status" aria-label="Operational">
                    <span class="svc-status__dot" aria-hidden="true" />
                    Operational
                  </span>
                </div>
                <p class="svc-desc">{svc.description}</p>
              </div>

              <div class="svc-tags">
                {svc.tags.map((tag) => (
                  <span class="svc-tag">{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>

      <style>{`
        .svc-header { margin-bottom: 3.5rem; }

        .svc-header__label {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 0.72rem;
          font-weight: 500;
          letter-spacing: 0.07em;
          color: var(--text-muted);
          margin-bottom: 1.25rem;
        }

        .svc-header__label::before {
          content: '';
          display: block;
          width: 18px;
          height: 1px;
          background: var(--text-dim);
        }

        .svc-header__title {
          font-size: clamp(1.8rem, 3.5vw, 2.8rem);
          font-weight: 700;
          line-height: 1.1;
          letter-spacing: -0.025em;
          color: var(--text-primary);
        }

        .svc-list { border-top: 1px solid var(--border-subtle); }

        .svc-row {
          display: grid;
          grid-template-columns: 48px 1fr 180px;
          gap: 2rem;
          align-items: start;
          padding: 2rem 0;
          border-bottom: 1px solid var(--border-subtle);
          transition: background 200ms var(--ease-expo);
        }

        .svc-row:hover {
          background: oklch(0.96 0.006 265 / 0.02);
          margin-inline: -1.5rem;
          padding-inline: 1.5rem;
          border-radius: 2px;
        }

        .svc-num {
          font-family: var(--font-mono);
          font-size: 0.7rem;
          font-weight: 600;
          color: var(--text-dim);
          letter-spacing: 0.05em;
          line-height: 1.75rem;
          padding-top: 2px;
          font-variant-numeric: tabular-nums;
        }

        .svc-main { min-width: 0; }

        .svc-title-row {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex-wrap: wrap;
          margin-bottom: 0.6rem;
        }

        .svc-title {
          font-size: 1.1rem;
          font-weight: 600;
          color: var(--text-primary);
          letter-spacing: -0.015em;
          line-height: 1.3;
        }

        .svc-status {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.6rem;
          font-weight: 600;
          color: var(--accent-teal-light);
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 0.18rem 0.55rem;
          border: 1px solid oklch(0.74 0.14 185 / 0.2);
          border-radius: 2px;
          background: oklch(0.74 0.14 185 / 0.05);
        }

        .svc-status__dot {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: var(--accent-teal-light);
          flex-shrink: 0;
        }

        .svc-desc {
          font-size: 0.875rem;
          line-height: 1.65;
          color: var(--text-muted);
          max-width: 55ch;
        }

        .svc-tags {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
          align-items: flex-end;
          padding-top: 2px;
        }

        .svc-tag {
          font-family: var(--font-mono);
          font-size: 0.65rem;
          font-weight: 500;
          letter-spacing: 0.06em;
          color: var(--text-dim);
          padding: 0.2rem 0.55rem;
          border: 1px solid var(--border-subtle);
          border-radius: 2px;
          white-space: nowrap;
        }

        @media (max-width: 860px) {
          .svc-row { grid-template-columns: 36px 1fr; gap: 1.5rem; }
          .svc-tags { display: none; }
        }

        @media (max-width: 600px) {
          .svc-row { grid-template-columns: 1fr; gap: 0.5rem; }
          .svc-num { line-height: 1; padding-top: 0; }
        }
      `}</style>
    </section>
  );
}
