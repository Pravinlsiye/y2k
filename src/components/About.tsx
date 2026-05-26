import { fadeUp, slideLeft, slideRight, countUp } from "../lib/gsap";

// Keep directives alive for tree-shaking
const _directives: unknown[] = [fadeUp, slideLeft, slideRight, countUp];
void _directives;

const stats: { value: number; suffix: string; label: string }[] = [
  { value: 12, suffix: "+", label: "Products Built" },
  { value: 6, suffix: "+", label: "Industries Served" },
  { value: 99, suffix: "%", label: "Uptime SLA" },
  { value: 24, suffix: "/7", label: "Support" },
];

export default function About() {
  return (
    <section id="about" class="section about">
      <div class="container">
        <div class="about__grid">
          <div class="about__text" use:slideLeft>
            <span class="section-label">About Y2kSaaS</span>
            <h2 class="section-title">
              Built Around Problems.<br />Engineered for Scale.
            </h2>
            <p class="section-text">
              Y2kSaaS is a technology engineering company focused on building
              connected hardware and software systems for modern operational
              environments.
            </p>
            <p class="section-text" style={{ "margin-top": "1rem" }}>
              We develop scalable SaaS platforms, intelligent automation tools,
              embedded systems, and infrastructure technologies designed to solve
              specific real-world problems with precision and reliability.
            </p>
          </div>

          <div class="about__visual" use:slideRight>
            <div class="about__globe">
              <svg viewBox="20 30 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" class="about__globe-svg">
                <circle cx="120" cy="130" r="88" fill="url(#aboutGlow)" opacity="0.12"/>
                <circle cx="120" cy="130" r="72" stroke="#B8C0CC" stroke-width="6" opacity="0.5" class="about__ring"/>
                <ellipse cx="120" cy="130" rx="54" ry="72" stroke="#94A3B8" stroke-width="2" opacity="0.3" class="about__meridian"/>
                <ellipse cx="120" cy="130" rx="28" ry="72" stroke="#94A3B8" stroke-width="1.5" opacity="0.2"/>
                <ellipse cx="120" cy="130" rx="72" ry="28" stroke="#94A3B8" stroke-width="1.5" opacity="0.3"/>
                <ellipse cx="120" cy="130" rx="72" ry="50" stroke="#94A3B8" stroke-width="1" opacity="0.15"/>
                <rect x="92" y="98" width="42" height="42" rx="5" fill="#312E81" opacity="0.9"/>
                <rect x="120" y="82" width="42" height="42" rx="5" fill="#3F3F46" opacity="0.9"/>
                <rect x="120" y="124" width="42" height="42" rx="5" fill="#134E4A" opacity="0.9"/>
                <defs>
                  <radialGradient id="aboutGlow" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(120 130) rotate(90) scale(88)">
                    <stop stop-color="#6366F1"/>
                    <stop offset="1" stop-color="#6366F1" stop-opacity="0"/>
                  </radialGradient>
                </defs>
              </svg>
            </div>
          </div>
        </div>

        <div class="about__stats" use:fadeUp>
          {stats.map((stat) => (
            <div class="about__stat glass-card">
              <span class="about__stat-value">
                <span use:countUp={stat.value}>0</span>
                {stat.suffix}
              </span>
              <span class="about__stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .about__grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
          margin-bottom: 4rem;
        }

        .about__visual {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .about__globe {
          position: relative;
          width: 320px;
          height: 320px;
        }

        .about__globe-svg {
          width: 100%;
          height: 100%;
          animation: float 6s ease-in-out infinite;
        }

        .about__ring {
          animation: rotateGlobe 30s linear infinite;
          transform-origin: 120px 130px;
        }

        .about__meridian {
          animation: rotateGlobe 25s linear infinite reverse;
          transform-origin: 120px 130px;
        }

        .about__stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
        }

        .about__stat {
          text-align: center;
          padding: 2rem 1rem;
        }

        .about__stat-value {
          display: block;
          font-size: 2.5rem;
          font-weight: 800;
          color: var(--text-primary);
          letter-spacing: -0.02em;
          margin-bottom: 0.3rem;
        }

        .about__stat-label {
          font-size: 0.8rem;
          font-weight: 500;
          color: var(--text-muted);
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }

        @media (max-width: 900px) {
          .about__grid { grid-template-columns: 1fr; gap: 2rem; }
          .about__visual { order: -1; }
          .about__globe { width: 240px; height: 240px; }
          .about__stats { grid-template-columns: repeat(2, 1fr); }
        }
      `}</style>
    </section>
  );
}
