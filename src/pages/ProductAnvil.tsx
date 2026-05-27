import { onMount } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { gsap } from "../lib/gsap";
import Navbar from "../components/Navbar";

/* ── Architecture diagram ── */
function ArchDiagram() {
  return (
    <svg
      class="anvil-arch"
      viewBox="0 0 600 280"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Anvil architecture: your config describes VMs, Anvil provisions them across AWS, GCP, Azure, or on-premises hardware"
    >
      {/* Config input */}
      <rect x="10" y="4" width="200" height="52" rx="2" class="aarch-box" />
      <text x="26" y="26" class="aarch-label">YOUR CONFIG</text>
      <text x="26" y="44" class="aarch-sub">anvil.config.yaml</text>

      {/* Hardware spec */}
      <rect x="390" y="4" width="200" height="52" rx="2" class="aarch-box aarch-box--spec" />
      <text x="406" y="24" class="aarch-label">HARDWARE SPEC</text>
      <text x="406" y="40" class="aarch-hw">16 vCPU · 64 GB · NVMe</text>

      {/* Connectors to Anvil */}
      <line x1="210" y1="30" x2="252" y2="58" class="aarch-conn" />
      <line x1="390" y1="30" x2="348" y2="58" class="aarch-conn" />
      <path d="M248 55 L252 62 L256 55" class="aarch-arrow" />
      <path d="M344 55 L348 62 L352 55" class="aarch-arrow" />

      {/* Anvil layer */}
      <rect x="10" y="64" width="580" height="60" rx="2" class="aarch-box aarch-box--anvil" />
      <line x1="10" y1="64" x2="590" y2="64" class="aarch-edge" />
      <text x="26" y="90" class="aarch-label aarch-label--bright">ANVIL</text>
      <text x="26" y="110" class="aarch-sub aarch-sub--lit">Provision · Schedule · Monitor · Scale</text>

      {/* Status */}
      <circle cx="558" cy="82" r="3.5" class="aarch-dot aarch-dot--on" />
      <circle cx="572" cy="82" r="3.5" class="aarch-dot aarch-dot--on" />
      <circle cx="558" cy="102" r="3.5" class="aarch-dot aarch-dot--on" />
      <circle cx="572" cy="102" r="3.5" class="aarch-dot" />

      {/* Connectors to providers */}
      <line x1="68"  y1="124" x2="68"  y2="162" class="aarch-conn aarch-conn--d" />
      <line x1="206" y1="124" x2="206" y2="162" class="aarch-conn aarch-conn--d" />
      <line x1="344" y1="124" x2="344" y2="162" class="aarch-conn aarch-conn--d" />
      <line x1="482" y1="124" x2="482" y2="162" class="aarch-conn aarch-conn--d" />

      {/* Provider boxes */}
      <rect x="10"  y="162" width="116" height="66" rx="2" class="aarch-provider" />
      <rect x="148" y="162" width="116" height="66" rx="2" class="aarch-provider" />
      <rect x="286" y="162" width="116" height="66" rx="2" class="aarch-provider" />
      <rect x="424" y="162" width="166" height="66" rx="2" class="aarch-provider aarch-provider--prem" />

      <text x="68"  y="194" class="aarch-pname" text-anchor="middle">AWS</text>
      <text x="206" y="194" class="aarch-pname" text-anchor="middle">GCP</text>
      <text x="344" y="194" class="aarch-pname" text-anchor="middle">Azure</text>
      <text x="507" y="194" class="aarch-pname" text-anchor="middle">On-Premises</text>

      <text x="68"  y="212" class="aarch-psub" text-anchor="middle">EC2 · EKS</text>
      <text x="206" y="212" class="aarch-psub" text-anchor="middle">GCE · GKE</text>
      <text x="344" y="212" class="aarch-psub" text-anchor="middle">AVM · AKS</text>
      <text x="507" y="212" class="aarch-psub" text-anchor="middle">Bare metal · Hypervisor</text>

      {/* VM indicators */}
      <rect x="18"  y="220" width="28" height="5" rx="1" class="aarch-vm" />
      <rect x="50"  y="220" width="28" height="5" rx="1" class="aarch-vm" />
      <rect x="82"  y="220" width="28" height="5" rx="1" class="aarch-vm aarch-vm--dim" />

      <rect x="156" y="220" width="28" height="5" rx="1" class="aarch-vm" />
      <rect x="188" y="220" width="28" height="5" rx="1" class="aarch-vm" />

      <rect x="294" y="220" width="28" height="5" rx="1" class="aarch-vm" />
      <rect x="326" y="220" width="28" height="5" rx="1" class="aarch-vm aarch-vm--dim" />

      <rect x="432" y="220" width="40" height="5" rx="1" class="aarch-vm" />
      <rect x="476" y="220" width="40" height="5" rx="1" class="aarch-vm aarch-vm--dim" />

      {/* Rail */}
      <line x1="1" y1="64" x2="1" y2="228" class="aarch-rail" />
      <circle cx="1" cy="96" r="2" class="aarch-rail-node" />
      <circle cx="1" cy="195" r="2" class="aarch-rail-node" />

      <style>{`
        .aarch-box { fill: oklch(0.21 0.010 265); stroke: oklch(0.96 0.006 265 / 0.09); stroke-width: 1; }
        .aarch-box--spec { fill: oklch(0.19 0.011 265); }
        .aarch-box--anvil { fill: oklch(0.19 0.011 265); }
        .aarch-edge { stroke: oklch(0.56 0.21 264 / 0.5); stroke-width: 1.5; }
        .aarch-label { font-family: ui-monospace, monospace; font-size: 9.5px; font-weight: 700; fill: oklch(0.62 0.012 265); letter-spacing: 0.12em; }
        .aarch-label--bright { fill: oklch(0.78 0.010 265); }
        .aarch-sub { font-family: ui-monospace, monospace; font-size: 8px; fill: oklch(0.47 0.010 265); }
        .aarch-sub--lit { fill: oklch(0.56 0.012 265); }
        .aarch-hw { font-family: ui-monospace, monospace; font-size: 8.5px; font-weight: 600; fill: oklch(0.62 0.012 265); letter-spacing: 0.05em; }
        .aarch-conn { stroke: oklch(0.96 0.006 265 / 0.18); stroke-width: 1; }
        .aarch-conn--d { stroke-dasharray: 4 3; }
        .aarch-arrow { fill: oklch(0.56 0.21 264 / 0.4); }
        .aarch-dot { fill: oklch(0.47 0.010 265); }
        .aarch-dot--on { fill: oklch(0.74 0.14 185); }
        .aarch-provider { fill: oklch(0.19 0.011 265); stroke: oklch(0.96 0.006 265 / 0.08); stroke-width: 1; }
        .aarch-provider--prem { stroke-dasharray: 4 4; }
        .aarch-pname { font-family: ui-monospace, monospace; font-size: 9.5px; font-weight: 700; fill: oklch(0.62 0.012 265); letter-spacing: 0.08em; }
        .aarch-psub { font-family: ui-monospace, monospace; font-size: 7.5px; fill: oklch(0.40 0.008 265); letter-spacing: 0.04em; }
        .aarch-vm { fill: oklch(0.56 0.21 264 / 0.35); }
        .aarch-vm--dim { fill: oklch(0.47 0.010 265 / 0.3); }
        .aarch-rail { stroke: oklch(0.56 0.21 264 / 0.2); stroke-width: 1; }
        .aarch-rail-node { fill: oklch(0.56 0.21 264 / 0.5); }
      `}</style>
    </svg>
  );
}

const features = [
  {
    num: "01",
    title: "Multi-cloud VM Provisioning",
    desc: "Provision virtual machines on AWS, GCP, Azure, DigitalOcean, and any other supported provider from one configuration. Anvil translates resource definitions to provider-native APIs at runtime.",
    detail: "Single config across EC2, GCE, Azure VMs, Droplets, and Linodes.",
  },
  {
    num: "02",
    title: "On-premises and Bare Metal",
    desc: "Run VMs on your own hardware alongside cloud instances. Anvil integrates with hypervisors (VMware, KVM, Proxmox) and bare-metal provisioning systems, giving you a unified control plane across on-prem and cloud.",
    detail: "Supports VMware vSphere, Proxmox, KVM, and custom IPAM integrations.",
  },
  {
    num: "03",
    title: "Hardware Specification",
    desc: "Describe exact compute requirements per workload: vCPU count, memory, storage type and size, GPU model, and network throughput. Anvil maps your spec to the closest matching instance type on each provider.",
    detail: "GPU workloads supported on AWS, GCP, Azure, and on-prem with compatible hardware.",
  },
  {
    num: "04",
    title: "Container Runtime",
    desc: "Run containers natively alongside or inside Anvil-managed VMs. Define container images and resource limits in the same config file as your VM definitions. No separate orchestration layer required.",
    detail: "Supports Docker, containerd, and OCI-compatible runtimes.",
  },
  {
    num: "05",
    title: "Simple YAML Configuration",
    desc: "Describe your entire compute infrastructure in a single config file. VM types, hardware specs, provider preferences, failover rules, and container definitions in one place. No provider-specific tooling or SDK knowledge required.",
    detail: "Config applies across all providers without modification.",
  },
];

const CONFIG = `# anvil.config.yaml
vm:
  name:    compute-node-01
  type:    general-purpose

hardware:
  vcpu:    16
  memory:  64gb
  storage: 500gb-ssd
  gpu:     optional

deploy:
  primary:  aws:us-east-1
  fallback: on-prem:dc-london
  strategy: availability

runtime:
  containers: enabled
  images:
    - ghcr.io/myorg/myapp:latest`;

export default function ProductAnvil() {
  const navigate = useNavigate();
  let heroRef!: HTMLDivElement;
  let archRef!: HTMLDivElement;
  let featRef!: HTMLDivElement;

  onMount(() => {
    const ease = "expo.out";
    gsap.from(heroRef.children, { opacity: 0, y: 14, duration: 0.65, stagger: 0.09, ease });
    gsap.from(archRef, { opacity: 0, y: 16, duration: 0.8, ease, scrollTrigger: { trigger: archRef, start: "top 86%" } });
    const rows = featRef.querySelectorAll(".apf-row");
    rows.forEach((row, i) => {
      gsap.from(row, { opacity: 0, y: 12, duration: 0.6, ease, delay: i * 0.04, scrollTrigger: { trigger: row, start: "top 89%" } });
    });
  });

  return (
    <div class="anvil-page">
      <Navbar />

      <div ref={heroRef} class="container ap-hero">
        <p class="ap-hero__category">VM Orchestration Platform</p>
        <h1 class="ap-hero__name">Anvil</h1>
        <p class="ap-hero__tagline">Any hardware. Any cloud.</p>
        <p class="ap-hero__desc">
          Provision and orchestrate virtual machines across cloud providers and
          on-premises infrastructure from a single configuration file. Specify
          exact hardware combinations. Container runtime included. No
          provider-specific tooling required.
        </p>
        <div class="ap-hero__actions">
          <a href="/demo" class="ap-btn" onClick={(e) => { e.preventDefault(); navigate("/demo"); }}>Request Demo</a>
          <a href="/talk" class="ap-link" onClick={(e) => { e.preventDefault(); navigate("/talk"); }}>
            Talk to an engineer
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
        </div>
        <div class="ap-chips">
          {["AWS EC2", "GCP GCE", "Azure VMs", "On-Premises", "Bare Metal", "VMware", "KVM"].map((c) => (
            <span class="ap-chip">{c}</span>
          ))}
        </div>
      </div>

      <div class="ap-arch-wrap">
        <div ref={archRef} class="container">
          <h2 class="ap-section-title">How Anvil works</h2>
          <p class="ap-section-sub">
            Describe your compute requirements once. Anvil provisions the right
            VM on the right infrastructure and keeps it running.
          </p>
          <div class="ap-arch-box">
            <ArchDiagram />
          </div>
        </div>
      </div>

      <div class="container ap-features">
        <h2 class="ap-section-title">Capabilities</h2>
        <div ref={featRef} class="apf-list">
          {features.map((f) => (
            <div class="apf-row">
              <span class="apf-num">{f.num}</span>
              <div class="apf-body">
                <h3 class="apf-title">{f.title}</h3>
                <p class="apf-desc">{f.desc}</p>
                <span class="apf-detail">{f.detail}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div class="ap-config-wrap">
        <div class="container ap-config__inner">
          <div class="ap-config__text">
            <h2 class="ap-section-title">One config.<br />Every environment.</h2>
            <p class="ap-section-sub">
              Hardware specs, cloud providers, failover rules, and container
              images in one file. Anvil provisions everything described.
            </p>
            <a href="/demo" class="ap-btn" onClick={(e) => { e.preventDefault(); navigate("/demo"); }}>See a live demo</a>
          </div>
          <div class="ap-code-block">
            <div class="ap-code-block__header">
              <span class="ap-code-block__filename">anvil.config.yaml</span>
              <div class="ap-code-block__dots" aria-hidden="true"><span /><span /><span /></div>
            </div>
            <pre class="ap-code-block__body"><code>{CONFIG}</code></pre>
          </div>
        </div>
      </div>

      <div class="container ap-cta">
        <div class="ap-cta__card">
          <div>
            <h2 class="ap-cta__title">Provision your first VM cluster.</h2>
            <p class="ap-cta__sub">Schedule a technical walkthrough with one of our infrastructure engineers.</p>
          </div>
          <div class="ap-cta__actions">
            <a href="/demo" class="ap-btn" onClick={(e) => { e.preventDefault(); navigate("/demo"); }}>Request Demo</a>
            <a href="/talk" class="ap-link" onClick={(e) => { e.preventDefault(); navigate("/talk"); }}>
              Talk to an engineer
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
          </div>
        </div>
      </div>

      <style>{`
        .anvil-page { min-height: 100vh; background: var(--bg-primary); color: var(--text-primary); font-family: var(--font-sans); padding-bottom: 5rem; }
        .ap-hero { padding-top: clamp(56px, 10vh, 96px); padding-bottom: 3.5rem; max-width: 800px; }
        .ap-hero__category { display: flex; align-items: center; gap: 0.75rem; font-size: 0.72rem; font-weight: 500; letter-spacing: 0.07em; color: var(--text-muted); margin-bottom: 1rem; }
        .ap-hero__category::before { content: ''; display: block; width: 18px; height: 1px; background: var(--text-dim); }
        .ap-hero__name { font-size: clamp(3rem, 7vw, 5.5rem); font-weight: 800; letter-spacing: -0.04em; line-height: 1.0; color: var(--text-primary); margin-bottom: 0.5rem; }
        .ap-hero__tagline { font-size: clamp(1rem, 2vw, 1.4rem); font-weight: 400; color: var(--text-muted); margin-bottom: 1.25rem; }
        .ap-hero__desc { font-size: 1rem; line-height: 1.7; color: var(--text-secondary); max-width: 58ch; margin-bottom: 2rem; }
        .ap-hero__actions { display: flex; align-items: center; gap: 1.5rem; margin-bottom: 2rem; flex-wrap: wrap; }
        .ap-chips { display: flex; flex-wrap: wrap; gap: 0.4rem; }
        .ap-chip { font-family: var(--font-mono); font-size: 0.68rem; font-weight: 500; padding: 0.22rem 0.6rem; border: 1px solid var(--border-subtle); border-radius: 2px; color: var(--text-muted); letter-spacing: 0.05em; }
        .ap-section-title { font-size: clamp(1.6rem, 3vw, 2.4rem); font-weight: 700; letter-spacing: -0.025em; line-height: 1.1; color: var(--text-primary); margin-bottom: 0.75rem; }
        .ap-section-sub { font-size: 0.9rem; line-height: 1.65; color: var(--text-muted); max-width: 54ch; margin-bottom: 2rem; }
        .ap-btn { display: inline-flex; align-items: center; gap: 0.4rem; padding: 0.65rem 1.4rem; font-size: 0.875rem; font-weight: 600; border-radius: 3px; background: var(--accent-indigo-light); color: oklch(0.96 0.006 265); transition: opacity 160ms var(--ease-expo), transform 160ms var(--ease-expo); white-space: nowrap; }
        .ap-btn:hover { opacity: 0.88; } .ap-btn:active { transform: scale(0.97); }
        .ap-link { display: inline-flex; align-items: center; gap: 0.4rem; font-size: 0.875rem; font-weight: 500; color: var(--text-muted); transition: color 160ms var(--ease-expo); }
        .ap-link svg { display: inline-block; transition: transform 160ms var(--ease-expo); }
        .ap-link:hover { color: var(--text-secondary); } .ap-link:hover svg { transform: translateX(3px); }
        .ap-arch-wrap { background: var(--bg-secondary); border-top: 1px solid var(--border-subtle); border-bottom: 1px solid var(--border-subtle); padding: clamp(48px, 8vh, 80px) 0; margin-bottom: clamp(56px, 8vh, 96px); }
        .ap-arch-box { border: 1px solid var(--border-moderate); border-radius: 3px; background: var(--bg-card); padding: 2rem; overflow: hidden; }
        .anvil-arch { width: 100%; max-width: 600px; display: block; margin: 0 auto; }
        .ap-features { margin-bottom: clamp(56px, 8vh, 96px); }
        .apf-list { border-top: 1px solid var(--border-subtle); margin-top: 2rem; }
        .apf-row { display: grid; grid-template-columns: 48px 1fr; gap: 2rem; padding: 2rem 0; border-bottom: 1px solid var(--border-subtle); transition: background 160ms var(--ease-expo); }
        .apf-row:hover { background: oklch(0.96 0.006 265 / 0.015); margin-inline: -1.5rem; padding-inline: 1.5rem; border-radius: 2px; }
        .apf-num { font-family: var(--font-mono); font-size: 0.68rem; font-weight: 600; color: var(--text-dim); letter-spacing: 0.1em; padding-top: 4px; font-variant-numeric: tabular-nums; }
        .apf-title { font-size: 1.05rem; font-weight: 600; letter-spacing: -0.015em; color: var(--text-primary); margin-bottom: 0.6rem; }
        .apf-desc { font-size: 0.875rem; line-height: 1.65; color: var(--text-muted); max-width: 62ch; margin-bottom: 0.6rem; }
        .apf-detail { font-family: var(--font-mono); font-size: 0.68rem; color: var(--text-dim); letter-spacing: 0.03em; padding: 0.35rem 0.7rem; border: 1px solid var(--border-subtle); border-radius: 2px; display: inline-block; }
        .ap-config-wrap { background: var(--bg-secondary); border-top: 1px solid var(--border-subtle); border-bottom: 1px solid var(--border-subtle); padding: clamp(48px, 8vh, 80px) 0; margin-bottom: clamp(56px, 8vh, 96px); }
        .ap-config__inner { display: grid; grid-template-columns: 1fr 1fr; gap: clamp(3rem, 6vw, 6rem); align-items: center; }
        .ap-code-block { border: 1px solid var(--border-moderate); border-radius: 3px; overflow: hidden; background: oklch(0.14 0.010 265); }
        .ap-code-block__header { display: flex; align-items: center; justify-content: space-between; padding: 0.6rem 1rem; border-bottom: 1px solid var(--border-subtle); background: oklch(0.16 0.011 265); }
        .ap-code-block__filename { font-family: var(--font-mono); font-size: 0.7rem; color: var(--text-dim); letter-spacing: 0.04em; }
        .ap-code-block__dots { display: flex; gap: 0.35rem; }
        .ap-code-block__dots span { width: 8px; height: 8px; border-radius: 50%; background: oklch(0.96 0.006 265 / 0.1); display: block; }
        .ap-code-block__body { padding: 1.5rem 1.25rem; overflow-x: auto; }
        .ap-code-block__body code { font-family: var(--font-mono); font-size: 0.78rem; line-height: 1.7; color: oklch(0.78 0.010 265); white-space: pre; display: block; }
        .ap-cta { max-width: 900px; }
        .ap-cta__card { display: flex; align-items: center; justify-content: space-between; gap: 3rem; padding: 2.5rem 3rem; border: 1px solid var(--border-moderate); border-radius: 3px; background: var(--bg-card); flex-wrap: wrap; }
        .ap-cta__title { font-size: clamp(1.1rem, 2vw, 1.5rem); font-weight: 700; letter-spacing: -0.02em; color: var(--text-primary); margin-bottom: 0.4rem; }
        .ap-cta__sub { font-size: 0.875rem; color: var(--text-muted); max-width: 40ch; line-height: 1.55; }
        .ap-cta__actions { display: flex; align-items: center; gap: 1.5rem; flex-shrink: 0; flex-wrap: wrap; }
        @media (max-width: 860px) { .ap-config__inner { grid-template-columns: 1fr; } .apf-row { grid-template-columns: 36px 1fr; gap: 1.25rem; } .ap-cta__card { flex-direction: column; align-items: flex-start; gap: 1.5rem; } }
      `}</style>
    </div>
  );
}
