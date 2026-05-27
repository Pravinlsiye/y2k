import { onMount } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { gsap } from "../lib/gsap";
import Navbar from "../components/Navbar";

/* ── Architecture diagram ───────────────────────────────── */
function ArchDiagram() {
  return (
    <svg
      class="arch-svg"
      viewBox="0 0 600 260"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Prism architecture: your application connects to the Prism API layer, which routes to AWS, GCP, Azure, and other cloud providers"
    >
      {/* Your Application */}
      <rect x="10" y="4" width="580" height="60" rx="2" class="arch-box" />
      <text x="26" y="30" class="arch-label">YOUR APPLICATION</text>
      <text x="26" y="48" class="arch-sub">Any language, any framework</text>
      <rect x="518" y="16" width="60" height="20" rx="2" class="arch-tag" />
      <text x="548" y="30" class="arch-tag-label" text-anchor="middle">SDK</text>

      {/* Connector arrow */}
      <line x1="300" y1="64" x2="300" y2="90" class="arch-conn" />
      <path d="M295 85 L300 93 L305 85" class="arch-arrow" />
      <text x="310" y="82" class="arch-conn-label">Prism Unified API</text>

      {/* PRISM layer */}
      <rect x="10" y="96" width="580" height="60" rx="2" class="arch-box arch-box--prism" />
      <line x1="10" y1="96" x2="590" y2="96" class="arch-prism-edge" />
      <text x="26" y="122" class="arch-label arch-label--bright">PRISM</text>
      <text x="26" y="142" class="arch-sub arch-sub--muted">Route · Optimize · Orchestrate · Migrate</text>

      {/* Status indicators */}
      <circle cx="558" cy="116" r="3.5" class="arch-dot arch-dot--on" />
      <circle cx="572" cy="116" r="3.5" class="arch-dot arch-dot--on" />
      <circle cx="558" cy="136" r="3.5" class="arch-dot arch-dot--on" />
      <circle cx="572" cy="136" r="3.5" class="arch-dot" />

      {/* Connector lines to providers */}
      <line x1="75"  y1="156" x2="75"  y2="190" class="arch-conn arch-conn--dashed" />
      <line x1="215" y1="156" x2="215" y2="190" class="arch-conn arch-conn--dashed" />
      <line x1="355" y1="156" x2="355" y2="190" class="arch-conn arch-conn--dashed" />
      <line x1="495" y1="156" x2="495" y2="190" class="arch-conn arch-conn--dashed" />

      {/* Provider boxes */}
      <rect x="10"  y="190" width="130" height="58" rx="2" class="arch-provider" />
      <rect x="150" y="190" width="130" height="58" rx="2" class="arch-provider" />
      <rect x="290" y="190" width="130" height="58" rx="2" class="arch-provider" />
      <rect x="430" y="190" width="160" height="58" rx="2" class="arch-provider arch-provider--more" />

      <text x="75"  y="218" class="arch-provider-name" text-anchor="middle">AWS</text>
      <text x="215" y="218" class="arch-provider-name" text-anchor="middle">GCP</text>
      <text x="355" y="218" class="arch-provider-name" text-anchor="middle">Azure</text>
      <text x="510" y="218" class="arch-provider-name arch-provider-name--more" text-anchor="middle">+ 12 more</text>

      <text x="75"  y="236" class="arch-provider-sub" text-anchor="middle">us-east-1</text>
      <text x="215" y="236" class="arch-provider-sub" text-anchor="middle">us-central1</text>
      <text x="355" y="236" class="arch-provider-sub" text-anchor="middle">westus2</text>
      <text x="510" y="236" class="arch-provider-sub arch-provider-name--more" text-anchor="middle">DO · Vultr · OVH</text>

      {/* Rail */}
      <line x1="1" y1="96" x2="1" y2="248" class="arch-rail" />
      <circle cx="1" cy="128" r="2" class="arch-rail-node" />
      <circle cx="1" cy="220" r="2" class="arch-rail-node" />

      <style>{`
        .arch-box {
          fill: oklch(0.21 0.010 265);
          stroke: oklch(0.96 0.006 265 / 0.09);
          stroke-width: 1;
        }
        .arch-box--prism {
          fill: oklch(0.19 0.011 265);
        }
        .arch-prism-edge {
          stroke: oklch(0.56 0.21 264 / 0.5);
          stroke-width: 1.5;
        }
        .arch-label {
          font-family: ui-monospace, monospace;
          font-size: 9.5px;
          font-weight: 700;
          fill: oklch(0.62 0.012 265);
          letter-spacing: 0.12em;
        }
        .arch-label--bright { fill: oklch(0.78 0.010 265); }
        .arch-sub {
          font-family: var(--font-sans, sans-serif);
          font-size: 8.5px;
          fill: oklch(0.47 0.010 265);
        }
        .arch-sub--muted { fill: oklch(0.56 0.012 265); }
        .arch-tag {
          fill: oklch(0.56 0.21 264 / 0.1);
          stroke: oklch(0.56 0.21 264 / 0.2);
          stroke-width: 1;
        }
        .arch-tag-label {
          font-family: ui-monospace, monospace;
          font-size: 8px;
          font-weight: 600;
          fill: oklch(0.56 0.21 264);
          letter-spacing: 0.08em;
        }
        .arch-conn {
          stroke: oklch(0.96 0.006 265 / 0.2);
          stroke-width: 1;
        }
        .arch-conn--dashed { stroke-dasharray: 4 3; }
        .arch-conn-label {
          font-family: ui-monospace, monospace;
          font-size: 7.5px;
          fill: oklch(0.56 0.21 264 / 0.7);
          letter-spacing: 0.05em;
        }
        .arch-arrow { fill: oklch(0.56 0.21 264 / 0.5); }
        .arch-dot { fill: oklch(0.47 0.010 265); }
        .arch-dot--on { fill: oklch(0.74 0.14 185); }
        .arch-provider {
          fill: oklch(0.19 0.011 265);
          stroke: oklch(0.96 0.006 265 / 0.08);
          stroke-width: 1;
        }
        .arch-provider--more {
          stroke: oklch(0.96 0.006 265 / 0.05);
          stroke-dasharray: 4 4;
        }
        .arch-provider-name {
          font-family: ui-monospace, monospace;
          font-size: 9px;
          font-weight: 700;
          fill: oklch(0.62 0.012 265);
          letter-spacing: 0.08em;
        }
        .arch-provider-name--more { fill: oklch(0.47 0.010 265); font-weight: 500; }
        .arch-provider-sub {
          font-family: ui-monospace, monospace;
          font-size: 7.5px;
          fill: oklch(0.40 0.008 265);
          letter-spacing: 0.05em;
        }
        .arch-rail {
          stroke: oklch(0.56 0.21 264 / 0.2);
          stroke-width: 1;
        }
        .arch-rail-node { fill: oklch(0.56 0.21 264 / 0.5); }
      `}</style>
    </svg>
  );
}

/* ── Feature data ───────────────────────────────────────── */
const features = [
  {
    num: "01",
    title: "Unified Cloud API",
    desc: "A single SDK and API surface that maps to AWS, GCP, Azure, DigitalOcean, Vultr, and others. Write your infrastructure code once. Prism translates it to provider-native calls at runtime. Switch providers without changing application code.",
    detail: "Supports compute, storage, networking, databases, queues, and serverless runtimes.",
  },
  {
    num: "02",
    title: "Instant Infrastructure Migration",
    desc: "Move a complete infrastructure stack from one cloud provider to another in hours. Prism maps your existing services to equivalent provider offerings, coordinates data migration sequencing, and validates parity before cutover. No manual rewrite.",
    detail: "Service mapping covers 140+ AWS, GCP, and Azure managed services.",
  },
  {
    num: "03",
    title: "Multi-Cloud Cost Optimization",
    desc: "Route workloads to the most cost-effective available provider in real time. Prism monitors spot pricing, reserved capacity, and egress costs across providers and shifts non-latency-sensitive workloads automatically based on rules you define.",
    detail: "Configurable per workload class: latency-critical, batch, storage-intensive.",
  },
  {
    num: "04",
    title: "Function Mesh",
    desc: "Deploy and orchestrate serverless functions across cloud providers from one interface. Write functions once and run them on AWS Lambda, Azure Functions, Google Cloud Run, or any combination. Prism handles triggers, bindings, and cross-cloud invocation.",
    detail: "Supports event-driven and HTTP triggers. Automatic failover between providers.",
  },
  {
    num: "05",
    title: "App Platform",
    desc: "Host web services, APIs, and background workers on any cloud with a single configuration file. Configure primary and fallback regions across providers. Prism manages load balancing, health checks, and traffic routing transparently.",
    detail: "Supports containers, VMs, and managed runtimes. No vendor lock-in by design.",
  },
];

/* ── Config example ─────────────────────────────────────── */
const CONFIG_EXAMPLE = `# prism.config.yaml
app:
  name: my-api-service

deploy:
  strategy: multi-cloud
  primary:  aws:us-east-1
  fallback: gcp:us-central1
  optimize: cost

compute:
  type:     web-service
  replicas: 2
  memory:   512mb

functions:
  - name:    process-events
    trigger:  queue
    runtime:  node20
    providers: [aws, azure]`;

/* ── Page ───────────────────────────────────────────────── */
export default function ProductPrism() {
  const navigate = useNavigate();
  let heroRef!: HTMLDivElement;
  let archRef!: HTMLDivElement;
  let featRef!: HTMLDivElement;

  onMount(() => {
    const ease = "expo.out";

    gsap.from(heroRef.children, {
      opacity: 0,
      y: 14,
      duration: 0.65,
      stagger: 0.09,
      ease,
    });

    gsap.from(archRef, {
      opacity: 0,
      y: 16,
      duration: 0.8,
      ease,
      scrollTrigger: { trigger: archRef, start: "top 86%" },
    });

    const rows = featRef.querySelectorAll(".pf-row");
    rows.forEach((row, i) => {
      gsap.from(row, {
        opacity: 0,
        y: 12,
        duration: 0.6,
        ease,
        delay: i * 0.04,
        scrollTrigger: { trigger: row, start: "top 89%" },
      });
    });
  });

  return (
    <div class="prism-page">

      <Navbar />

      {/* Hero */}
      <div ref={heroRef} class="container prism-hero">
        <p class="prism-hero__category">Cloud Infrastructure Platform</p>
        <h1 class="prism-hero__name">Prism</h1>
        <p class="prism-hero__tagline">One API. Every cloud.</p>
        <p class="prism-hero__desc">
          A unified infrastructure layer that wraps AWS, GCP, Azure, and every
          major cloud provider behind a single API. Deploy across clouds, migrate
          between providers in hours, and route workloads to the most efficient
          option in real time. No rewrites. No lock-in.
        </p>
        <div class="prism-hero__actions">
          <a href="/demo" class="prism-btn" onClick={(e) => { e.preventDefault(); navigate("/demo"); }}>
            Request Demo
          </a>
          <a href="/talk" class="prism-link" onClick={(e) => { e.preventDefault(); navigate("/talk"); }}>
            Talk to an engineer
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
        </div>
        <div class="prism-hero__providers">
          {["AWS", "GCP", "Azure", "DigitalOcean", "Vultr", "OVH", "Linode", "+ more"].map((p, i) => (
            <span class="prism-provider-chip" classList={{ "prism-provider-chip--dim": i >= 6 }}>
              {p}
            </span>
          ))}
        </div>
      </div>

      {/* Architecture */}
      <div class="prism-arch">
        <div ref={archRef} class="container">
          <p class="prism-section-label">Architecture</p>
          <h2 class="prism-section-title">How Prism works</h2>
          <p class="prism-section-sub">
            Prism sits between your application and every cloud provider.
            Your code calls one API. Prism routes, translates, and optimizes behind it.
          </p>
          <div class="arch-wrap">
            <ArchDiagram />
          </div>
        </div>
      </div>

      {/* Features */}
      <div class="prism-features">
        <div class="container">
          <p class="prism-section-label">Capabilities</p>
          <h2 class="prism-section-title">Everything in one layer.</h2>
        </div>

        <div ref={featRef} class="container pf-list">
          {features.map((f) => (
            <div class="pf-row">
              <span class="pf-num">{f.num}</span>
              <div class="pf-body">
                <h3 class="pf-title">{f.title}</h3>
                <p class="pf-desc">{f.desc}</p>
                <p class="pf-detail">{f.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Config example */}
      <div class="prism-config">
        <div class="container prism-config__inner">
          <div class="prism-config__text">
            <p class="prism-section-label">Getting Started</p>
            <h2 class="prism-section-title">
              One config file.<br />Every cloud.
            </h2>
            <p class="prism-section-sub">
              Describe your application once. Prism handles the rest: provisioning,
              routing, failover, and migration. No provider-specific tooling required.
            </p>
            <a href="/demo" class="prism-btn" onClick={(e) => { e.preventDefault(); navigate("/demo"); }}>
              See a live demo
            </a>
          </div>

          <div class="prism-config__code">
            <div class="prism-code-block">
              <div class="prism-code-block__header">
                <span class="prism-code-block__filename">prism.config.yaml</span>
                <div class="prism-code-block__dots" aria-hidden="true">
                  <span /><span /><span />
                </div>
              </div>
              <pre class="prism-code-block__body"><code>{CONFIG_EXAMPLE}</code></pre>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div class="container prism-cta">
        <div class="prism-cta__card">
          <div>
            <h2 class="prism-cta__title">Ready to simplify your infrastructure?</h2>
            <p class="prism-cta__sub">
              Schedule a 30-minute technical walkthrough with one of our engineers.
            </p>
          </div>
          <div class="prism-cta__actions">
            <a href="/demo" class="prism-btn" onClick={(e) => { e.preventDefault(); navigate("/demo"); }}>
              Request Demo
            </a>
            <a href="/talk" class="prism-link" onClick={(e) => { e.preventDefault(); navigate("/talk"); }}>
              Talk to an engineer
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      <style>{`
        .prism-page {
          min-height: 100vh;
          background: var(--bg-primary);
          color: var(--text-primary);
          font-family: var(--font-sans);
          padding-bottom: 5rem;
        }


        /* Hero */
        .prism-hero {
          padding-top: clamp(56px, 10vh, 96px);
          padding-bottom: 3.5rem;
          max-width: 800px;
        }

        .prism-hero__category {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 0.72rem;
          font-weight: 500;
          letter-spacing: 0.07em;
          color: var(--text-muted);
          margin-bottom: 1rem;
        }

        .prism-hero__category::before {
          content: '';
          display: block;
          width: 18px;
          height: 1px;
          background: var(--text-dim);
        }

        .prism-hero__name {
          font-size: clamp(3rem, 7vw, 5.5rem);
          font-weight: 800;
          letter-spacing: -0.04em;
          line-height: 1.0;
          color: var(--text-primary);
          margin-bottom: 0.5rem;
        }

        .prism-hero__tagline {
          font-size: clamp(1rem, 2vw, 1.4rem);
          font-weight: 400;
          color: var(--text-muted);
          margin-bottom: 1.25rem;
        }

        .prism-hero__desc {
          font-size: 1rem;
          line-height: 1.7;
          color: var(--text-secondary);
          max-width: 58ch;
          margin-bottom: 2rem;
        }

        .prism-hero__actions {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          margin-bottom: 2rem;
          flex-wrap: wrap;
        }

        .prism-hero__providers {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
        }

        .prism-provider-chip {
          font-family: var(--font-mono);
          font-size: 0.68rem;
          font-weight: 500;
          padding: 0.22rem 0.6rem;
          border: 1px solid var(--border-subtle);
          border-radius: 2px;
          color: var(--text-muted);
          letter-spacing: 0.05em;
        }

        .prism-provider-chip--dim {
          color: var(--text-dim);
          border-color: oklch(0.96 0.006 265 / 0.04);
        }

        /* Shared typography */
        .prism-section-label {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 0.72rem;
          font-weight: 500;
          letter-spacing: 0.07em;
          color: var(--text-muted);
          margin-bottom: 0.75rem;
        }

        .prism-section-label::before {
          content: '';
          display: block;
          width: 18px;
          height: 1px;
          background: var(--text-dim);
        }

        .prism-section-title {
          font-size: clamp(1.6rem, 3vw, 2.4rem);
          font-weight: 700;
          letter-spacing: -0.025em;
          line-height: 1.1;
          color: var(--text-primary);
          margin-bottom: 0.75rem;
        }

        .prism-section-sub {
          font-size: 0.9rem;
          line-height: 1.65;
          color: var(--text-muted);
          max-width: 54ch;
          margin-bottom: 2rem;
        }

        /* Shared buttons */
        .prism-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.65rem 1.4rem;
          font-size: 0.875rem;
          font-weight: 600;
          border-radius: 3px;
          background: var(--accent-indigo-light);
          color: oklch(0.96 0.006 265);
          transition: opacity 160ms var(--ease-expo), transform 160ms var(--ease-expo);
          white-space: nowrap;
        }

        .prism-btn:hover { opacity: 0.88; }
        .prism-btn:active { transform: scale(0.97); }

        .prism-link {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--text-muted);
          transition: color 160ms var(--ease-expo);
        }

        .prism-link svg { display: inline-block; transition: transform 160ms var(--ease-expo); }
        .prism-link:hover { color: var(--text-secondary); }
        .prism-link:hover svg { transform: translateX(3px); }

        /* Architecture section */
        .prism-arch {
          background: var(--bg-secondary);
          border-top: 1px solid var(--border-subtle);
          border-bottom: 1px solid var(--border-subtle);
          padding: clamp(48px, 8vh, 80px) 0;
          margin-bottom: clamp(56px, 8vh, 96px);
        }

        .arch-wrap {
          border: 1px solid var(--border-moderate);
          border-radius: 3px;
          background: var(--bg-card);
          padding: 2rem;
          overflow: hidden;
        }

        .arch-svg { width: 100%; max-width: 600px; display: block; margin: 0 auto; }

        /* Features */
        .prism-features {
          margin-bottom: clamp(56px, 8vh, 96px);
        }

        .pf-list {
          border-top: 1px solid var(--border-subtle);
          margin-top: 2rem;
        }

        .pf-row {
          display: grid;
          grid-template-columns: 48px 1fr;
          gap: 2rem;
          padding: 2rem 0;
          border-bottom: 1px solid var(--border-subtle);
          transition: background 160ms var(--ease-expo);
        }

        .pf-row:hover {
          background: oklch(0.96 0.006 265 / 0.015);
          margin-inline: -1.5rem;
          padding-inline: 1.5rem;
          border-radius: 2px;
        }

        .pf-num {
          font-family: var(--font-mono);
          font-size: 0.68rem;
          font-weight: 600;
          color: var(--text-dim);
          letter-spacing: 0.1em;
          padding-top: 4px;
          font-variant-numeric: tabular-nums;
        }

        .pf-title {
          font-size: 1.05rem;
          font-weight: 600;
          letter-spacing: -0.015em;
          color: var(--text-primary);
          margin-bottom: 0.6rem;
        }

        .pf-desc {
          font-size: 0.875rem;
          line-height: 1.65;
          color: var(--text-muted);
          max-width: 62ch;
          margin-bottom: 0.6rem;
        }

        .pf-detail {
          font-family: var(--font-mono);
          font-size: 0.68rem;
          color: var(--text-dim);
          letter-spacing: 0.03em;
          padding: 0.35rem 0.7rem;
          border: 1px solid var(--border-subtle);
          border-radius: 2px;
          display: inline-block;
        }

        /* Config */
        .prism-config {
          background: var(--bg-secondary);
          border-top: 1px solid var(--border-subtle);
          border-bottom: 1px solid var(--border-subtle);
          padding: clamp(48px, 8vh, 80px) 0;
          margin-bottom: clamp(56px, 8vh, 96px);
        }

        .prism-config__inner {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(3rem, 6vw, 6rem);
          align-items: center;
        }

        .prism-code-block {
          border: 1px solid var(--border-moderate);
          border-radius: 3px;
          overflow: hidden;
          background: oklch(0.14 0.010 265);
        }

        .prism-code-block__header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.6rem 1rem;
          border-bottom: 1px solid var(--border-subtle);
          background: oklch(0.16 0.011 265);
        }

        .prism-code-block__filename {
          font-family: var(--font-mono);
          font-size: 0.7rem;
          color: var(--text-dim);
          letter-spacing: 0.04em;
        }

        .prism-code-block__dots {
          display: flex;
          gap: 0.35rem;
        }

        .prism-code-block__dots span {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: oklch(0.96 0.006 265 / 0.1);
          display: block;
        }

        .prism-code-block__body {
          padding: 1.5rem 1.25rem;
          overflow-x: auto;
        }

        .prism-code-block__body code {
          font-family: var(--font-mono);
          font-size: 0.78rem;
          line-height: 1.7;
          color: oklch(0.78 0.010 265);
          white-space: pre;
          display: block;
        }

        /* CTA */
        .prism-cta {
          max-width: 900px;
        }

        .prism-cta__card {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 3rem;
          padding: 2.5rem 3rem;
          border: 1px solid var(--border-moderate);
          border-radius: 3px;
          background: var(--bg-card);
          flex-wrap: wrap;
        }

        .prism-cta__title {
          font-size: clamp(1.1rem, 2vw, 1.5rem);
          font-weight: 700;
          letter-spacing: -0.02em;
          color: var(--text-primary);
          margin-bottom: 0.4rem;
        }

        .prism-cta__sub {
          font-size: 0.875rem;
          color: var(--text-muted);
          max-width: 40ch;
          line-height: 1.55;
        }

        .prism-cta__actions {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          flex-shrink: 0;
          flex-wrap: wrap;
        }

        @media (max-width: 860px) {
          .prism-config__inner { grid-template-columns: 1fr; }
          .pf-row { grid-template-columns: 36px 1fr; gap: 1.25rem; }
          .prism-cta__card { flex-direction: column; align-items: flex-start; gap: 1.5rem; }
        }

        @media (max-width: 600px) {
          .prism-hero__providers { display: none; }
          .arch-wrap { padding: 1rem; }
        }
      `}</style>
    </div>
  );
}
