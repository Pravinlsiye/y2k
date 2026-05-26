import { createSignal, onMount } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { gsap } from "../lib/gsap";
import Logo from "../components/Logo";

export default function RequestDemo() {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = createSignal(false);
  const [loading, setLoading] = createSignal(false);
  let cardRef!: HTMLDivElement;

  onMount(() => {
    gsap.from(cardRef, {
      y: 40,
      opacity: 0,
      duration: 0.9,
      ease: "power3.out",
    });
  });

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const data = new FormData(form);
    const name = `${data.get("first") ?? ""} ${data.get("last") ?? ""}`.trim();
    const company = String(data.get("company") ?? "");
    const size = String(data.get("size") ?? "");
    const message = String(data.get("message") ?? "");
    const userEmail = String(data.get("email") ?? "");

    const body = `Hi Y2kSaaS team,\n\nI'd like to schedule a product demo.\n\nName: ${name}\nCompany: ${company}\nWork Email: ${userEmail}\nTeam size: ${size}\nWhat I'd like to see:\n${message}\n\nLooking forward to hearing from you.`;
    const mailto = `mailto:sales@y2ksaas.com?subject=${encodeURIComponent("Demo Request — Y2kSaaS")}&body=${encodeURIComponent(body)}`;

    setLoading(true);
    setTimeout(() => {
      window.location.href = mailto;
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <div class="demo">
      <div class="demo__bg-glow demo__bg-glow--1" />
      <div class="demo__bg-glow demo__bg-glow--2" />
      <div class="demo__grid" />

      {/* Back nav */}
      <nav class="demo__nav">
        <div class="container demo__nav-inner">
          <a class="demo__nav-logo" href="/" onClick={(e) => { e.preventDefault(); navigate("/"); }}>
            <Logo size={28} variant="full" />
          </a>
          <a class="demo__nav-back" href="/" onClick={(e) => { e.preventDefault(); navigate("/"); }}>← Home</a>
        </div>
      </nav>

      <div class="demo__content container">
        {/* Left */}
        <div class="demo__info">
          <span class="section-label">Request a Demo</span>
          <h1 class="demo__title">See Y2kSaaS in Action</h1>
          <p class="demo__desc">
            Get a personalised walkthrough of our connected hardware and software
            systems — tailored to your operational challenges.
          </p>

          <ul class="demo__benefits">
            {[
              "30-minute live demo with an engineer",
              "Tailored to your industry and use case",
              "No commitment, no sales pressure",
              "Q&A session included",
            ].map((b) => (
              <li class="demo__benefit">
                <span class="demo__check">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </span>
                {b}
              </li>
            ))}
          </ul>

          <div class="demo__or-talk">
            <span>Prefer to talk now?</span>
            <a href="/talk" onClick={(e) => { e.preventDefault(); navigate("/talk"); }} class="demo__talk-link">
              Talk with an Expert →
            </a>
          </div>
        </div>

        {/* Right — form card */}
        <div ref={cardRef} class="demo__card glass-card">
          {submitted() ? (
            <div class="demo__success">
              <div class="demo__success-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>
              <h2>Demo Requested!</h2>
              <p>We'll reach out within 1 business day to schedule your session.</p>
              <button class="demo__submit" onClick={() => navigate("/")} style={{ "margin-top": "1.5rem" }}>
                Back to Home
              </button>
            </div>
          ) : (
            <form class="demo__form" onSubmit={handleSubmit}>
              <h2 class="demo__form-title">Book Your Demo</h2>

              <div class="demo__row">
                <div class="demo__field">
                  <label class="demo__label">First Name</label>
                  <input class="demo__input" type="text" name="first" placeholder="Alex" required />
                </div>
                <div class="demo__field">
                  <label class="demo__label">Last Name</label>
                  <input class="demo__input" type="text" name="last" placeholder="Johnson" required />
                </div>
              </div>

              <div class="demo__field">
                <label class="demo__label">Work Email</label>
                <input class="demo__input" type="email" name="email" placeholder="alex@company.com" required />
              </div>

              <div class="demo__field">
                <label class="demo__label">Company</label>
                <input class="demo__input" type="text" name="company" placeholder="Your Company" required />
              </div>

              <div class="demo__field">
                <label class="demo__label">Team Size</label>
                <select class="demo__input demo__select" name="size" required>
                  <option value="" disabled selected>Select size</option>
                  <option>1 – 10</option>
                  <option>11 – 50</option>
                  <option>51 – 200</option>
                  <option>200+</option>
                </select>
              </div>

              <div class="demo__field">
                <label class="demo__label">What are you looking to solve?</label>
                <textarea class="demo__input demo__textarea" name="message" placeholder="Describe your challenge or use case..." rows="3" />
              </div>

              <button type="submit" class="demo__submit" classList={{ "demo__submit--loading": loading() }}>
                {loading() ? <span class="demo__spinner" /> : "Request Demo"}
              </button>
            </form>
          )}
        </div>
      </div>

      <style>{`
        .demo {
          min-height: 100vh;
          background: var(--bg-primary);
          color: var(--text-primary);
          font-family: var(--font-sans);
          position: relative;
          overflow: hidden;
        }

        .demo__bg-glow {
          position: fixed;
          border-radius: 50%;
          filter: blur(120px);
          pointer-events: none;
          z-index: 0;
        }

        .demo__bg-glow--1 {
          width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(99,102,241,0.1), transparent);
          top: -100px; left: -100px;
        }

        .demo__bg-glow--2 {
          width: 400px; height: 400px;
          background: radial-gradient(circle, rgba(45,212,191,0.06), transparent);
          bottom: -100px; right: -100px;
        }

        .demo__grid {
          position: fixed;
          inset: 0;
          background:
            linear-gradient(rgba(99,102,241,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99,102,241,0.03) 1px, transparent 1px);
          background-size: 60px 60px;
          pointer-events: none;
          z-index: 0;
        }

        .demo__nav {
          position: relative;
          z-index: 10;
          padding: 1rem 0;
          border-bottom: 1px solid var(--border-subtle);
        }

        .demo__nav-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .demo__nav-logo { display: flex; align-items: center; }

        .demo__nav-back {
          font-size: 0.85rem;
          color: var(--text-muted);
          transition: color 0.2s;
        }

        .demo__nav-back:hover { color: var(--text-primary); }

        .demo__content {
          position: relative;
          z-index: 2;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 5rem;
          align-items: start;
          padding-top: clamp(50px, 8vh, 80px);
          padding-bottom: 4rem;
        }

        .demo__title {
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 800;
          line-height: 1.1;
          letter-spacing: -0.02em;
          margin-bottom: 1rem;
        }

        .demo__desc {
          font-size: 1rem;
          line-height: 1.7;
          color: var(--text-secondary);
          margin-bottom: 2rem;
          max-width: 440px;
        }

        .demo__benefits {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          margin-bottom: 2.5rem;
        }

        .demo__benefit {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 0.9rem;
          color: var(--text-secondary);
        }

        .demo__check {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: rgba(99,102,241,0.12);
          border: 1px solid rgba(99,102,241,0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--accent-indigo-light);
          flex-shrink: 0;
        }

        .demo__check svg { display: inline-block; }

        .demo__or-talk {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 0.85rem;
          color: var(--text-dim);
        }

        .demo__talk-link {
          color: var(--accent-indigo-light);
          font-weight: 600;
          transition: color 0.2s;
        }

        .demo__talk-link:hover { color: var(--text-primary); }

        .demo__card {
          border-radius: 20px;
          padding: 2.5rem;
        }

        .demo__form-title {
          font-size: 1.3rem;
          font-weight: 700;
          margin-bottom: 1.75rem;
        }

        .demo__form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .demo__row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.75rem;
        }

        .demo__field {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }

        .demo__label {
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--text-muted);
          letter-spacing: 0.03em;
        }

        .demo__input {
          background: rgba(255,255,255,0.03);
          border: 1px solid var(--border-subtle);
          border-radius: 10px;
          padding: 0.75rem 1rem;
          font-size: 0.9rem;
          font-family: var(--font-sans);
          color: var(--text-primary);
          outline: none;
          transition: border-color 0.25s;
          width: 100%;
        }

        .demo__input:focus {
          border-color: rgba(99,102,241,0.5);
          background: rgba(99,102,241,0.04);
        }

        .demo__input::placeholder { color: var(--text-dim); }

        .demo__select {
          cursor: pointer;
          appearance: none;
          -webkit-appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='%2364748B' viewBox='0 0 16 16'%3E%3Cpath d='M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 1rem center;
          padding-right: 2.5rem;
        }

        .demo__select option { background: #0d1526; color: var(--text-primary); }

        .demo__textarea {
          resize: vertical;
          min-height: 80px;
        }

        .demo__submit {
          width: 100%;
          padding: 0.875rem;
          border-radius: 10px;
          background: linear-gradient(135deg, #4F46E5, #6366F1);
          color: #fff;
          font-size: 0.92rem;
          font-weight: 600;
          font-family: var(--font-sans);
          cursor: pointer;
          border: none;
          transition: all 0.25s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 48px;
          margin-top: 0.25rem;
        }

        .demo__submit:hover:not(.demo__submit--loading) {
          box-shadow: 0 0 30px rgba(99,102,241,0.3);
          transform: translateY(-1px);
        }

        .demo__spinner {
          width: 18px;
          height: 18px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: #fff;
          border-radius: 50%;
          animation: rotateGlobe 0.7s linear infinite;
          display: inline-block;
        }

        .demo__success {
          text-align: center;
          padding: 2rem 1rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
        }

        .demo__success-icon {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: rgba(45,212,191,0.1);
          border: 2px solid rgba(45,212,191,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--accent-teal-light);
          margin-bottom: 0.5rem;
        }

        .demo__success-icon svg { display: inline-block; }

        .demo__success h2 {
          font-size: 1.4rem;
          font-weight: 700;
        }

        .demo__success p {
          color: var(--text-muted);
          font-size: 0.9rem;
          max-width: 280px;
          line-height: 1.6;
        }

        @media (max-width: 860px) {
          .demo__content { grid-template-columns: 1fr; gap: 3rem; }
          .demo__row { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}
