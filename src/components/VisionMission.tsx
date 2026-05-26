import { fadeUp, scaleIn } from "../lib/gsap";

const _directives: unknown[] = [fadeUp, scaleIn];
void _directives;

export default function VisionMission() {
  return (
    <section class="section vision-mission">
      <div class="container">
        <div class="vm__header" use:fadeUp>
          <span class="section-label">Direction</span>
          <h2 class="section-title">Vision &amp; Mission</h2>
        </div>

        <div class="vm__grid">
          <div class="vm__card vm__card--vision" use:scaleIn>
            <div class="vm__card-glow" />
            <span class="vm__card-label">Our Vision</span>
            <p class="vm__card-text">
              To build intelligent systems that bridge hardware, software, and human
              operations into seamless real-world experiences.
            </p>
            <p class="vm__card-sub">
              We believe the future belongs to focused engineering solutions:
              systems that are practical, scalable, and designed around actual
              human and operational needs.
            </p>
          </div>

          <div class="vm__card vm__card--mission" use:scaleIn>
            <div class="vm__card-glow" />
            <span class="vm__card-label">Our Mission</span>
            <p class="vm__card-text">
              To engineer technology products that solve overlooked problems through
              connected hardware, scalable software, and intelligent infrastructure.
            </p>
            <p class="vm__card-sub">
              Our approach combines engineering discipline, practical system design,
              and long-term scalability to create products that deliver measurable
              impact across industries and users.
            </p>
          </div>
        </div>
      </div>

      <style>{`
        .vm__header {
          text-align: center;
          margin-bottom: 3.5rem;
        }

        .vm__grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
        }

        .vm__card {
          position: relative;
          padding: 2.5rem;
          border-radius: 20px;
          background: var(--bg-card);
          border: 1px solid var(--border-subtle);
          overflow: hidden;
          transition: border-color 0.5s ease, transform 0.4s ease;
        }

        .vm__card:hover {
          transform: translateY(-4px);
        }

        .vm__card--vision {
          border-color: rgba(99, 102, 241, 0.15);
        }

        .vm__card--vision:hover {
          border-color: rgba(99, 102, 241, 0.4);
        }

        .vm__card--mission {
          border-color: rgba(45, 212, 191, 0.15);
        }

        .vm__card--mission:hover {
          border-color: rgba(45, 212, 191, 0.4);
        }

        .vm__card-glow {
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.5s ease;
        }

        .vm__card--vision .vm__card-glow {
          background: radial-gradient(circle at 30% 30%, rgba(99, 102, 241, 0.06), transparent 50%);
        }

        .vm__card--mission .vm__card-glow {
          background: radial-gradient(circle at 70% 30%, rgba(45, 212, 191, 0.06), transparent 50%);
        }

        .vm__card:hover .vm__card-glow {
          opacity: 1;
        }

        .vm__card-label {
          display: inline-block;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          margin-bottom: 1.2rem;
          position: relative;
        }

        .vm__card--vision .vm__card-label {
          color: var(--accent-indigo-light);
        }

        .vm__card--mission .vm__card-label {
          color: var(--accent-teal-light);
        }

        .vm__card-text {
          font-size: clamp(1.1rem, 1.8vw, 1.3rem);
          font-weight: 600;
          line-height: 1.5;
          color: var(--text-primary);
          margin-bottom: 1.2rem;
        }

        .vm__card-sub {
          font-size: 0.95rem;
          line-height: 1.7;
          color: var(--text-muted);
        }

        @media (max-width: 768px) {
          .vm__grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}
