import { createSignal, onMount } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { gsap } from "../lib/gsap";
import Navbar from "../components/Navbar";
import { MAIL } from "../lib/mail";
import { jobs } from "../lib/jobs";

const filters = ["All", "Engineering", "Hardware", "Infrastructure", "Product", "Design", "Sales"];

const perks = [
  { label: "Remote-first",     detail: "Work from anywhere, always" },
  { label: "Competitive Pay",  detail: "Top-of-market compensation" },
  { label: "Equity",           detail: "Ownership in what we build" },
  { label: "Health",           detail: "Full medical, dental, vision" },
  { label: "Learning Budget",  detail: "Courses, books, conferences" },
  { label: "Team Offsites",    detail: "Quarterly in-person gatherings" },
];

export default function Careers() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = createSignal("All");
  let heroRef!: HTMLDivElement;
  let listRef!: HTMLDivElement;

  const filtered = () =>
    activeFilter() === "All" ? jobs : jobs.filter((j) => j.tag === activeFilter());

  onMount(() => {
    const ease = "expo.out";

    // Hero entrance — weight-aware, expo.out
    gsap.from(Array.from(heroRef.children), {
      opacity: 0,
      y: 14,
      duration: 0.65,
      stagger: 0.08,
      ease,
    });
  });

  const animateList = () => {
    requestAnimationFrame(() => {
      gsap.from(listRef.querySelectorAll(".cr-job-row"), {
        opacity: 0,
        y: 10,
        duration: 0.45,
        stagger: 0.05,
        ease: "expo.out",
      });
    });
  };

  return (
    <div class="careers">

      {/* Nav */}
      <Navbar />

      {/* Hero */}
      <div ref={heroRef} class="container cr-hero">
        <p class="cr-hero__label">Careers at Y2kSaaS</p>
        <h1 class="cr-hero__title">
          Build the systems<br />operations depend on.
        </h1>
        <p class="cr-hero__sub">
          Join a focused engineering team solving real-world operational problems
          through hardware, software, and intelligent infrastructure.
        </p>
        <a href={MAIL.sendIntro} class="cr-btn">
          Send an Intro
        </a>
      </div>

      {/* Perks — plain list, no glass cards */}
      <div class="container cr-perks-wrap">
        <hr class="cr-rule" />
        <div class="cr-perks">
          {perks.map((p) => (
            <div class="cr-perk">
              <p class="cr-perk__label">{p.label}</p>
              <p class="cr-perk__detail">{p.detail}</p>
            </div>
          ))}
        </div>
        <hr class="cr-rule" />
      </div>

      {/* Job listings */}
      <div class="container cr-openings">

        <div class="cr-openings__head">
          <h2 class="cr-openings__title">Open Roles</h2>
          <p class="cr-openings__count">
            {filtered().length} position{filtered().length !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Filter tabs */}
        <div class="cr-filters">
          {filters.map((f) => (
            <button
              class="cr-filter"
              classList={{ "cr-filter--active": activeFilter() === f }}
              onClick={() => { setActiveFilter(f); animateList(); }}
              type="button"
            >
              {f}
            </button>
          ))}
        </div>

        {/* Job list — divide-y, no glass cards */}
        <div ref={listRef} class="cr-job-list">
          {filtered().map((job) => (
            <div class="cr-job-row">
              <div class="cr-job-row__info">
                <p class="cr-job-row__dept">{job.dept}</p>
                <h3 class="cr-job-row__title">{job.title}</h3>
                <div class="cr-job-row__meta">
                  <span class="cr-job-row__tag">{job.location}</span>
                  <span class="cr-job-row__tag">{job.type}</span>
                </div>
              </div>
              <a
                href={`/careers/${job.id}`}
                class="cr-job-row__apply"
                onClick={(e) => { e.preventDefault(); navigate(`/careers/${job.id}`); }}
              >
                View and Apply
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </a>
            </div>
          ))}

          {filtered().length === 0 && (
            <p class="cr-empty">No open roles in this area right now. Check back soon.</p>
          )}
        </div>
      </div>

      {/* Bottom open application */}
      <div class="container cr-open-apply">
        <div class="cr-open-apply__card">
          <div class="cr-open-apply__text">
            <h3 class="cr-open-apply__title">Don't see your role?</h3>
            <p class="cr-open-apply__sub">
              We hire for potential. Send us your background and what you'd like to build.
            </p>
          </div>
          <a href={MAIL.sendIntro} class="cr-btn cr-btn--outline">
            Send an Intro
          </a>
        </div>
      </div>

      <style>{`
        .careers {
          background: var(--bg-primary);
          color: var(--text-primary);
          font-family: var(--font-sans);
          min-height: 100vh;
          padding-bottom: 6rem;
        }

        /* Nav */

        /* Hero */
        .cr-hero {
          padding-top: clamp(56px, 10vh, 96px);
          padding-bottom: 3rem;
          max-width: 800px;
        }

        .cr-hero__label {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 0.72rem;
          font-weight: 500;
          letter-spacing: 0.07em;
          color: var(--text-muted);
          margin-bottom: 1.25rem;
        }

        .cr-hero__label::before {
          content: '';
          display: block;
          width: 18px;
          height: 1px;
          background: var(--text-dim);
        }

        .cr-hero__title {
          font-size: clamp(2.2rem, 5vw, 3.6rem);
          font-weight: 700;
          line-height: 1.08;
          letter-spacing: -0.03em;
          color: var(--text-primary);
          margin-bottom: 1rem;
        }

        .cr-hero__sub {
          font-size: 0.95rem;
          line-height: 1.65;
          color: var(--text-muted);
          max-width: 55ch;
          margin-bottom: 2rem;
        }

        /* Shared button */
        .cr-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.65rem 1.4rem;
          font-size: 0.875rem;
          font-weight: 600;
          border-radius: 3px;
          background: var(--accent-indigo-light);
          color: oklch(0.96 0.006 265);
          transition:
            opacity   160ms var(--ease-expo),
            transform 160ms var(--ease-expo);
          white-space: nowrap;
        }

        .cr-btn:hover { opacity: 0.88; }
        .cr-btn:active { transform: scale(0.97); }

        .cr-btn--outline {
          background: transparent;
          color: var(--accent-indigo-light);
          border: 1px solid oklch(0.56 0.21 264 / 0.35);
        }

        .cr-btn--outline:hover {
          opacity: 1;
          background: oklch(0.56 0.21 264 / 0.08);
          border-color: oklch(0.56 0.21 264 / 0.5);
        }

        /* Perks — plain taxonomy, no glass */
        .cr-perks-wrap {
          margin-bottom: 3.5rem;
        }

        .cr-rule {
          height: 1px;
          background: var(--border-subtle);
          border: none;
          margin: 1.75rem 0;
        }

        .cr-perks {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 0;
          border-left: 1px solid var(--border-subtle);
        }

        .cr-perk {
          padding: 1.25rem 1.5rem;
          border-right: 1px solid var(--border-subtle);
        }

        .cr-perk__label {
          font-size: 0.82rem;
          font-weight: 600;
          color: var(--text-secondary);
          margin-bottom: 0.25rem;
        }

        .cr-perk__detail {
          font-size: 0.72rem;
          color: var(--text-dim);
          line-height: 1.4;
        }

        /* Openings */
        .cr-openings {
          margin-bottom: 4rem;
        }

        .cr-openings__head {
          display: flex;
          align-items: baseline;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .cr-openings__title {
          font-size: 1.3rem;
          font-weight: 700;
          color: var(--text-primary);
          letter-spacing: -0.015em;
        }

        .cr-openings__count {
          font-size: 0.75rem;
          color: var(--text-dim);
          font-variant-numeric: tabular-nums;
        }

        /* Filter buttons */
        .cr-filters {
          display: flex;
          gap: 0.4rem;
          flex-wrap: wrap;
          margin-bottom: 1.75rem;
        }

        .cr-filter {
          padding: 0.38rem 0.9rem;
          border-radius: 2px;
          font-size: 0.78rem;
          font-weight: 500;
          font-family: var(--font-sans);
          background: var(--bg-card);
          border: 1px solid var(--border-subtle);
          color: var(--text-muted);
          cursor: pointer;
          transition:
            background    160ms var(--ease-expo),
            border-color  160ms var(--ease-expo),
            color         160ms var(--ease-expo);
        }

        .cr-filter:hover {
          border-color: var(--border-moderate);
          color: var(--text-secondary);
        }

        .cr-filter--active {
          background: oklch(0.56 0.21 264 / 0.1);
          border-color: oklch(0.56 0.21 264 / 0.35);
          color: var(--accent-indigo-light);
        }

        .cr-filter:active { transform: scale(0.97); }

        /* Job rows — divide-y, no glass */
        .cr-job-list {
          border-top: 1px solid var(--border-subtle);
        }

        .cr-job-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 2rem;
          padding: 1.5rem 0;
          border-bottom: 1px solid var(--border-subtle);
          transition: background 160ms var(--ease-expo);
        }

        .cr-job-row:hover {
          background: oklch(0.96 0.006 265 / 0.02);
          margin-inline: -1rem;
          padding-inline: 1rem;
          border-radius: 2px;
        }

        .cr-job-row__dept {
          font-family: var(--font-mono);
          font-size: 0.65rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--accent-indigo-light);
          margin-bottom: 0.3rem;
        }

        .cr-job-row__title {
          font-size: 1rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 0.5rem;
          letter-spacing: -0.01em;
        }

        .cr-job-row__meta {
          display: flex;
          gap: 0.4rem;
          flex-wrap: wrap;
        }

        .cr-job-row__tag {
          font-size: 0.68rem;
          font-weight: 500;
          padding: 0.2rem 0.6rem;
          border: 1px solid var(--border-subtle);
          border-radius: 2px;
          color: var(--text-dim);
          font-variant-numeric: tabular-nums;
        }

        .cr-job-row__apply {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.5rem 1.1rem;
          border-radius: 3px;
          border: 1px solid oklch(0.56 0.21 264 / 0.28);
          color: var(--accent-indigo-light);
          font-size: 0.82rem;
          font-weight: 600;
          white-space: nowrap;
          flex-shrink: 0;
          transition:
            background    160ms var(--ease-expo),
            border-color  160ms var(--ease-expo),
            transform     160ms var(--ease-expo);
        }

        .cr-job-row__apply svg { display: inline-block; }

        .cr-job-row__apply:hover {
          background: oklch(0.56 0.21 264 / 0.08);
          border-color: oklch(0.56 0.21 264 / 0.45);
        }

        .cr-job-row__apply:active { transform: scale(0.97); }

        .cr-empty {
          text-align: center;
          color: var(--text-dim);
          font-size: 0.875rem;
          padding: 3rem 0;
        }

        /* Open application */
        .cr-open-apply {
          max-width: 800px;
        }

        .cr-open-apply__card {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 2rem;
          padding: 2rem 2.5rem;
          border: 1px solid var(--border-moderate);
          border-radius: 3px;
          background: var(--bg-card);
        }

        .cr-open-apply__title {
          font-size: 1rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 0.3rem;
          letter-spacing: -0.01em;
        }

        .cr-open-apply__sub {
          font-size: 0.85rem;
          color: var(--text-muted);
          max-width: 44ch;
          line-height: 1.55;
        }

        @media (max-width: 900px) {
          .cr-perks { grid-template-columns: repeat(3, 1fr); }
        }

        @media (max-width: 600px) {
          .cr-perks { grid-template-columns: repeat(2, 1fr); }
          .cr-job-row { flex-direction: column; align-items: flex-start; }
          .cr-open-apply__card { flex-direction: column; align-items: flex-start; gap: 1.25rem; }
        }
      `}</style>
    </div>
  );
}
