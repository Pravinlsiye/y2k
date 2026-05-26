import { onMount } from "solid-js";
import { gsap, fadeUp, slideLeft, slideRight, countUp } from "../lib/gsap";

const _directives: unknown[] = [fadeUp, slideLeft, slideRight, countUp];
void _directives;

const stats: { value: number; suffix: string; label: string }[] = [
  { value: 12, suffix: "+", label: "Products Built" },
  { value: 6, suffix: "+", label: "Industries Served" },
  { value: 99, suffix: "%", label: "Uptime SLA" },
  { value: 24, suffix: "/7", label: "Support" },
];

export default function About() {
  let globeRef!: HTMLDivElement;

  onMount(() => {
    const svg = globeRef.querySelector("svg")!;
    const glow = svg.querySelector(".about__glow-circle") as SVGElement;
    const ring = svg.querySelector(".about__ring") as SVGElement;
    const meridians = svg.querySelectorAll(".about__meridian");
    const blocks = svg.querySelectorAll(".about__block");
    const orbitDots = svg.querySelectorAll(".about__orbit-dot");

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: globeRef,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });

    tl.from(ring, { scale: 0, opacity: 0, duration: 1.2, ease: "elastic.out(1, 0.5)", transformOrigin: "120px 130px" })
      .from(meridians, { scale: 0, opacity: 0, duration: 0.8, stagger: 0.12, ease: "power3.out", transformOrigin: "120px 130px" }, "-=0.6")
      .from(blocks, { scale: 0, opacity: 0, duration: 0.5, stagger: 0.1, ease: "back.out(2)", transformOrigin: "center center" }, "-=0.4")
      .from(glow, { scale: 0.3, opacity: 0, duration: 1.5, ease: "power2.out", transformOrigin: "120px 130px" }, "-=1");

    gsap.to(glow, {
      opacity: 0.25,
      scale: 1.08,
      repeat: -1,
      yoyo: true,
      duration: 3,
      ease: "sine.inOut",
      transformOrigin: "120px 130px",
    });

    orbitDots.forEach((dot, i) => {
      gsap.to(dot, {
        rotation: 360,
        duration: 10 + i * 4,
        repeat: -1,
        ease: "none",
        transformOrigin: "120px 130px",
      });
    });

    gsap.to(svg, {
      rotateY: 8,
      rotateX: -5,
      ease: "none",
      scrollTrigger: {
        trigger: globeRef,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.5,
      },
    });

    blocks.forEach((block, i) => {
      gsap.to(block, {
        y: (i === 0 ? -3 : i === 1 ? 3 : -2),
        x: (i === 0 ? 2 : i === 1 ? -2 : 3),
        repeat: -1,
        yoyo: true,
        duration: 2.5 + i * 0.5,
        ease: "sine.inOut",
        delay: i * 0.4,
      });
    });
  });

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
            <div ref={globeRef} class="about__globe">
              <svg viewBox="0 10 240 240" fill="none" xmlns="http://www.w3.org/2000/svg" class="about__globe-svg">
                {/* Outer glow pulse */}
                <circle cx="120" cy="130" r="100" class="about__glow-circle" fill="url(#aboutGlow)" opacity="0.15"/>

                {/* Scan ring */}
                <circle cx="120" cy="130" r="92" stroke="url(#scanGrad)" stroke-width="0.5" opacity="0.3" class="about__scan-ring" stroke-dasharray="4 8"/>

                {/* Main ring */}
                <circle cx="120" cy="130" r="72" stroke="#B8C0CC" stroke-width="5" opacity="0.6" class="about__ring"/>

                {/* Meridians */}
                <ellipse cx="120" cy="130" rx="54" ry="72" stroke="#94A3B8" stroke-width="1.5" opacity="0.35" class="about__meridian" stroke-dasharray="6 4"/>
                <ellipse cx="120" cy="130" rx="28" ry="72" stroke="#94A3B8" stroke-width="1" opacity="0.2" class="about__meridian"/>
                <ellipse cx="120" cy="130" rx="72" ry="28" stroke="#94A3B8" stroke-width="1" opacity="0.35" class="about__meridian" stroke-dasharray="6 4"/>
                <ellipse cx="120" cy="130" rx="72" ry="50" stroke="#94A3B8" stroke-width="0.8" opacity="0.15" class="about__meridian"/>

                {/* Orbit dots */}
                <circle cx="192" cy="130" r="3" fill="#6366F1" opacity="0.7" class="about__orbit-dot"/>
                <circle cx="48" cy="130" r="2" fill="#2DD4BF" opacity="0.5" class="about__orbit-dot"/>
                <circle cx="120" cy="58" r="2.5" fill="#818CF8" opacity="0.6" class="about__orbit-dot"/>

                {/* Core blocks */}
                <rect x="92" y="98" width="42" height="42" rx="6" fill="#312E81" class="about__block"/>
                <rect x="120" y="82" width="42" height="42" rx="6" fill="#3F3F46" class="about__block"/>
                <rect x="120" y="124" width="42" height="42" rx="6" fill="#134E4A" class="about__block"/>

                {/* Block edge highlights */}
                <rect x="92" y="98" width="42" height="42" rx="6" fill="none" stroke="#6366F1" stroke-width="0.5" opacity="0.3"/>
                <rect x="120" y="82" width="42" height="42" rx="6" fill="none" stroke="#94A3B8" stroke-width="0.5" opacity="0.3"/>
                <rect x="120" y="124" width="42" height="42" rx="6" fill="none" stroke="#2DD4BF" stroke-width="0.5" opacity="0.3"/>

                <defs>
                  <radialGradient id="aboutGlow" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(120 130) rotate(90) scale(100)">
                    <stop stop-color="#6366F1"/>
                    <stop offset="0.5" stop-color="#6366F1" stop-opacity="0.3"/>
                    <stop offset="1" stop-color="#6366F1" stop-opacity="0"/>
                  </radialGradient>
                  <linearGradient id="scanGrad" x1="28" y1="130" x2="212" y2="130">
                    <stop stop-color="#6366F1" stop-opacity="0"/>
                    <stop offset="0.5" stop-color="#6366F1"/>
                    <stop offset="1" stop-color="#2DD4BF" stop-opacity="0"/>
                  </linearGradient>
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
          width: 360px;
          height: 360px;
          perspective: 800px;
        }

        .about__globe-svg {
          width: 100%;
          height: 100%;
          animation: float 6s ease-in-out infinite;
          filter: drop-shadow(0 0 40px rgba(99, 102, 241, 0.1));
        }

        .about__scan-ring {
          animation: rotateGlobe 20s linear infinite;
          transform-origin: 120px 130px;
        }

        .about__ring {
          filter: drop-shadow(0 0 6px rgba(184, 192, 204, 0.15));
        }

        .about__orbit-dot {
          filter: drop-shadow(0 0 4px currentColor);
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
          .about__globe { width: 280px; height: 280px; }
          .about__stats { grid-template-columns: repeat(2, 1fr); }
        }
      `}</style>
    </section>
  );
}
