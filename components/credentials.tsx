"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import SectionLabel from "@/components/section-label";

type Cert = { slug: string; title: string; verifyUrl?: string };

const certs: Cert[] = [
  { slug: "ai-fluency-framework-and-foundations", title: "AI Fluency: Framework & Foundations", verifyUrl: "https://verify.skilljar.com/c/6ak8iag44jmd" },
  { slug: "ai-capabilities-and-limitations", title: "AI Capabilities & Limitations", verifyUrl: "https://verify.skilljar.com/c/rzvsbaeh6d4q" },
  { slug: "claude-101", title: "Claude 101", verifyUrl: "https://verify.skilljar.com/c/hzjz866u7db9" },
  { slug: "claude-code-101", title: "Claude Code 101", verifyUrl: "https://verify.skilljar.com/c/dkv9rm6e2vqj" },
  { slug: "claude-code-in-action", title: "Claude Code in Action", verifyUrl: "https://verify.skilljar.com/c/6oe2y9hq4fyh" },
  { slug: "introduction-to-agent-skills", title: "Introduction to Agent Skills", verifyUrl: "https://verify.skilljar.com/c/paf8yzdf8sda" },
  { slug: "introduction-to-subagents", title: "Introduction to Subagents", verifyUrl: "https://verify.skilljar.com/c/or3qxnimyjp7" },
  { slug: "introduction-to-claude-cowork", title: "Introduction to Claude Cowork", verifyUrl: "https://verify.skilljar.com/c/fiysgzukztbq" },
  { slug: "introduction-to-model-context-protocol", title: "Introduction to Model Context Protocol", verifyUrl: "https://verify.skilljar.com/c/o8fwe7aipqbm" },
  { slug: "model-context-protocol-advanced-topics", title: "MCP: Advanced Topics", verifyUrl: "https://verify.skilljar.com/c/7g7d5itc4hqs" },
  { slug: "building-with-the-claude-api", title: "Building with the Claude API", verifyUrl: "https://verify.skilljar.com/c/byiabs6ahfgv" },
  { slug: "claude-platform-101", title: "Claude Platform 101", verifyUrl: "https://verify.skilljar.com/c/m6554u59nhs5" },
];

const CloseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 6L6 18M6 6l12 12" />
  </svg>
);

export default function Credentials() {
  const [activeCert, setActiveCert] = useState<Cert | null>(null);

  useEffect(() => {
    if (!activeCert) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setActiveCert(null); };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = prev; };
  }, [activeCert]);

  return (
    <>
      <section className="px-6 pt-8 pb-10 sm:py-24 border-t transition-colors duration-700 border-[var(--border)]">
        <div className="max-w-7xl mx-auto">
          <SectionLabel className="mb-3">credentials</SectionLabel>

          <h2 className="text-4xl md:text-5xl font-bold mb-8">B.S. Computer Science.</h2>

          <div className="mb-20">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/certs/hpu/logo.svg"
              alt="Hawaii Pacific University"
              className="hpu-logo h-16"
            />
            <p className="text-sm opacity-50 font-mono mt-3">Honolulu, HI</p>
          </div>

          <div className="flex items-baseline justify-between flex-wrap gap-4 mb-3">
            <h2 className="text-3xl md:text-4xl font-bold">Anthropic Academy.</h2>
            <a
              href="https://www.anthropic.com/learn"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono opacity-50 hover:opacity-100 transition-opacity"
            >
              anthropic academy ↗
            </a>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-3 mt-8">
            {certs.map((c) => (
              <button
                key={c.slug}
                type="button"
                onClick={() => setActiveCert(c)}
                className="group text-left rounded-lg border overflow-hidden transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 border-[var(--border)] bg-[var(--surface)] hover:bg-[var(--surface-hover)] hover:border-[var(--border-strong)]"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-[var(--surface-tag)]">
                  <Image
                    src={`/certs/anthropic/${c.slug}.jpg`}
                    alt={c.title}
                    fill
                    sizes="(max-width: 768px) 33vw, 15vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.06]"
                  />
                </div>
                <div className="p-2">
                  <div className="text-[9px] font-mono uppercase tracking-wider opacity-50 mb-0.5">Cert</div>
                  <div className="text-[11px] font-medium leading-snug">{c.title}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Cert lightbox */}
      {activeCert && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activeCert.title}
          onClick={() => setActiveCert(null)}
          className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-150"
        >
          <div onClick={(e) => e.stopPropagation()} className="relative w-full max-w-4xl flex flex-col">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <div className="text-[10px] font-mono uppercase tracking-[0.25em] opacity-60 mb-1 text-white">
                  Anthropic Academy · Certificate
                </div>
                <h3 className="text-xl sm:text-2xl font-bold leading-tight text-white">{activeCert.title}</h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveCert(null)}
                aria-label="Close"
                className="shrink-0 h-9 w-9 rounded-full border border-white/20 bg-white/5 hover:bg-white/15 transition-colors flex items-center justify-center text-white"
              >
                <CloseIcon />
              </button>
            </div>
            <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden border border-white/10 bg-black/40">
              <Image src={`/certs/anthropic/${activeCert.slug}.jpg`} alt={activeCert.title} fill sizes="(max-width: 1024px) 100vw, 1024px" className="object-contain" priority />
            </div>
            <div className="mt-4 flex justify-end">
              <a
                href={activeCert.verifyUrl ?? `/certs/anthropic/${activeCert.slug}.jpg`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border border-white/20 bg-white/5 hover:bg-white/15 transition-colors text-white"
              >
                Verify
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M14 3h7v7" />
                  <path d="M10 14L21 3" />
                  <path d="M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
