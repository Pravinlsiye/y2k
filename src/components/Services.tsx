import { fadeUp, staggerUp } from "../lib/gsap";

const _directives: unknown[] = [fadeUp, staggerUp];
void _directives;

interface Service {
  icon: string;
  title: string;
  description: string;
  accent: string;
}

const services: Service[] = [
  {
    icon: "M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z",
    title: "Connected Hardware",
    description: "Embedded systems and IoT infrastructure designed for reliability in demanding operational environments.",
    accent: "var(--accent-indigo-light)",
  },
  {
    icon: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4",
    title: "Scalable Software",
    description: "SaaS platforms and enterprise applications built for performance, security, and long-term maintainability.",
    accent: "var(--accent-teal-light)",
  },
  {
    icon: "M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z",
    title: "Cloud Systems",
    description: "Distributed cloud infrastructure with intelligent scaling, monitoring, and operational analytics.",
    accent: "var(--accent-indigo-light)",
  },
  {
    icon: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15",
    title: "Automation",
    description: "Workflow automation systems that reduce manual operations and eliminate process bottlenecks at scale.",
    accent: "var(--accent-teal-light)",
  },
  {
    icon: "M13 10V3L4 14h7v7l9-11h-7z",
    title: "Intelligent Workflows",
    description: "AI-assisted decision systems and smart pipelines that transform fragmented data into actionable clarity.",
    accent: "var(--accent-indigo-light)",
  },
];

export default function Services() {
  return (
    <section id="services" class="section services">
      <div class="container">
        <div class="services__header" use:fadeUp>
          <span class="section-label">What We Build</span>
          <h2 class="section-title">
            Integrated Technology.<br />Real-World Impact.
          </h2>
          <p class="section-text">
            From lightweight utilities to enterprise-grade platforms, every product
            begins with one clear objective: solve the problem properly.
          </p>
        </div>

        <div class="services__grid" use:staggerUp>
          {services.map((service) => (
            <div class="services__card glass-card">
              <div class="services__icon" style={{ color: service.accent }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d={service.icon} />
                </svg>
              </div>
              <h3 class="services__card-title">{service.title}</h3>
              <p class="services__card-desc">{service.description}</p>
              <div class="services__card-line" style={{ background: `linear-gradient(90deg, ${service.accent}, transparent)` }} />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .services__header {
          text-align: center;
          margin-bottom: 4rem;
        }

        .services__header .section-text {
          margin-left: auto;
          margin-right: auto;
        }

        .services__grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }

        .services__grid > :nth-child(4),
        .services__grid > :nth-child(5) {
          grid-column: span 1;
        }

        .services__card {
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .services__icon {
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 12px;
          background: rgba(99, 102, 241, 0.08);
          border: 1px solid rgba(99, 102, 241, 0.12);
        }

        .services__card-title {
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .services__card-desc {
          font-size: 0.9rem;
          line-height: 1.7;
          color: var(--text-muted);
          flex: 1;
        }

        .services__card-line {
          height: 2px;
          width: 60px;
          border-radius: 1px;
          opacity: 0.5;
          transition: width 0.4s var(--ease-out-expo);
        }

        .services__card:hover .services__card-line {
          width: 100%;
        }

        @media (max-width: 900px) {
          .services__grid { grid-template-columns: repeat(2, 1fr); }
        }

        @media (max-width: 600px) {
          .services__grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}
