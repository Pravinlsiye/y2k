import { createSignal, onMount } from "solid-js";
import { gsap, ScrollTrigger } from "../lib/gsap";

export default function Navbar() {
  let navRef!: HTMLElement;
  const [scrolled, setScrolled] = createSignal(false);

  const navLinks = [
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Philosophy", href: "#philosophy" },
    { label: "Contact", href: "#contact" },
  ];

  onMount(() => {
    ScrollTrigger.create({
      start: "top -80",
      onUpdate: (self) => setScrolled(self.progress > 0),
    });

    gsap.from(navRef, {
      opacity: 0,
      duration: 1.2,
      ease: "power2.out",
      delay: 0.3,
    });
  });

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      ref={navRef}
      class="navbar"
      classList={{ "navbar--scrolled": scrolled() }}
    >
      <div class="navbar__inner container">
        <a href="#" class="navbar__logo" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <svg width="40" height="40" viewBox="30 40 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="120" cy="130" r="72" stroke="#B8C0CC" stroke-width="10" stroke-linecap="round" opacity="0.96"/>
            <ellipse cx="120" cy="130" rx="54" ry="72" stroke="#94A3B8" stroke-width="3" opacity="0.55"/>
            <ellipse cx="120" cy="130" rx="28" ry="72" stroke="#94A3B8" stroke-width="2" opacity="0.35"/>
            <ellipse cx="120" cy="130" rx="72" ry="28" stroke="#94A3B8" stroke-width="2" opacity="0.55"/>
            <rect x="92" y="98" width="42" height="42" rx="5" fill="#312E81"/>
            <rect x="120" y="82" width="42" height="42" rx="5" fill="#3F3F46"/>
            <rect x="120" y="124" width="42" height="42" rx="5" fill="#134E4A"/>
          </svg>
          <span class="navbar__wordmark">Y2kSaaS</span>
        </a>

        <div class="navbar__links">
          {navLinks.map((link) => (
            <a
              class="navbar__link"
              href={link.href}
              onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
            >
              {link.label}
            </a>
          ))}
        </div>

        <a
          class="navbar__cta"
          href="#contact"
          onClick={(e) => { e.preventDefault(); scrollTo("#contact"); }}
        >
          Get in Touch
        </a>
      </div>

      <style>{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 100;
          padding: 1rem 0;
          transition: background 0.4s var(--ease-out-expo),
                      backdrop-filter 0.4s var(--ease-out-expo),
                      padding 0.4s var(--ease-out-expo),
                      border-color 0.4s var(--ease-out-expo);
        }

        .navbar--scrolled {
          background: rgba(11, 18, 32, 0.82);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid var(--border-subtle);
          padding: 0.7rem 0;
        }

        .navbar__inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 2rem;
        }

        .navbar__logo {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex-shrink: 0;
        }

        .navbar__logo svg {
          display: inline-block;
          flex-shrink: 0;
          width: 40px;
          height: 40px;
        }

        .navbar__wordmark {
          font-size: 1.3rem;
          font-weight: 700;
          letter-spacing: -0.02em;
          color: var(--text-primary);
        }

        .navbar__links {
          display: flex;
          align-items: center;
          gap: 2rem;
        }

        .navbar__link {
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--text-muted);
          transition: color 0.3s ease;
          position: relative;
          white-space: nowrap;
        }

        .navbar__link::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 0;
          height: 1px;
          background: var(--accent-indigo-light);
          transition: width 0.3s var(--ease-out-expo);
        }

        .navbar__link:hover {
          color: var(--text-primary);
        }

        .navbar__link:hover::after {
          width: 100%;
        }

        .navbar__cta {
          display: inline-block;
          font-size: 0.85rem;
          font-weight: 600;
          padding: 0.6rem 1.4rem;
          border-radius: 8px;
          background: linear-gradient(135deg, var(--accent-indigo), rgba(99, 102, 241, 0.3));
          color: var(--text-primary);
          border: 1px solid rgba(99, 102, 241, 0.3);
          transition: all 0.3s ease;
          white-space: nowrap;
          flex-shrink: 0;
        }

        .navbar__cta:hover {
          background: linear-gradient(135deg, rgba(99, 102, 241, 0.5), rgba(99, 102, 241, 0.2));
          box-shadow: 0 0 24px rgba(99, 102, 241, 0.2);
          border-color: rgba(99, 102, 241, 0.5);
        }

        @media (max-width: 768px) {
          .navbar__links { display: none; }
          .navbar__cta { font-size: 0.8rem; padding: 0.5rem 1rem; }
        }
      `}</style>
    </nav>
  );
}
