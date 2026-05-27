import { createSignal, onMount, Show } from "solid-js";
import { useNavigate, useParams } from "@solidjs/router";
import { gsap } from "../lib/gsap";
import Logo from "../components/Logo";
import { getJob } from "../lib/jobs";

export default function JobDetail() {
  const navigate = useNavigate();
  const params = useParams<{ id: string }>();
  const job = getJob(params.id);

  const [submitted, setSubmitted] = createSignal(false);
  const [loading, setLoading] = createSignal(false);
  let contentRef!: HTMLDivElement;
  let formRef!: HTMLDivElement;
  let formEl!: HTMLFormElement;

  onMount(() => {
    if (!job) return;
    const ease = "expo.out";
    gsap.from(contentRef, { opacity: 0, y: 14, duration: 0.7,  ease, delay: 0.1 });
    gsap.from(formRef,    { opacity: 0, y: 14, duration: 0.75, ease, delay: 0.25 });
  });

  const handleApply = (e: Event) => {
    e.preventDefault();
    if (!job) return;
    setLoading(true);
    // Simulate processing delay, then clear form and show success
    setTimeout(() => {
      formEl.reset();
      setLoading(false);
      setSubmitted(true);
    }, 900);
  };

  // 404 state
  if (!job) {
    return (
      <div class="jd-notfound">
        <Logo size={28} variant="full" animate={false} />
        <p class="jd-notfound__msg">Role not found.</p>
        <a href="/careers" class="jd-btn" onClick={(e) => { e.preventDefault(); navigate("/careers"); }}>
          View all openings
        </a>
        <style>{`
          .jd-notfound {
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 1.25rem;
            background: var(--bg-primary);
            font-family: var(--font-sans);
          }
          .jd-notfound__msg {
            font-size: 0.9rem;
            color: var(--text-muted);
          }
          .jd-btn {
            display: inline-flex;
            padding: 0.65rem 1.4rem;
            background: var(--accent-indigo-light);
            color: oklch(0.96 0.006 265);
            border-radius: 3px;
            font-size: 0.875rem;
            font-weight: 600;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div class="jd">

      {/* Nav */}
      <nav class="jd-nav">
        <div class="container jd-nav__inner">
          <a class="jd-nav__logo" href="/" onClick={(e) => { e.preventDefault(); navigate("/"); }}>
            <Logo size={26} variant="full" animate={false} />
          </a>
          <a class="jd-nav__back" href="/careers" onClick={(e) => { e.preventDefault(); navigate("/careers"); }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            All openings
          </a>
        </div>
      </nav>

      <div class="container jd-layout">

        {/* Left: job description */}
        <div ref={contentRef} class="jd-content">

          {/* Header */}
          <div class="jd-header">
            <p class="jd-header__dept">{job.dept}</p>
            <h1 class="jd-header__title">{job.title}</h1>
            <div class="jd-header__meta">
              <span class="jd-tag">{job.location}</span>
              <span class="jd-tag">{job.type}</span>
              <span class="jd-tag jd-tag--id">ID: {job.id}</span>
            </div>
          </div>

          <hr class="jd-rule" />

          {/* Summary */}
          <p class="jd-summary">{job.summary}</p>

          <hr class="jd-rule" />

          {/* Responsibilities */}
          <section class="jd-section">
            <h2 class="jd-section__title">What you'll do</h2>
            <ul class="jd-list">
              {job.responsibilities.map((r) => (
                <li class="jd-list__item">
                  <span class="jd-list__mark" aria-hidden="true" />
                  {r}
                </li>
              ))}
            </ul>
          </section>

          {/* Requirements */}
          <section class="jd-section">
            <h2 class="jd-section__title">What we're looking for</h2>
            <ul class="jd-list">
              {job.requirements.map((r) => (
                <li class="jd-list__item">
                  <span class="jd-list__mark" aria-hidden="true" />
                  {r}
                </li>
              ))}
            </ul>
          </section>

          {/* Nice to have */}
          <section class="jd-section">
            <h2 class="jd-section__title">Nice to have</h2>
            <ul class="jd-list jd-list--muted">
              {job.nice.map((n) => (
                <li class="jd-list__item">
                  <span class="jd-list__mark" aria-hidden="true" />
                  {n}
                </li>
              ))}
            </ul>
          </section>

        </div>

        {/* Right: sticky application form */}
        <div ref={formRef} class="jd-sidebar">
          <div class="jd-form-card">

            <Show when={submitted()}>
              <div class="jd-success">
                <span class="jd-success__mark" aria-hidden="true">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </span>
                <p class="jd-success__title">Application Successfully Submitted</p>
                <p class="jd-success__sub">
                  We have received your application for{" "}
                  <strong>{job!.title}</strong>. Our team will review it
                  and notify you with next steps.
                </p>
                <p class="jd-success__contact">
                  Questions? Contact us at{" "}
                  <a href="mailto:careers@y2ksaas.com">careers@y2ksaas.com</a>
                </p>
              </div>
            </Show>

            <Show when={!submitted()}>
              <h2 class="jd-form-card__title">Apply for this role</h2>
              <p class="jd-form-card__sub">
                Job ID: <strong>{job!.id}</strong>
              </p>

              <form ref={formEl} class="jd-form" onSubmit={handleApply}>

                <div class="jd-row">
                  <div class="jd-field">
                    <label class="jd-label" for="jd-first">First Name</label>
                    <input id="jd-first" class="jd-input" type="text" name="first" placeholder="Alex" required />
                  </div>
                  <div class="jd-field">
                    <label class="jd-label" for="jd-last">Last Name</label>
                    <input id="jd-last" class="jd-input" type="text" name="last" placeholder="Johnson" required />
                  </div>
                </div>

                <div class="jd-field">
                  <label class="jd-label" for="jd-email">Email</label>
                  <input id="jd-email" class="jd-input" type="email" name="email" placeholder="alex@company.com" required />
                </div>

                {/* Resume upload — accepts PDF and DOCX */}
                <div class="jd-field">
                  <label class="jd-label" for="jd-resume">
                    Resume
                    <span class="jd-label__formats">PDF or DOCX</span>
                  </label>
                  <label class="jd-file-label" for="jd-resume">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                      <polyline points="14 2 14 8 20 8"/>
                      <line x1="12" y1="18" x2="12" y2="12"/>
                      <line x1="9" y1="15" x2="15" y2="15"/>
                    </svg>
                    <span class="jd-file-label__text">Choose file</span>
                    <span class="jd-file-label__hint">PDF or DOCX, max 10 MB</span>
                    <input
                      id="jd-resume"
                      class="jd-file-input"
                      type="file"
                      name="resume"
                      accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                      required
                      onChange={(e) => {
                        const file = e.currentTarget.files?.[0];
                        const textEl = e.currentTarget.parentElement?.querySelector(".jd-file-label__text");
                        if (textEl && file) textEl.textContent = file.name;
                      }}
                    />
                  </label>
                </div>

                {/* Cover note — required */}
                <div class="jd-field">
                  <label class="jd-label" for="jd-note">
                    Cover Note
                    <span class="jd-label__req" aria-label="required">*</span>
                  </label>
                  <textarea
                    id="jd-note"
                    class="jd-input jd-textarea"
                    name="note"
                    placeholder="Why this role, what you'd bring, any relevant context..."
                    rows="4"
                    required
                  />
                </div>

                <button
                  type="submit"
                  class="jd-submit"
                  classList={{ "jd-submit--loading": loading() }}
                >
                  {loading()
                    ? <span class="jd-spinner" aria-label="Submitting" />
                    : "Submit Application"}
                </button>
              </form>
            </Show>

          </div>
        </div>

      </div>

      <style>{`
        .jd {
          min-height: 100vh;
          background: var(--bg-primary);
          color: var(--text-primary);
          font-family: var(--font-sans);
          padding-bottom: 5rem;
        }

        /* Nav */
        .jd-nav {
          padding: 0.9rem 0;
          border-bottom: 1px solid var(--border-subtle);
          position: sticky;
          top: 0;
          z-index: 50;
          background: oklch(0.16 0.012 265 / 0.9);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
        }

        .jd-nav__inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .jd-nav__logo { display: flex; align-items: center; }

        .jd-nav__back {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.82rem;
          font-weight: 500;
          color: var(--text-muted);
          transition: color 160ms var(--ease-expo);
        }

        .jd-nav__back svg { display: inline-block; }
        .jd-nav__back:hover { color: var(--text-primary); }

        /* Two-column layout */
        .jd-layout {
          display: grid;
          grid-template-columns: 1fr 360px;
          gap: clamp(3rem, 5vw, 5rem);
          align-items: start;
          padding-top: clamp(40px, 7vh, 64px);
        }

        /* ── Left: content ── */
        .jd-header {
          margin-bottom: 2rem;
        }

        .jd-header__dept {
          font-family: var(--font-mono);
          font-size: 0.65rem;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--accent-indigo-light);
          margin-bottom: 0.5rem;
        }

        .jd-header__title {
          font-size: clamp(1.6rem, 3vw, 2.4rem);
          font-weight: 700;
          line-height: 1.1;
          letter-spacing: -0.025em;
          color: var(--text-primary);
          margin-bottom: 1rem;
        }

        .jd-header__meta {
          display: flex;
          gap: 0.4rem;
          flex-wrap: wrap;
        }

        .jd-tag {
          font-size: 0.7rem;
          font-weight: 500;
          padding: 0.22rem 0.65rem;
          border: 1px solid var(--border-subtle);
          border-radius: 2px;
          color: var(--text-muted);
          font-variant-numeric: tabular-nums;
        }

        .jd-tag--id {
          color: var(--text-dim);
          font-family: var(--font-mono);
          font-size: 0.65rem;
          letter-spacing: 0.05em;
        }

        .jd-rule {
          height: 1px;
          background: var(--border-subtle);
          border: none;
          margin: 1.75rem 0;
        }

        .jd-summary {
          font-size: 1rem;
          line-height: 1.7;
          color: var(--text-secondary);
          max-width: 62ch;
        }

        .jd-section {
          margin-bottom: 2rem;
        }

        .jd-section__title {
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--text-muted);
          margin-bottom: 1rem;
        }

        /* List — plain, engineered */
        .jd-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }

        .jd-list__item {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          font-size: 0.9rem;
          line-height: 1.6;
          color: var(--text-secondary);
        }

        .jd-list--muted .jd-list__item {
          color: var(--text-muted);
        }

        /* Square bullet */
        .jd-list__mark {
          width: 4px;
          height: 4px;
          border-radius: 1px;
          background: var(--accent-indigo-light);
          flex-shrink: 0;
          margin-top: 0.55rem;
          opacity: 0.6;
        }

        .jd-list--muted .jd-list__mark {
          background: var(--text-dim);
          opacity: 0.5;
        }

        /* ── Right: sticky form ── */
        .jd-sidebar {
          position: sticky;
          top: calc(3.5rem + 16px);
        }

        .jd-form-card {
          background: var(--bg-card);
          border: 1px solid var(--border-moderate);
          border-radius: 3px;
          padding: 1.75rem;
        }

        .jd-form-card__title {
          font-size: 1.05rem;
          font-weight: 700;
          letter-spacing: -0.015em;
          color: var(--text-primary);
          margin-bottom: 0.3rem;
        }

        .jd-form-card__sub {
          font-size: 0.78rem;
          line-height: 1.5;
          color: var(--text-dim);
          margin-bottom: 1.5rem;
        }

        .jd-form-card__sub strong {
          color: var(--text-muted);
          font-weight: 600;
        }

        .jd-form {
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
        }

        .jd-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.6rem;
        }

        .jd-field {
          display: flex;
          flex-direction: column;
          gap: 0.28rem;
        }

        .jd-label {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.7rem;
          font-weight: 600;
          color: var(--text-muted);
          letter-spacing: 0.04em;
        }

        .jd-label__req {
          color: var(--accent-indigo-light);
          font-size: 0.8rem;
          line-height: 1;
        }

        .jd-label__formats {
          font-weight: 400;
          color: var(--text-dim);
          letter-spacing: 0;
        }

        .jd-input {
          background: var(--bg-secondary);
          border: 1px solid var(--border-subtle);
          border-radius: 3px;
          padding: 0.6rem 0.8rem;
          font-size: 0.845rem;
          font-family: var(--font-sans);
          color: var(--text-primary);
          outline: none;
          width: 100%;
          transition: border-color 160ms var(--ease-expo);
        }

        .jd-input:focus {
          border-color: oklch(0.56 0.21 264 / 0.45);
        }

        .jd-input::placeholder { color: var(--text-dim); }

        .jd-textarea {
          resize: vertical;
          min-height: 90px;
          line-height: 1.55;
        }

        /* File upload — styled label over hidden input */
        .jd-file-label {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.7rem 0.9rem;
          background: var(--bg-secondary);
          border: 1px solid var(--border-subtle);
          border-radius: 3px;
          cursor: pointer;
          transition: border-color 160ms var(--ease-expo);
          position: relative;
          overflow: hidden;
        }

        .jd-file-label:hover { border-color: var(--border-moderate); }
        .jd-file-label:focus-within { border-color: oklch(0.56 0.21 264 / 0.45); }

        .jd-file-label svg {
          display: inline-block;
          flex-shrink: 0;
          color: var(--accent-indigo-light);
          opacity: 0.7;
        }

        .jd-file-label__text {
          font-size: 0.845rem;
          color: var(--text-secondary);
          flex: 1;
          min-width: 0;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .jd-file-label__hint {
          font-size: 0.68rem;
          color: var(--text-dim);
          white-space: nowrap;
          flex-shrink: 0;
        }

        /* Visually hidden file input — label triggers it */
        .jd-file-input {
          position: absolute;
          inset: 0;
          opacity: 0;
          cursor: pointer;
          width: 100%;
          height: 100%;
        }

        /* STUB — old resume-note kept as dead CSS, removing */
        .jd-resume-note {
          display: none;
        }

        .jd-resume-note svg {
          display: inline-block;
          flex-shrink: 0;
          color: var(--accent-indigo-light);
          opacity: 0.7;
        }

        /* Submit */
        .jd-submit {
          width: 100%;
          padding: 0.72rem;
          border-radius: 3px;
          background: var(--accent-indigo-light);
          color: oklch(0.96 0.006 265);
          font-size: 0.845rem;
          font-weight: 600;
          font-family: var(--font-sans);
          cursor: pointer;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 42px;
          transition:
            opacity   160ms var(--ease-expo),
            transform 160ms var(--ease-expo);
        }

        .jd-submit:hover:not(.jd-submit--loading) { opacity: 0.88; }
        .jd-submit:active:not(.jd-submit--loading) { transform: scale(0.97); }

        .jd-spinner {
          width: 16px;
          height: 16px;
          border: 2px solid oklch(0.96 0.006 265 / 0.3);
          border-top-color: oklch(0.96 0.006 265);
          border-radius: 50%;
          animation: rotateGlobe 0.7s linear infinite;
          display: inline-block;
        }

        .jd-job-id {
          font-size: 0.68rem;
          color: var(--text-dim);
          text-align: center;
          font-variant-numeric: tabular-nums;
        }

        .jd-job-id span {
          font-family: var(--font-mono);
          color: var(--text-muted);
        }

        /* Success state */
        .jd-success {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 0.5rem;
        }

        .jd-success__mark {
          width: 32px;
          height: 32px;
          border-radius: 3px;
          background: oklch(0.74 0.14 185 / 0.12);
          border: 1px solid oklch(0.74 0.14 185 / 0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--accent-teal-light);
          margin-bottom: 0.25rem;
        }

        .jd-success__mark svg { display: inline-block; }

        .jd-success__title {
          font-size: 1rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .jd-success__sub {
          font-size: 0.82rem;
          line-height: 1.6;
          color: var(--text-muted);
          max-width: 34ch;
        }

        .jd-success__contact {
          font-size: 0.75rem;
          color: var(--text-dim);
          margin-top: 0.25rem;
        }

        .jd-success__contact a {
          color: var(--accent-indigo-light);
          font-weight: 500;
        }

        .jd-success__title strong,
        .jd-success__sub strong {
          color: var(--text-secondary);
          font-weight: 600;
        }

        /* Responsive */
        @media (max-width: 900px) {
          .jd-layout {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }

          .jd-sidebar {
            position: static;
          }

          .jd-row { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}
