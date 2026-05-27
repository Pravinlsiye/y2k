import { createSignal, onMount } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { gsap } from "../lib/gsap";
import Logo from "../components/Logo";

export default function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = createSignal("");
  const [step, setStep] = createSignal<"email" | "password">("email");
  const [loading, setLoading] = createSignal(false);
  let formPanelRef!: HTMLDivElement;
  let visualRef!: HTMLDivElement;

  onMount(() => {
    const ease = "expo.out";
    gsap.from(formPanelRef, { x: -24, opacity: 0, duration: 0.75, ease });
    gsap.from(visualRef,    { x:  24, opacity: 0, duration: 0.9,  ease, delay: 0.1 });
  });

  const handleContinue = (e: Event) => {
    e.preventDefault();
    if (!email()) return;
    if (step() === "email") { setStep("password"); return; }
    setLoading(true);
    setTimeout(() => { setLoading(false); navigate("/"); }, 1200);
  };

  return (
    <div class="si">

      {/* Left: form panel */}
      <div ref={formPanelRef} class="si-form">
        <a
          class="si-back"
          href="/"
          onClick={(e) => { e.preventDefault(); navigate("/"); }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Back
        </a>

        <div class="si-brand">
          <Logo size={32} variant="full" animate={false} />
        </div>

        <h1 class="si-title">
          {step() === "email" ? "Get started" : "Welcome back"}
        </h1>
        <p class="si-subtitle">
          {step() === "email"
            ? "Sign in to your Y2kSaaS account"
            : `Signing in as ${email()}`}
        </p>

        {/* Google OAuth */}
        <button class="si-google" type="button">
          <svg width="17" height="17" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Continue with Google
        </button>

        <div class="si-divider"><span>or</span></div>

        <form class="si-form__fields" onSubmit={handleContinue}>
          <div class="si-field">
            <svg class="si-field__icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
            <input
              type="email"
              placeholder="Email address"
              class="si-field__input"
              value={email()}
              onInput={(e) => setEmail(e.currentTarget.value)}
              required
              autocomplete="email"
            />
          </div>

          {step() === "password" && (
            <div class="si-field">
              <svg class="si-field__icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0110 0v4"/>
              </svg>
              <input
                type="password"
                placeholder="Password"
                class="si-field__input"
                required
                autocomplete="current-password"
              />
            </div>
          )}

          <button
            type="submit"
            class="si-submit"
            classList={{ "si-submit--loading": loading() }}
          >
            {loading()
              ? <span class="si-spinner" aria-label="Loading" />
              : step() === "email" ? "Continue" : "Sign In"}
          </button>
        </form>

        <p class="si-terms">
          By continuing, you agree to our{" "}
          <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
        </p>

        <div class="si-sso">
          <p class="si-sso__title">Sign in with SSO</p>
          <p class="si-sso__desc">
            Part of a team? Contact your administrator for an invite link.
          </p>
        </div>
      </div>

      {/* Right: brand visual */}
      <div ref={visualRef} class="si-visual">
        <div class="si-visual__texture" aria-hidden="true" />
        <div class="si-visual__content">
          <div class="si-visual__mark">
            <Logo size={180} variant="icon" animate={false} />
          </div>
          <h2 class="si-visual__title">
            Hardware. Software.<br />Engineered as one.
          </h2>
          <p class="si-visual__sub">hardware + software + intelligence</p>
          <ul class="si-visual__list">
            {[
              "Intelligent automation and workflows",
              "Scalable cloud infrastructure",
              "Connected hardware systems",
            ].map((item) => (
              <li class="si-visual__item">
                <span class="si-visual__dot" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <style>{`
        .si {
          display: grid;
          grid-template-columns: 440px 1fr;
          min-height: 100vh;
          background: var(--bg-primary);
          font-family: var(--font-sans);
        }

        /* ── Left form panel ── */
        .si-form {
          display: flex;
          flex-direction: column;
          padding: 2.5rem 2.75rem;
          background: var(--bg-secondary);
          border-right: 1px solid var(--border-subtle);
          position: relative;
          z-index: 2;
        }

        .si-back {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.78rem;
          font-weight: 500;
          color: var(--text-muted);
          margin-bottom: 2.5rem;
          width: fit-content;
          transition: color 160ms var(--ease-expo);
        }

        .si-back svg { display: inline-block; }
        .si-back:hover { color: var(--text-primary); }

        .si-brand {
          display: flex;
          align-items: center;
          margin-bottom: 2rem;
        }

        .si-title {
          font-size: 1.5rem;
          font-weight: 700;
          letter-spacing: -0.02em;
          color: var(--text-primary);
          margin-bottom: 0.35rem;
        }

        .si-subtitle {
          font-size: 0.875rem;
          color: var(--text-muted);
          margin-bottom: 2rem;
        }

        /* Google button — light surface, contextually appropriate */
        .si-google {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.65rem;
          width: 100%;
          padding: 0.7rem 1rem;
          border-radius: 3px;
          font-size: 0.875rem;
          font-weight: 500;
          font-family: var(--font-sans);
          background: #fff;
          color: oklch(0.2 0 0);
          border: 1px solid #ddd;
          cursor: pointer;
          transition:
            background 160ms var(--ease-expo),
            border-color 160ms var(--ease-expo);
        }

        .si-google svg { display: inline-block; flex-shrink: 0; }
        .si-google:hover { background: #f4f4f4; }
        .si-google:active { transform: scale(0.98); }

        .si-divider {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin: 1.25rem 0;
          color: var(--text-dim);
          font-size: 0.75rem;
        }

        .si-divider::before,
        .si-divider::after {
          content: '';
          flex: 1;
          height: 1px;
          background: var(--border-subtle);
        }

        /* Form fields */
        .si-form__fields {
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
        }

        .si-field {
          display: flex;
          align-items: center;
          gap: 0.7rem;
          background: var(--bg-card);
          border: 1px solid var(--border-subtle);
          border-radius: 3px;
          padding: 0 0.9rem;
          transition: border-color 160ms var(--ease-expo);
        }

        .si-field:focus-within {
          border-color: oklch(0.56 0.21 264 / 0.45);
        }

        .si-field__icon {
          display: inline-block;
          color: var(--text-dim);
          flex-shrink: 0;
        }

        .si-field__input {
          flex: 1;
          background: none;
          border: none;
          outline: none;
          padding: 0.8rem 0;
          font-size: 0.875rem;
          font-family: var(--font-sans);
          color: var(--text-primary);
        }

        .si-field__input::placeholder { color: var(--text-dim); }

        /* Submit button — solid fill */
        .si-submit {
          width: 100%;
          padding: 0.8rem;
          border-radius: 3px;
          background: var(--accent-indigo-light);
          color: oklch(0.96 0.006 265);
          font-size: 0.875rem;
          font-weight: 600;
          font-family: var(--font-sans);
          cursor: pointer;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 44px;
          margin-top: 0.25rem;
          transition:
            opacity   160ms var(--ease-expo),
            transform 160ms var(--ease-expo);
        }

        .si-submit:hover:not(.si-submit--loading) { opacity: 0.88; }
        .si-submit:active:not(.si-submit--loading) { transform: scale(0.97); }

        /* Spinner — uses existing rotateGlobe keyframe */
        .si-spinner {
          width: 17px;
          height: 17px;
          border: 2px solid oklch(0.96 0.006 265 / 0.3);
          border-top-color: oklch(0.96 0.006 265);
          border-radius: 50%;
          animation: rotateGlobe 0.7s linear infinite;
          display: inline-block;
        }

        .si-terms {
          font-size: 0.72rem;
          color: var(--text-dim);
          margin-top: 1.25rem;
          line-height: 1.5;
        }

        .si-terms a {
          color: var(--text-muted);
          text-decoration: underline;
          text-underline-offset: 2px;
        }

        .si-sso {
          margin-top: auto;
          padding-top: 1.75rem;
          border-top: 1px solid var(--border-subtle);
        }

        .si-sso__title {
          font-size: 0.82rem;
          font-weight: 600;
          color: var(--text-secondary);
          margin-bottom: 0.25rem;
        }

        .si-sso__desc {
          font-size: 0.78rem;
          color: var(--text-dim);
          line-height: 1.5;
        }

        /* ── Right visual ── */
        .si-visual {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        /* Structural grid — no radial glow blobs */
        .si-visual__texture {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(oklch(0.56 0.21 264 / 0.025) 1px, transparent 1px),
            linear-gradient(90deg, oklch(0.56 0.21 264 / 0.025) 1px, transparent 1px);
          background-size: 56px 56px;
          pointer-events: none;
        }

        .si-visual__content {
          position: relative;
          z-index: 2;
          text-align: center;
          padding: 3rem;
        }

        .si-visual__mark {
          display: flex;
          justify-content: center;
          margin-bottom: 2rem;
          opacity: 0.75;
        }

        .si-visual__title {
          font-size: clamp(1.3rem, 2.2vw, 1.8rem);
          font-weight: 700;
          line-height: 1.15;
          letter-spacing: -0.02em;
          color: var(--text-primary);
          margin-bottom: 0.6rem;
        }

        .si-visual__sub {
          font-size: 0.68rem;
          font-weight: 500;
          letter-spacing: 0.12em;
          color: var(--text-dim);
          margin-bottom: 2rem;
        }

        .si-visual__list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          text-align: left;
          max-width: 260px;
          margin: 0 auto;
        }

        .si-visual__item {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          font-size: 0.85rem;
          color: var(--text-muted);
        }

        /* Small square dot — engineered, not circular */
        .si-visual__dot {
          width: 4px;
          height: 4px;
          border-radius: 1px;
          background: var(--accent-indigo-light);
          flex-shrink: 0;
          opacity: 0.7;
        }

        @media (max-width: 860px) {
          .si { grid-template-columns: 1fr; }
          .si-visual { display: none; }
          .si-form { padding: 2rem 1.5rem; }
        }
      `}</style>
    </div>
  );
}
