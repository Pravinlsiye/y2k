import { createSignal, onMount } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { gsap, ScrollTrigger } from "../lib/gsap";
import Logo from "./Logo";

export default function Navbar() {
  let navRef!: HTMLElement;
  const [scrolled, setScrolled] = createSignal(false);
  const navigate = useNavigate();

  const navLinks = [
    { label: "About", href: "#about", scroll: true },
    { label: "Services", href: "#services", scroll: true },
    { label: "Philosophy", href: "#philosophy", scroll: true },
    { label: "Careers", href: "/careers", scroll: false },
    { label: "Contact", href: "#contact", scroll: true },
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

  const handleLink = (e: MouseEvent, href: string, scroll: boolean) => {
    e.preventDefault();
    if (!scroll) {
      navigate(href);
    } else {
      const el = document.querySelector(href);
      el?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      ref={navRef}
      class="navbar"
      classList={{ "navbar--scrolled": scrolled() }}
    >
      <div class="navbar__inner container">
        <a href="/" class="navbar__logo" onClick={(e) => { e.preventDefault(); navigate("/"); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
          <Logo size={40} variant="full" />
        </a>

        <div class="navbar__links">
          {navLinks.map((link) => (
            <a
              class="navbar__link"
              href={link.href}
              onClick={(e) => handleLink(e, link.href, link.scroll)}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div class="navbar__actions">
          <a
            class="navbar__signin"
            href="/signin"
            onClick={(e) => { e.preventDefault(); navigate("/signin"); }}
          >
            Sign In
          </a>
          <a
            class="navbar__cta"
            href="/demo"
            onClick={(e) => { e.preventDefault(); navigate("/demo"); }}
          >
            Request Demo
          </a>
        </div>
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
          gap: 1.5rem;
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

        .navbar__links {
          display: flex;
          align-items: center;
          gap: 1.75rem;
          flex: 1;
          justify-content: center;
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

        .navbar__actions {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          flex-shrink: 0;
        }

        .navbar__signin {
          display: inline-block;
          font-size: 0.85rem;
          font-weight: 500;
          padding: 0.55rem 1.1rem;
          border-radius: 8px;
          color: var(--text-muted);
          border: 1px solid var(--border-subtle);
          transition: all 0.3s ease;
          white-space: nowrap;
        }

        .navbar__signin:hover {
          color: var(--text-primary);
          border-color: rgba(148, 163, 184, 0.25);
          background: rgba(255,255,255,0.03);
        }

        .navbar__cta {
          display: inline-block;
          font-size: 0.85rem;
          font-weight: 600;
          padding: 0.6rem 1.25rem;
          border-radius: 8px;
          background: linear-gradient(135deg, #4F46E5, #6366F1);
          color: #fff;
          border: 1px solid rgba(99, 102, 241, 0.3);
          transition: all 0.3s ease;
          white-space: nowrap;
          box-shadow: 0 0 20px rgba(99, 102, 241, 0.15);
        }

        .navbar__cta:hover {
          box-shadow: 0 0 32px rgba(99, 102, 241, 0.3);
          transform: translateY(-1px);
        }

        @media (max-width: 900px) {
          .navbar__links { display: none; }
          .navbar__signin { display: none; }
          .navbar__cta { font-size: 0.8rem; padding: 0.5rem 1rem; }
        }
      `}</style>
    </nav>
  );
}
