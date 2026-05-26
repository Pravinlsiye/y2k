import { createSignal, onMount } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { gsap } from "../lib/gsap";
import Logo from "../components/Logo";
import { MAIL } from "../lib/mail";

interface Job {
  id: string;
  title: string;
  dept: string;
  location: string;
  type: string;
  tag: string;
}

const jobs: Job[] = [
  { id: "swe-1", title: "Senior Software Engineer", dept: "Engineering", location: "Remote", type: "Full-time", tag: "Engineering" },
  { id: "emb-1", title: "Embedded Systems Engineer", dept: "Hardware", location: "Hybrid", type: "Full-time", tag: "Hardware" },
  { id: "cloud-1", title: "Cloud Infrastructure Engineer", dept: "Infrastructure", location: "Remote", type: "Full-time", tag: "Infrastructure" },
  { id: "pm-1", title: "Product Manager", dept: "Product", location: "Remote", type: "Full-time", tag: "Product" },
  { id: "ai-1", title: "AI/ML Engineer", dept: "Intelligence", location: "Remote", type: "Full-time", tag: "Engineering" },
  { id: "ux-1", title: "Product Designer (UX)", dept: "Design", location: "Remote", type: "Full-time", tag: "Design" },
  { id: "sales-1", title: "Enterprise Account Executive", dept: "Sales", location: "Remote", type: "Full-time", tag: "Sales" },
  { id: "devrel-1", title: "Developer Relations Engineer", dept: "Engineering", location: "Remote", type: "Full-time", tag: "Engineering" },
];

const tabs = ["All", "Engineering", "Hardware", "Infrastructure", "Product", "Design", "Sales"];

const perks = [
  { icon: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064", label: "Remote-first" },
  { icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z", label: "Competitive Pay" },
  { icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z", label: "Health & Wellness" },
  { icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253", label: "Learning Budget" },
  { icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z", label: "Equity" },
  { icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z", label: "Team Offsites" },
];

export default function Careers() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = createSignal("All");
  let heroRef!: HTMLDivElement;
  let listRef!: HTMLDivElement;

  const filtered = () =>
    activeTab() === "All" ? jobs : jobs.filter((j) => j.tag === activeTab());

  onMount(() => {
    gsap.from(heroRef.children, {
      y: 40,
      opacity: 0,
      duration: 0.9,
      stagger: 0.12,
      ease: "power3.out",
    });
  });

  const animateList = () => {
    requestAnimationFrame(() => {
      gsap.from(listRef.querySelectorAll(".careers__job"), {
        y: 20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.07,
        ease: "power3.out",
      });
    });
  };

  return (
    <div class="careers" style={{ "font-family": "var(--font-sans)" }}>
      {/* Navbar */}
      <nav class="careers__nav">
        <div class="container careers__nav-inner">
          <a class="careers__nav-logo" href="/" onClick={(e) => { e.preventDefault(); navigate("/"); }}>
            <Logo size={32} variant="full" />
          </a>
          <a class="careers__nav-back" href="/" onClick={(e) => { e.preventDefault(); navigate("/"); }}>
            ← Back to Home
          </a>
        </div>
      </nav>

      {/* Hero */}
      <div ref={heroRef} class="careers__hero container">
        <span class="section-label">We're Hiring</span>
        <h1 class="section-title" style={{ "font-size": "clamp(2.5rem, 6vw, 4rem)" }}>
          Build the Future<br />of Connected Systems
        </h1>
        <p class="section-text" style={{ "margin-bottom": "2rem" }}>
          Join a focused engineering team solving real-world operational problems
          through hardware, software, and intelligent infrastructure.
        </p>
        <a href={MAIL.sendIntro} class="careers__cta">
          Send an Intro
        </a>
      </div>

      {/* Perks */}
      <div class="careers__perks container">
        {perks.map((p) => (
          <div class="careers__perk glass-card">
            <span class="careers__perk-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <path d={p.icon}/>
              </svg>
            </span>
            <span class="careers__perk-label">{p.label}</span>
          </div>
        ))}
      </div>

      {/* Openings */}
      <div class="container careers__openings">
        <h2 class="careers__openings-title">Open Roles</h2>

        <div class="careers__tabs">
          {tabs.map((tab) => (
            <button
              class="careers__tab"
              classList={{ "careers__tab--active": activeTab() === tab }}
              onClick={() => { setActiveTab(tab); animateList(); }}
            >
              {tab}
            </button>
          ))}
        </div>

        <div ref={listRef} class="careers__jobs">
          {filtered().map((job) => (
            <div class="careers__job glass-card">
              <div class="careers__job-info">
                <span class="careers__job-dept">{job.dept}</span>
                <h3 class="careers__job-title">{job.title}</h3>
                <div class="careers__job-meta">
                  <span class="careers__job-badge">{job.location}</span>
                  <span class="careers__job-badge">{job.type}</span>
                </div>
              </div>
              <a
                href={MAIL.applyRole(job.title)}
                class="careers__job-apply"
              >
                Apply
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </a>
            </div>
          ))}
        </div>

        {filtered().length === 0 && (
          <p class="careers__empty">No open roles in this department right now. Check back soon.</p>
        )}
      </div>

      {/* Bottom CTA */}
      <div class="careers__bottom container">
        <div class="careers__bottom-card glass-card">
          <h3>Don't see your role?</h3>
          <p>We hire for potential. Send us your background and what you'd like to build.</p>
          <a href={MAIL.sendIntro} class="careers__cta" style={{ "margin-top": "1.25rem", display: "inline-block" }}>
            Send an Intro →
          </a>
        </div>
      </div>

      <style>{`
        .careers {
          background: var(--bg-primary);
          color: var(--text-primary);
          min-height: 100vh;
          padding-bottom: 6rem;
        }

        .careers__nav {
          position: sticky;
          top: 0;
          z-index: 50;
          background: rgba(11,18,32,0.85);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-bottom: 1px solid var(--border-subtle);
          padding: 0.9rem 0;
        }

        .careers__nav-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .careers__nav-logo {
          display: flex;
          align-items: center;
        }

        .careers__nav-back {
          font-size: 0.85rem;
          color: var(--text-muted);
          transition: color 0.2s;
        }

        .careers__nav-back:hover { color: var(--text-primary); }

        .careers__hero {
          padding-top: clamp(60px, 10vh, 100px);
          padding-bottom: 3rem;
        }

        .careers__cta {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.75rem;
          border-radius: 10px;
          background: linear-gradient(135deg, #4F46E5, #6366F1);
          color: #fff;
          font-size: 0.9rem;
          font-weight: 600;
          transition: all 0.25s ease;
          box-shadow: 0 0 24px rgba(99,102,241,0.2);
        }

        .careers__cta:hover {
          box-shadow: 0 0 40px rgba(99,102,241,0.35);
          transform: translateY(-2px);
        }

        .careers__perks {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 1rem;
          margin-bottom: 4rem;
        }

        .careers__perk {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.6rem;
          padding: 1.25rem 0.75rem;
          text-align: center;
        }

        .careers__perk-icon {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          background: rgba(99,102,241,0.1);
          border: 1px solid rgba(99,102,241,0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--accent-indigo-light);
        }

        .careers__perk-icon svg { display: inline-block; }

        .careers__perk-label {
          font-size: 0.78rem;
          font-weight: 500;
          color: var(--text-muted);
        }

        .careers__openings { margin-bottom: 4rem; }

        .careers__openings-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 1.5rem;
        }

        .careers__tabs {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
          margin-bottom: 2rem;
        }

        .careers__tab {
          padding: 0.45rem 1rem;
          border-radius: 8px;
          font-size: 0.82rem;
          font-weight: 500;
          background: var(--bg-glass);
          border: 1px solid var(--border-subtle);
          color: var(--text-muted);
          cursor: pointer;
          transition: all 0.2s ease;
          font-family: var(--font-sans);
        }

        .careers__tab:hover {
          border-color: rgba(99,102,241,0.3);
          color: var(--text-primary);
        }

        .careers__tab--active {
          background: rgba(99,102,241,0.12);
          border-color: rgba(99,102,241,0.4);
          color: var(--accent-indigo-light);
        }

        .careers__jobs {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .careers__job {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1.5rem;
          padding: 1.5rem 2rem;
          border-radius: 14px;
          transition: border-color 0.3s, transform 0.3s;
        }

        .careers__job:hover {
          border-color: var(--border-glow);
          transform: translateX(4px);
        }

        .careers__job-dept {
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--accent-indigo-light);
          display: block;
          margin-bottom: 0.25rem;
        }

        .careers__job-title {
          font-size: 1.05rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 0.5rem;
        }

        .careers__job-meta {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .careers__job-badge {
          font-size: 0.72rem;
          font-weight: 500;
          padding: 0.25rem 0.7rem;
          border-radius: 100px;
          background: rgba(148,163,184,0.06);
          border: 1px solid var(--border-subtle);
          color: var(--text-muted);
        }

        .careers__job-apply {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.55rem 1.25rem;
          border-radius: 8px;
          background: transparent;
          border: 1px solid rgba(99,102,241,0.25);
          color: var(--accent-indigo-light);
          font-size: 0.85rem;
          font-weight: 600;
          transition: all 0.25s ease;
          white-space: nowrap;
          flex-shrink: 0;
        }

        .careers__job-apply svg { display: inline-block; }

        .careers__job-apply:hover {
          background: rgba(99,102,241,0.1);
          border-color: rgba(99,102,241,0.5);
          transform: translateX(2px);
        }

        .careers__empty {
          text-align: center;
          color: var(--text-dim);
          font-size: 0.9rem;
          padding: 3rem 0;
        }

        .careers__bottom { max-width: 640px; }

        .careers__bottom-card {
          text-align: center;
          padding: 3rem 2rem;
        }

        .careers__bottom-card h3 {
          font-size: 1.4rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
          color: var(--text-primary);
        }

        .careers__bottom-card p {
          color: var(--text-muted);
          font-size: 0.95rem;
          line-height: 1.6;
        }

        @media (max-width: 900px) {
          .careers__perks { grid-template-columns: repeat(3, 1fr); }
        }

        @media (max-width: 600px) {
          .careers__perks { grid-template-columns: repeat(2, 1fr); }
          .careers__job { flex-direction: column; align-items: flex-start; }
        }
      `}</style>
    </div>
  );
}
