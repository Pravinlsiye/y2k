import { fadeUp, staggerUp } from "../lib/gsap";

const _directives: unknown[] = [fadeUp, staggerUp];
void _directives;

const contacts = [
  { label: "Careers", email: "careers@y2ksaas.com", desc: "Join our engineering team" },
  { label: "Sales", email: "sales@y2ksaas.com", desc: "Enterprise inquiries" },
  { label: "Support", email: "support@y2ksaas.com", desc: "Technical assistance" },
];

const footerLinks = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Philosophy", href: "#philosophy" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer id="contact" class="section footer">
      <div class="container">
        <div class="footer__top" use:fadeUp>
          <span class="section-label">Get in Touch</span>
          <h2 class="section-title">Let's Build Something Together</h2>
        </div>

        <div class="footer__contacts" use:staggerUp>
          {contacts.map((c) => (
            <a href={`mailto:${c.email}`} class="footer__contact glass-card">
              <span class="footer__contact-label">{c.label}</span>
              <span class="footer__contact-email">{c.email}</span>
              <span class="footer__contact-desc">{c.desc}</span>
            </a>
          ))}
        </div>

        <hr class="glow-line footer__divider" />

        <div class="footer__bottom">
          <div class="footer__brand">
            <svg width="32" height="32" viewBox="30 40 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="120" cy="130" r="72" stroke="#B8C0CC" stroke-width="8" opacity="0.4"/>
              <ellipse cx="120" cy="130" rx="54" ry="72" stroke="#94A3B8" stroke-width="2" opacity="0.2"/>
              <rect x="92" y="98" width="42" height="42" rx="5" fill="#312E81" opacity="0.6"/>
              <rect x="120" y="82" width="42" height="42" rx="5" fill="#3F3F46" opacity="0.6"/>
              <rect x="120" y="124" width="42" height="42" rx="5" fill="#134E4A" opacity="0.6"/>
            </svg>
            <span class="footer__brand-name">Y2kSaaS</span>
          </div>

          <nav class="footer__nav">
            {footerLinks.map((link) => (
              <a
                href={link.href}
                class="footer__nav-link"
                onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <p class="footer__copy">
            &copy; {new Date().getFullYear()} Y2kSaaS. All rights reserved.
          </p>
        </div>
      </div>

      <style>{`
        .footer {
          border-top: 1px solid var(--border-subtle);
        }

        .footer__top {
          text-align: center;
          margin-bottom: 3rem;
        }

        .footer__contacts {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
          margin-bottom: 4rem;
        }

        .footer__contact {
          text-align: center;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          padding: 2.5rem 2rem;
          transition: border-color 0.4s ease, transform 0.3s ease;
        }

        .footer__contact:hover {
          transform: translateY(-4px);
          border-color: var(--border-glow);
        }

        .footer__contact-label {
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--accent-indigo-light);
        }

        .footer__contact-email {
          font-size: 1.15rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        .footer__contact-desc {
          font-size: 0.85rem;
          color: var(--text-muted);
        }

        .footer__divider {
          margin-bottom: 2.5rem;
        }

        .footer__bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1.5rem;
        }

        .footer__brand {
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }

        .footer__brand-name {
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--text-secondary);
        }

        .footer__nav {
          display: flex;
          gap: 1.5rem;
        }

        .footer__nav-link {
          font-size: 0.85rem;
          color: var(--text-dim);
          transition: color 0.3s ease;
        }

        .footer__nav-link:hover {
          color: var(--text-primary);
        }

        .footer__copy {
          font-size: 0.8rem;
          color: var(--text-dim);
        }

        @media (max-width: 768px) {
          .footer__contacts { grid-template-columns: 1fr; }
          .footer__bottom { flex-direction: column; text-align: center; }
          .footer__nav { justify-content: center; }
        }
      `}</style>
    </footer>
  );
}
