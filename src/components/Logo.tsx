import { onMount } from "solid-js";
import type { JSX } from "solid-js";
import { gsap } from "../lib/gsap";

interface LogoProps {
  /** px size of the globe icon square */
  size?: number;
  /** "icon" = globe only | "full" = globe + wordmark */
  variant?: "icon" | "full";
  /** animate in on mount */
  animate?: boolean;
  /** extra class on root element */
  class?: string;
  style?: JSX.CSSProperties;
  onClick?: (e: MouseEvent) => void;
}

/**
 * Single source of truth for the Y2kSaaS globe logo.
 * All animation, hover glow, and block micro-motion live here.
 */
export default function Logo(props: LogoProps) {
  const local = props;
  const size = () => local.size ?? 40;
  const variant = () => local.variant ?? "icon";

  let rootRef!: HTMLElement;
  let svgRef!: SVGSVGElement;

  onMount(() => {
    if (!local.animate) return;

    const ring = svgRef.querySelector(".logo__ring") as SVGElement;
    const meridians = svgRef.querySelectorAll(".logo__meridian");
    const blocks = svgRef.querySelectorAll(".logo__block");
    const glow = svgRef.querySelector(".logo__glow") as SVGElement;

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.from(glow,     { scale: 0, opacity: 0, duration: 1.2, transformOrigin: "120px 130px" })
      .from(ring,     { scale: 0, opacity: 0, duration: 1,   transformOrigin: "120px 130px", ease: "elastic.out(1,0.6)" }, "-=0.8")
      .from(meridians,{ scale: 0, opacity: 0, duration: 0.7, stagger: 0.1, transformOrigin: "120px 130px" }, "-=0.5")
      .from(blocks,   { scale: 0, opacity: 0, duration: 0.5, stagger: 0.08, ease: "back.out(2)", transformOrigin: "center center" }, "-=0.3");

    // Continuous glow pulse
    gsap.to(glow, {
      opacity: 0.22,
      scale: 1.06,
      repeat: -1,
      yoyo: true,
      duration: 3,
      ease: "sine.inOut",
      transformOrigin: "120px 130px",
    });

    // Block micro-drift
    blocks.forEach((block, i) => {
      gsap.to(block, {
        y: i % 2 === 0 ? -2 : 2,
        x: i === 1 ? 2 : -1,
        repeat: -1,
        yoyo: true,
        duration: 2.5 + i * 0.4,
        ease: "sine.inOut",
        delay: i * 0.3,
      });
    });

    // Scan ring rotation
    const scanRing = svgRef.querySelector(".logo__scan") as SVGElement;
    if (scanRing) {
      gsap.to(scanRing, {
        rotation: 360,
        repeat: -1,
        duration: 16,
        ease: "none",
        transformOrigin: "120px 130px",
      });
    }
  });

  const s = size();
  // viewBox is 30 40 180 180 → inner globe area
  const vb = "30 40 180 180";

  return (
    <span
      ref={rootRef as unknown as HTMLSpanElement}
      class={`logo-root${local.class ? ` ${local.class}` : ""}`}
      style={{ display: "inline-flex", "align-items": "center", gap: "0.65rem", cursor: local.onClick ? "pointer" : "default", ...(local.style ?? {}) }}
      onClick={local.onClick}
    >
      <svg
        ref={svgRef}
        width={s}
        height={s}
        viewBox={vb}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: "block", flex: "0 0 auto" }}
      >
        {/* Radial glow */}
        <circle class="logo__glow" cx="120" cy="130" r="90" fill="url(#logoGlow)" opacity="0.12"/>

        {/* Scan ring dashed */}
        <circle
          class="logo__scan"
          cx="120" cy="130" r="76"
          stroke="url(#logoScanGrad)"
          stroke-width="0.6"
          stroke-dasharray="5 9"
          opacity="0.35"
        />

        {/* Outer ring */}
        <circle
          class="logo__ring"
          cx="120" cy="130" r="72"
          stroke="#B8C0CC"
          stroke-width="10"
          stroke-linecap="round"
          opacity="0.96"
          filter="url(#logoRingGlow)"
        />

        {/* Meridians */}
        <ellipse class="logo__meridian" cx="120" cy="130" rx="54" ry="72" stroke="#94A3B8" stroke-width="3" opacity="0.45" stroke-dasharray="6 5"/>
        <ellipse class="logo__meridian" cx="120" cy="130" rx="28" ry="72" stroke="#94A3B8" stroke-width="2" opacity="0.28"/>
        <ellipse class="logo__meridian" cx="120" cy="130" rx="72" ry="28" stroke="#94A3B8" stroke-width="2.5" opacity="0.45"/>
        <ellipse class="logo__meridian" cx="120" cy="130" rx="72" ry="50" stroke="#94A3B8" stroke-width="1.2" opacity="0.18"/>

        {/* Accent orbit dot */}
        <circle cx="192" cy="130" r="2.5" fill="#6366F1" opacity="0.5"/>

        {/* Core blocks */}
        <rect class="logo__block" x="92"  y="98"  width="42" height="42" rx="6" fill="#312E81"/>
        <rect class="logo__block" x="120" y="82"  width="42" height="42" rx="6" fill="#3F3F46"/>
        <rect class="logo__block" x="120" y="124" width="42" height="42" rx="6" fill="#134E4A"/>

        {/* Block edge highlights */}
        <rect x="92"  y="98"  width="42" height="42" rx="6" fill="none" stroke="#6366F1" stroke-width="0.6" opacity="0.25"/>
        <rect x="120" y="82"  width="42" height="42" rx="6" fill="none" stroke="#94A3B8" stroke-width="0.6" opacity="0.2"/>
        <rect x="120" y="124" width="42" height="42" rx="6" fill="none" stroke="#2DD4BF" stroke-width="0.6" opacity="0.25"/>

        <defs>
          <radialGradient id="logoGlow" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(120 130) rotate(90) scale(90)">
            <stop stop-color="#6366F1"/>
            <stop offset="0.6" stop-color="#6366F1" stop-opacity="0.3"/>
            <stop offset="1"   stop-color="#6366F1" stop-opacity="0"/>
          </radialGradient>
          <linearGradient id="logoScanGrad" x1="48" y1="130" x2="192" y2="130">
            <stop stop-color="#6366F1" stop-opacity="0"/>
            <stop offset="0.5" stop-color="#6366F1"/>
            <stop offset="1" stop-color="#2DD4BF" stop-opacity="0"/>
          </linearGradient>
          <filter id="logoRingGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur"/>
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>
      </svg>

      {variant() === "full" && (
        <span class="logo__wordmark">Y2kSaaS</span>
      )}

      <style>{`
        .logo__wordmark {
          font-family: var(--font-sans, 'Inter', sans-serif);
          font-weight: 700;
          letter-spacing: -0.02em;
          color: #F8FAFC;
          line-height: 1;
          font-size: ${Math.round(s * 0.34)}px;
          white-space: nowrap;
        }

        .logo-root:hover .logo__ring {
          filter: url(#logoRingGlow);
          transition: opacity 0.3s;
        }
      `}</style>
    </span>
  );
}
