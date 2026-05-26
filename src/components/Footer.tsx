import { onMount } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { gsap, fadeUp, staggerUp } from "../lib/gsap";
import Logo from "./Logo";
import { MAIL } from "../lib/mail";

const _directives: unknown[] = [fadeUp, staggerUp];
void _directives;

const footerLinks = [
  { label: "About",      href: "#about",      page: false },
  { label: "Services",   href: "#services",   page: false },
  { label: "Philosophy", href: "#philosophy", page: false },
  { label: "Careers",    href: "/careers",    page: true  },
  { label: "Contact",    href: "#contact",    page: false },
];

const channels = [
  {
    key: "careers",
    label: "Careers",
    email: "careers@y2ksaas.com",
    desc: "Join our engineering team",
    cta: "Send an Intro",
    href: MAIL.sendIntro,
    accent: "rgba(99,102,241,0.15)",
    border: "rgba(99,102,241,0.25)",
    iconPath: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z",
  },
  {
    key: "sales",
    label: "Sales",
    email: "sales@y2ksaas.com",
    desc: "Enterprise inquiries & demos",
    cta: "Request Demo",
    href: MAIL.requestDemo,
    accent: "rgba(45,212,191,0.12)",
    border: "rgba(45,212,191,0.22)",
    iconPath: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
  },
  {
    key: "support",
    label: "Support",
    email: "support@y2ksaas.com",
    desc: "Technical assistance",
    cta: "Get Help",
    href: MAIL.support,
    accent: "rgba(129,140,248,0.1)",
    border: "rgba(129,140,248,0.2)",
    iconPath: "M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z",
  },
];

export default function Footer() {
  const navigate = useNavigate();
  let sectionRef!: HTMLElement;

  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  onMount(() => {
    gsap.from(sectionRef.querySelector(".footer__hero-label"), {
      opacity: 0, y: 20, duration: 0.8,
      scrollTrigger: { trigger: sectionRef, start: "top 85%" },
    });
  });

  return (
    <footer ref={sectionRef} id="contact" class="footer">

      {/* ── Hero contact area ── */}
      <div class="footer__hero">
        <div class="footer__hero-glow footer__hero-glow--1" />
        <div class="footer__hero-glow footer__hero-glow--2" />

        <div class="container footer__hero-inner">
          <div class="footer__hero-text" use:fadeUp>
            <span class="footer__hero-label section-label">Get in Touch</span>
            <h2 class="footer__hero-title">
              Let's Build Something<br />
              <span class="footer__hero-title-accent">That Matters.</span>
            </h2>
            <p class="footer__hero-sub">
              Whether you're evaluating a demo, exploring careers, or need
              technical support — reach out and we'll respond within one
              business day.
            </p>

            <div class="footer__hero-ctas">
              <a
                href={MAIL.requestDemo}
                class="footer__btn footer__btn--primary"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
                </svg>
                Request Demo
              </a>
              <a
                href={MAIL.talkExpert}
                class="footer__btn footer__btn--teal"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg>
                Talk with Expert
              </a>
            </div>
          </div>

          {/* ── Channel cards ── */}
          <div class="footer__channels" use:staggerUp>
            {channels.map((ch) => (
              <a
                href={ch.href}
                class="footer__channel"
                style={{ background: ch.accent, "border-color": ch.border }}
              >
                <div class="footer__channel-top">
                  <span class="footer__channel-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                      <path d={ch.iconPath}/>
                    </svg>
                  </span>
                  <span class="footer__channel-label">{ch.label}</span>
                </div>
                <span class="footer__channel-email">{ch.email}</span>
                <span class="footer__channel-desc">{ch.desc}</span>
                <span class="footer__channel-cta">
                  {ch.cta}
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ── Divider ── */}
      <hr class="glow-line" />

      {/* ── Bottom bar ── */}
      <div class="container footer__bottom">
        <Logo size={28} variant="full" />

        <nav class="footer__nav">
          {footerLinks.map((link) => (
            <a
              href={link.href}
              class="footer__nav-link"
              onClick={(e) => {
                e.preventDefault();
                link.page ? navigate(link.href) : scrollTo(link.href);
              }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <p class="footer__copy">
          &copy; {new Date().getFullYear()} Y2kSaaS. All rights reserved.
        </p>
      </div>

      <style>{`
        .footer {
          border-top: 1px solid var(--border-subtle);
          position: relative;
        }

        /* ── Hero ── */
        .footer__hero {
          position: relative;
          overflow: hidden;
          padding: clamp(80px, 12vh, 140px) 0 clamp(60px, 8vh, 100px);
        }

        .footer__hero-glow {
          position: absolute;
          border-radius: 50%;
          filter: blur(120px);
          pointer-events: none;
        }

        .footer__hero-glow--1 {
          width: 600px; height: 600px;
          background: radial-gradient(circle, rgba(99,102,241,0.08), transparent 60%);
          top: -20%; left: -10%;
        }

        .footer__hero-glow--2 {
          width: 400px; height: 400px;
          background: radial-gradient(circle, rgba(45,212,191,0.06), transparent 60%);
          bottom: -10%; right: 5%;
        }

        .footer__hero-inner {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 5rem;
          align-items: start;
          position: relative;
          z-index: 2;
        }

        .footer__hero-label {
          display: block;
          margin-bottom: 1rem;
        }

        .footer__hero-title {
          font-size: clamp(2.2rem, 5vw, 3.5rem);
          font-weight: 800;
          line-height: 1.1;
          letter-spacing: -0.03em;
          color: var(--text-primary);
          margin-bottom: 1.25rem;
        }

        .footer__hero-title-accent {
          background: linear-gradient(135deg, var(--accent-indigo-light), var(--accent-teal-light));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .footer__hero-sub {
          font-size: 1rem;
          line-height: 1.75;
          color: var(--text-secondary);
          max-width: 440px;
          margin-bottom: 2rem;
        }

        .footer__hero-ctas {
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
        }

        .footer__btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.5rem;
          border-radius: 10px;
          font-size: 0.875rem;
          font-weight: 600;
          transition: all 0.3s ease;
          white-space: nowrap;
        }

        .footer__btn svg { display: inline-block; flex-shrink: 0; }

        .footer__btn--primary {
          background: linear-gradient(135deg, #4F46E5, #6366F1);
          color: #fff;
          box-shadow: 0 0 24px rgba(99,102,241,0.2);
        }

        .footer__btn--primary:hover {
          box-shadow: 0 0 40px rgba(99,102,241,0.35);
          transform: translateY(-2px);
        }

        .footer__btn--teal {
          background: linear-gradient(135deg, #0f766e, #2DD4BF);
          color: #fff;
          box-shadow: 0 0 20px rgba(45,212,191,0.15);
        }

        .footer__btn--teal:hover {
          box-shadow: 0 0 36px rgba(45,212,191,0.28);
          transform: translateY(-2px);
        }

        /* ── Channels ── */
        .footer__channels {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .footer__channel {
          display: grid;
          grid-template-rows: auto auto auto auto;
          gap: 0.35rem;
          padding: 1.4rem 1.6rem;
          border-radius: 16px;
          border: 1px solid;
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          transition: transform 0.3s var(--ease-out-expo), box-shadow 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .footer__channel::after {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent);
        }

        .footer__channel:hover {
          transform: translateX(6px);
          box-shadow: 0 8px 32px rgba(0,0,0,0.2);
        }

        .footer__channel-top {
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }

        .footer__channel-icon {
          width: 30px; height: 30px;
          border-radius: 8px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.08);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-muted);
          flex-shrink: 0;
        }

        .footer__channel-icon svg { display: inline-block; }

        .footer__channel-label {
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--text-muted);
        }

        .footer__channel-email {
          font-size: 1rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        .footer__channel-desc {
          font-size: 0.8rem;
          color: var(--text-dim);
        }

        .footer__channel-cta {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.78rem;
          font-weight: 600;
          color: var(--text-muted);
          margin-top: 0.25rem;
          transition: color 0.2s, gap 0.2s;
        }

        .footer__channel-cta svg { display: inline-block; }

        .footer__channel:hover .footer__channel-cta {
          color: var(--text-primary);
          gap: 0.6rem;
        }

        /* ── Bottom bar ── */
        .footer__bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1.25rem;
          padding-top: 1.75rem;
          padding-bottom: 2rem;
        }

        .footer__nav {
          display: flex;
          gap: 1.5rem;
          flex-wrap: wrap;
          justify-content: center;
        }

        .footer__nav-link {
          font-size: 0.82rem;
          color: var(--text-dim);
          transition: color 0.25s ease;
          white-space: nowrap;
        }

        .footer__nav-link:hover { color: var(--text-primary); }

        .footer__copy {
          font-size: 0.78rem;
          color: var(--text-dim);
          white-space: nowrap;
        }

        @media (max-width: 900px) {
          .footer__hero-inner { grid-template-columns: 1fr; gap: 3rem; }
        }

        @media (max-width: 600px) {
          .footer__bottom { flex-direction: column; text-align: center; }
          .footer__nav { justify-content: center; }
          .footer__hero-ctas { flex-direction: column; }
        }
      `}</style>
    </footer>
  );
}
