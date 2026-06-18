"use client";

import React from "react";
import { twMerge } from "tailwind-merge";

function cx(...classes: (string | undefined | false | null)[]) {
  return twMerge(classes.filter(Boolean).join(" "));
}

// ─── Section ─────────────────────────────────────────────────────────────────
// Standard page section with top border and consistent padding.
export function Section({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cx(
        "px-6 pt-8 pb-10 sm:py-24 border-t transition-colors duration-700 border-[var(--border)]",
        className,
      )}
    >
      {children}
    </section>
  );
}

// ─── GradientText ─────────────────────────────────────────────────────────────
// Inline gradient-clipped text span. variant="hero" uses the three-stop gradient.
export function GradientText({
  children,
  variant = "accent",
  className,
}: {
  children: React.ReactNode;
  variant?: "accent" | "hero";
  className?: string;
}) {
  return (
    <span
      className={cx("bg-clip-text text-transparent", className)}
      style={{
        backgroundImage: `var(--gradient-${variant})`,
        textShadow: "none",
      }}
    >
      {children}
    </span>
  );
}

// ─── Tag ──────────────────────────────────────────────────────────────────────
// Pill-shaped mono badge. Used for skill tags and project labels.
export function Tag({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cx(
        "px-4 py-1.5 rounded-full text-xs font-mono border backdrop-blur-sm border-[var(--border)] bg-[var(--surface-tag)]",
        className,
      )}
    >
      {children}
    </span>
  );
}

// ─── ButtonPrimary ────────────────────────────────────────────────────────────
// Gradient-filled rounded button. Renders as <a> when href is provided.
type SharedButtonProps = {
  children: React.ReactNode;
  className?: string;
  href?: string;
};

export function ButtonPrimary({
  children,
  className,
  href,
  ...props
}: SharedButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const base = cx(
    "inline-block px-6 py-3 rounded-full text-sm font-medium text-white",
    className,
  );
  const style = { background: "var(--gradient-accent)" };
  if (href) {
    return (
      <a href={href} className={base} style={style}>
        {children}
      </a>
    );
  }
  return (
    <button className={base} style={style} {...props}>
      {children}
    </button>
  );
}

// ─── ButtonSecondary ──────────────────────────────────────────────────────────
// Bordered rounded button. Renders as <a> when href is provided.
export function ButtonSecondary({
  children,
  className,
  href,
  ...props
}: SharedButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const base = cx(
    "inline-block px-6 py-3 rounded-full text-sm font-medium border transition-colors border-[var(--resume-border)] hover:border-[var(--resume-border-hover)]",
    className,
  );
  if (href) {
    return (
      <a href={href} className={base}>
        {children}
      </a>
    );
  }
  return (
    <button className={base} {...props}>
      {children}
    </button>
  );
}

// ─── Overlay ──────────────────────────────────────────────────────────────────
// Full-screen dark backdrop for lightboxes and modals.
export function Overlay({
  onClick,
  children,
}: {
  onClick?: () => void;
  children?: React.ReactNode;
}) {
  return (
    <div
      className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-md flex items-center justify-center"
      onClick={onClick}
    >
      {children}
    </div>
  );
}

// ─── CloseButton ──────────────────────────────────────────────────────────────
// Small circular X button for dismissing overlays and cards.
export function CloseButton({
  onClick,
  className,
}: {
  onClick?: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      aria-label="Close"
      onClick={onClick}
      className={cx(
        "h-9 w-9 rounded-full border border-white/20 bg-white/5 hover:bg-white/15 transition-colors flex items-center justify-center text-white",
        className,
      )}
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        aria-hidden="true"
      >
        <path d="M1 1l12 12M13 1L1 13" />
      </svg>
    </button>
  );
}

// ─── MonoMeta ─────────────────────────────────────────────────────────────────
// Tiny uppercase monospace label for institution names, categories, etc.
export function MonoMeta({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cx(
        "text-[10px] font-mono uppercase tracking-[0.25em] opacity-60",
        className,
      )}
    >
      {children}
    </span>
  );
}

// ─── P ───────────────────────────────────────────────────────────────────────
// Body paragraph with relaxed line-height and default opacity.
// Pass size/margin/max-width via className.
export function P({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={cx("text-lg leading-relaxed opacity-80", className)}>{children}</p>
  );
}

// ─── SurfaceCard ──────────────────────────────────────────────────────────────
// Bordered card with theme surface background. Pass onClick to make it a button.
export function SurfaceCard({
  children,
  className,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  const base = cx(
    "rounded-2xl border transition-colors border-[var(--border)] bg-[var(--surface)]",
    className,
  );
  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={base}>
        {children}
      </button>
    );
  }
  return <div className={base}>{children}</div>;
}
