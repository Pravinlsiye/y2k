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

const PAGE_SIZE = 10;

export default function Careers() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = createSignal("All");
  const [page, setPage] = createSignal(1);
  let heroRef!: HTMLDivElement;
  let listRef!: HTMLDivElement;
  let openingsRef!: HTMLDivElement;

  const filtered = () =>
    activeFilter() === "All" ? jobs : jobs.filter((j) => j.tag === activeFilter());

  const totalPages = () => Math.ceil(filtered().length / PAGE_SIZE);

  const paginated = () => {
    const start = (page() - 1) * PAGE_SIZE;
    return filtered().slice(start, start + PAGE_SIZE);
  };

  const scrollToList = () => {
    openingsRef?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  onMount(() => {
    const ease = "expo.out";
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

  const changeFilter = (f: string) => {
    setActiveFilter(f);
    setPage(1);
    animateList();
  };

  const goPage = (n: number) => {
    setPage(n);
    animateList();
    scrollToList();
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

        <div ref={openingsRef} class="cr-openings__head">
          <h2 class="cr-openings__title">Open Roles</h2>
          <p class="cr-openings__count">
            {filtered().length} position{filtered().length !== 1 ? "s" : ""}
            {totalPages() > 1 && (
              <span class="cr-openings__page-info">
                {" "}— page {page()} of {totalPages()}
              </span>
            )}
          </p>
        </div>

        {/* Filter tabs */}
        <div class="cr-filters">
          {filters.map((f) => (
            <button
              class="cr-filter"
              classList={{ "cr-filter--active": activeFilter() === f }}
              onClick={() => changeFilter(f)}
              type="button"
            >
              {f}
            </button>
          ))}
        </div>

        {/* Job list — divide-y, no glass cards */}
        <div ref={listRef} class="cr-job-list">
          {paginated().map((job) => (
            <div class="cr-job-row">
              <div class="cr-job-row__info">
                <p class="cr-job-row__dept">{job.dept}</p>
                <h3 class="cr-job-row__title">{job.title}</h3>
                <div class="cr-job-row__meta">
                  <span class="cr-job-row__tag">{job.location}</span>
                  <span class="cr-job-row__tag">{job.type}</span>
                  <span class="cr-job-row__tag cr-job-row__tag--id">{job.id}</span>
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

        {/* Pagination */}
        {totalPages() > 1 && (
          <div class="cr-pagination">
            <button
              class="cr-pg-btn"
              onClick={() => goPage(page() - 1)}
              disabled={page() === 1}
              aria-label="Previous page"
              type="button"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
            </button>

            <div class="cr-pg-pages">
              {Array.from({ length: totalPages() }, (_, i) => i + 1).map((n) => (
                <button
                  class="cr-pg-num"
                  classList={{ "cr-pg-num--active": page() === n }}
                  onClick={() => goPage(n)}
                  aria-label={`Page ${n}`}
                  aria-current={page() === n ? "page" : undefined}
                  type="button"
                >
                  {n}
                </button>
              ))}
            </div>

            <button
              class="cr-pg-btn"
              onClick={() => goPage(page() + 1)}
              disabled={page() === totalPages()}
              aria-label="Next page"
              type="button"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
        )}

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

      {/* Entry Level & Internships */}
      <div class="container cr-intern">
        <div class="cr-intern__card">
          <div class="cr-intern__text">
            <p class="cr-intern__eyebrow">Entry Level and Internships</p>
            <h3 class="cr-intern__title">
              Start your career journey here.
            </h3>
            <p class="cr-intern__body">
              Exciting opportunities for students, recent graduates, and
              early-career engineers across hardware, software, cloud, and AI.
              We hire for potential, not pedigree.
            </p>
          </div>
          <a
            href="/careers/internship"
            class="cr-btn cr-intern__btn"
            onClick={(e) => { e.preventDefault(); navigate("/careers/internship"); }}
          >
            View internship programme
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
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

        /* Job ID tag */
        .cr-job-row__tag--id {
          font-family: var(--font-mono);
          font-size: 0.62rem;
          letter-spacing: 0.06em;
          color: var(--text-dim);
          border-color: oklch(0.96 0.006 265 / 0.04);
        }

        /* Page info in count */
        .cr-openings__page-info {
          color: var(--text-dim);
          font-weight: 400;
        }

        /* Pagination */
        .cr-pagination {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding-top: 2rem;
          border-top: 1px solid var(--border-subtle);
          margin-top: 0;
        }

        .cr-pg-btn {
          width: 34px;
          height: 34px;
          border-radius: 3px;
          background: var(--bg-card);
          border: 1px solid var(--border-subtle);
          color: var(--text-muted);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-sans);
          transition:
            background 160ms var(--ease-expo),
            color      160ms var(--ease-expo),
            transform  160ms var(--ease-expo);
        }

        .cr-pg-btn:hover:not(:disabled) {
          background: var(--bg-secondary);
          color: var(--text-primary);
        }

        .cr-pg-btn:active:not(:disabled) { transform: scale(0.95); }

        .cr-pg-btn:disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }

        .cr-pg-btn svg { display: inline-block; }

        .cr-pg-pages {
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }

        .cr-pg-num {
          min-width: 34px;
          height: 34px;
          padding: 0 0.5rem;
          border-radius: 3px;
          background: var(--bg-card);
          border: 1px solid var(--border-subtle);
          font-family: var(--font-mono);
          font-size: 0.78rem;
          font-weight: 500;
          color: var(--text-muted);
          cursor: pointer;
          font-variant-numeric: tabular-nums;
          transition:
            background 160ms var(--ease-expo),
            border-color 160ms var(--ease-expo),
            color        160ms var(--ease-expo),
            transform    160ms var(--ease-expo);
        }

        .cr-pg-num:hover:not(.cr-pg-num--active) {
          background: var(--bg-secondary);
          color: var(--text-primary);
        }

        .cr-pg-num:active { transform: scale(0.95); }

        .cr-pg-num--active {
          background: oklch(0.56 0.21 264 / 0.1);
          border-color: oklch(0.56 0.21 264 / 0.35);
          color: var(--accent-indigo-light);
          cursor: default;
        }

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

        /* Internship section */
        .cr-intern {
          max-width: 800px;
          margin-top: 1.5rem;
        }

        .cr-intern__card {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 2rem;
          padding: 2rem 2.5rem;
          border: 1px solid oklch(0.56 0.21 264 / 0.2);
          border-top: 2px solid oklch(0.56 0.21 264 / 0.5);
          border-radius: 3px;
          background: oklch(0.56 0.21 264 / 0.04);
          flex-wrap: wrap;
          transition: border-color 200ms var(--ease-expo), background 200ms var(--ease-expo);
        }

        .cr-intern__card:hover {
          background: oklch(0.56 0.21 264 / 0.06);
          border-color: oklch(0.56 0.21 264 / 0.35);
        }

        .cr-intern__eyebrow {
          font-family: var(--font-mono);
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--accent-indigo-light);
          margin-bottom: 0.4rem;
        }

        .cr-intern__title {
          font-size: 1.05rem;
          font-weight: 700;
          color: var(--text-primary);
          letter-spacing: -0.01em;
          margin-bottom: 0.4rem;
        }

        .cr-intern__body {
          font-size: 0.845rem;
          color: var(--text-muted);
          max-width: 48ch;
          line-height: 1.55;
        }

        .cr-intern__btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          white-space: nowrap;
          flex-shrink: 0;
        }

        .cr-intern__btn svg { display: inline-block; }

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
