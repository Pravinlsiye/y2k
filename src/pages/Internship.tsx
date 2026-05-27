import { onMount } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { gsap } from "../lib/gsap";
import Navbar from "../components/Navbar";
import { MAIL } from "../lib/mail";

const tracks = [
  "Hardware and Embedded Systems",
  "Cloud Infrastructure and SaaS",
  "AI and Intelligent Automation",
  "Developer Experience and Tooling",
];

const sections = [
  {
    num: "01",
    title: "Research Internship",
    body: [
      "Y2kSaaS runs research internship tracks for students and recent graduates interested in embedded systems, cloud platforms, AI, and operational technology. Interns are embedded directly into product and engineering teams.",
      "You will have a dedicated mentor, attend engineering discussions, and contribute to real deliverables. No busywork. No documentation-only roles. Interns at Y2kSaaS contribute to systems that run in production.",
    ],
    extra: {
      label: "Tracks available",
      items: tracks,
    },
  },
  {
    num: "02",
    title: "What do we seek in our interns?",
    body: [
      "Intellectual curiosity above credentials. We care more about how you think than what you have done.",
      "Strong candidates show genuine interest in how systems work at a deep level, clear communication about what they know and where the gaps are, and ability to work independently with documentation and minimal direction.",
      "Some practical experience helps: personal projects, open source contributions, coursework, or prior work. We do not require a specific university, degree programme, or GPA.",
    ],
    extra: null,
  },
  {
    num: "03",
    title: "What is the role of an intern?",
    body: [
      "Interns are embedded in engineering teams from day one. Depending on your background and chosen track, you will work on protocol and firmware development for connected hardware, backend services and infrastructure automation, data pipelines from field devices to cloud systems, AI-assisted tooling for operational workflows, or developer tools, SDK work, and technical documentation.",
      "Duration is 3 to 6 months, with the possibility of a full-time offer on completion. You will have a dedicated engineering mentor and attend real team discussions.",
    ],
    extra: null,
  },
];

export default function Internship() {
  const navigate = useNavigate();
  let heroRef!: HTMLDivElement;
  let contentRef!: HTMLDivElement;

  onMount(() => {
    const ease = "expo.out";

    gsap.from(Array.from(heroRef.children), {
      opacity: 0,
      y: 14,
      duration: 0.65,
      stagger: 0.08,
      ease,
    });

    const rows = contentRef.querySelectorAll(".intern-row");
    rows.forEach((row, i) => {
      gsap.from(row, {
        opacity: 0,
        y: 12,
        duration: 0.65,
        ease,
        delay: i * 0.05,
        scrollTrigger: {
          trigger: row,
          start: "top 88%",
          toggleActions: "play none none none",
        },
      });
    });
  });

  return (
    <div class="intern-page">

      <Navbar />

      {/* Hero */}
      <div ref={heroRef} class="container intern-hero">
        <p class="intern-hero__label">Entry Level and Internships</p>
        <h1 class="intern-hero__title">
          Intern with Y2kSaaS
        </h1>
        <p class="intern-hero__tagline">
          Start your career journey with the people building connected systems.
        </p>
        <p class="intern-hero__desc">
          Y2kSaaS makes it possible for you to reach your fullest potential.
          We nurture our talent and equip them to contribute to the creation
          of better operational systems.
        </p>
        <p class="intern-hero__desc">
          With opportunities across connected hardware, scalable software,
          cloud infrastructure, intelligent automation, and developer tooling,
          we encourage you to take your first steps toward a meaningful
          engineering career with us.
        </p>
        <p class="intern-hero__desc">
          Our internships are not junior assignments. You will work on real
          systems, with real engineers, on real problems. If you are curious,
          driven, and want to understand how systems actually work at depth,
          you belong here.
        </p>

        <a
          href={MAIL.internship}
          class="intern-hero__cta"
        >
          Apply for an internship
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </a>
      </div>

      {/* Three sections */}
      <div class="container intern-body">
        <hr class="intern-rule" />

        <div ref={contentRef} class="intern-sections">
          {sections.map((sec) => (
            <div class="intern-row">
              <div class="intern-row__left">
                <span class="intern-row__num">{sec.num}</span>
              </div>

              <div class="intern-row__content">
                <h2 class="intern-row__title">{sec.title}</h2>

                {sec.body.map((p) => (
                  <p class="intern-row__body">{p}</p>
                ))}

                {sec.extra && (
                  <div class="intern-row__extra">
                    <p class="intern-row__extra-label">{sec.extra.label}</p>
                    <ul class="intern-row__tracks">
                      {sec.extra.items.map((item) => (
                        <li class="intern-row__track">
                          <span class="intern-row__track-dot" aria-hidden="true" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Application CTA */}
        <div class="intern-apply">
          <div class="intern-apply__card">
            <div class="intern-apply__text">
              <p class="intern-apply__label">Ready to apply?</p>
              <h3 class="intern-apply__title">
                Send us your resume.
              </h3>
              <p class="intern-apply__body">
                Email us at{" "}
                <a href="mailto:careers@y2ksaas.com" class="intern-apply__email">
                  careers@y2ksaas.com
                </a>{" "}
                with your resume, the internship track you are most interested
                in, and your availability. We review every application and
                respond within 5 business days.
              </p>
            </div>

            <a href={MAIL.internship} class="intern-apply__btn">
              Apply via email
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Back to all careers */}
        <div class="intern-back">
          <a
            href="/careers"
            class="intern-back__link"
            onClick={(e) => { e.preventDefault(); navigate("/careers"); }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            All open roles
          </a>
        </div>
      </div>

      <style>{`
        .intern-page {
          min-height: 100vh;
          background: var(--bg-primary);
          color: var(--text-primary);
          font-family: var(--font-sans);
          padding-bottom: 6rem;
        }

        /* Hero */
        .intern-hero {
          padding-top: clamp(56px, 10vh, 96px);
          padding-bottom: 3.5rem;
          max-width: 780px;
        }

        .intern-hero__label {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 0.72rem;
          font-weight: 500;
          letter-spacing: 0.07em;
          color: var(--text-muted);
          margin-bottom: 1.25rem;
        }

        .intern-hero__label::before {
          content: '';
          display: block;
          width: 18px;
          height: 1px;
          background: var(--text-dim);
        }

        .intern-hero__title {
          font-size: clamp(2.4rem, 5.5vw, 4rem);
          font-weight: 800;
          line-height: 1.06;
          letter-spacing: -0.035em;
          color: var(--text-primary);
          margin-bottom: 0.5rem;
        }

        .intern-hero__tagline {
          font-size: 1.05rem;
          color: var(--text-muted);
          margin-bottom: 1.75rem;
        }

        .intern-hero__desc {
          font-size: 0.95rem;
          line-height: 1.7;
          color: var(--text-secondary);
          max-width: 62ch;
          margin-bottom: 1rem;
        }

        .intern-hero__desc:last-of-type {
          margin-bottom: 2rem;
        }

        .intern-hero__cta {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.7rem 1.5rem;
          font-size: 0.875rem;
          font-weight: 600;
          border-radius: 3px;
          background: var(--accent-indigo-light);
          color: oklch(0.96 0.006 265);
          transition:
            opacity   160ms var(--ease-expo),
            transform 160ms var(--ease-expo);
        }

        .intern-hero__cta svg { display: inline-block; }
        .intern-hero__cta:hover { opacity: 0.88; }
        .intern-hero__cta:active { transform: scale(0.97); }

        /* Body */
        .intern-body {
          max-width: 780px;
        }

        .intern-rule {
          height: 1px;
          background: var(--border-subtle);
          border: none;
          margin: 0 0 0;
        }

        /* Section rows */
        .intern-sections {
          border-top: 1px solid var(--border-subtle);
        }

        .intern-row {
          display: grid;
          grid-template-columns: 56px 1fr;
          gap: 2.5rem;
          padding: 2.75rem 0;
          border-bottom: 1px solid var(--border-subtle);
        }

        .intern-row__left {
          padding-top: 4px;
        }

        .intern-row__num {
          font-family: var(--font-mono);
          font-size: 0.72rem;
          font-weight: 700;
          color: var(--accent-indigo-light);
          letter-spacing: 0.1em;
          font-variant-numeric: tabular-nums;
        }

        .intern-row__title {
          font-size: clamp(1.15rem, 2vw, 1.5rem);
          font-weight: 700;
          letter-spacing: -0.02em;
          color: var(--text-primary);
          margin-bottom: 1.1rem;
          line-height: 1.2;
        }

        .intern-row__body {
          font-size: 0.9rem;
          line-height: 1.72;
          color: var(--text-secondary);
          max-width: 60ch;
          margin-bottom: 0.9rem;
        }

        .intern-row__body:last-of-type {
          margin-bottom: 0;
        }

        /* Tracks list */
        .intern-row__extra {
          margin-top: 1.5rem;
          padding: 1.25rem 1.5rem;
          border: 1px solid var(--border-subtle);
          border-radius: 3px;
          background: var(--bg-card);
        }

        .intern-row__extra-label {
          font-family: var(--font-mono);
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--text-dim);
          margin-bottom: 0.85rem;
        }

        .intern-row__tracks {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .intern-row__track {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          font-size: 0.875rem;
          color: var(--text-secondary);
        }

        .intern-row__track-dot {
          width: 4px;
          height: 4px;
          border-radius: 1px;
          background: var(--accent-indigo-light);
          flex-shrink: 0;
          opacity: 0.55;
        }

        /* Application CTA */
        .intern-apply {
          padding-top: 3rem;
          margin-bottom: 2.5rem;
        }

        .intern-apply__card {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 3rem;
          padding: 2.5rem 3rem;
          border: 1px solid var(--border-moderate);
          border-radius: 3px;
          background: var(--bg-secondary);
          flex-wrap: wrap;
        }

        /* Top accent */
        .intern-apply__card::before {
          content: '';
          position: absolute;
          /* intentionally not using position: absolute on card — use top-border only */
        }

        .intern-apply__label {
          font-family: var(--font-mono);
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--accent-indigo-light);
          margin-bottom: 0.5rem;
        }

        .intern-apply__title {
          font-size: clamp(1.1rem, 2vw, 1.5rem);
          font-weight: 700;
          letter-spacing: -0.02em;
          color: var(--text-primary);
          margin-bottom: 0.6rem;
        }

        .intern-apply__body {
          font-size: 0.875rem;
          line-height: 1.65;
          color: var(--text-muted);
          max-width: 50ch;
        }

        .intern-apply__email {
          color: var(--accent-indigo-light);
          font-weight: 500;
          transition: color 160ms var(--ease-expo);
        }

        .intern-apply__email:hover { color: var(--text-primary); }

        .intern-apply__btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.7rem 1.4rem;
          font-size: 0.875rem;
          font-weight: 600;
          border-radius: 3px;
          background: var(--accent-indigo-light);
          color: oklch(0.96 0.006 265);
          white-space: nowrap;
          flex-shrink: 0;
          transition:
            opacity   160ms var(--ease-expo),
            transform 160ms var(--ease-expo);
        }

        .intern-apply__btn svg { display: inline-block; }
        .intern-apply__btn:hover { opacity: 0.88; }
        .intern-apply__btn:active { transform: scale(0.97); }

        /* Back link */
        .intern-back { padding-top: 1rem; }

        .intern-back__link {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.82rem;
          font-weight: 500;
          color: var(--text-muted);
          transition: color 160ms var(--ease-expo);
        }

        .intern-back__link svg { display: inline-block; }
        .intern-back__link:hover { color: var(--text-primary); }

        /* Responsive */
        @media (max-width: 700px) {
          .intern-row {
            grid-template-columns: 1fr;
            gap: 0.75rem;
          }
          .intern-apply__card {
            flex-direction: column;
            gap: 1.5rem;
            padding: 2rem 1.5rem;
          }
        }
      `}</style>
    </div>
  );
}
