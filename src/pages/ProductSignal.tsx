import { onMount } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { gsap } from "../lib/gsap";
import Navbar from "../components/Navbar";

/* ── Architecture diagram ── */
function ArchDiagram() {
  return (
    <svg
      class="signal-arch"
      viewBox="0 0 600 280"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Signal architecture: field devices connect via x509 TLS to the Signal gateway, which routes messages to AWS IoT Core or Azure IoT Hub, then delivers to your application"
    >
      {/* Field devices */}
      <rect x="10" y="4" width="130" height="52" rx="2" class="sarch-box" />
      <text x="26" y="26" class="sarch-label">DEVICE A</text>
      <text x="26" y="44" class="sarch-sub">sensor · actuator</text>

      <rect x="10" y="68" width="130" height="52" rx="2" class="sarch-box" />
      <text x="26" y="90" class="sarch-label">DEVICE B</text>
      <text x="26" y="108" class="sarch-sub">controller · edge</text>

      <rect x="10" y="132" width="130" height="52" rx="2" class="sarch-box" />
      <text x="26" y="154" class="sarch-label">DEVICE N</text>
      <text x="26" y="172" class="sarch-sub">any field device</text>

      {/* x509 badge */}
      <rect x="148" y="98" width="80" height="20" rx="2" class="sarch-tag" />
      <text x="188" y="112" class="sarch-tag-label" text-anchor="middle">x509 TLS</text>

      {/* Connectors to Signal */}
      <line x1="140" y1="30"  x2="236" y2="110" class="sarch-conn" />
      <line x1="140" y1="94"  x2="236" y2="110" class="sarch-conn" />
      <line x1="140" y1="158" x2="236" y2="130" class="sarch-conn" />

      {/* Signal Gateway */}
      <rect x="236" y="62" width="128" height="100" rx="2" class="sarch-box sarch-box--signal" />
      <line x1="236" y1="62" x2="364" y2="62" class="sarch-edge" />
      <text x="252" y="86" class="sarch-label sarch-label--bright">SIGNAL</text>
      <text x="252" y="104" class="sarch-sub sarch-sub--lit">Gateway</text>
      <text x="252" y="120" class="sarch-sub">Route · Persist</text>
      <text x="252" y="136" class="sarch-sub">State · Events</text>
      <circle cx="340" cy="80" r="3.5" class="sarch-dot sarch-dot--on" />
      <circle cx="352" cy="80" r="3.5" class="sarch-dot sarch-dot--on" />

      {/* Connectors to cloud */}
      <line x1="364" y1="94"  x2="430" y2="70"  class="sarch-conn sarch-conn--d" />
      <line x1="364" y1="126" x2="430" y2="150" class="sarch-conn sarch-conn--d" />

      {/* Cloud providers */}
      <rect x="430" y="30"  width="160" height="70" rx="2" class="sarch-provider" />
      <line x1="430" y1="30" x2="590" y2="30" class="sarch-provider-edge" />
      <text x="446" y="56"  class="sarch-pname">AWS</text>
      <text x="446" y="74"  class="sarch-psub">IoT Core</text>
      <circle cx="568" cy="48" r="3.5" class="sarch-dot sarch-dot--on" />
      <circle cx="580" cy="48" r="3.5" class="sarch-dot sarch-dot--on" />
      <text x="446" y="92" class="sarch-region">us-east-1 · eu-west-1</text>

      <rect x="430" y="114" width="160" height="70" rx="2" class="sarch-provider" />
      <line x1="430" y1="114" x2="590" y2="114" class="sarch-provider-edge" />
      <text x="446" y="140" class="sarch-pname">Azure</text>
      <text x="446" y="158" class="sarch-psub">IoT Hub</text>
      <circle cx="568" cy="132" r="3.5" class="sarch-dot sarch-dot--on" />
      <circle cx="580" cy="132" r="3.5" class="sarch-dot" />
      <text x="446" y="176" class="sarch-region">westus2 · northeurope</text>

      {/* Connector to app */}
      <line x1="510" y1="184" x2="510" y2="220" class="sarch-conn sarch-conn--d" />
      <path d="M505 216 L510 224 L515 216" class="sarch-arrow" />

      {/* Your Application */}
      <rect x="430" y="224" width="160" height="52" rx="2" class="sarch-box" />
      <text x="446" y="248" class="sarch-label">YOUR APPLICATION</text>
      <text x="446" y="266" class="sarch-sub">Backend · APIs</text>

      {/* Bidirectional arrows on the main connectors */}
      <text x="152" y="72" class="sarch-arrow-label">bi-directional</text>

      {/* Rail */}
      <line x1="1" y1="62" x2="1" y2="276" class="sarch-rail" />
      <circle cx="1" cy="112" r="2" class="sarch-rail-node" />
      <circle cx="1" cy="250" r="2" class="sarch-rail-node" />

      <style>{`
        .sarch-box { fill: oklch(0.21 0.010 265); stroke: oklch(0.96 0.006 265 / 0.09); stroke-width: 1; }
        .sarch-box--signal { fill: oklch(0.19 0.011 265); }
        .sarch-edge { stroke: oklch(0.56 0.21 264 / 0.5); stroke-width: 1.5; }
        .sarch-label { font-family: ui-monospace, monospace; font-size: 9px; font-weight: 700; fill: oklch(0.62 0.012 265); letter-spacing: 0.1em; }
        .sarch-label--bright { fill: oklch(0.78 0.010 265); }
        .sarch-sub { font-family: ui-monospace, monospace; font-size: 7.5px; fill: oklch(0.47 0.010 265); }
        .sarch-sub--lit { fill: oklch(0.56 0.012 265); }
        .sarch-tag { fill: oklch(0.56 0.21 264 / 0.1); stroke: oklch(0.56 0.21 264 / 0.2); stroke-width: 1; }
        .sarch-tag-label { font-family: ui-monospace, monospace; font-size: 7.5px; font-weight: 600; fill: oklch(0.56 0.21 264); letter-spacing: 0.06em; }
        .sarch-conn { stroke: oklch(0.96 0.006 265 / 0.18); stroke-width: 1; }
        .sarch-conn--d { stroke-dasharray: 4 3; }
        .sarch-arrow { fill: oklch(0.56 0.21 264 / 0.4); }
        .sarch-arrow-label { font-family: ui-monospace, monospace; font-size: 7px; fill: oklch(0.56 0.21 264 / 0.6); letter-spacing: 0.04em; }
        .sarch-provider { fill: oklch(0.19 0.011 265); stroke: oklch(0.96 0.006 265 / 0.08); stroke-width: 1; }
        .sarch-provider-edge { stroke: oklch(0.74 0.14 185 / 0.4); stroke-width: 1.5; }
        .sarch-pname { font-family: ui-monospace, monospace; font-size: 9.5px; font-weight: 700; fill: oklch(0.62 0.012 265); letter-spacing: 0.08em; }
        .sarch-psub { font-family: ui-monospace, monospace; font-size: 8px; fill: oklch(0.47 0.010 265); }
        .sarch-region { font-family: ui-monospace, monospace; font-size: 7px; fill: oklch(0.40 0.008 265); letter-spacing: 0.04em; }
        .sarch-dot { fill: oklch(0.47 0.010 265); }
        .sarch-dot--on { fill: oklch(0.74 0.14 185); }
        .sarch-rail { stroke: oklch(0.56 0.21 264 / 0.2); stroke-width: 1; }
        .sarch-rail-node { fill: oklch(0.56 0.21 264 / 0.5); }
      `}</style>
    </svg>
  );
}

const features = [
  {
    num: "01",
    title: "Secure Bi-directional Communication",
    desc: "Send messages from devices to your application and push commands back to devices in real time. Signal maintains persistent connections for low-latency bi-directional messaging without polling.",
    detail: "Sub-second message delivery from field device to backend application.",
  },
  {
    num: "02",
    title: "Dual Cloud Strategy",
    desc: "Signal runs on both AWS IoT Core and Azure IoT Hub simultaneously. Configure provider preference per region. If a provider has an outage, Signal fails over automatically, maintaining device connectivity.",
    detail: "AWS IoT Core and Azure IoT Hub supported. Regional failover in under 30 seconds.",
  },
  {
    num: "03",
    title: "x509 Certificate Security",
    desc: "Every device connection is authenticated with an x509 certificate. Signal issues, rotates, and revokes certificates via API. No shared secrets. No passwords. Certificate-based identity for every device on the network.",
    detail: "TLS 1.3 with mutual authentication. Certificate lifecycle managed by Signal.",
  },
  {
    num: "04",
    title: "Self-service Device Provisioning",
    desc: "Register, configure, and decommission devices via REST API without infrastructure changes. Provision individually or in bulk. Assign devices to groups, set metadata, and configure message routing rules programmatically.",
    detail: "REST API and SDK for provisioning. Bulk registration supports CSV and JSON.",
  },
  {
    num: "05",
    title: "Device Event Capture",
    desc: "Capture device lifecycle events: connection, disconnection, certificate expiry, shadow updates, and custom application events. Events are timestamped, indexed, and available via query API or webhook delivery.",
    detail: "Event history retained for 90 days. Webhook delivery to any HTTP endpoint.",
  },
  {
    num: "06",
    title: "Message Routing and Device State",
    desc: "Route device messages to different backend services based on message content, device group, or region. Read and publish device state (shadow) at any time, even when the device is offline. State is synchronized when the device reconnects.",
    detail: "Rule-based routing with filter expressions. Device shadow supports nested JSON.",
  },
];

export default function ProductSignal() {
  const navigate = useNavigate();
  let heroRef!: HTMLDivElement;
  let archRef!: HTMLDivElement;
  let featRef!: HTMLDivElement;

  onMount(() => {
    const ease = "expo.out";
    gsap.from(heroRef.children, { opacity: 0, y: 14, duration: 0.65, stagger: 0.09, ease });
    gsap.from(archRef, { opacity: 0, y: 16, duration: 0.8, ease, scrollTrigger: { trigger: archRef, start: "top 86%" } });
    const rows = featRef.querySelectorAll(".spf-row");
    rows.forEach((row, i) => {
      gsap.from(row, { opacity: 0, y: 12, duration: 0.6, ease, delay: i * 0.04, scrollTrigger: { trigger: row, start: "top 89%" } });
    });
  });

  return (
    <div class="signal-page">
      <Navbar />

      <div ref={heroRef} class="container sp-hero">
        <p class="sp-hero__category">IoT Communication Platform</p>
        <h1 class="sp-hero__name">Signal</h1>
        <p class="sp-hero__tagline">Field to cloud. Securely.</p>
        <p class="sp-hero__desc">
          Secure bi-directional communication between field devices and applications.
          AWS and Azure IoT support with x509 certificate security, self-service
          device provisioning, and real-time message routing. Connect your
          hardware to your backend without building custom infrastructure.
        </p>
        <div class="sp-hero__actions">
          <a href="/demo" class="sp-btn" onClick={(e) => { e.preventDefault(); navigate("/demo"); }}>Request Demo</a>
          <a href="/talk" class="sp-link" onClick={(e) => { e.preventDefault(); navigate("/talk"); }}>
            Talk to an engineer
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
        </div>
        <div class="sp-hero__caps">
          {[
            "Bi-directional MQTT",
            "AWS IoT Core",
            "Azure IoT Hub",
            "x509 certificates",
            "Device provisioning API",
            "Message routing",
            "Device state (shadow)",
            "Event capture",
          ].map((c) => (
            <span class="sp-chip">{c}</span>
          ))}
        </div>
      </div>

      <div class="sp-arch-wrap">
        <div ref={archRef} class="container">
          <h2 class="sp-section-title">How Signal works</h2>
          <p class="sp-section-sub">
            Devices connect to Signal via secure MQTT. Signal routes messages to
            your application through AWS or Azure, based on region and availability.
          </p>
          <div class="sp-arch-box"><ArchDiagram /></div>
        </div>
      </div>

      <div class="container sp-features">
        <h2 class="sp-section-title">Capabilities</h2>
        <div ref={featRef} class="spf-list">
          {features.map((f) => (
            <div class="spf-row">
              <span class="spf-num">{f.num}</span>
              <div class="spf-body">
                <h3 class="spf-title">{f.title}</h3>
                <p class="spf-desc">{f.desc}</p>
                <span class="spf-detail">{f.detail}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div class="container sp-cta">
        <div class="sp-cta__card">
          <div>
            <h2 class="sp-cta__title">Connect your devices to your backend.</h2>
            <p class="sp-cta__sub">Schedule a technical walkthrough with one of our IoT engineers.</p>
          </div>
          <div class="sp-cta__actions">
            <a href="/demo" class="sp-btn" onClick={(e) => { e.preventDefault(); navigate("/demo"); }}>Request Demo</a>
            <a href="/talk" class="sp-link" onClick={(e) => { e.preventDefault(); navigate("/talk"); }}>
              Talk to an engineer
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
          </div>
        </div>
      </div>

      <style>{`
        .signal-page { min-height: 100vh; background: var(--bg-primary); color: var(--text-primary); font-family: var(--font-sans); padding-bottom: 5rem; }
        .sp-hero { padding-top: clamp(56px, 10vh, 96px); padding-bottom: 3.5rem; max-width: 800px; }
        .sp-hero__category { display: flex; align-items: center; gap: 0.75rem; font-size: 0.72rem; font-weight: 500; letter-spacing: 0.07em; color: var(--text-muted); margin-bottom: 1rem; }
        .sp-hero__category::before { content: ''; display: block; width: 18px; height: 1px; background: var(--text-dim); }
        .sp-hero__name { font-size: clamp(3rem, 7vw, 5.5rem); font-weight: 800; letter-spacing: -0.04em; line-height: 1.0; color: var(--text-primary); margin-bottom: 0.5rem; }
        .sp-hero__tagline { font-size: clamp(1rem, 2vw, 1.4rem); font-weight: 400; color: var(--text-muted); margin-bottom: 1.25rem; }
        .sp-hero__desc { font-size: 1rem; line-height: 1.7; color: var(--text-secondary); max-width: 58ch; margin-bottom: 2rem; }
        .sp-hero__actions { display: flex; align-items: center; gap: 1.5rem; margin-bottom: 2rem; flex-wrap: wrap; }
        .sp-hero__caps { display: flex; flex-wrap: wrap; gap: 0.4rem; }
        .sp-chip { font-family: var(--font-mono); font-size: 0.68rem; font-weight: 500; padding: 0.22rem 0.6rem; border: 1px solid var(--border-subtle); border-radius: 2px; color: var(--text-muted); letter-spacing: 0.04em; }
        .sp-section-title { font-size: clamp(1.6rem, 3vw, 2.4rem); font-weight: 700; letter-spacing: -0.025em; line-height: 1.1; color: var(--text-primary); margin-bottom: 0.75rem; }
        .sp-section-sub { font-size: 0.9rem; line-height: 1.65; color: var(--text-muted); max-width: 54ch; margin-bottom: 2rem; }
        .sp-btn { display: inline-flex; align-items: center; gap: 0.4rem; padding: 0.65rem 1.4rem; font-size: 0.875rem; font-weight: 600; border-radius: 3px; background: var(--accent-indigo-light); color: oklch(0.96 0.006 265); transition: opacity 160ms var(--ease-expo), transform 160ms var(--ease-expo); white-space: nowrap; }
        .sp-btn:hover { opacity: 0.88; } .sp-btn:active { transform: scale(0.97); }
        .sp-link { display: inline-flex; align-items: center; gap: 0.4rem; font-size: 0.875rem; font-weight: 500; color: var(--text-muted); transition: color 160ms var(--ease-expo); }
        .sp-link svg { display: inline-block; transition: transform 160ms var(--ease-expo); }
        .sp-link:hover { color: var(--text-secondary); } .sp-link:hover svg { transform: translateX(3px); }
        .sp-arch-wrap { background: var(--bg-secondary); border-top: 1px solid var(--border-subtle); border-bottom: 1px solid var(--border-subtle); padding: clamp(48px, 8vh, 80px) 0; margin-bottom: clamp(56px, 8vh, 96px); }
        .sp-arch-box { border: 1px solid var(--border-moderate); border-radius: 3px; background: var(--bg-card); padding: 2rem; overflow: hidden; }
        .signal-arch { width: 100%; max-width: 600px; display: block; margin: 0 auto; }
        .sp-features { margin-bottom: clamp(56px, 8vh, 96px); }
        .spf-list { border-top: 1px solid var(--border-subtle); margin-top: 2rem; }
        .spf-row { display: grid; grid-template-columns: 48px 1fr; gap: 2rem; padding: 2rem 0; border-bottom: 1px solid var(--border-subtle); transition: background 160ms var(--ease-expo); }
        .spf-row:hover { background: oklch(0.96 0.006 265 / 0.015); margin-inline: -1.5rem; padding-inline: 1.5rem; border-radius: 2px; }
        .spf-num { font-family: var(--font-mono); font-size: 0.68rem; font-weight: 600; color: var(--text-dim); letter-spacing: 0.1em; padding-top: 4px; font-variant-numeric: tabular-nums; }
        .spf-title { font-size: 1.05rem; font-weight: 600; letter-spacing: -0.015em; color: var(--text-primary); margin-bottom: 0.6rem; }
        .spf-desc { font-size: 0.875rem; line-height: 1.65; color: var(--text-muted); max-width: 62ch; margin-bottom: 0.6rem; }
        .spf-detail { font-family: var(--font-mono); font-size: 0.68rem; color: var(--text-dim); letter-spacing: 0.03em; padding: 0.35rem 0.7rem; border: 1px solid var(--border-subtle); border-radius: 2px; display: inline-block; }
        .sp-cta { max-width: 900px; }
        .sp-cta__card { display: flex; align-items: center; justify-content: space-between; gap: 3rem; padding: 2.5rem 3rem; border: 1px solid var(--border-moderate); border-radius: 3px; background: var(--bg-card); flex-wrap: wrap; }
        .sp-cta__title { font-size: clamp(1.1rem, 2vw, 1.5rem); font-weight: 700; letter-spacing: -0.02em; color: var(--text-primary); margin-bottom: 0.4rem; }
        .sp-cta__sub { font-size: 0.875rem; color: var(--text-muted); max-width: 40ch; line-height: 1.55; }
        .sp-cta__actions { display: flex; align-items: center; gap: 1.5rem; flex-shrink: 0; flex-wrap: wrap; }
        @media (max-width: 860px) { .spf-row { grid-template-columns: 36px 1fr; gap: 1.25rem; } .sp-cta__card { flex-direction: column; align-items: flex-start; gap: 1.5rem; } }
      `}</style>
    </div>
  );
}
