import { createSignal, onMount } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { gsap, ScrollTrigger } from "../lib/gsap";
import Logo from "./Logo";

export default function Navbar() {
  let navRef!: HTMLElement;
  const [scrolled, setScrolled] = createSignal(false);
  const navigate = useNavigate();

  const navLinks = [
    { label: "About",      href: "#about",      scroll: true },
    { label: "Services",   href: "#services",   scroll: true },
    { label: "Philosophy", href: "#philosophy", scroll: true },
    { label: "Careers",    href: "/careers",    scroll: false },
    { label: "Contact",    href: "#contact",    scroll: true },
  ];

  onMount(() => {
    ScrollTrigger.create({
      start: "top -60",
      onUpdate: (self) => setScrolled(self.progress > 0),
    });

    gsap.from(navRef, {
      opacity: 0,
      duration: 1,
      ease: "expo.out",
      delay: 0.2,
    });
  });

  const handleLink = (e: MouseEvent, href: string, scroll: boolean) => {
    e.preventDefault();
    if (!scroll) {
      navigate(href);
    } else {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      ref={navRef}
      class="navbar"
      classList={{ "navbar--scrolled": scrolled() }}
    >
      <div class="navbar__inner container">
        <a
          href="/"
          class="navbar__logo"
          onClick={(e) => { e.preventDefault(); navigate("/"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
        >
          <Logo size={30} variant="full" />
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
          padding: 0.9rem 0;
          transition:
            background    300ms var(--ease-expo),
            border-color  300ms var(--ease-expo),
            padding       300ms var(--ease-expo);
        }

        .navbar--scrolled {
          background: oklch(0.16 0.012 265 / 0.88);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          border-bottom: 1px solid var(--border-subtle);
          padding: 0.65rem 0;
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
          flex-shrink: 0;
        }

        /* Override Logo inline SVG sizing */
        .navbar__logo .logo-root {
          gap: 0.55rem;
        }

        .navbar__logo .logo__wordmark {
          font-size: 0.95rem !important;
        }

        .navbar__links {
          display: flex;
          align-items: center;
          gap: 1.75rem;
          flex: 1;
          justify-content: center;
        }

        .navbar__link {
          font-size: 0.82rem;
          font-weight: 500;
          color: var(--text-muted);
          transition: color 160ms var(--ease-expo);
          white-space: nowrap;
        }

        .navbar__link:hover {
          color: var(--text-primary);
        }

        .navbar__actions {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          flex-shrink: 0;
        }

        .navbar__signin {
          display: inline-block;
          font-size: 0.82rem;
          font-weight: 500;
          padding: 0.45rem 1rem;
          border-radius: 3px;
          color: var(--text-muted);
          border: 1px solid var(--border-subtle);
          white-space: nowrap;
          transition:
            color        160ms var(--ease-expo),
            border-color 160ms var(--ease-expo),
            background   160ms var(--ease-expo);
        }

        .navbar__signin:hover {
          color: var(--text-secondary);
          border-color: var(--border-moderate);
          background: oklch(0.96 0.006 265 / 0.03);
        }

        .navbar__signin:active {
          transform: scale(0.97);
        }

        .navbar__cta {
          display: inline-block;
          font-size: 0.82rem;
          font-weight: 600;
          padding: 0.48rem 1.1rem;
          border-radius: 3px;
          background: var(--accent-indigo-light);
          color: oklch(0.96 0.006 265);
          white-space: nowrap;
          transition:
            opacity   160ms var(--ease-expo),
            transform 160ms var(--ease-expo);
        }

        .navbar__cta:hover {
          opacity: 0.88;
        }

        .navbar__cta:active {
          transform: scale(0.97);
        }

        @media (max-width: 900px) {
          .navbar__links  { display: none; }
          .navbar__signin { display: none; }
          .navbar__cta    { font-size: 0.78rem; padding: 0.45rem 0.9rem; }
        }
      `}</style>
    </nav>
  );
}
