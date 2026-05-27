import { createSignal, onMount } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { gsap } from "../lib/gsap";
import Logo from "../components/Logo";

const domains = [
  "Hardware and Embedded Systems",
  "Cloud Infrastructure and SaaS",
  "AI and Automation",
];

export default function TalkExpert() {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = createSignal(false);
  const [loading, setLoading] = createSignal(false);
  let cardRef!: HTMLDivElement;
  let infoRef!: HTMLDivElement;

  onMount(() => {
    const ease = "expo.out";
    gsap.from(infoRef, { opacity: 0, y: 14, duration: 0.7,  ease, delay: 0.2  });
    gsap.from(cardRef, { opacity: 0, y: 14, duration: 0.75, ease, delay: 0.35 });
  });

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const data = new FormData(form);
    const name      = `${data.get("first") ?? ""} ${data.get("last") ?? ""}`.trim();
    const topic     = String(data.get("topic")   ?? "General Inquiry");
    const message   = String(data.get("message") ?? "");
    const userEmail = String(data.get("email")   ?? "");

    const body   = `Hi Y2kSaaS,\n\nI'd like to speak with one of your engineers.\n\nName: ${name}\nWork Email: ${userEmail}\nTopic: ${topic}\n\nMessage:\n${message}\n\nThanks.`;
    const mailto = `mailto:sales@y2ksaas.com?subject=${encodeURIComponent(`Talk with Expert: ${topic}`)}&body=${encodeURIComponent(body)}`;

    setLoading(true);
    setTimeout(() => { window.location.href = mailto; setLoading(false); setSubmitted(true); }, 600);
  };

  return (
    <div class="te">

      <nav class="te-nav">
        <div class="container te-nav__inner">
          <a class="te-nav__logo" href="/" onClick={(e) => { e.preventDefault(); navigate("/"); }}>
            <Logo size={26} variant="full" animate={false} />
          </a>
          <a class="te-nav__back" href="/" onClick={(e) => { e.preventDefault(); navigate("/"); }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Home
          </a>
        </div>
      </nav>

      <div class="container te-layout">

        {/* Left: info */}
        <div ref={infoRef} class="te-info">
          <p class="te-info__label">Talk with an Expert</p>
          <h1 class="te-info__title">Speak directly<br />with our engineers.</h1>
          <p class="te-info__desc">
            Skip the sales process. Connect with a Y2kSaaS engineer who
            specialises in your area of interest.
          </p>

          {/* Domain list — plain, no glass */}
          <div class="te-domains">
            {domains.map((d) => (
              <div class="te-domain">
                <span class="te-domain__dot" aria-hidden="true" />
                <span class="te-domain__name">{d}</span>
              </div>
            ))}
          </div>

          <p class="te-alt">
            Or email us directly:{" "}
            <a href="mailto:sales@y2ksaas.com" class="te-alt__link">
              sales@y2ksaas.com
            </a>
          </p>
        </div>

        {/* Right: form */}
        <div ref={cardRef} class="te-card">
          {submitted() ? (
            <div class="te-success">
              <span class="te-success__mark" aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </span>
              <h2 class="te-success__title">Request Sent</h2>
              <p class="te-success__sub">An engineer will contact you within 4 business hours.</p>
              <button class="te-submit" style={{ "margin-top": "1.25rem" }} onClick={() => navigate("/")}>
                Back to Home
              </button>
            </div>
          ) : (
            <form class="te-form" onSubmit={handleSubmit}>
              <h2 class="te-form__title">Connect with an engineer</h2>

              <div class="te-row">
                <div class="te-field">
                  <label class="te-label">First Name</label>
                  <input class="te-input" type="text" name="first" placeholder="Alex" required />
                </div>
                <div class="te-field">
                  <label class="te-label">Last Name</label>
                  <input class="te-input" type="text" name="last" placeholder="Johnson" required />
                </div>
              </div>

              <div class="te-field">
                <label class="te-label">Work Email</label>
                <input class="te-input" type="email" name="email" placeholder="alex@company.com" required />
              </div>

              <div class="te-field">
                <label class="te-label">Topic</label>
                <select class="te-input te-select" name="topic" required>
                  <option value="" disabled selected>What do you need help with?</option>
                  <option>Hardware and Embedded Systems</option>
                  <option>Cloud Infrastructure and SaaS</option>
                  <option>AI and Automation</option>
                  <option>Enterprise Integration</option>
                  <option>General Inquiry</option>
                </select>
              </div>

              <div class="te-field">
                <label class="te-label">Message (optional)</label>
                <textarea class="te-input te-textarea" name="message" placeholder="Tell us what you're working on..." rows="3" />
              </div>

              <button
                type="submit"
                class="te-submit"
                classList={{ "te-submit--loading": loading() }}
              >
                {loading() ? <span class="te-spinner" aria-label="Sending" /> : "Request a Conversation"}
              </button>
            </form>
          )}
        </div>
      </div>

      <style>{`
        .te {
          min-height: 100vh;
          background: var(--bg-primary);
          color: var(--text-primary);
          font-family: var(--font-sans);
        }

        /* Nav */
        .te-nav {
          padding: 0.9rem 0;
          border-bottom: 1px solid var(--border-subtle);
        }

        .te-nav__inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .te-nav__logo { display: flex; align-items: center; }

        .te-nav__back {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.82rem;
          font-weight: 500;
          color: var(--text-muted);
          transition: color 160ms var(--ease-expo);
        }

        .te-nav__back svg { display: inline-block; }
        .te-nav__back:hover { color: var(--text-primary); }

        /* Two-column layout */
        .te-layout {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(3rem, 6vw, 6rem);
          align-items: start;
          padding-top: clamp(48px, 8vh, 80px);
          padding-bottom: 4rem;
        }

        /* Info side */
        .te-info__label {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 0.72rem;
          font-weight: 500;
          letter-spacing: 0.07em;
          color: var(--text-muted);
          margin-bottom: 1.25rem;
        }

        .te-info__label::before {
          content: '';
          display: block;
          width: 18px;
          height: 1px;
          background: var(--text-dim);
        }

        .te-info__title {
          font-size: clamp(1.9rem, 3.8vw, 3rem);
          font-weight: 700;
          line-height: 1.08;
          letter-spacing: -0.025em;
          color: var(--text-primary);
          margin-bottom: 1rem;
        }

        .te-info__desc {
          font-size: 0.9rem;
          line-height: 1.65;
          color: var(--text-muted);
          max-width: 42ch;
          margin-bottom: 1.75rem;
        }

        /* Domain list — plain taxonomy, no glass */
        .te-domains {
          display: flex;
          flex-direction: column;
          gap: 0;
          border: 1px solid var(--border-subtle);
          border-radius: 3px;
          overflow: hidden;
          margin-bottom: 1.75rem;
        }

        .te-domain {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 0.85rem 1.25rem;
          border-bottom: 1px solid var(--border-subtle);
          background: var(--bg-card);
          transition: background 160ms var(--ease-expo);
        }

        .te-domain:last-child { border-bottom: none; }
        .te-domain:hover { background: var(--bg-secondary); }

        .te-domain__dot {
          width: 6px;
          height: 6px;
          border-radius: 1px;
          background: var(--accent-teal-light);
          flex-shrink: 0;
          opacity: 0.7;
        }

        .te-domain__name {
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--text-secondary);
        }

        .te-alt {
          font-size: 0.82rem;
          color: var(--text-dim);
        }

        .te-alt__link {
          color: var(--accent-teal-light);
          font-weight: 500;
          transition: color 160ms var(--ease-expo);
        }

        .te-alt__link:hover { color: var(--text-secondary); }

        /* Form card — solid surface */
        .te-card {
          background: var(--bg-card);
          border: 1px solid var(--border-moderate);
          border-radius: 3px;
          padding: 2.25rem;
        }

        .te-form__title {
          font-size: 1.15rem;
          font-weight: 700;
          letter-spacing: -0.015em;
          margin-bottom: 1.5rem;
          color: var(--text-primary);
        }

        .te-form {
          display: flex;
          flex-direction: column;
          gap: 0.9rem;
        }

        .te-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.65rem;
        }

        .te-field {
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
        }

        .te-label {
          font-size: 0.72rem;
          font-weight: 600;
          color: var(--text-muted);
          letter-spacing: 0.04em;
        }

        .te-input {
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

        .te-input:focus {
          border-color: oklch(0.74 0.14 185 / 0.4);
        }

        .te-input::placeholder { color: var(--text-dim); }

        .te-select {
          cursor: pointer;
          appearance: none;
          -webkit-appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='%2364748B' viewBox='0 0 16 16'%3E%3Cpath d='M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 0.9rem center;
          padding-right: 2.25rem;
        }

        .te-select option { background: var(--bg-secondary); color: var(--text-primary); }
        .te-textarea { resize: vertical; min-height: 80px; }

        /* Submit button — teal for Talk, differentiates from Demo */
        .te-submit {
          width: 100%;
          padding: 0.75rem;
          border-radius: 3px;
          background: var(--accent-teal-light);
          color: oklch(0.16 0.012 265);
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

        .te-submit:hover:not(.te-submit--loading) { opacity: 0.88; }
        .te-submit:active:not(.te-submit--loading) { transform: scale(0.97); }

        .te-spinner {
          width: 17px;
          height: 17px;
          border: 2px solid oklch(0.16 0.012 265 / 0.3);
          border-top-color: oklch(0.16 0.012 265);
          border-radius: 50%;
          animation: rotateGlobe 0.7s linear infinite;
          display: inline-block;
        }

        /* Success state */
        .te-success {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 0.6rem;
          padding: 1rem 0;
        }

        .te-success__mark {
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

        .te-success__mark svg { display: inline-block; }

        .te-success__title {
          font-size: 1.2rem;
          font-weight: 700;
          color: var(--text-primary);
          letter-spacing: -0.015em;
        }

        .te-success__sub {
          font-size: 0.875rem;
          color: var(--text-muted);
          line-height: 1.55;
          max-width: 36ch;
        }

        @media (max-width: 860px) {
          .te-layout { grid-template-columns: 1fr; gap: 2.5rem; }
          .te-row    { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}
