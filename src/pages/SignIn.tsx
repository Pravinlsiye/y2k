import { createSignal, onMount } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { gsap } from "../lib/gsap";
import Logo from "../components/Logo";

export default function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = createSignal("");
  const [step, setStep] = createSignal<"email" | "password">("email");
  const [loading, setLoading] = createSignal(false);
  let cardRef!: HTMLDivElement;
  let panelRef!: HTMLDivElement;

  onMount(() => {
    gsap.from(cardRef, {
      x: -40,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
    });
    gsap.from(panelRef, {
      x: 40,
      opacity: 0,
      duration: 0.9,
      ease: "power3.out",
      delay: 0.1,
    });
  });

  const handleContinue = (e: Event) => {
    e.preventDefault();
    if (!email()) return;
    if (step() === "email") {
      setStep("password");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/");
    }, 1200);
  };

  const features = [
    { icon: "M13 10V3L4 14h7v7l9-11h-7z", text: "Intelligent automation & workflows" },
    { icon: "M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z", text: "Scalable cloud infrastructure" },
    { icon: "M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z", text: "Connected hardware systems" },
  ];

  return (
    <div class="signin">
      {/* Left — form */}
      <div ref={cardRef} class="signin__form-panel">
        <a href="/" class="signin__back" onClick={(e) => { e.preventDefault(); navigate("/"); }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Back
        </a>

        <div class="signin__logo">
          <Logo size={38} variant="full" animate />
        </div>

        <h1 class="signin__title">
          {step() === "email" ? "Get started" : "Welcome back"}
        </h1>
        <p class="signin__subtitle">
          {step() === "email"
            ? "Sign in to your Y2kSaaS account"
            : `Signing in as ${email()}`}
        </p>

        <button class="signin__social signin__social--google" type="button">
          <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Continue with Google
        </button>

        <div class="signin__divider">
          <span>OR</span>
        </div>

        <form class="signin__form" onSubmit={handleContinue}>
          <div class="signin__field">
            <svg class="signin__field-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
            <input
              type="email"
              placeholder="Email"
              class="signin__input"
              value={email()}
              onInput={(e) => setEmail(e.currentTarget.value)}
              required
              autocomplete="email"
            />
          </div>

          {step() === "password" && (
            <div class="signin__field">
              <svg class="signin__field-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0110 0v4"/>
              </svg>
              <input
                type="password"
                placeholder="Password"
                class="signin__input"
                required
                autocomplete="current-password"
              />
            </div>
          )}

          <button type="submit" class="signin__submit" classList={{ "signin__submit--loading": loading() }}>
            {loading() ? (
              <span class="signin__spinner" />
            ) : (
              step() === "email" ? "Continue" : "Sign In"
            )}
          </button>
        </form>

        <p class="signin__terms">
          By using Y2kSaaS, you agree to our{" "}
          <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
        </p>

        <div class="signin__sso">
          <strong>Sign in with SSO</strong>
          <p>If you are part of a team, contact your team's administrator for an invite link.</p>
        </div>
      </div>

      {/* Right — visual panel */}
      <div ref={panelRef} class="signin__visual">
        <div class="signin__visual-bg" />
        <div class="signin__visual-grid" />

        <div class="signin__visual-content">
          <div class="signin__visual-globe">
            <Logo size={200} variant="icon" animate />
          </div>

          <h2 class="signin__visual-title">
            Engineering Connected Systems
          </h2>
          <p class="signin__visual-sub">
            HARDWARE &bull; SOFTWARE &bull; INTELLIGENCE
          </p>

          <ul class="signin__features">
            {features.map((f) => (
              <li class="signin__feature">
                <span class="signin__feature-icon">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d={f.icon}/>
                  </svg>
                </span>
                {f.text}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <style>{`
        .signin {
          display: grid;
          grid-template-columns: 480px 1fr;
          min-height: 100vh;
          background: var(--bg-primary);
          font-family: var(--font-sans);
        }

        /* ── LEFT PANEL ── */
        .signin__form-panel {
          display: flex;
          flex-direction: column;
          padding: 2.5rem 3rem;
          background: #0d1526;
          border-right: 1px solid var(--border-subtle);
          position: relative;
          z-index: 2;
        }

        .signin__back {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.8rem;
          color: var(--text-muted);
          margin-bottom: 2.5rem;
          transition: color 0.2s;
          width: fit-content;
        }

        .signin__back svg { display: inline-block; }
        .signin__back:hover { color: var(--text-primary); }

        .signin__logo {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          margin-bottom: 2rem;
        }


        .signin__title {
          font-size: 1.6rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 0.4rem;
        }

        .signin__subtitle {
          font-size: 0.9rem;
          color: var(--text-muted);
          margin-bottom: 2rem;
        }

        .signin__social {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          width: 100%;
          padding: 0.75rem 1rem;
          border-radius: 10px;
          font-size: 0.9rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.25s ease;
          font-family: var(--font-sans);
        }

        .signin__social svg { display: inline-block; flex-shrink: 0; }

        .signin__social--google {
          background: #fff;
          color: #111;
          border: 1px solid #e0e0e0;
        }

        .signin__social--google:hover {
          background: #f5f5f5;
          box-shadow: 0 2px 12px rgba(0,0,0,0.1);
        }

        .signin__divider {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin: 1.5rem 0;
          color: var(--text-dim);
          font-size: 0.8rem;
        }

        .signin__divider::before,
        .signin__divider::after {
          content: '';
          flex: 1;
          height: 1px;
          background: var(--border-subtle);
        }

        .signin__form {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .signin__field {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          background: rgba(255,255,255,0.03);
          border: 1px solid var(--border-subtle);
          border-radius: 10px;
          padding: 0 1rem;
          transition: border-color 0.25s;
        }

        .signin__field:focus-within {
          border-color: rgba(99,102,241,0.5);
          background: rgba(99,102,241,0.04);
        }

        .signin__field-icon {
          display: inline-block;
          color: var(--text-dim);
          flex-shrink: 0;
        }

        .signin__input {
          flex: 1;
          background: none;
          border: none;
          outline: none;
          padding: 0.85rem 0;
          font-size: 0.9rem;
          font-family: var(--font-sans);
          color: var(--text-primary);
        }

        .signin__input::placeholder { color: var(--text-dim); }

        .signin__submit {
          width: 100%;
          padding: 0.875rem;
          border-radius: 10px;
          background: linear-gradient(135deg, #4F46E5, #6366F1);
          color: #fff;
          font-size: 0.9rem;
          font-weight: 600;
          font-family: var(--font-sans);
          cursor: pointer;
          border: none;
          transition: all 0.25s ease;
          margin-top: 0.25rem;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 46px;
        }

        .signin__submit:hover:not(.signin__submit--loading) {
          box-shadow: 0 0 30px rgba(99,102,241,0.3);
          transform: translateY(-1px);
        }

        .signin__spinner {
          width: 18px;
          height: 18px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: #fff;
          border-radius: 50%;
          animation: rotateGlobe 0.7s linear infinite;
          display: inline-block;
        }

        .signin__terms {
          font-size: 0.75rem;
          color: var(--text-dim);
          margin-top: 1.25rem;
          line-height: 1.5;
        }

        .signin__terms a {
          color: var(--text-muted);
          text-decoration: underline;
          text-underline-offset: 2px;
        }

        .signin__sso {
          margin-top: 2rem;
          padding-top: 1.5rem;
          border-top: 1px solid var(--border-subtle);
        }

        .signin__sso strong {
          display: block;
          font-size: 0.85rem;
          color: var(--text-secondary);
          margin-bottom: 0.3rem;
        }

        .signin__sso p {
          font-size: 0.8rem;
          color: var(--text-dim);
          line-height: 1.5;
        }

        /* ── RIGHT PANEL ── */
        .signin__visual {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .signin__visual-bg {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 80% 70% at 60% 40%, rgba(99,102,241,0.12), transparent 60%),
                      radial-gradient(ellipse 50% 50% at 20% 80%, rgba(45,212,191,0.06), transparent 50%);
        }

        .signin__visual-grid {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(rgba(99,102,241,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99,102,241,0.05) 1px, transparent 1px);
          background-size: 50px 50px;
        }

        .signin__visual-content {
          position: relative;
          z-index: 2;
          text-align: center;
          padding: 3rem;
        }

        .signin__visual-globe {
          display: flex;
          justify-content: center;
          margin-bottom: 2rem;
          animation: float 6s ease-in-out infinite;
          filter: drop-shadow(0 0 40px rgba(99,102,241,0.18));
        }

        .signin__visual-title {
          font-size: clamp(1.4rem, 2.5vw, 2rem);
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1.2;
          margin-bottom: 0.75rem;
        }

        .signin__visual-sub {
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.25em;
          color: var(--text-muted);
          margin-bottom: 2.5rem;
        }

        .signin__features {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.9rem;
          text-align: left;
          max-width: 280px;
          margin: 0 auto;
        }

        .signin__feature {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 0.875rem;
          color: var(--text-secondary);
        }

        .signin__feature-icon {
          width: 28px;
          height: 28px;
          border-radius: 8px;
          background: rgba(99,102,241,0.12);
          border: 1px solid rgba(99,102,241,0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--accent-indigo-light);
          flex-shrink: 0;
        }

        .signin__feature-icon svg { display: inline-block; }

        @media (max-width: 860px) {
          .signin { grid-template-columns: 1fr; }
          .signin__visual { display: none; }
          .signin__form-panel { padding: 2rem 1.5rem; }
        }
      `}</style>
    </div>
  );
}
