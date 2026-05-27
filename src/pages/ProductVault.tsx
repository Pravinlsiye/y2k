import { onMount } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { gsap } from "../lib/gsap";
import Navbar from "../components/Navbar";

/* ── Architecture diagram ── */
function ArchDiagram() {
  return (
    <svg
      class="vault-arch"
      viewBox="0 0 600 250"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Vault architecture: your application calls the Vault storage API, which replicates data across AWS S3, Azure Blob, GCS, and other providers"
    >
      {/* App */}
      <rect x="10" y="4" width="580" height="52" rx="2" class="varch-box" />
      <text x="26" y="26" class="varch-label">YOUR APPLICATION</text>
      <text x="26" y="44" class="varch-sub">Read / Write / List / Delete</text>
      <rect x="502" y="14" width="76" height="20" rx="2" class="varch-tag" />
      <text x="540" y="28" class="varch-tag-label" text-anchor="middle">REST API</text>

      {/* Connector */}
      <line x1="300" y1="56" x2="300" y2="82" class="varch-conn" />
      <path d="M295 77 L300 85 L305 77" class="varch-arrow" />
      <text x="310" y="74" class="varch-conn-label">Vault Unified API</text>

      {/* Vault layer */}
      <rect x="10" y="88" width="580" height="60" rx="2" class="varch-box varch-box--vault" />
      <line x1="10" y1="88" x2="590" y2="88" class="varch-edge" />
      <text x="26" y="114" class="varch-label varch-label--bright">VAULT</text>
      <text x="26" y="134" class="varch-sub varch-sub--lit">ACL · Routing · Replication · Metadata</text>

      {/* ACL indicator */}
      <rect x="432" y="100" width="88" height="22" rx="2" class="varch-acl-box" />
      <text x="476" y="115" class="varch-acl-label" text-anchor="middle">ACL ROLES</text>
      <circle cx="558" cy="108" r="3.5" class="varch-dot varch-dot--on" />
      <circle cx="572" cy="108" r="3.5" class="varch-dot varch-dot--on" />
      <circle cx="558" cy="128" r="3.5" class="varch-dot varch-dot--on" />
      <circle cx="572" cy="128" r="3.5" class="varch-dot" />

      {/* Connectors to storage */}
      <line x1="68"  y1="148" x2="68"  y2="182" class="varch-conn varch-conn--d" />
      <line x1="206" y1="148" x2="206" y2="182" class="varch-conn varch-conn--d" />
      <line x1="344" y1="148" x2="344" y2="182" class="varch-conn varch-conn--d" />
      <line x1="482" y1="148" x2="482" y2="182" class="varch-conn varch-conn--d" />

      {/* Storage providers */}
      <rect x="10"  y="182" width="116" height="60" rx="2" class="varch-provider" />
      <rect x="148" y="182" width="116" height="60" rx="2" class="varch-provider" />
      <rect x="286" y="182" width="116" height="60" rx="2" class="varch-provider" />
      <rect x="424" y="182" width="166" height="60" rx="2" class="varch-provider varch-provider--more" />

      <text x="68"  y="210" class="varch-pname" text-anchor="middle">AWS S3</text>
      <text x="206" y="210" class="varch-pname" text-anchor="middle">Azure Blob</text>
      <text x="344" y="210" class="varch-pname" text-anchor="middle">GCS</text>
      <text x="507" y="210" class="varch-pname varch-pname--more" text-anchor="middle">+ 8 more</text>

      <text x="68"  y="230" class="varch-psub" text-anchor="middle">99.99% native SLA</text>
      <text x="206" y="230" class="varch-psub" text-anchor="middle">Geo-redundant</text>
      <text x="344" y="230" class="varch-psub" text-anchor="middle">Multi-region</text>
      <text x="507" y="230" class="varch-psub varch-pname--more" text-anchor="middle">Backblaze · Wasabi · R2</text>

      {/* Rail */}
      <line x1="1" y1="88" x2="1" y2="242" class="varch-rail" />
      <circle cx="1" cy="120" r="2" class="varch-rail-node" />
      <circle cx="1" cy="212" r="2" class="varch-rail-node" />

      <style>{`
        .varch-box { fill: oklch(0.21 0.010 265); stroke: oklch(0.96 0.006 265 / 0.09); stroke-width: 1; }
        .varch-box--vault { fill: oklch(0.19 0.011 265); }
        .varch-edge { stroke: oklch(0.56 0.21 264 / 0.5); stroke-width: 1.5; }
        .varch-label { font-family: ui-monospace, monospace; font-size: 9.5px; font-weight: 700; fill: oklch(0.62 0.012 265); letter-spacing: 0.12em; }
        .varch-label--bright { fill: oklch(0.78 0.010 265); }
        .varch-sub { font-family: ui-monospace, monospace; font-size: 8px; fill: oklch(0.47 0.010 265); }
        .varch-sub--lit { fill: oklch(0.56 0.012 265); }
        .varch-tag { fill: oklch(0.56 0.21 264 / 0.1); stroke: oklch(0.56 0.21 264 / 0.2); stroke-width: 1; }
        .varch-tag-label { font-family: ui-monospace, monospace; font-size: 8px; font-weight: 600; fill: oklch(0.56 0.21 264); letter-spacing: 0.06em; }
        .varch-conn { stroke: oklch(0.96 0.006 265 / 0.2); stroke-width: 1; }
        .varch-conn--d { stroke-dasharray: 4 3; }
        .varch-conn-label { font-family: ui-monospace, monospace; font-size: 7.5px; fill: oklch(0.56 0.21 264 / 0.7); letter-spacing: 0.05em; }
        .varch-arrow { fill: oklch(0.56 0.21 264 / 0.5); }
        .varch-acl-box { fill: oklch(0.74 0.14 185 / 0.08); stroke: oklch(0.74 0.14 185 / 0.2); stroke-width: 1; }
        .varch-acl-label { font-family: ui-monospace, monospace; font-size: 7.5px; font-weight: 600; fill: oklch(0.74 0.14 185); letter-spacing: 0.08em; }
        .varch-dot { fill: oklch(0.47 0.010 265); }
        .varch-dot--on { fill: oklch(0.74 0.14 185); }
        .varch-provider { fill: oklch(0.19 0.011 265); stroke: oklch(0.96 0.006 265 / 0.08); stroke-width: 1; }
        .varch-provider--more { stroke-dasharray: 4 4; }
        .varch-pname { font-family: ui-monospace, monospace; font-size: 9px; font-weight: 700; fill: oklch(0.62 0.012 265); letter-spacing: 0.08em; }
        .varch-pname--more { fill: oklch(0.47 0.010 265); font-weight: 500; }
        .varch-psub { font-family: ui-monospace, monospace; font-size: 7.5px; fill: oklch(0.40 0.008 265); letter-spacing: 0.04em; }
        .varch-rail { stroke: oklch(0.56 0.21 264 / 0.2); stroke-width: 1; }
        .varch-rail-node { fill: oklch(0.56 0.21 264 / 0.5); }
      `}</style>
    </svg>
  );
}

const features = [
  {
    num: "01",
    title: "Unified Storage API",
    desc: "A single REST API and SDK that maps to AWS S3, Azure Blob Storage, Google Cloud Storage, Backblaze B2, Cloudflare R2, Wasabi, and others. Write once. Run on any provider.",
    detail: "Supports multipart upload, presigned URLs, versioning, and lifecycle rules.",
  },
  {
    num: "02",
    title: "ACL-Based Access Control",
    desc: "Define access with predefined roles: admin, editor, reader, and custom. Attach roles to users, services, or API keys. Vault enforces access policy at the API layer regardless of which underlying provider stores the data.",
    detail: "Role definitions apply uniformly across all configured storage providers.",
  },
  {
    num: "03",
    title: "Folder Organization and Metadata",
    desc: "Organize files into hierarchical folders with custom metadata attached to each resource. Query by metadata, folder path, content type, or tags. Metadata is stored separately from file content for fast retrieval.",
    detail: "Metadata queries return results in under 50ms at scale.",
  },
  {
    num: "04",
    title: "Cross-Cloud Replication",
    desc: "Replicate data across multiple cloud providers for redundancy and performance. Configure primary and replica providers per namespace. Vault manages consistency and handles provider failures transparently.",
    detail: "99.98% availability SLA backed by multi-provider replication.",
  },
  {
    num: "05",
    title: "Cost Optimization",
    desc: "Route storage operations to the lowest-cost provider that meets your durability and latency requirements. Vault monitors egress costs, storage pricing, and retrieval fees across providers and routes accordingly.",
    detail: "Up to 70% less than major provider standard storage tiers.",
  },
];

const CONFIG = `# vault.config.yaml
storage:
  namespace: my-app-files
  region:    us-east

replication:
  strategy:  cross-cloud
  providers: [aws, azure, gcp]
  sla:       99.98

optimize: cost

access:
  roles:
    - name:        admin
      permissions: [read, write, delete, manage]
    - name:        editor
      permissions: [read, write]
    - name:        reader
      permissions: [read]`;

export default function ProductVault() {
  const navigate = useNavigate();
  let heroRef!: HTMLDivElement;
  let archRef!: HTMLDivElement;
  let featRef!: HTMLDivElement;

  onMount(() => {
    const ease = "expo.out";
    gsap.from(heroRef.children, { opacity: 0, y: 14, duration: 0.65, stagger: 0.09, ease });
    gsap.from(archRef, { opacity: 0, y: 16, duration: 0.8, ease, scrollTrigger: { trigger: archRef, start: "top 86%" } });
    const rows = featRef.querySelectorAll(".vpf-row");
    rows.forEach((row, i) => {
      gsap.from(row, { opacity: 0, y: 12, duration: 0.6, ease, delay: i * 0.04, scrollTrigger: { trigger: row, start: "top 89%" } });
    });
  });

  return (
    <div class="vault-page">
      <Navbar />

      <div ref={heroRef} class="container vp-hero">
        <p class="vp-hero__category">Cross-cloud File Storage</p>
        <h1 class="vp-hero__name">Vault</h1>
        <p class="vp-hero__tagline">One storage API. Every cloud.</p>
        <p class="vp-hero__desc">
          A unified file storage API with ACL-based access control, folder
          organization, and metadata management. Data is replicated across
          cloud providers for a 99.98% availability SLA at up to 70% less than
          standard provider storage tiers.
        </p>
        <div class="vp-hero__actions">
          <a href="/demo" class="vp-btn" onClick={(e) => { e.preventDefault(); navigate("/demo"); }}>Request Demo</a>
          <a href="/talk" class="vp-link" onClick={(e) => { e.preventDefault(); navigate("/talk"); }}>
            Talk to an engineer
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
        </div>
        <div class="vp-hero__stats">
          <div class="vp-stat">
            <span class="vp-stat__value">99.98%</span>
            <span class="vp-stat__label">Availability SLA</span>
          </div>
          <div class="vp-stat__sep" aria-hidden="true" />
          <div class="vp-stat">
            <span class="vp-stat__value">up to 70%</span>
            <span class="vp-stat__label">Less than major providers</span>
          </div>
          <div class="vp-stat__sep" aria-hidden="true" />
          <div class="vp-stat">
            <span class="vp-stat__value">12+</span>
            <span class="vp-stat__label">Storage providers</span>
          </div>
        </div>
      </div>

      <div class="vp-arch-wrap">
        <div ref={archRef} class="container">
          <h2 class="vp-section-title">How Vault works</h2>
          <p class="vp-section-sub">
            One API call stores your file. Vault handles provider routing,
            replication, metadata indexing, and access enforcement automatically.
          </p>
          <div class="vp-arch-box"><ArchDiagram /></div>
        </div>
      </div>

      <div class="container vp-features">
        <h2 class="vp-section-title">Capabilities</h2>
        <div ref={featRef} class="vpf-list">
          {features.map((f) => (
            <div class="vpf-row">
              <span class="vpf-num">{f.num}</span>
              <div class="vpf-body">
                <h3 class="vpf-title">{f.title}</h3>
                <p class="vpf-desc">{f.desc}</p>
                <span class="vpf-detail">{f.detail}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div class="vp-config-wrap">
        <div class="container vp-config__inner">
          <div class="vp-config__text">
            <h2 class="vp-section-title">Configure once.<br />Store anywhere.</h2>
            <p class="vp-section-sub">
              Define storage behavior, replication strategy, and access roles in
              one config. Vault applies it across all connected providers.
            </p>
            <a href="/demo" class="vp-btn" onClick={(e) => { e.preventDefault(); navigate("/demo"); }}>See a live demo</a>
          </div>
          <div class="vp-code-block">
            <div class="vp-code-block__header">
              <span class="vp-code-block__filename">vault.config.yaml</span>
              <div class="vp-code-block__dots" aria-hidden="true"><span /><span /><span /></div>
            </div>
            <pre class="vp-code-block__body"><code>{CONFIG}</code></pre>
          </div>
        </div>
      </div>

      <div class="container vp-cta">
        <div class="vp-cta__card">
          <div>
            <h2 class="vp-cta__title">Store less. Pay less. Miss nothing.</h2>
            <p class="vp-cta__sub">Schedule a technical walkthrough with one of our storage engineers.</p>
          </div>
          <div class="vp-cta__actions">
            <a href="/demo" class="vp-btn" onClick={(e) => { e.preventDefault(); navigate("/demo"); }}>Request Demo</a>
            <a href="/talk" class="vp-link" onClick={(e) => { e.preventDefault(); navigate("/talk"); }}>
              Talk to an engineer
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
          </div>
        </div>
      </div>

      <style>{`
        .vault-page { min-height: 100vh; background: var(--bg-primary); color: var(--text-primary); font-family: var(--font-sans); padding-bottom: 5rem; }
        .vp-hero { padding-top: clamp(56px, 10vh, 96px); padding-bottom: 3.5rem; max-width: 800px; }
        .vp-hero__category { display: flex; align-items: center; gap: 0.75rem; font-size: 0.72rem; font-weight: 500; letter-spacing: 0.07em; color: var(--text-muted); margin-bottom: 1rem; }
        .vp-hero__category::before { content: ''; display: block; width: 18px; height: 1px; background: var(--text-dim); }
        .vp-hero__name { font-size: clamp(3rem, 7vw, 5.5rem); font-weight: 800; letter-spacing: -0.04em; line-height: 1.0; color: var(--text-primary); margin-bottom: 0.5rem; }
        .vp-hero__tagline { font-size: clamp(1rem, 2vw, 1.4rem); font-weight: 400; color: var(--text-muted); margin-bottom: 1.25rem; }
        .vp-hero__desc { font-size: 1rem; line-height: 1.7; color: var(--text-secondary); max-width: 58ch; margin-bottom: 2rem; }
        .vp-hero__actions { display: flex; align-items: center; gap: 1.5rem; margin-bottom: 2rem; flex-wrap: wrap; }
        .vp-hero__stats { display: flex; align-items: center; gap: 2rem; padding: 1.25rem 1.75rem; border: 1px solid var(--border-moderate); border-radius: 3px; background: var(--bg-card); flex-wrap: wrap; }
        .vp-stat { display: flex; flex-direction: column; gap: 0.2rem; }
        .vp-stat__value { font-family: var(--font-mono); font-size: 1.15rem; font-weight: 700; color: var(--text-primary); letter-spacing: -0.01em; font-variant-numeric: tabular-nums; }
        .vp-stat__label { font-size: 0.7rem; color: var(--text-dim); letter-spacing: 0.03em; }
        .vp-stat__sep { width: 1px; height: 32px; background: var(--border-subtle); flex-shrink: 0; }
        .vp-section-title { font-size: clamp(1.6rem, 3vw, 2.4rem); font-weight: 700; letter-spacing: -0.025em; line-height: 1.1; color: var(--text-primary); margin-bottom: 0.75rem; }
        .vp-section-sub { font-size: 0.9rem; line-height: 1.65; color: var(--text-muted); max-width: 54ch; margin-bottom: 2rem; }
        .vp-btn { display: inline-flex; align-items: center; gap: 0.4rem; padding: 0.65rem 1.4rem; font-size: 0.875rem; font-weight: 600; border-radius: 3px; background: var(--accent-indigo-light); color: oklch(0.96 0.006 265); transition: opacity 160ms var(--ease-expo), transform 160ms var(--ease-expo); white-space: nowrap; }
        .vp-btn:hover { opacity: 0.88; } .vp-btn:active { transform: scale(0.97); }
        .vp-link { display: inline-flex; align-items: center; gap: 0.4rem; font-size: 0.875rem; font-weight: 500; color: var(--text-muted); transition: color 160ms var(--ease-expo); }
        .vp-link svg { display: inline-block; transition: transform 160ms var(--ease-expo); }
        .vp-link:hover { color: var(--text-secondary); } .vp-link:hover svg { transform: translateX(3px); }
        .vp-arch-wrap { background: var(--bg-secondary); border-top: 1px solid var(--border-subtle); border-bottom: 1px solid var(--border-subtle); padding: clamp(48px, 8vh, 80px) 0; margin-bottom: clamp(56px, 8vh, 96px); }
        .vp-arch-box { border: 1px solid var(--border-moderate); border-radius: 3px; background: var(--bg-card); padding: 2rem; overflow: hidden; }
        .vault-arch { width: 100%; max-width: 600px; display: block; margin: 0 auto; }
        .vp-features { margin-bottom: clamp(56px, 8vh, 96px); }
        .vpf-list { border-top: 1px solid var(--border-subtle); margin-top: 2rem; }
        .vpf-row { display: grid; grid-template-columns: 48px 1fr; gap: 2rem; padding: 2rem 0; border-bottom: 1px solid var(--border-subtle); transition: background 160ms var(--ease-expo); }
        .vpf-row:hover { background: oklch(0.96 0.006 265 / 0.015); margin-inline: -1.5rem; padding-inline: 1.5rem; border-radius: 2px; }
        .vpf-num { font-family: var(--font-mono); font-size: 0.68rem; font-weight: 600; color: var(--text-dim); letter-spacing: 0.1em; padding-top: 4px; font-variant-numeric: tabular-nums; }
        .vpf-title { font-size: 1.05rem; font-weight: 600; letter-spacing: -0.015em; color: var(--text-primary); margin-bottom: 0.6rem; }
        .vpf-desc { font-size: 0.875rem; line-height: 1.65; color: var(--text-muted); max-width: 62ch; margin-bottom: 0.6rem; }
        .vpf-detail { font-family: var(--font-mono); font-size: 0.68rem; color: var(--text-dim); letter-spacing: 0.03em; padding: 0.35rem 0.7rem; border: 1px solid var(--border-subtle); border-radius: 2px; display: inline-block; }
        .vp-config-wrap { background: var(--bg-secondary); border-top: 1px solid var(--border-subtle); border-bottom: 1px solid var(--border-subtle); padding: clamp(48px, 8vh, 80px) 0; margin-bottom: clamp(56px, 8vh, 96px); }
        .vp-config__inner { display: grid; grid-template-columns: 1fr 1fr; gap: clamp(3rem, 6vw, 6rem); align-items: center; }
        .vp-code-block { border: 1px solid var(--border-moderate); border-radius: 3px; overflow: hidden; background: oklch(0.14 0.010 265); }
        .vp-code-block__header { display: flex; align-items: center; justify-content: space-between; padding: 0.6rem 1rem; border-bottom: 1px solid var(--border-subtle); background: oklch(0.16 0.011 265); }
        .vp-code-block__filename { font-family: var(--font-mono); font-size: 0.7rem; color: var(--text-dim); letter-spacing: 0.04em; }
        .vp-code-block__dots { display: flex; gap: 0.35rem; }
        .vp-code-block__dots span { width: 8px; height: 8px; border-radius: 50%; background: oklch(0.96 0.006 265 / 0.1); display: block; }
        .vp-code-block__body { padding: 1.5rem 1.25rem; overflow-x: auto; }
        .vp-code-block__body code { font-family: var(--font-mono); font-size: 0.78rem; line-height: 1.7; color: oklch(0.78 0.010 265); white-space: pre; display: block; }
        .vp-cta { max-width: 900px; }
        .vp-cta__card { display: flex; align-items: center; justify-content: space-between; gap: 3rem; padding: 2.5rem 3rem; border: 1px solid var(--border-moderate); border-radius: 3px; background: var(--bg-card); flex-wrap: wrap; }
        .vp-cta__title { font-size: clamp(1.1rem, 2vw, 1.5rem); font-weight: 700; letter-spacing: -0.02em; color: var(--text-primary); margin-bottom: 0.4rem; }
        .vp-cta__sub { font-size: 0.875rem; color: var(--text-muted); max-width: 40ch; line-height: 1.55; }
        .vp-cta__actions { display: flex; align-items: center; gap: 1.5rem; flex-shrink: 0; flex-wrap: wrap; }
        @media (max-width: 860px) { .vp-config__inner { grid-template-columns: 1fr; } .vpf-row { grid-template-columns: 36px 1fr; gap: 1.25rem; } .vp-cta__card { flex-direction: column; align-items: flex-start; gap: 1.5rem; } .vp-hero__stats { gap: 1.25rem; } .vp-stat__sep { display: none; } }
      `}</style>
    </div>
  );
}
