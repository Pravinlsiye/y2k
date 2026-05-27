import { onMount } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { gsap, fadeUp } from "../lib/gsap";
import { productsData } from "../lib/productsData";

const _directives: unknown[] = [fadeUp];
void _directives;

/* ── Compact per-product mini schematics ── */

function PrismMini() {
  return (
    <svg viewBox="0 0 220 120" fill="none" class="pshowcase-svg" role="img" aria-hidden="true">
      <rect x="10" y="4" width="200" height="32" rx="2" class="ps-box" />
      <text x="110" y="25" class="ps-label" text-anchor="middle">YOUR APPLICATION</text>
      <line x1="110" y1="36" x2="110" y2="54" class="ps-conn" />
      <path d="M106 50 L110 56 L114 50" class="ps-arrow" />
      <rect x="10" y="56" width="200" height="32" rx="2" class="ps-box ps-box--accent" />
      <line x1="10" y1="56" x2="210" y2="56" class="ps-edge" />
      <text x="110" y="77" class="ps-label ps-label--bright" text-anchor="middle">PRISM</text>
      <line x1="38"  y1="88" x2="38"  y2="104" class="ps-conn ps-conn--d" />
      <line x1="110" y1="88" x2="110" y2="104" class="ps-conn ps-conn--d" />
      <line x1="182" y1="88" x2="182" y2="104" class="ps-conn ps-conn--d" />
      <rect x="10"  y="104" width="56" height="14" rx="1" class="ps-provider" />
      <rect x="82"  y="104" width="56" height="14" rx="1" class="ps-provider" />
      <rect x="154" y="104" width="56" height="14" rx="1" class="ps-provider" />
      <text x="38"  y="115" class="ps-ptxt" text-anchor="middle">AWS</text>
      <text x="110" y="115" class="ps-ptxt" text-anchor="middle">GCP</text>
      <text x="182" y="115" class="ps-ptxt" text-anchor="middle">Azure</text>
      <style>{`
        .ps-box { fill: oklch(0.21 0.010 265); stroke: oklch(0.96 0.006 265 / 0.09); stroke-width: 1; }
        .ps-box--accent { fill: oklch(0.19 0.011 265); }
        .ps-edge { stroke: oklch(0.56 0.21 264 / 0.5); stroke-width: 1.5; }
        .ps-label { font-family: ui-monospace, monospace; font-size: 7px; font-weight: 600; fill: oklch(0.56 0.012 265); letter-spacing: 0.08em; }
        .ps-label--bright { fill: oklch(0.78 0.010 265); }
        .ps-conn { stroke: oklch(0.96 0.006 265 / 0.2); stroke-width: 1; }
        .ps-conn--d { stroke-dasharray: 3 3; }
        .ps-arrow { fill: oklch(0.56 0.21 264 / 0.4); }
        .ps-provider { fill: oklch(0.19 0.011 265); stroke: oklch(0.96 0.006 265 / 0.08); stroke-width: 1; }
        .ps-ptxt { font-family: ui-monospace, monospace; font-size: 6.5px; font-weight: 700; fill: oklch(0.50 0.010 265); letter-spacing: 0.06em; }
      `}</style>
    </svg>
  );
}

function AnvilMini() {
  return (
    <svg viewBox="0 0 220 120" fill="none" class="pshowcase-svg" role="img" aria-hidden="true">
      <rect x="4" y="28" width="72" height="32" rx="2" class="an-box" />
      <text x="40" y="46" class="an-label" text-anchor="middle">CONFIG</text>
      <text x="40" y="57" class="an-sub" text-anchor="middle">YAML</text>
      <line x1="76" y1="44" x2="96" y2="44" class="an-conn" />
      <path d="M92 40 L98 44 L92 48" class="an-arrow" />
      <rect x="98" y="28" width="72" height="32" rx="2" class="an-box an-box--accent" />
      <line x1="98" y1="28" x2="170" y2="28" class="an-edge" />
      <text x="134" y="48" class="an-label an-label--bright" text-anchor="middle">ANVIL</text>
      <line x1="170" y1="38" x2="188" y2="26" class="an-conn" />
      <line x1="170" y1="50" x2="188" y2="62" class="an-conn" />
      <rect x="188" y="12" width="28" height="24" rx="2" class="an-provider" />
      <rect x="188" y="50" width="28" height="24" rx="2" class="an-provider an-provider--d" />
      <text x="202" y="24" class="an-ptxt" text-anchor="middle">AWS</text>
      <text x="202" y="34" class="an-ptxt" text-anchor="middle">GCP</text>
      <text x="202" y="62" class="an-ptxt" text-anchor="middle">On-</text>
      <text x="202" y="70" class="an-ptxt" text-anchor="middle">Prem</text>
      <rect x="4" y="82" width="200" height="14" rx="2" class="an-spec" />
      <text x="110" y="93" class="an-spec-txt" text-anchor="middle">vcpu · memory · storage · gpu</text>
      <style>{`
        .an-box { fill: oklch(0.21 0.010 265); stroke: oklch(0.96 0.006 265 / 0.09); stroke-width: 1; }
        .an-box--accent { fill: oklch(0.19 0.011 265); }
        .an-edge { stroke: oklch(0.65 0.18 210 / 0.5); stroke-width: 1.5; }
        .an-label { font-family: ui-monospace, monospace; font-size: 7px; font-weight: 600; fill: oklch(0.56 0.012 265); letter-spacing: 0.08em; }
        .an-label--bright { fill: oklch(0.78 0.010 265); }
        .an-sub { font-family: ui-monospace, monospace; font-size: 6px; fill: oklch(0.47 0.010 265); }
        .an-conn { stroke: oklch(0.96 0.006 265 / 0.2); stroke-width: 1; }
        .an-arrow { fill: oklch(0.56 0.21 264 / 0.4); }
        .an-provider { fill: oklch(0.19 0.011 265); stroke: oklch(0.96 0.006 265 / 0.08); stroke-width: 1; }
        .an-provider--d { stroke-dasharray: 3 3; }
        .an-ptxt { font-family: ui-monospace, monospace; font-size: 6px; font-weight: 700; fill: oklch(0.50 0.010 265); letter-spacing: 0.04em; }
        .an-spec { fill: oklch(0.56 0.21 264 / 0.07); stroke: oklch(0.56 0.21 264 / 0.15); stroke-width: 1; }
        .an-spec-txt { font-family: ui-monospace, monospace; font-size: 6px; fill: oklch(0.56 0.21 264 / 0.8); letter-spacing: 0.05em; }
      `}</style>
    </svg>
  );
}

function VaultMini() {
  return (
    <svg viewBox="0 0 220 120" fill="none" class="pshowcase-svg" role="img" aria-hidden="true">
      <rect x="10" y="4" width="200" height="28" rx="2" class="vt-box" />
      <text x="110" y="22" class="vt-label" text-anchor="middle">YOUR APPLICATION</text>
      <line x1="110" y1="32" x2="110" y2="48" class="vt-conn" />
      <path d="M106 44 L110 50 L114 44" class="vt-arrow" />
      <rect x="10" y="50" width="200" height="28" rx="2" class="vt-box vt-box--accent" />
      <line x1="10" y1="50" x2="210" y2="50" class="vt-edge" />
      <text x="90" y="68" class="vt-label vt-label--bright">VAULT</text>
      <rect x="150" y="56" width="52" height="14" rx="1" class="vt-acl" />
      <text x="176" y="67" class="vt-acl-txt" text-anchor="middle">ACL ROLES</text>
      <line x1="38"  y1="78" x2="38"  y2="96" class="vt-conn vt-conn--d" />
      <line x1="110" y1="78" x2="110" y2="96" class="vt-conn vt-conn--d" />
      <line x1="182" y1="78" x2="182" y2="96" class="vt-conn vt-conn--d" />
      <rect x="10"  y="96" width="56" height="20" rx="1" class="vt-provider" />
      <rect x="82"  y="96" width="56" height="20" rx="1" class="vt-provider" />
      <rect x="154" y="96" width="56" height="20" rx="1" class="vt-provider" />
      <text x="38"  y="107" class="vt-ptxt" text-anchor="middle">AWS S3</text>
      <text x="110" y="107" class="vt-ptxt" text-anchor="middle">Azure Blob</text>
      <text x="182" y="107" class="vt-ptxt" text-anchor="middle">GCS</text>
      <style>{`
        .vt-box { fill: oklch(0.21 0.010 265); stroke: oklch(0.96 0.006 265 / 0.09); stroke-width: 1; }
        .vt-box--accent { fill: oklch(0.19 0.011 265); }
        .vt-edge { stroke: oklch(0.74 0.14 185 / 0.5); stroke-width: 1.5; }
        .vt-label { font-family: ui-monospace, monospace; font-size: 7px; font-weight: 600; fill: oklch(0.56 0.012 265); letter-spacing: 0.08em; }
        .vt-label--bright { fill: oklch(0.78 0.010 265); }
        .vt-conn { stroke: oklch(0.96 0.006 265 / 0.2); stroke-width: 1; }
        .vt-conn--d { stroke-dasharray: 3 3; }
        .vt-arrow { fill: oklch(0.74 0.14 185 / 0.4); }
        .vt-acl { fill: oklch(0.74 0.14 185 / 0.08); stroke: oklch(0.74 0.14 185 / 0.2); stroke-width: 1; }
        .vt-acl-txt { font-family: ui-monospace, monospace; font-size: 5.5px; font-weight: 600; fill: oklch(0.74 0.14 185); letter-spacing: 0.05em; }
        .vt-provider { fill: oklch(0.19 0.011 265); stroke: oklch(0.96 0.006 265 / 0.08); stroke-width: 1; }
        .vt-ptxt { font-family: ui-monospace, monospace; font-size: 6px; font-weight: 700; fill: oklch(0.50 0.010 265); letter-spacing: 0.04em; }
      `}</style>
    </svg>
  );
}

function SignalMini() {
  return (
    <svg viewBox="0 0 220 120" fill="none" class="pshowcase-svg" role="img" aria-hidden="true">
      <rect x="4"  y="12" width="52" height="20" rx="2" class="sg-box" />
      <rect x="4"  y="38" width="52" height="20" rx="2" class="sg-box" />
      <rect x="4"  y="64" width="52" height="20" rx="2" class="sg-box" />
      <text x="30" y="26" class="sg-label" text-anchor="middle">Device A</text>
      <text x="30" y="52" class="sg-label" text-anchor="middle">Device B</text>
      <text x="30" y="78" class="sg-label" text-anchor="middle">Device N</text>
      <rect x="30" y="54" width="40" height="10" rx="1" class="sg-cert" />
      <text x="50" y="62" class="sg-cert-txt" text-anchor="middle">x509</text>
      <line x1="56" y1="22"  x2="82" y2="48" class="sg-conn" />
      <line x1="56" y1="48"  x2="82" y2="52" class="sg-conn" />
      <line x1="56" y1="74"  x2="82" y2="58" class="sg-conn" />
      <rect x="82" y="34" width="62" height="40" rx="2" class="sg-box sg-box--accent" />
      <line x1="82" y1="34" x2="144" y2="34" class="sg-edge" />
      <text x="113" y="57" class="sg-label sg-label--bright" text-anchor="middle">SIGNAL</text>
      <line x1="144" y1="46" x2="164" y2="32" class="sg-conn sg-conn--d" />
      <line x1="144" y1="62" x2="164" y2="76" class="sg-conn sg-conn--d" />
      <rect x="164" y="18" width="52" height="24" rx="2" class="sg-provider" />
      <rect x="164" y="62" width="52" height="24" rx="2" class="sg-provider" />
      <text x="190" y="30" class="sg-ptxt" text-anchor="middle">AWS IoT</text>
      <text x="190" y="40" class="sg-ptxt" text-anchor="middle">Core</text>
      <text x="190" y="74" class="sg-ptxt" text-anchor="middle">Azure IoT</text>
      <text x="190" y="84" class="sg-ptxt" text-anchor="middle">Hub</text>
      <line x1="190" y1="86" x2="190" y2="102" class="sg-conn sg-conn--d" />
      <rect x="164" y="102" width="52" height="14" rx="2" class="sg-box" />
      <text x="190" y="113" class="sg-label" text-anchor="middle">YOUR APP</text>
      <style>{`
        .sg-box { fill: oklch(0.21 0.010 265); stroke: oklch(0.96 0.006 265 / 0.09); stroke-width: 1; }
        .sg-box--accent { fill: oklch(0.19 0.011 265); }
        .sg-edge { stroke: oklch(0.64 0.15 275 / 0.5); stroke-width: 1.5; }
        .sg-label { font-family: ui-monospace, monospace; font-size: 6.5px; font-weight: 600; fill: oklch(0.56 0.012 265); letter-spacing: 0.06em; }
        .sg-label--bright { fill: oklch(0.78 0.010 265); }
        .sg-conn { stroke: oklch(0.96 0.006 265 / 0.2); stroke-width: 1; }
        .sg-conn--d { stroke-dasharray: 3 3; }
        .sg-cert { fill: oklch(0.56 0.21 264 / 0.1); stroke: oklch(0.56 0.21 264 / 0.2); stroke-width: 1; }
        .sg-cert-txt { font-family: ui-monospace, monospace; font-size: 5.5px; font-weight: 600; fill: oklch(0.56 0.21 264); letter-spacing: 0.04em; }
        .sg-provider { fill: oklch(0.19 0.011 265); stroke: oklch(0.64 0.15 275 / 0.15); stroke-width: 1; }
        .sg-ptxt { font-family: ui-monospace, monospace; font-size: 6px; font-weight: 700; fill: oklch(0.50 0.010 265); letter-spacing: 0.04em; }
      `}</style>
    </svg>
  );
}

const miniSchematics = [PrismMini, AnvilMini, VaultMini, SignalMini];

const accentColors = [
  "oklch(0.56 0.21 264)",  // indigo – Prism
  "oklch(0.65 0.18 210)",  // blue – Anvil
  "oklch(0.74 0.14 185)",  // teal – Vault
  "oklch(0.64 0.15 275)",  // violet – Signal
];

export default function Products() {
  const navigate = useNavigate();
  let sectionRef!: HTMLElement;

  onMount(() => {
    const rows = sectionRef.querySelectorAll(".pshowcase-row");
    rows.forEach((row, i) => {
      gsap.from(row, {
        opacity: 0,
        y: 16,
        duration: 0.75,
        ease: "expo.out",
        delay: i * 0.05,
        scrollTrigger: {
          trigger: row,
          start: "top 88%",
          toggleActions: "play none none none",
        },
      });
    });
  });

  return (
    <section ref={sectionRef} id="products" class="section pshowcase">
      <div class="container">

        <div class="pshowcase-head" use:fadeUp>
          <h2 class="pshowcase-head__title">Products</h2>
          <p class="pshowcase-head__sub">
            Four software products built around specific operational problems.
            Available now. Accessible via your cloud or ours.
          </p>
        </div>

        <div class="pshowcase-list">
          {productsData.map((p, i) => {
            const MiniSchematic = miniSchematics[i];
            return (
              <div class="pshowcase-row">
                {/* Top: status + number */}
                <div class="pshowcase-row__meta">
                  <span class="pshowcase-row__status">
                    <span class="pshowcase-row__dot" aria-label="Available" />
                    Available
                  </span>
                  <span class="pshowcase-row__num">0{i + 1}</span>
                </div>

                {/* Content grid */}
                <div class="pshowcase-row__grid">
                  {/* Left: product info */}
                  <div class="pshowcase-row__info">
                    <p
                      class="pshowcase-row__category"
                      style={{ color: accentColors[i] }}
                    >
                      {p.category}
                    </p>
                    <h3 class="pshowcase-row__name">{p.name}</h3>
                    <p class="pshowcase-row__tagline">{p.tagline}</p>
                    <p class="pshowcase-row__desc">{p.desc}</p>

                    <ul class="pshowcase-row__caps">
                      {p.capabilities.map((c) => (
                        <li class="pshowcase-row__cap">
                          <span
                            class="pshowcase-row__cap-dot"
                            aria-hidden="true"
                            style={{ background: accentColors[i] }}
                          />
                          {c}
                        </li>
                      ))}
                    </ul>

                    <a
                      href={p.route}
                      class="pshowcase-row__link"
                      onClick={(e) => { e.preventDefault(); navigate(p.route); }}
                    >
                      View {p.name}
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                      </svg>
                    </a>
                  </div>

                  {/* Right: mini architecture schematic */}
                  <div class="pshowcase-row__visual">
                    <div
                      class="pshowcase-row__schematic-wrap"
                      style={{ "--accent": accentColors[i] } as any}
                    >
                      <MiniSchematic />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      <style>{`
        .pshowcase {
          background: var(--bg-secondary);
        }

        /* Header */
        .pshowcase-head {
          margin-bottom: 3rem;
          max-width: 560px;
        }

        .pshowcase-head__title {
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 800;
          letter-spacing: -0.035em;
          color: var(--text-primary);
          margin-bottom: 0.75rem;
          line-height: 1.05;
        }

        .pshowcase-head__sub {
          font-size: 0.9rem;
          line-height: 1.65;
          color: var(--text-muted);
          max-width: 50ch;
        }

        /* Product list */
        .pshowcase-list {
          border-top: 1px solid var(--border-subtle);
        }

        /* Individual product row */
        .pshowcase-row {
          padding: 2.75rem 0;
          border-bottom: 1px solid var(--border-subtle);
        }

        .pshowcase-row__meta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.5rem;
        }

        .pshowcase-row__status {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.65rem;
          font-weight: 600;
          color: var(--accent-teal-light);
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .pshowcase-row__dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: var(--accent-teal-light);
          flex-shrink: 0;
          position: relative;
        }

        .pshowcase-row__dot::after {
          content: '';
          position: absolute;
          inset: -2px;
          border-radius: 50%;
          background: var(--accent-teal-light);
          opacity: 0.3;
          animation: pulseRing 2.8s ease-out infinite;
        }

        .pshowcase-row__num {
          font-family: var(--font-mono);
          font-size: 0.65rem;
          font-weight: 600;
          color: var(--text-dim);
          letter-spacing: 0.1em;
          font-variant-numeric: tabular-nums;
        }

        /* Two-column content grid */
        .pshowcase-row__grid {
          display: grid;
          grid-template-columns: 1fr 260px;
          gap: clamp(2rem, 5vw, 5rem);
          align-items: center;
        }

        /* Product info */
        .pshowcase-row__category {
          font-family: var(--font-mono);
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          margin-bottom: 0.4rem;
          font-variant-numeric: tabular-nums;
        }

        .pshowcase-row__name {
          font-size: clamp(2rem, 4vw, 3.2rem);
          font-weight: 800;
          letter-spacing: -0.035em;
          line-height: 1.0;
          color: var(--text-primary);
          margin-bottom: 0.35rem;
        }

        .pshowcase-row__tagline {
          font-size: 1rem;
          color: var(--text-muted);
          margin-bottom: 0.9rem;
        }

        .pshowcase-row__desc {
          font-size: 0.875rem;
          line-height: 1.65;
          color: var(--text-muted);
          max-width: 54ch;
          margin-bottom: 1.25rem;
        }

        /* Capability chips */
        .pshowcase-row__caps {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
          margin-bottom: 1.5rem;
        }

        .pshowcase-row__cap {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.78rem;
          color: var(--text-muted);
        }

        .pshowcase-row__cap-dot {
          width: 4px;
          height: 4px;
          border-radius: 1px;
          flex-shrink: 0;
          opacity: 0.55;
        }

        /* View link */
        .pshowcase-row__link {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.82rem;
          font-weight: 600;
          color: var(--text-muted);
          transition:
            color     160ms var(--ease-expo),
            gap       160ms var(--ease-expo);
        }

        .pshowcase-row__link svg { display: inline-block; }

        .pshowcase-row__link:hover {
          color: var(--text-primary);
          gap: 0.6rem;
        }

        /* Mini schematic visual */
        .pshowcase-row__visual {
          display: flex;
          justify-content: flex-end;
        }

        .pshowcase-row__schematic-wrap {
          width: 240px;
          padding: 1.25rem;
          border: 1px solid var(--border-subtle);
          border-top-color: var(--accent);
          border-top-width: 2px;
          border-radius: 3px;
          background: var(--bg-card);
          opacity: 0.8;
          transition: opacity 200ms var(--ease-expo);
        }

        .pshowcase-row:hover .pshowcase-row__schematic-wrap {
          opacity: 1;
        }

        .pshowcase-svg {
          width: 100%;
          display: block;
        }

        /* Responsive */
        @media (max-width: 860px) {
          .pshowcase-row__grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .pshowcase-row__visual {
            justify-content: flex-start;
          }

          .pshowcase-row__schematic-wrap {
            width: 220px;
          }
        }

        @media (max-width: 600px) {
          .pshowcase-row__visual { display: none; }
          .pshowcase-row__name { font-size: 2.2rem; }
        }

        @media (prefers-reduced-motion: reduce) {
          .pshowcase-row__dot::after { animation: none; }
        }
      `}</style>
    </section>
  );
}
