import { createSignal, onMount, onCleanup } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { gsap, ScrollTrigger } from "../lib/gsap";
import Logo from "./Logo";
import { productsData } from "../lib/productsData";

export default function Navbar() {
  let navRef!: HTMLElement;
  const [scrolled,      setScrolled]      = createSignal(false);
  const [productsOpen,  setProductsOpen]  = createSignal(false);
  const [mobileOpen,    setMobileOpen]    = createSignal(false);
  const [mobileProducts, setMobileProducts] = createSignal(false);
  let productsTimer: ReturnType<typeof setTimeout>;
  const navigate = useNavigate();

  const navLinks = [
    { label: "About",    href: "#about",    scroll: true  },
    { label: "Services", href: "#services", scroll: true  },
    { label: "Careers",  href: "/careers",  scroll: false },
    { label: "Contact",  href: "#contact",  scroll: true  },
  ];

  onMount(() => {
    ScrollTrigger.create({
      start: "top -60",
      onUpdate: (self) => setScrolled(self.progress > 0),
    });

    gsap.from(navRef, { opacity: 0, duration: 1, ease: "expo.out", delay: 0.2 });

    // Close mobile drawer on route change / resize
    const onResize = () => { if (window.innerWidth > 900) setMobileOpen(false); };
    window.addEventListener("resize", onResize);
    onCleanup(() => window.removeEventListener("resize", onResize));
  });

  const handleLink = (e: MouseEvent, href: string, scroll: boolean) => {
    e.preventDefault();
    setMobileOpen(false);
    if (!scroll) { navigate(href); return; }
    if (document.querySelector(href)) {
      document.querySelector(href)!.scrollIntoView({ behavior: "smooth" });
      return;
    }
    navigate("/");
    setTimeout(() => document.querySelector(href)?.scrollIntoView({ behavior: "smooth" }), 400);
  };

  const openProducts  = () => { clearTimeout(productsTimer); setProductsOpen(true); };
  const closeProducts = () => { productsTimer = setTimeout(() => setProductsOpen(false), 120); };

  const goProduct = (route: string) => {
    setProductsOpen(false);
    setMobileOpen(false);
    navigate(route);
  };

  const toggleMobile = () => setMobileOpen((o) => !o);

  return (
    <nav ref={navRef} class="navbar" classList={{ "navbar--scrolled": scrolled() }}>
      <div class="navbar__inner container">

        {/* Logo */}
        <a
          href="/"
          class="navbar__logo"
          onClick={(e) => { e.preventDefault(); navigate("/"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
        >
          <Logo size={30} variant="full" />
        </a>

        {/* Desktop links */}
        <div class="navbar__links">
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
                width="11" height="11" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" stroke-width="2.5"
                stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"
              >
                <path d="M6 9l6 6 6-6"/>
              </svg>
            </button>
            <div
              class="navbar__dropdown"
              classList={{ "navbar__dropdown--open": productsOpen() }}
              role="menu"
              onMouseEnter={openProducts}
              onMouseLeave={closeProducts}
            >
              {productsData.map((p) => (
                <button class="navbar__dropdown-item" onClick={() => goProduct(p.route)} role="menuitem" type="button">
                  <span class="navbar__dropdown-name">{p.name}</span>
                  <span class="navbar__dropdown-cat">{p.category}</span>
                </button>
              ))}
            </div>
          </div>

          {navLinks.map((link) => (
            <a class="navbar__link" href={link.href} onClick={(e) => handleLink(e, link.href, link.scroll)}>
              {link.label}
            </a>
          ))}
        </div>

        {/* Desktop right actions */}
        <div class="navbar__actions">
          <a class="navbar__signin" href="/signin" onClick={(e) => { e.preventDefault(); navigate("/signin"); }}>
            Sign In
          </a>
          <a class="navbar__cta" href="/demo" onClick={(e) => { e.preventDefault(); navigate("/demo"); }}>
            Request Demo
          </a>
        </div>

        {/* Hamburger — mobile only */}
        <button
          class="navbar__burger"
          classList={{ "navbar__burger--open": mobileOpen() }}
          onClick={toggleMobile}
          aria-label={mobileOpen() ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen()}
          type="button"
        >
          <span class="navbar__burger-line" />
          <span class="navbar__burger-line" />
          <span class="navbar__burger-line" />
        </button>

      </div>

      {/* Backdrop — tap to close */}
      {mobileOpen() && (
        <div
          class="navbar__backdrop"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile drawer */}
      <div
        class="navbar__mobile"
        classList={{ "navbar__mobile--open": mobileOpen() }}
        aria-hidden={!mobileOpen()}
      >
        {/* Drawer header with close button */}
        <div class="navbar__mobile-header">
          <a
            href="/"
            class="navbar__logo"
            onClick={(e) => { e.preventDefault(); setMobileOpen(false); navigate("/"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
          >
            <Logo size={26} variant="full" />
          </a>
          <button
            class="navbar__mobile-close"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
            type="button"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M18 6 6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <div class="navbar__mobile-inner">

          {/* Products (expandable) */}
          <div class="navbar__mobile-group">
            <button
              class="navbar__mobile-link navbar__mobile-link--group"
              onClick={() => setMobileProducts((o) => !o)}
              type="button"
            >
              Products
              <svg
                class="navbar__chevron"
                classList={{ "navbar__chevron--open": mobileProducts() }}
                width="13" height="13" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" stroke-width="2.5"
                stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"
              >
                <path d="M6 9l6 6 6-6"/>
              </svg>
            </button>

            <div
              class="navbar__mobile-sub"
              classList={{ "navbar__mobile-sub--open": mobileProducts() }}
            >
              {productsData.map((p) => (
                <button class="navbar__mobile-product" onClick={() => goProduct(p.route)} type="button">
                  <span class="navbar__mobile-product-name">{p.name}</span>
                  <span class="navbar__mobile-product-cat">{p.category}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Regular links */}
          {navLinks.map((link) => (
            <a
              class="navbar__mobile-link"
              href={link.href}
              onClick={(e) => handleLink(e, link.href, link.scroll)}
            >
              {link.label}
            </a>
          ))}

          {/* Actions */}
          <div class="navbar__mobile-actions">
            <a
              href="/signin"
              class="navbar__mobile-signin"
              onClick={(e) => { e.preventDefault(); setMobileOpen(false); navigate("/signin"); }}
            >
              Sign In
            </a>
            <a
              href="/demo"
              class="navbar__mobile-cta"
              onClick={(e) => { e.preventDefault(); setMobileOpen(false); navigate("/demo"); }}
            >
              Request Demo
            </a>
          </div>
        </div>
      </div>

      <style>{`
        .navbar {
          position: fixed;
          top: 0; left: 0;
          width: 100%;
          z-index: 100;
          padding: 0.9rem 0;
          transition:
            background   300ms var(--ease-expo),
            border-color 300ms var(--ease-expo),
            padding      300ms var(--ease-expo);
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

        .navbar__logo { display: flex; align-items: center; flex-shrink: 0; }

        /* ── Desktop links ── */
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
        .navbar__link--open { color: var(--text-primary); }

        .navbar__products { position: relative; display: flex; align-items: center; }

        .navbar__link--products { display: flex; align-items: center; gap: 0.25rem; }

        .navbar__chevron {
          display: inline-block;
          transition: transform 200ms var(--ease-expo);
          flex-shrink: 0;
          opacity: 0.7;
        }

        .navbar__chevron--open { transform: rotate(180deg); }

        .navbar__dropdown {
          position: absolute;
          top: calc(100% + 10px);
          left: 50%;
          transform: translateX(-50%) translateY(-6px);
          background: oklch(0.19 0.011 265);
          border: 1px solid var(--border-moderate);
          border-radius: 4px;
          padding: 0.4rem;
          min-width: 220px;
          box-shadow: 0 8px 32px oklch(0 0 0 / 0.35);
          opacity: 0;
          pointer-events: none;
          transition: opacity 180ms var(--ease-expo), transform 180ms var(--ease-expo);
          z-index: 200;
        }

        .navbar__dropdown--open {
          opacity: 1;
          transform: translateX(-50%) translateY(0);
          pointer-events: all;
        }

        .navbar__dropdown::before {
          content: '';
          position: absolute;
          top: -5px; left: 50%;
          transform: translateX(-50%) rotate(45deg);
          width: 8px; height: 8px;
          background: oklch(0.19 0.011 265);
          border-top: 1px solid var(--border-moderate);
          border-left: 1px solid var(--border-moderate);
        }

        .navbar__dropdown-item {
          display: flex; flex-direction: column; gap: 0.15rem;
          width: 100%; padding: 0.65rem 0.85rem; border-radius: 3px;
          background: none; border: none; cursor: pointer;
          font-family: var(--font-sans); text-align: left;
          transition: background 140ms var(--ease-expo);
        }

        .navbar__dropdown-item:hover { background: oklch(0.96 0.006 265 / 0.05); }
        .navbar__dropdown-item:active { transform: scale(0.98); }
        .navbar__dropdown-name { font-size: 0.85rem; font-weight: 600; color: var(--text-primary); }
        .navbar__dropdown-cat { font-size: 0.68rem; color: var(--text-dim); }

        /* ── Desktop actions ── */
        .navbar__actions {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          flex-shrink: 0;
        }

        .navbar__signin {
          display: inline-block;
          font-size: 0.82rem; font-weight: 500;
          padding: 0.45rem 1rem; border-radius: 3px;
          color: var(--text-muted); border: 1px solid var(--border-subtle);
          white-space: nowrap;
          transition: color 160ms var(--ease-expo), border-color 160ms var(--ease-expo), background 160ms var(--ease-expo);
        }

        .navbar__signin:hover { color: var(--text-secondary); border-color: var(--border-moderate); background: oklch(0.96 0.006 265 / 0.03); }
        .navbar__signin:active { transform: scale(0.97); }

        .navbar__cta {
          display: inline-block;
          font-size: 0.82rem; font-weight: 600;
          padding: 0.48rem 1.1rem; border-radius: 3px;
          background: var(--accent-indigo-light);
          color: oklch(0.96 0.006 265);
          white-space: nowrap;
          transition: opacity 160ms var(--ease-expo), transform 160ms var(--ease-expo);
        }

        .navbar__cta:hover { opacity: 0.88; }
        .navbar__cta:active { transform: scale(0.97); }

        /* ── Hamburger ── */
        .navbar__burger {
          display: none;
          flex-direction: column;
          justify-content: center;
          gap: 4px;
          width: 36px; height: 36px;
          border-radius: 3px;
          background: none;
          border: 1px solid var(--border-subtle);
          cursor: pointer;
          padding: 0 8px;
          transition: border-color 160ms var(--ease-expo), background 160ms var(--ease-expo);
        }

        .navbar__burger:hover { border-color: var(--border-moderate); background: oklch(0.96 0.006 265 / 0.03); }
        .navbar__burger:active { transform: scale(0.96); }

        .navbar__burger-line {
          display: block;
          width: 100%; height: 1.5px;
          background: var(--text-muted);
          border-radius: 1px;
          transition: transform 220ms var(--ease-expo), opacity 160ms var(--ease-expo);
          transform-origin: center;
        }

        /* X shape when open */
        .navbar__burger--open .navbar__burger-line:nth-child(1) {
          transform: translateY(5.5px) rotate(45deg);
        }
        .navbar__burger--open .navbar__burger-line:nth-child(2) {
          opacity: 0;
          transform: scaleX(0);
        }
        .navbar__burger--open .navbar__burger-line:nth-child(3) {
          transform: translateY(-5.5px) rotate(-45deg);
        }

        /* ── Backdrop ── */
        .navbar__backdrop {
          position: fixed;
          inset: 0;
          z-index: 98;
          background: oklch(0 0 0 / 0.5);
          cursor: pointer;
        }

        /* ── Mobile drawer ── */
        .navbar__mobile {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: oklch(0.16 0.012 265);
          z-index: 99;
          display: flex;
          flex-direction: column;
          opacity: 0;
          pointer-events: none;
          transform: translateY(-10px);
          transition:
            opacity   220ms var(--ease-expo),
            transform 220ms var(--ease-expo);
        }

        .navbar__mobile--open {
          opacity: 1;
          pointer-events: all;
          transform: translateY(0);
        }

        /* Drawer header row */
        .navbar__mobile-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.85rem clamp(20px, 4vw, 48px);
          border-bottom: 1px solid var(--border-subtle);
          flex-shrink: 0;
        }

        /* Close button — 44px touch target, prominent X */
        .navbar__mobile-close {
          width: 44px;
          height: 44px;
          border-radius: 3px;
          background: var(--bg-card);
          border: 1px solid var(--border-moderate);
          color: var(--text-secondary);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-sans);
          transition:
            background  160ms var(--ease-expo),
            color       160ms var(--ease-expo),
            transform   160ms var(--ease-expo);
        }

        .navbar__mobile-close:hover {
          background: var(--bg-secondary);
          color: var(--text-primary);
        }

        .navbar__mobile-close:active { transform: scale(0.94); }
        .navbar__mobile-close svg { display: inline-block; }

        .navbar__mobile-inner {
          display: flex;
          flex-direction: column;
          gap: 0;
          padding: 0.5rem 0;
          overflow-y: auto;
          flex: 1;
        }

        .navbar__mobile-link {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem clamp(20px, 4vw, 48px);
          font-size: 1.1rem;
          font-weight: 500;
          color: var(--text-secondary);
          border: none;
          background: none;
          cursor: pointer;
          font-family: var(--font-sans);
          border-bottom: 1px solid var(--border-subtle);
          text-align: left;
          width: 100%;
          transition: color 160ms var(--ease-expo), background 160ms var(--ease-expo);
        }

        .navbar__mobile-link:hover,
        .navbar__mobile-link:active { color: var(--text-primary); background: oklch(0.96 0.006 265 / 0.02); }

        .navbar__mobile-link--group { font-weight: 600; color: var(--text-primary); }

        /* Products sub-menu */
        .navbar__mobile-sub {
          max-height: 0;
          overflow: hidden;
          transition: max-height 280ms var(--ease-expo);
          background: var(--bg-secondary);
          border-bottom: 1px solid var(--border-subtle);
        }

        .navbar__mobile-sub--open {
          max-height: 400px;
        }

        .navbar__mobile-product {
          display: flex;
          flex-direction: column;
          gap: 0.15rem;
          width: 100%;
          padding: 0.9rem clamp(20px, 4vw, 48px) 0.9rem clamp(36px, 6vw, 72px);
          background: none;
          border: none;
          border-bottom: 1px solid var(--border-subtle);
          cursor: pointer;
          font-family: var(--font-sans);
          text-align: left;
          transition: background 140ms var(--ease-expo);
        }

        .navbar__mobile-product:last-child { border-bottom: none; }
        .navbar__mobile-product:hover { background: oklch(0.96 0.006 265 / 0.03); }

        .navbar__mobile-product-name {
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        .navbar__mobile-product-cat {
          font-size: 0.72rem;
          color: var(--text-dim);
        }

        /* Mobile bottom actions */
        .navbar__mobile-actions {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          padding: 1.5rem clamp(20px, 4vw, 48px);
          margin-top: auto;
        }

        .navbar__mobile-signin {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0.85rem 1.5rem;
          border-radius: 3px;
          font-size: 0.95rem;
          font-weight: 500;
          color: var(--text-secondary);
          border: 1px solid var(--border-moderate);
          text-align: center;
          transition: color 160ms var(--ease-expo), border-color 160ms var(--ease-expo);
        }

        .navbar__mobile-signin:hover { color: var(--text-primary); border-color: var(--border-strong); }
        .navbar__mobile-signin:active { transform: scale(0.97); }

        .navbar__mobile-cta {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0.9rem 1.5rem;
          border-radius: 3px;
          font-size: 0.95rem;
          font-weight: 600;
          background: var(--accent-indigo-light);
          color: oklch(0.96 0.006 265);
          text-align: center;
          transition: opacity 160ms var(--ease-expo), transform 160ms var(--ease-expo);
        }

        .navbar__mobile-cta:hover { opacity: 0.88; }
        .navbar__mobile-cta:active { transform: scale(0.97); }

        /* ── Breakpoints ── */
        @media (max-width: 900px) {
          .navbar__links  { display: none; }
          .navbar__signin { display: none; }
          .navbar__cta    { display: none; }
          .navbar__burger { display: flex; }
        }
      `}</style>
    </nav>
  );
}
