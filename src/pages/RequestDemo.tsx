import { createSignal, onMount } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { gsap } from "../lib/gsap";
import Logo from "../components/Logo";

export default function RequestDemo() {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = createSignal(false);
  const [loading, setLoading] = createSignal(false);
  let cardRef!: HTMLDivElement;
  let infoRef!: HTMLDivElement;

  onMount(() => {
    const ease = "expo.out";
    gsap.from(infoRef, { opacity: 0, y: 14, duration: 0.7,  ease, delay: 0.2 });
    gsap.from(cardRef, { opacity: 0, y: 14, duration: 0.75, ease, delay: 0.35 });
  });

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const data = new FormData(form);
    const name      = `${data.get("first") ?? ""} ${data.get("last") ?? ""}`.trim();
    const company   = String(data.get("company")   ?? "");
    const size      = String(data.get("size")      ?? "");
    const message   = String(data.get("message")   ?? "");
    const userEmail = String(data.get("email")     ?? "");

    const body = `Hi Y2kSaaS team,\n\nI'd like to schedule a product demo.\n\nName: ${name}\nCompany: ${company}\nWork Email: ${userEmail}\nTeam size: ${size}\nWhat I'd like to see:\n${message}\n\nLooking forward to hearing from you.`;
    const mailto = `mailto:sales@y2ksaas.com?subject=${encodeURIComponent("Demo Request — Y2kSaaS")}&body=${encodeURIComponent(body)}`;

    setLoading(true);
    setTimeout(() => { window.location.href = mailto; setLoading(false); setSubmitted(true); }, 600);
  };

  return (
    <div class="rd">

      <nav class="rd-nav">
        <div class="container rd-nav__inner">
          <a class="rd-nav__logo" href="/" onClick={(e) => { e.preventDefault(); navigate("/"); }}>
            <Logo size={26} variant="full" animate={false} />
          </a>
          <a class="rd-nav__back" href="/" onClick={(e) => { e.preventDefault(); navigate("/"); }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Home
          </a>
        </div>
      </nav>

      <div class="container rd-layout">

        {/* Left: positioning */}
        <div ref={infoRef} class="rd-info">
          <p class="rd-info__label">Request a Demo</p>
          <h1 class="rd-info__title">See Y2kSaaS<br />in action.</h1>
          <p class="rd-info__desc">
            A 30-minute walkthrough of our connected hardware and software
            systems, tailored to your operational challenges.
          </p>

          <ul class="rd-benefits">
            {[
              "Live demo with an engineer",
              "Tailored to your industry and use case",
              "No commitment, no sales pressure",
              "Q&A session included",
            ].map((b) => (
              <li class="rd-benefit">
                <span class="rd-benefit__mark" aria-hidden="true">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </span>
                {b}
              </li>
            ))}
          </ul>

          <p class="rd-alt">
            Prefer to talk now?{" "}
            <a
              href="/talk"
              class="rd-alt__link"
              onClick={(e) => { e.preventDefault(); navigate("/talk"); }}
            >
              Talk to an engineer
            </a>
          </p>
        </div>

        {/* Right: form */}
        <div ref={cardRef} class="rd-card">
          {submitted() ? (
            <div class="rd-success">
              <span class="rd-success__mark" aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </span>
              <h2 class="rd-success__title">Demo Requested</h2>
              <p class="rd-success__sub">We'll reach out within one business day to schedule your session.</p>
              <button class="rd-submit" style={{ "margin-top": "1.25rem" }} onClick={() => navigate("/")}>
                Back to Home
              </button>
            </div>
          ) : (
            <form class="rd-form" onSubmit={handleSubmit}>
              <h2 class="rd-form__title">Book your demo</h2>

              <div class="rd-row">
                <div class="rd-field">
                  <label class="rd-label">First Name</label>
                  <input class="rd-input" type="text" name="first" placeholder="Alex" required />
                </div>
                <div class="rd-field">
                  <label class="rd-label">Last Name</label>
                  <input class="rd-input" type="text" name="last" placeholder="Johnson" required />
                </div>
              </div>

              <div class="rd-field">
                <label class="rd-label">Work Email</label>
                <input class="rd-input" type="email" name="email" placeholder="alex@company.com" required />
              </div>

              <div class="rd-field">
                <label class="rd-label">Company</label>
                <input class="rd-input" type="text" name="company" placeholder="Company name" required />
              </div>

              <div class="rd-field">
                <label class="rd-label">Team Size</label>
                <select class="rd-input rd-select" name="size" required>
                  <option value="" disabled selected>Select size</option>
                  <option>1 - 10</option>
                  <option>11 - 50</option>
                  <option>51 - 200</option>
                  <option>200+</option>
                </select>
              </div>

              <div class="rd-field">
                <label class="rd-label">What are you looking to solve?</label>
                <textarea class="rd-input rd-textarea" name="message" placeholder="Describe your challenge or use case..." rows="3" />
              </div>

              <button
                type="submit"
                class="rd-submit"
                classList={{ "rd-submit--loading": loading() }}
              >
                {loading() ? <span class="rd-spinner" aria-label="Sending" /> : "Request Demo"}
              </button>
            </form>
          )}
        </div>
      </div>

      <style>{`
        .rd {
          min-height: 100vh;
          background: var(--bg-primary);
          color: var(--text-primary);
          font-family: var(--font-sans);
        }

        /* Nav */
        .rd-nav {
          padding: 0.9rem 0;
          border-bottom: 1px solid var(--border-subtle);
        }

        .rd-nav__inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .rd-nav__logo { display: flex; align-items: center; }

        .rd-nav__back {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.82rem;
          font-weight: 500;
          color: var(--text-muted);
          transition: color 160ms var(--ease-expo);
        }

        .rd-nav__back svg { display: inline-block; }
        .rd-nav__back:hover { color: var(--text-primary); }

        /* Two-column layout */
        .rd-layout {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(3rem, 6vw, 6rem);
          align-items: start;
          padding-top: clamp(48px, 8vh, 80px);
          padding-bottom: 4rem;
        }

        /* Info side */
        .rd-info__label {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 0.72rem;
          font-weight: 500;
          letter-spacing: 0.07em;
          color: var(--text-muted);
          margin-bottom: 1.25rem;
        }

        .rd-info__label::before {
          content: '';
          display: block;
          width: 18px;
          height: 1px;
          background: var(--text-dim);
        }

        .rd-info__title {
          font-size: clamp(1.9rem, 3.8vw, 3rem);
          font-weight: 700;
          line-height: 1.08;
          letter-spacing: -0.025em;
          color: var(--text-primary);
          margin-bottom: 1rem;
        }

        .rd-info__desc {
          font-size: 0.9rem;
          line-height: 1.65;
          color: var(--text-muted);
          max-width: 44ch;
          margin-bottom: 1.75rem;
        }

        .rd-benefits {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
          margin-bottom: 2rem;
        }

        .rd-benefit {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          font-size: 0.875rem;
          color: var(--text-secondary);
        }

        /* Square check mark — engineered aesthetic */
        .rd-benefit__mark {
          width: 20px;
          height: 20px;
          border-radius: 2px;
          background: oklch(0.56 0.21 264 / 0.1);
          border: 1px solid oklch(0.56 0.21 264 / 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--accent-indigo-light);
          flex-shrink: 0;
        }

        .rd-benefit__mark svg { display: inline-block; }

        .rd-alt {
          font-size: 0.82rem;
          color: var(--text-dim);
        }

        .rd-alt__link {
          color: var(--accent-indigo-light);
          font-weight: 500;
          transition: color 160ms var(--ease-expo);
        }

        .rd-alt__link:hover { color: var(--text-secondary); }

        /* Form card — solid surface, no glass */
        .rd-card {
          background: var(--bg-card);
          border: 1px solid var(--border-moderate);
          border-radius: 3px;
          padding: 2.25rem;
        }

        .rd-form__title {
          font-size: 1.15rem;
          font-weight: 700;
          letter-spacing: -0.015em;
          margin-bottom: 1.5rem;
          color: var(--text-primary);
        }

        .rd-form {
          display: flex;
          flex-direction: column;
          gap: 0.9rem;
        }

        .rd-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.65rem;
        }

        .rd-field {
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
        }

        .rd-label {
          font-size: 0.72rem;
          font-weight: 600;
          color: var(--text-muted);
          letter-spacing: 0.04em;
        }

        .rd-input {
          background: var(--bg-secondary);
          border: 1px solid var(--border-subtle);
          border-radius: 3px;
          padding: 0.65rem 0.9rem;
          font-size: 0.875rem;
          font-family: var(--font-sans);
          color: var(--text-primary);
          outline: none;
          width: 100%;
          transition: border-color 160ms var(--ease-expo);
        }

        .rd-input:focus {
          border-color: oklch(0.56 0.21 264 / 0.45);
        }

        .rd-input::placeholder { color: var(--text-dim); }

        .rd-select {
          cursor: pointer;
          appearance: none;
          -webkit-appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='%2364748B' viewBox='0 0 16 16'%3E%3Cpath d='M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 0.9rem center;
          padding-right: 2.25rem;
        }

        .rd-select option { background: var(--bg-secondary); color: var(--text-primary); }

        .rd-textarea {
          resize: vertical;
          min-height: 80px;
        }

        /* Submit button — solid fill */
        .rd-submit {
          width: 100%;
          padding: 0.75rem;
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
          margin-top: 0.2rem;
          transition:
            opacity   160ms var(--ease-expo),
            transform 160ms var(--ease-expo);
        }

        .rd-submit:hover:not(.rd-submit--loading) { opacity: 0.88; }
        .rd-submit:active:not(.rd-submit--loading) { transform: scale(0.97); }

        .rd-spinner {
          width: 17px;
          height: 17px;
          border: 2px solid oklch(0.96 0.006 265 / 0.3);
          border-top-color: oklch(0.96 0.006 265);
          border-radius: 50%;
          animation: rotateGlobe 0.7s linear infinite;
          display: inline-block;
        }

        /* Success state */
        .rd-success {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 0.6rem;
          padding: 1rem 0;
        }

        .rd-success__mark {
          width: 36px;
          height: 36px;
          border-radius: 3px;
          background: oklch(0.74 0.14 185 / 0.12);
          border: 1px solid oklch(0.74 0.14 185 / 0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--accent-teal-light);
          margin-bottom: 0.5rem;
        }

        .rd-success__mark svg { display: inline-block; }

        .rd-success__title {
          font-size: 1.2rem;
          font-weight: 700;
          color: var(--text-primary);
          letter-spacing: -0.015em;
        }

        .rd-success__sub {
          font-size: 0.875rem;
          color: var(--text-muted);
          line-height: 1.55;
          max-width: 36ch;
        }

        @media (max-width: 860px) {
          .rd-layout { grid-template-columns: 1fr; gap: 2.5rem; }
          .rd-row    { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}
