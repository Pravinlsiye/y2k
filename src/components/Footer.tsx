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
    accentColor: "var(--accent-indigo-light)",
  },
  {
    key: "sales",
    label: "Sales",
    email: "sales@y2ksaas.com",
    desc: "Enterprise inquiries and demos",
    cta: "Request Demo",
    href: MAIL.requestDemo,
    accentColor: "var(--accent-teal-light)",
  },
  {
    key: "support",
    label: "Support",
    email: "support@y2ksaas.com",
    desc: "Technical assistance",
    cta: "Get Help",
    href: MAIL.support,
    accentColor: "oklch(0.64 0.15 275)",
  },
];

export default function Footer() {
  const navigate = useNavigate();
  let sectionRef!: HTMLElement;
  let channelsRef!: HTMLDivElement;

  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  onMount(() => {
    const ease = "expo.out";

    const headEl = sectionRef.querySelector(".ft-head");
    if (headEl) {
      gsap.from(headEl.children, {
        opacity: 0,
        y: 14,
        duration: 0.65,
        stagger: 0.08,
        ease,
        scrollTrigger: { trigger: headEl, start: "top 86%" },
      });
    }

    const rows = channelsRef.querySelectorAll(".ft-channel");
    rows.forEach((row, i) => {
      gsap.from(row, {
        opacity: 0,
        y: 12,
        duration: 0.6,
        ease,
        delay: i * 0.06,
        scrollTrigger: { trigger: channelsRef, start: "top 85%" },
      });
    });
  });

  return (
    <footer ref={sectionRef} id="contact" class="footer">

      {/* ── Contact section ── */}
      <div class="ft-contact">
        <div class="container ft-inner">

          {/* Left: positioning + CTAs */}
          <div class="ft-head">
            <p class="ft-head__label">Get in Touch</p>
            <h2 class="ft-head__title">
              Let's build something<br />that works.
            </h2>
            <p class="ft-head__sub">
              Whether you're evaluating a demo, exploring careers, or need
              technical support, we respond within one business day.
            </p>

            <div class="ft-head__actions">
              <a href={MAIL.requestDemo} class="ft-btn ft-btn--primary">
                Request Demo
              </a>
              <a href={MAIL.talkExpert} class="ft-btn ft-btn--ghost">
                Talk to an engineer
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Right: contact channels as list rows */}
          <div ref={channelsRef} class="ft-channels">
            {channels.map((ch) => (
              <a href={ch.href} class="ft-channel">
                <div class="ft-channel__accent" style={{ background: ch.accentColor }} />
                <div class="ft-channel__body">
                  <p class="ft-channel__label">{ch.label}</p>
                  <p class="ft-channel__email">{ch.email}</p>
                  <p class="ft-channel__desc">{ch.desc}</p>
                </div>
                <span class="ft-channel__cta">
                  {ch.cta}
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </span>
              </a>
            ))}
          </div>

        </div>
      </div>

      {/* ── Divider ── */}
      <hr class="ft-rule" />

      {/* ── Bottom bar ── */}
      <div class="container ft-bottom">
        <Logo size={26} variant="full" />

        <nav class="ft-nav">
          {footerLinks.map((link) => (
            <a
              href={link.href}
              class="ft-nav__link"
              onClick={(e) => {
                e.preventDefault();
                link.page ? navigate(link.href) : scrollTo(link.href);
              }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <p class="ft-copy">
          &copy; {new Date().getFullYear()} Y2kSaaS. All rights reserved.
        </p>
      </div>

      <style>{`
        .footer {
          border-top: 1px solid var(--border-subtle);
        }

        /* ── Contact section ── */
        .ft-contact {
          padding: clamp(72px, 10vh, 120px) 0 clamp(56px, 8vh, 90px);
        }

        .ft-inner {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(3rem, 7vw, 7rem);
          align-items: start;
        }

        /* ── Left head ── */
        .ft-head__label {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 0.72rem;
          font-weight: 500;
          letter-spacing: 0.07em;
          color: var(--text-muted);
          margin-bottom: 1.25rem;
        }

        .ft-head__label::before {
          content: '';
          display: block;
          width: 18px;
          height: 1px;
          background: var(--text-dim);
          flex-shrink: 0;
        }

        .ft-head__title {
          font-size: clamp(1.8rem, 3.5vw, 2.8rem);
          font-weight: 700;
          line-height: 1.1;
          letter-spacing: -0.025em;
          color: var(--text-primary);
          margin-bottom: 1rem;
        }

        .ft-head__sub {
          font-size: 0.9rem;
          line-height: 1.65;
          color: var(--text-muted);
          max-width: 42ch;
          margin-bottom: 2rem;
        }

        .ft-head__actions {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          flex-wrap: wrap;
        }

        /* Buttons — solid fill, no gradient */
        .ft-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.875rem;
          font-weight: 600;
          border-radius: 3px;
          transition:
            opacity   160ms var(--ease-expo),
            transform 160ms var(--ease-expo);
          white-space: nowrap;
        }

        .ft-btn svg { display: inline-block; flex-shrink: 0; }

        .ft-btn--primary {
          padding: 0.65rem 1.4rem;
          background: var(--accent-indigo-light);
          color: oklch(0.96 0.006 265);
        }

        .ft-btn--primary:hover { opacity: 0.88; }
        .ft-btn--primary:active { transform: scale(0.97); }

        .ft-btn--ghost {
          padding: 0.65rem 0;
          color: var(--text-muted);
        }

        .ft-btn--ghost:hover { color: var(--text-secondary); }

        .ft-btn--ghost svg {
          transition: transform 160ms var(--ease-expo);
        }

        .ft-btn--ghost:hover svg { transform: translateX(3px); }
        .ft-btn--ghost:active { transform: scale(0.98); }

        /* ── Channel rows — no glass, no backdrop-filter ── */
        .ft-channels {
          display: flex;
          flex-direction: column;
          border: 1px solid var(--border-subtle);
          border-radius: 3px;
          overflow: hidden;
        }

        .ft-channel {
          display: grid;
          grid-template-columns: 3px 1fr auto;
          gap: 1.25rem;
          align-items: center;
          padding: 1.4rem 1.5rem;
          background: var(--bg-card);
          border-bottom: 1px solid var(--border-subtle);
          transition:
            background  160ms var(--ease-expo),
            border-color 160ms var(--ease-expo);
          position: relative;
        }

        .ft-channel:last-child {
          border-bottom: none;
        }

        .ft-channel:hover {
          background: var(--bg-secondary);
        }

        /* Top-edge thin accent strip per channel */
        .ft-channel__accent {
          width: 2px;
          height: 100%;
          border-radius: 1px;
          opacity: 0.5;
          flex-shrink: 0;
          align-self: stretch;
        }

        .ft-channel__body {
          min-width: 0;
        }

        .ft-channel__label {
          font-family: var(--font-mono);
          font-size: 0.65rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--text-dim);
          margin-bottom: 0.2rem;
        }

        .ft-channel__email {
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 0.15rem;
        }

        .ft-channel__desc {
          font-size: 0.75rem;
          color: var(--text-dim);
        }

        .ft-channel__cta {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.75rem;
          font-weight: 500;
          color: var(--text-dim);
          white-space: nowrap;
          flex-shrink: 0;
          transition:
            color     160ms var(--ease-expo),
            gap       160ms var(--ease-expo);
        }

        .ft-channel__cta svg { display: inline-block; }

        .ft-channel:hover .ft-channel__cta {
          color: var(--text-secondary);
          gap: 0.5rem;
        }

        /* ── Divider and bottom ── */
        .ft-rule {
          height: 1px;
          background: var(--border-subtle);
          border: none;
          margin: 0;
        }

        .ft-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1.25rem;
          padding-top: 1.5rem;
          padding-bottom: 1.75rem;
        }

        .ft-nav {
          display: flex;
          gap: 1.5rem;
          flex-wrap: wrap;
          justify-content: center;
        }

        .ft-nav__link {
          font-size: 0.8rem;
          color: var(--text-dim);
          transition: color 160ms var(--ease-expo);
          white-space: nowrap;
        }

        .ft-nav__link:hover { color: var(--text-secondary); }

        .ft-copy {
          font-size: 0.75rem;
          color: var(--text-dim);
          white-space: nowrap;
          font-variant-numeric: tabular-nums;
        }

        @media (max-width: 900px) {
          .ft-inner { grid-template-columns: 1fr; gap: 2.5rem; }
        }

        @media (max-width: 600px) {
          .ft-bottom { flex-direction: column; text-align: center; }
          .ft-nav { justify-content: center; }
          .ft-head__actions { flex-direction: column; align-items: flex-start; }
        }
      `}</style>
    </footer>
  );
}
