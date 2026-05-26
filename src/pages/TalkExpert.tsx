import { createSignal, onMount } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { gsap } from "../lib/gsap";
import Logo from "../components/Logo";

export default function TalkExpert() {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = createSignal(false);
  const [loading, setLoading] = createSignal(false);
  let cardRef!: HTMLDivElement;

  onMount(() => {
    gsap.from(cardRef, { y: 40, opacity: 0, duration: 0.9, ease: "power3.out" });
  });

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const data = new FormData(form);
    const name = `${data.get("first") ?? ""} ${data.get("last") ?? ""}`.trim();
    const topic = String(data.get("topic") ?? "General Inquiry");
    const message = String(data.get("message") ?? "");
    const userEmail = String(data.get("email") ?? "");

    const body = `Hi Y2kSaaS,\n\nI'd like to speak with one of your engineers.\n\nName: ${name}\nWork Email: ${userEmail}\nTopic: ${topic}\n\nMessage:\n${message}\n\nThanks.`;
    const mailto = `mailto:sales@y2ksaas.com?subject=${encodeURIComponent(`Talk with Expert: ${topic}`)}&body=${encodeURIComponent(body)}`;

    setLoading(true);
    setTimeout(() => {
      window.location.href = mailto;
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  const experts = [
    { name: "Hardware Systems", icon: "M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" },
    { name: "Cloud & SaaS", icon: "M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" },
    { name: "AI & Automation", icon: "M13 10V3L4 14h7v7l9-11h-7z" },
  ];

  return (
    <div class="talk">
      <div class="talk__bg-glow" />
      <div class="talk__grid" />

      <nav class="talk__nav">
        <div class="container talk__nav-inner">
          <a class="talk__nav-logo" href="/" onClick={(e) => { e.preventDefault(); navigate("/"); }}>
            <Logo size={28} variant="full" />
          </a>
          <a class="talk__nav-back" href="/" onClick={(e) => { e.preventDefault(); navigate("/"); }}>← Home</a>
        </div>
      </nav>

      <div class="container talk__content">
        <div class="talk__info">
          <span class="section-label">Talk with an Expert</span>
          <h1 class="talk__title">Speak Directly with<br />Our Engineers</h1>
          <p class="talk__desc">
            Skip the sales process. Connect directly with a Y2kSaaS engineer
            who specialises in your area of interest.
          </p>

          <div class="talk__experts">
            {experts.map((ex) => (
              <div class="talk__expert glass-card">
                <span class="talk__expert-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                    <path d={ex.icon}/>
                  </svg>
                </span>
                <span class="talk__expert-name">{ex.name}</span>
              </div>
            ))}
          </div>

          <div class="talk__contact-alt">
            <p>Or email us directly:</p>
            <a href="mailto:sales@y2ksaas.com">sales@y2ksaas.com</a>
          </div>
        </div>

        <div ref={cardRef} class="glass-card talk__card">
          {submitted() ? (
            <div class="talk__success">
              <div class="talk__success-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>
              <h2>Request Sent!</h2>
              <p>An expert will contact you within 4 business hours.</p>
              <button class="talk__submit" onClick={() => navigate("/")} style={{ "margin-top": "1.5rem" }}>
                Back to Home
              </button>
            </div>
          ) : (
            <form class="talk__form" onSubmit={handleSubmit}>
              <h2 class="talk__form-title">Connect with an Expert</h2>

              <div class="talk__row">
                <div class="talk__field">
                  <label class="talk__label">First Name</label>
                  <input class="talk__input" type="text" name="first" placeholder="Alex" required />
                </div>
                <div class="talk__field">
                  <label class="talk__label">Last Name</label>
                  <input class="talk__input" type="text" name="last" placeholder="Johnson" required />
                </div>
              </div>

              <div class="talk__field">
                <label class="talk__label">Work Email</label>
                <input class="talk__input" type="email" name="email" placeholder="alex@company.com" required />
              </div>

              <div class="talk__field">
                <label class="talk__label">Topic</label>
                <select class="talk__input talk__select" name="topic" required>
                  <option value="" disabled selected>What do you need help with?</option>
                  <option>Hardware & Embedded Systems</option>
                  <option>Cloud Infrastructure & SaaS</option>
                  <option>AI & Automation</option>
                  <option>Enterprise Integration</option>
                  <option>General Inquiry</option>
                </select>
              </div>

              <div class="talk__field">
                <label class="talk__label">Message (optional)</label>
                <textarea class="talk__input talk__textarea" name="message" placeholder="Tell us what you're working on..." rows="3" />
              </div>

              <button type="submit" class="talk__submit" classList={{ "talk__submit--loading": loading() }}>
                {loading() ? <span class="talk__spinner" /> : "Request a Conversation"}
              </button>
            </form>
          )}
        </div>
      </div>

      <style>{`
        .talk {
          min-height: 100vh;
          background: var(--bg-primary);
          color: var(--text-primary);
          font-family: var(--font-sans);
          position: relative;
          overflow: hidden;
        }

        .talk__bg-glow {
          position: fixed;
          width: 600px; height: 600px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(45,212,191,0.07), transparent 60%);
          filter: blur(120px);
          top: -150px; right: -150px;
          pointer-events: none; z-index: 0;
        }

        .talk__grid {
          position: fixed; inset: 0;
          background:
            linear-gradient(rgba(99,102,241,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99,102,241,0.03) 1px, transparent 1px);
          background-size: 60px 60px;
          pointer-events: none; z-index: 0;
        }

        .talk__nav {
          position: relative; z-index: 10;
          padding: 1rem 0;
          border-bottom: 1px solid var(--border-subtle);
        }

        .talk__nav-inner {
          display: flex; align-items: center; justify-content: space-between;
        }

        .talk__nav-logo { display: flex; align-items: center; }

        .talk__nav-back {
          font-size: 0.85rem; color: var(--text-muted); transition: color 0.2s;
        }

        .talk__nav-back:hover { color: var(--text-primary); }

        .talk__content {
          position: relative; z-index: 2;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 5rem;
          align-items: start;
          padding-top: clamp(50px, 8vh, 80px);
          padding-bottom: 4rem;
        }

        .talk__title {
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 800; line-height: 1.1; letter-spacing: -0.02em;
          margin-bottom: 1rem;
        }

        .talk__desc {
          font-size: 1rem; line-height: 1.7;
          color: var(--text-secondary); margin-bottom: 2rem; max-width: 400px;
        }

        .talk__experts {
          display: flex; flex-direction: column; gap: 0.6rem; margin-bottom: 2rem;
        }

        .talk__expert {
          display: flex; align-items: center; gap: 0.75rem;
          padding: 0.9rem 1.25rem; border-radius: 12px;
        }

        .talk__expert-icon {
          width: 32px; height: 32px; border-radius: 8px;
          background: rgba(45,212,191,0.08);
          border: 1px solid rgba(45,212,191,0.15);
          display: flex; align-items: center; justify-content: center;
          color: var(--accent-teal-light); flex-shrink: 0;
        }

        .talk__expert-icon svg { display: inline-block; }

        .talk__expert-name {
          font-size: 0.9rem; font-weight: 500; color: var(--text-secondary);
        }

        .talk__contact-alt {
          font-size: 0.85rem; color: var(--text-dim); display: flex; gap: 0.5rem; align-items: center;
        }

        .talk__contact-alt a { color: var(--accent-teal-light); font-weight: 500; }

        .talk__card { border-radius: 20px; padding: 2.5rem; }

        .talk__form-title { font-size: 1.3rem; font-weight: 700; margin-bottom: 1.75rem; }

        .talk__form { display: flex; flex-direction: column; gap: 1rem; }

        .talk__row { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; }

        .talk__field { display: flex; flex-direction: column; gap: 0.35rem; }

        .talk__label {
          font-size: 0.75rem; font-weight: 600; color: var(--text-muted); letter-spacing: 0.03em;
        }

        .talk__input {
          background: rgba(255,255,255,0.03);
          border: 1px solid var(--border-subtle);
          border-radius: 10px; padding: 0.75rem 1rem;
          font-size: 0.9rem; font-family: var(--font-sans);
          color: var(--text-primary); outline: none;
          transition: border-color 0.25s; width: 100%;
        }

        .talk__input:focus {
          border-color: rgba(45,212,191,0.4);
          background: rgba(45,212,191,0.03);
        }

        .talk__input::placeholder { color: var(--text-dim); }

        .talk__select {
          cursor: pointer; appearance: none; -webkit-appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='%2364748B' viewBox='0 0 16 16'%3E%3Cpath d='M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/%3E%3C/svg%3E");
          background-repeat: no-repeat; background-position: right 1rem center; padding-right: 2.5rem;
        }

        .talk__select option { background: #0d1526; color: var(--text-primary); }
        .talk__textarea { resize: vertical; min-height: 80px; }

        .talk__submit {
          width: 100%; padding: 0.875rem; border-radius: 10px;
          background: linear-gradient(135deg, #0f766e, #2DD4BF);
          color: #fff; font-size: 0.92rem; font-weight: 600;
          font-family: var(--font-sans); cursor: pointer; border: none;
          transition: all 0.25s ease;
          display: flex; align-items: center; justify-content: center;
          min-height: 48px; margin-top: 0.25rem;
        }

        .talk__submit:hover:not(.talk__submit--loading) {
          box-shadow: 0 0 30px rgba(45,212,191,0.25); transform: translateY(-1px);
        }

        .talk__spinner {
          width: 18px; height: 18px;
          border: 2px solid rgba(255,255,255,0.3); border-top-color: #fff;
          border-radius: 50%; animation: rotateGlobe 0.7s linear infinite; display: inline-block;
        }

        .talk__success {
          text-align: center; padding: 2rem 1rem;
          display: flex; flex-direction: column; align-items: center; gap: 0.75rem;
        }

        .talk__success-icon {
          width: 60px; height: 60px; border-radius: 50%;
          background: rgba(45,212,191,0.1); border: 2px solid rgba(45,212,191,0.3);
          display: flex; align-items: center; justify-content: center;
          color: var(--accent-teal-light); margin-bottom: 0.5rem;
        }

        .talk__success-icon svg { display: inline-block; }
        .talk__success h2 { font-size: 1.4rem; font-weight: 700; }
        .talk__success p { color: var(--text-muted); font-size: 0.9rem; max-width: 260px; line-height: 1.6; }

        @media (max-width: 860px) {
          .talk__content { grid-template-columns: 1fr; gap: 3rem; }
          .talk__row { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}
