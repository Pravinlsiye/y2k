import { createSignal, onMount } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { gsap, ScrollTrigger } from "../lib/gsap";
import Logo from "./Logo";
import { productsData } from "../lib/productsData";

export default function Navbar() {
  let navRef!: HTMLElement;
  const [scrolled, setScrolled] = createSignal(false);
  const [productsOpen, setProductsOpen] = createSignal(false);
  let productsTimer: ReturnType<typeof setTimeout>;
  const navigate = useNavigate();

  const navLinks = [
    { label: "About",      href: "#about",      scroll: true  },
    { label: "Services",   href: "#services",   scroll: true  },
    { label: "Careers",    href: "/careers",    scroll: false },
    { label: "Contact",    href: "#contact",    scroll: true  },
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
      return;
    }
    // If the target section exists on this page, scroll directly
    if (document.querySelector(href)) {
      document.querySelector(href)!.scrollIntoView({ behavior: "smooth" });
      return;
    }
    // Otherwise navigate to homepage then scroll after render
    navigate("/");
    setTimeout(() => {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }, 400);
  };

  const openProducts = () => {
    clearTimeout(productsTimer);
    setProductsOpen(true);
  };

  const closeProducts = () => {
    productsTimer = setTimeout(() => setProductsOpen(false), 120);
  };

  const goProduct = (route: string) => {
    setProductsOpen(false);
    navigate(route);
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

          {/* Products dropdown */}
          <div
            class="navbar__products"
            onMouseEnter={openProducts}
            onMouseLeave={closeProducts}
          >
            <button
              class="navbar__link navbar__link--products"
              classList={{ "navbar__link--open": productsOpen() }}
              onClick={() => setProductsOpen((o) => !o)}
              aria-haspopup="true"
              aria-expanded={productsOpen()}
              type="button"
            >
              Products
              <svg
                class="navbar__chevron"
                classList={{ "navbar__chevron--open": productsOpen() }}
                width="11"
                height="11"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
              >
                <path d="M6 9l6 6 6-6"/>
              </svg>
            </button>

            {/* Dropdown panel */}
            <div
              class="navbar__dropdown"
              classList={{ "navbar__dropdown--open": productsOpen() }}
              role="menu"
              onMouseEnter={openProducts}
              onMouseLeave={closeProducts}
            >
              {productsData.map((p) => (
                <button
                  class="navbar__dropdown-item"
                  onClick={() => goProduct(p.route)}
                  role="menuitem"
                  type="button"
                >
                  <span class="navbar__dropdown-name">{p.name}</span>
                  <span class="navbar__dropdown-cat">{p.category}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Regular links */}
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

        .navbar__links {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          flex: 1;
          justify-content: center;
        }

        .navbar__link {
          font-size: 0.82rem;
          font-weight: 500;
          color: var(--text-muted);
          transition: color 160ms var(--ease-expo);
          white-space: nowrap;
          background: none;
          border: none;
          cursor: pointer;
          font-family: var(--font-sans);
          padding: 0;
        }

        .navbar__link:hover,
        .navbar__link--open {
          color: var(--text-primary);
        }

        /* Products dropdown trigger */
        .navbar__products {
          position: relative;
          display: flex;
          align-items: center;
        }

        .navbar__link--products {
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }

        .navbar__chevron {
          display: inline-block;
          transition: transform 200ms var(--ease-expo);
          flex-shrink: 0;
          opacity: 0.7;
        }

        .navbar__chevron--open {
          transform: rotate(180deg);
        }

        /* Dropdown panel */
        .navbar__dropdown {
          position: absolute;
          top: calc(100% + 10px);
          left: 50%;
          transform: translateX(-50%);
          background: oklch(0.19 0.011 265);
          border: 1px solid var(--border-moderate);
          border-radius: 4px;
          padding: 0.4rem;
          min-width: 220px;
          box-shadow: 0 8px 32px oklch(0 0 0 / 0.35);
          opacity: 0;
          transform: translateX(-50%) translateY(-6px);
          pointer-events: none;
          transition:
            opacity   180ms var(--ease-expo),
            transform 180ms var(--ease-expo);
          z-index: 200;
        }

        .navbar__dropdown--open {
          opacity: 1;
          transform: translateX(-50%) translateY(0);
          pointer-events: all;
        }

        /* Dropdown arrow tip */
        .navbar__dropdown::before {
          content: '';
          position: absolute;
          top: -5px;
          left: 50%;
          transform: translateX(-50%) rotate(45deg);
          width: 8px;
          height: 8px;
          background: oklch(0.19 0.011 265);
          border-top: 1px solid var(--border-moderate);
          border-left: 1px solid var(--border-moderate);
        }

        .navbar__dropdown-item {
          display: flex;
          flex-direction: column;
          gap: 0.15rem;
          width: 100%;
          padding: 0.65rem 0.85rem;
          border-radius: 3px;
          background: none;
          border: none;
          cursor: pointer;
          font-family: var(--font-sans);
          text-align: left;
          transition: background 140ms var(--ease-expo);
        }

        .navbar__dropdown-item:hover {
          background: oklch(0.96 0.006 265 / 0.05);
        }

        .navbar__dropdown-item:active {
          transform: scale(0.98);
        }

        .navbar__dropdown-name {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        .navbar__dropdown-cat {
          font-size: 0.68rem;
          color: var(--text-dim);
          font-variant-numeric: tabular-nums;
        }

        /* Right actions */
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

        .navbar__signin:active { transform: scale(0.97); }

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

        .navbar__cta:hover { opacity: 0.88; }
        .navbar__cta:active { transform: scale(0.97); }

        @media (max-width: 900px) {
          .navbar__links  { display: none; }
          .navbar__signin { display: none; }
          .navbar__cta    { font-size: 0.78rem; padding: 0.45rem 0.9rem; }
        }
      `}</style>
    </nav>
  );
}
