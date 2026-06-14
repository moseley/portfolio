"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const projects = [
  {
    id: 1,
    title: "Shell Eco-marathon",
    category: "Web Development",
    role: "Lead Engineer",
    year: "2024",
    color: "#2ee6d6",
    thumbnail: "/projects/shell/eco-marathon.png",
    thumbnailPosition: "0% 0%",
    images: ["/projects/shell/eco-marathon.png"],
    blurb:
      "Real-time telemetry dashboard for an endurance race team. Next.js, TypeScript, WebSockets.",
    description:
      "Real-time telemetry dashboard for Shell's Eco-marathon race team. Ingested live sensor data via WebSockets and visualized vehicle performance metrics — speed, fuel consumption, and efficiency ratios — across multiple race runs. Designed for pit crews operating under pressure with sub-second data latency.",
    tags: ["Next.js", "TypeScript", "WebSocket"],
  },
  {
    id: 2,
    title: "Maserati",
    category: "Event Support",
    role: "Full-Stack Lead",
    year: "2023",
    color: "#2563eb",
    thumbnail: "/projects/maserati/winter.png",
    thumbnailPosition: "center 80%",
    images: [
      "/projects/maserati/winter.png",
      "/projects/maserati/cento-anni.png",
      "/projects/maserati/aspen.png",
      "/projects/maserati/rsvp.png",
    ],
    blurb:
      "Cross-platform event ops with payment processing and cloud sync. Built for high-pressure rollouts.",
    description:
      "Cross-platform event operations platform with integrated payment processing and cloud sync, built for Maserati's high-pressure product launch events. The system handled dealer registrations, on-site check-ins, and real-time inventory tracking across multiple simultaneous venues.",
    tags: ["React Native", "Stripe", "AWS"],
  },
  {
    id: 3,
    title: "Comtac Training",
    category: "Web Development",
    role: "Architect & Engineer",
    year: "2023",
    color: "#22d3ee",
    thumbnail: "/projects/comtac/training.png",
    thumbnailPosition: "center 15%",
    images: ["/projects/comtac/training.png"],
    blurb:
      "Accessibility-first learning platform with a full design system and component library.",
    description:
      "Accessibility-first learning platform built for tactical communications training. Included a complete design system and component library, AI-assisted audio transcription via ElevenLabs, and structured assessment flows designed to WCAG 2.1 AA standards throughout.",
    tags: ["React", "Design System", "A11y"],
  },
  {
    id: 4,
    title: "Beechcraft",
    category: "Marketing Support",
    role: "Digital Marketing",
    year: "2013",
    color: "#0d9488",
    thumbnail: "/projects/beechcraft/conference.png",
    thumbnailPosition: "center 30%",
    images: [
      "/projects/beechcraft/conference.png",
      "/projects/beechcraft/journey.png",
    ],
    blurb:
      "Digital publication and conference web presence for the Beechcraft owner community.",
    description:
      "Digital presence for Beechcraft's community publication and annual conference. 'The Beechcraft Journey' delivered ownership insights, video, and stories to pilots and enthusiasts. The King Air Operators Conference site handled event registration, breakout sessions, fly-in coordination, and live availability tracking.",
    tags: ["Web Design", "Digital Publishing", "Event Marketing"],
  },
];

type Project = (typeof projects)[0];

type Tool = { name: string; icon?: string };

const tools: Tool[] = [
  { name: "TypeScript", icon: "simple-icons:typescript" },
  { name: "JavaScript", icon: "simple-icons:javascript" },
  { name: "React", icon: "simple-icons:react" },
  { name: "Next.js", icon: "simple-icons:nextdotjs" },
  { name: "Node.js", icon: "simple-icons:nodedotjs" },
  { name: "GraphQL", icon: "simple-icons:graphql" },
  { name: "SQL", icon: "carbon:sql" },
  { name: "AWS", icon: "simple-icons:amazonwebservices" },
  { name: "Vercel", icon: "simple-icons:vercel" },
  { name: "Stripe", icon: "simple-icons:stripe" },
  { name: "ElevenLabs", icon: "simple-icons:elevenlabs" },
  { name: "ChatGPT", icon: "simple-icons:openai" },
  { name: "Claude", icon: "simple-icons:claude" },
  { name: "OpenClaw", icon: "/icons/openclaw.svg" },
  { name: "Hermes", icon: "/icons/hermes.png" },
];

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
];

function ScrambleText({ text }: { text: string }) {
  const [display, setDisplay] = useState(text);
  const ranRef = useRef(false);

  useEffect(() => {
    if (ranRef.current) return;
    ranRef.current = true;
    const chars = "!<>-_\\/[]{}—=+*^?#________";
    const final = text;
    const frames = 30;
    let frame = 0;
    const interval = setInterval(() => {
      frame++;
      const progress = frame / frames;
      const next = final
        .split("")
        .map((ch, i) => {
          if (ch === " ") return " ";
          const revealAt = (i / final.length) * 0.7;
          if (progress > revealAt + 0.2) return ch;
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join("");
      setDisplay(next);
      if (frame >= frames) {
        setDisplay(final);
        clearInterval(interval);
      }
    }, 40);
    return () => clearInterval(interval);
  }, [text]);

  return <span>{display}</span>;
}

function MagneticLink({
  children,
  href,
  className = "",
  style,
}: {
  children: React.ReactNode;
  href: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  return (
    <a
      ref={ref}
      href={href}
      className={`inline-block transition-transform duration-200 ease-out ${className}`}
      style={{
        transform: `translate(${offset.x}px, ${offset.y}px)`,
        ...style,
      }}
      onMouseMove={(e) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const x = e.clientX - (rect.left + rect.width / 2);
        const y = e.clientY - (rect.top + rect.height / 2);
        setOffset({ x: x * 0.3, y: y * 0.3 });
      }}
      onMouseLeave={() => setOffset({ x: 0, y: 0 })}
    >
      {children}
    </a>
  );
}

function codeToBasmiliusIcon(code: number, isDay: boolean): string {
  const d = isDay ? "day" : "night";
  if (code === 0) return `clear-${d}`;
  if (code === 1 || code === 2) return `partly-cloudy-${d}`;
  if (code === 3) return `overcast-${d}`;
  if (code === 45 || code === 48) return `fog-${d}`;
  if (code >= 51 && code <= 57) return "drizzle";
  if (code >= 61 && code <= 67) return "rain";
  if (code >= 71 && code <= 77) return "snow";
  if (code >= 80 && code <= 82) return "rain";
  if (code === 85 || code === 86) return "snow";
  if (code === 95) return `thunderstorms-${d}`;
  if (code === 96 || code === 99) return `thunderstorms-${d}-extreme`;
  return `clear-${d}`;
}

function NowWidget() {
  const [time, setTime] = useState("");
  const [weather, setWeather] = useState<{ temp: number; icon: string } | null>(null);

  useEffect(() => {
    const tick = () => {
      const d = new Date();
      const tz = new Intl.DateTimeFormat("en-US", {
        timeZone: "America/Los_Angeles",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      }).format(d);
      setTime(tz);
    };
    tick();
    const i = setInterval(tick, 1000);
    return () => clearInterval(i);
  }, []);

  useEffect(() => {
    const url =
      "https://api.open-meteo.com/v1/forecast?latitude=37.3861&longitude=-122.0839&current=temperature_2m,weather_code,is_day&temperature_unit=fahrenheit";
    const fetchWeather = async () => {
      try {
        const res = await fetch(url);
        const data = await res.json();
        setWeather({
          temp: Math.round(data.current.temperature_2m),
          icon: codeToBasmiliusIcon(data.current.weather_code, data.current.is_day === 1),
        });
      } catch {
        // leave null
      }
    };
    fetchWeather();
    const i = setInterval(fetchWeather, 15 * 60 * 1000);
    return () => clearInterval(i);
  }, []);

  return (
    <div className="flex items-center gap-2 text-xs font-mono opacity-70">
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
      </span>
      <span>Silicon Valley · {time || "--:--:--"}</span>
      {weather && (
        <span className="flex items-center gap-1 opacity-90">
          <span>·</span>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://cdn.jsdelivr.net/gh/basmilius/weather-icons/production/fill/all/${weather.icon}.svg`}
            alt={weather.icon.replace(/-/g, " ")}
            width={24}
            height={24}
            className="-my-1"
          />
          <span>{weather.temp}°F</span>
        </span>
      )}
    </div>
  );
}

// Portrait card dimensions (2.5 × 3.5 ratio = 5:7)
const CARD_W = 210;
const CARD_H = 294;
// Landscape lightbox back dimensions
const BACK_W = 600;
const BACK_H = 360;

function ProjectCard({
  project,
  onClick,
}: {
  project: Project;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative shrink-0 rounded-2xl overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 cursor-pointer transition-all duration-300 hover:scale-[1.03]"
      style={{
        width: CARD_W,
        height: CARD_H,
        scrollSnapAlign: "start",
        border: `5px solid ${project.color}55`,
      }}
    >
      {/* Thumbnail */}
      <div
        className="absolute inset-0"
        style={{ background: `linear-gradient(135deg, ${project.color}44, ${project.color}11)` }}
      >
        <Image
          src={project.thumbnail}
          alt={project.title}
          fill
          className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            transition: "opacity 500ms, transform 500ms",
            objectPosition: project.thumbnailPosition ?? "center center",
          }}
        />
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

      {/* Flip hint icon */}
      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-60 transition-opacity">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
          <path d="M3 3v5h5" />
        </svg>
      </div>

      {/* Title area */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <div className="text-[10px] font-mono uppercase tracking-wider opacity-60 mb-1">
          {project.category}
        </div>
        <h3 className="text-lg font-bold leading-tight">{project.title}</h3>
      </div>
    </button>
  );
}

export default function Home() {
  const [activeCert, setActiveCert] = useState<Cert | null>(null);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [flipped, setFlipped] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);

  // Cert lightbox keyboard + scroll lock
  useEffect(() => {
    if (!activeCert) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setActiveCert(null); };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = prevOverflow; };
  }, [activeCert]);

  // Project lightbox keyboard + scroll lock
  useEffect(() => {
    if (!activeProject) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeProject();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = prevOverflow; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeProject]);

  // Auto-flip card after a short pause so user sees the front first
  useEffect(() => {
    if (!activeProject) { setFlipped(false); setSlideIndex(0); return; }
    const t = setTimeout(() => setFlipped(true), 320);
    return () => clearTimeout(t);
  }, [activeProject]);

  // Auto-advance slideshow on the back face
  useEffect(() => {
    if (!flipped || !activeProject || activeProject.images.length <= 1) return;
    const t = setInterval(() => {
      setSlideIndex((i) => (i + 1) % activeProject.images.length);
    }, 3200);
    return () => clearInterval(t);
  }, [flipped, activeProject]);

  const closeProject = () => { setActiveProject(null); setFlipped(false); setSlideIndex(0); };

  return (
    <div className="min-h-screen relative overflow-hidden text-white">
      {/* Background — coral-lagoon water, kept subtle */}
      <div
        className="fixed inset-0 -z-10"
        style={{
          background:
            "radial-gradient(85% 70% at 10% -10%, rgba(12,42,99,0.40) 0%, transparent 60%), radial-gradient(80% 70% at 92% 25%, rgba(15,150,160,0.30) 0%, transparent 62%), radial-gradient(120% 85% at 50% 125%, rgba(25,210,190,0.38) 0%, transparent 62%), #061a2e",
        }}
      />
      {/* Soft horizontal water ripples / caustics */}
      <div
        className="fixed inset-0 -z-10 opacity-[0.05] mix-blend-soft-light pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 600 600' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='w'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.006 0.02' numOctaves='3' seed='7'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23w)'/%3E%3C/svg%3E\")",
          backgroundSize: "900px 900px",
        }}
      />
      {/* Fine film grain */}
      <div
        className="fixed inset-0 -z-10 opacity-[0.22] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E\")",
          backgroundSize: "180px 180px",
        }}
      />

      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-black/20 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-sm font-medium tracking-tight">
            <span className="opacity-60">Jeremy</span>{" "}
            <span>Moseley</span>
          </Link>
          <NowWidget />
          <MagneticLink
            href="mailto:jeremymoseley@me.com"
            className="px-5 py-2 rounded-full text-sm font-medium border border-white/20 bg-white text-black hover:bg-transparent hover:text-white transition-colors"
          >
            Say hi →
          </MagneticLink>
        </div>
      </header>

      {/* Hero */}
      <section className="relative px-6 pt-32 pb-32">
        <div className="max-w-7xl mx-auto">
          <div className="text-xs font-mono uppercase tracking-[0.3em] opacity-50 mb-6">
            ● Currently building things on the internet
          </div>
          <h1
            className="font-bold leading-[0.9] tracking-tight"
            style={{ fontSize: "clamp(3rem, 10vw, 10rem)" }}
          >
            <ScrambleText text="Jeremy" />
            <br />
            <span className="bg-clip-text text-transparent" style={{
              backgroundImage: "linear-gradient(90deg, #1e5bd6, #14b8a6, #2ee6d6)",
            }}>
              <ScrambleText text="Moseley." />
            </span>
          </h1>
          <p className="mt-10 max-w-2xl text-xl leading-relaxed opacity-80">
            Full-stack engineer with 20+ years of shipping. I build products
            end-to-end — web, mobile, cloud — from scrappy startups to
            enterprise rollouts.
          </p>

          <div className="mt-12 flex flex-wrap items-center gap-4">
            <MagneticLink
              href="#work"
              className="px-6 py-3 rounded-full text-sm font-medium"
              style={{ background: "linear-gradient(90deg, #1e5bd6, #2dd4bf)" }}
            >
              See the work →
            </MagneticLink>
            <MagneticLink
              href="#"
              className="px-6 py-3 rounded-full text-sm font-medium border border-white/20 hover:border-white/40 transition-colors"
            >
              Download résumé
            </MagneticLink>
          </div>

          <div className="mt-20 flex flex-wrap gap-2">
            {["20+ yrs", "web", "mobile", "cloud", "leadership", "shipping"].map((t, i) => (
              <span
                key={t}
                className="px-4 py-1.5 rounded-full text-xs font-mono border border-white/15 bg-white/5 backdrop-blur-sm"
                style={{ animation: `float 6s ease-in-out infinite`, animationDelay: `${i * 0.4}s` }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
        <style>{`
          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-6px); }
          }
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
        `}</style>
      </section>

      {/* About */}
      <section className="px-6 py-24 border-t border-white/10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-4">
            <div className="text-xs font-mono uppercase tracking-[0.3em] opacity-50">// about</div>
            <h2 className="text-3xl font-bold mt-3">The short version.</h2>
          </div>
          <div className="md:col-span-8">
            <p className="text-2xl leading-relaxed">
              I lead teams, architect scalable systems, and own projects end-to-end. Two decades of
              shipping has taught me one thing:{" "}
              <span
                className="bg-clip-text text-transparent font-semibold"
                style={{ backgroundImage: "linear-gradient(90deg, #1e5bd6, #2dd4bf)" }}
              >
                taste compounds.
              </span>{" "}
              The fastest path to a great product is people who&apos;ve been wrong enough times to
              know what works.
            </p>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="px-6 py-24 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-xs font-mono uppercase tracking-[0.3em] opacity-50 mb-3">// toolkit</div>
          <h2 className="text-3xl md:text-4xl font-bold mb-10">Things I reach for.</h2>
          <div className="flex flex-wrap gap-3">
            {tools.map((t) => (
              <div key={t.name} className="group relative">
                <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-xl border border-white/10 bg-white/[0.04] backdrop-blur-sm flex items-center justify-center hover:bg-white/[0.1] hover:border-white/25 transition-colors">
                  {t.icon ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={
                        t.icon.startsWith("/") || t.icon.startsWith("http")
                          ? t.icon
                          : `https://api.iconify.design/${t.icon}.svg?color=%23ffffff`
                      }
                      alt={t.name}
                      width={22}
                      height={22}
                      className="opacity-80 group-hover:opacity-100 transition-opacity"
                    />
                  ) : (
                    <span className="text-sm font-mono font-semibold opacity-80 group-hover:opacity-100 transition-opacity">
                      {t.name.slice(0, 2)}
                    </span>
                  )}
                </div>
                <div
                  role="tooltip"
                  className="pointer-events-none absolute left-1/2 -translate-x-1/2 top-full mt-2 whitespace-nowrap px-2 py-1 rounded-md text-xs font-mono bg-black/90 border border-white/15 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                >
                  {t.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects — horizontal card slider */}
      <section id="work" className="py-24 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 mb-10">
          <div className="text-xs font-mono uppercase tracking-[0.3em] opacity-50 mb-3">// selected work</div>
          <h2 className="text-4xl md:text-6xl font-bold">Stuff I&apos;ve built.</h2>
        </div>

        <div className="relative">
          {/* Edge fades */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 z-10"
            style={{ background: "linear-gradient(to right, #04122a, transparent)" }} />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 z-10"
            style={{ background: "linear-gradient(to left, #04122a, transparent)" }} />

          <div
            className="flex gap-6 overflow-x-auto pb-6 px-6"
            style={{ scrollSnapType: "x mandatory", scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {projects.map((p) => (
              <ProjectCard
                key={p.id}
                project={p}
                onClick={() => { setActiveProject(p); setFlipped(false); setSlideIndex(0); }}
              />
            ))}
            <div className="shrink-0 w-2" aria-hidden="true" />
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="px-6 py-24 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-baseline justify-between flex-wrap gap-4 mb-3">
            <div className="text-xs font-mono uppercase tracking-[0.3em] opacity-50">// credentials</div>
            <a
              href="https://www.anthropic.com/learn"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono opacity-50 hover:opacity-100 transition-opacity"
            >
              anthropic academy ↗
            </a>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-12">Anthropic Academy.</h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {certs.map((c) => (
              <button
                key={c.slug}
                type="button"
                onClick={() => setActiveCert(c)}
                className="group text-left rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-sm overflow-hidden hover:bg-white/[0.07] hover:border-white/25 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-black/30">
                  <Image
                    src={`/certs/anthropic/${c.slug}.jpg`}
                    alt={c.title}
                    fill
                    sizes="(max-width: 768px) 50vw, 20vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                </div>
                <div className="p-3">
                  <div className="text-[10px] font-mono uppercase tracking-wider opacity-50 mb-1">Certificate</div>
                  <div className="text-sm font-medium leading-snug">{c.title}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-32 border-t border-white/10">
        <div className="max-w-7xl mx-auto text-center">
          <div className="text-xs font-mono uppercase tracking-[0.3em] opacity-50 mb-6">
            ● Open to new opportunities
          </div>
          <h2
            className="font-bold leading-[0.95] tracking-tight"
            style={{ fontSize: "clamp(2.5rem, 8vw, 7rem)" }}
          >
            Building a team
            <br />
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(90deg, #1e5bd6, #14b8a6, #2ee6d6)" }}
            >
              worth joining?
            </span>
          </h2>
          <p className="mt-8 max-w-2xl mx-auto text-lg sm:text-xl leading-relaxed opacity-80">
            I&apos;m looking for a team where craft matters and ownership runs deep.
            Two decades of shipping means I can step in, level up the people around
            me, and turn ambitious roadmaps into products that ship. If that&apos;s
            the kind of hire you&apos;re after, I&apos;d love to talk.
          </p>
          <div className="mt-12 flex justify-center">
            <MagneticLink
              href="mailto:jeremymoseley@me.com?subject=Opportunity%20for%20Jeremy%20Moseley"
              className="px-8 py-4 rounded-full text-base font-medium"
              style={{ background: "linear-gradient(90deg, #1e5bd6, #2dd4bf)" }}
            >
              Email me →
            </MagneticLink>
          </div>
          <p className="mt-5 text-sm font-mono opacity-50">
            Email is the best way to reach me.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm">
            <a href="mailto:jeremymoseley@me.com" className="opacity-80 hover:opacity-100 transition-opacity">
              jeremymoseley@me.com
            </a>
            <span className="opacity-20">·</span>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-80 hover:opacity-100 transition-opacity underline underline-offset-4 decoration-white/30"
            >
              Résumé ↗
            </a>
          </div>
          <div className="mt-16 text-xs font-mono opacity-50">© 2026 · Jeremy Moseley</div>
        </div>
      </section>

      {/* Project flip lightbox */}
      {activeProject && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activeProject.title}
          onClick={closeProject}
          className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
          style={{ animation: "fadeIn 150ms ease-out" }}
        >
          {/* Close */}
          <button
            type="button"
            onClick={closeProject}
            aria-label="Close"
            className="absolute top-5 right-5 h-9 w-9 rounded-full border border-white/20 bg-white/5 hover:bg-white/15 transition-colors flex items-center justify-center z-10"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          {/* Flip card container */}
          <div onClick={(e) => e.stopPropagation()} style={{ perspective: "1400px" }}>
            {/* Size-transitioning wrapper */}
            <div
              style={{
                width: flipped ? `min(${BACK_W}px, calc(100vw - 48px))` : `${CARD_W}px`,
                height: flipped ? `${BACK_H}px` : `${CARD_H}px`,
                transition: "width 700ms cubic-bezier(0.4,0,0.2,1), height 700ms cubic-bezier(0.4,0,0.2,1)",
              }}
            >
              {/* Flipping card */}
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  position: "relative",
                  transformStyle: "preserve-3d",
                  transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
                  transition: "transform 700ms cubic-bezier(0.4,0,0.2,1)",
                }}
              >
                {/* Front face — portrait */}
                <div
                  style={{
                    backfaceVisibility: "hidden",
                    border: `5px solid ${activeProject.color}55`,
                  }}
                  className="absolute inset-0 rounded-2xl overflow-hidden"
                >
                  <div
                    className="absolute inset-0"
                    style={{ background: `linear-gradient(135deg, ${activeProject.color}44, ${activeProject.color}11)` }}
                  >
                    <Image
                      src={activeProject.thumbnail}
                      alt={activeProject.title}
                      fill
                      className="object-cover"
                      style={{ objectPosition: activeProject.thumbnailPosition ?? "center center" }}
                      priority
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                  <div
                    className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider"
                    style={{ background: activeProject.color, color: "#04122a" }}
                  >
                    {activeProject.year}
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="text-[10px] font-mono uppercase tracking-wider opacity-60 mb-1">
                      {activeProject.category}
                    </div>
                    <h3 className="text-lg font-bold leading-tight">{activeProject.title}</h3>
                  </div>
                </div>

                {/* Back face — landscape with slideshow */}
                <div
                  style={{
                    backfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                    border: `5px solid ${activeProject.color}55`,
                  }}
                  className="absolute inset-0 rounded-2xl overflow-hidden bg-[#06192e]"
                >
                  <div className="flex h-full">
                    {/* Left: slideshow */}
                    <div className="relative w-2/5 shrink-0 overflow-hidden">
                      {activeProject.images.map((img, i) => (
                        <div
                          key={img}
                          className="absolute inset-0 transition-opacity duration-700"
                          style={{ opacity: i === slideIndex ? 1 : 0 }}
                        >
                          <Image
                            src={img}
                            alt={`${activeProject.title} ${i + 1}`}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ))}
                      {/* Right-edge fade into card body */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#06192e]" />

                      {/* Slide dots — only if multiple images */}
                      {activeProject.images.length > 1 && (
                        <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2 z-10">
                          {activeProject.images.map((_, i) => (
                            <button
                              key={i}
                              type="button"
                              onClick={() => setSlideIndex(i)}
                              aria-label={`Slide ${i + 1}`}
                              className="transition-all duration-300"
                              style={{
                                width: i === slideIndex ? 16 : 6,
                                height: 6,
                                borderRadius: 3,
                                background: i === slideIndex ? activeProject.color : "rgba(255,255,255,0.35)",
                              }}
                            />
                          ))}
                        </div>
                      )}

                      {/* Prev/Next arrows — only if multiple images */}
                      {activeProject.images.length > 1 && (
                        <>
                          <button
                            type="button"
                            onClick={() => setSlideIndex((i) => (i - 1 + activeProject.images.length) % activeProject.images.length)}
                            aria-label="Previous"
                            className="absolute left-2 top-1/2 -translate-y-1/2 h-7 w-7 rounded-full bg-black/50 hover:bg-black/80 transition-colors flex items-center justify-center z-10"
                          >
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M15 18l-6-6 6-6" />
                            </svg>
                          </button>
                          <button
                            type="button"
                            onClick={() => setSlideIndex((i) => (i + 1) % activeProject.images.length)}
                            aria-label="Next"
                            className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7 rounded-full bg-black/50 hover:bg-black/80 transition-colors flex items-center justify-center z-10"
                          >
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M9 18l6-6-6-6" />
                            </svg>
                          </button>
                        </>
                      )}
                    </div>

                    {/* Right: details */}
                    <div className="flex-1 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
                      <div>
                        <div className="flex items-center gap-3 mb-4">
                          <span
                            className="px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider"
                            style={{ background: activeProject.color, color: "#04122a" }}
                          >
                            {activeProject.year}
                          </span>
                          <span className="text-[10px] font-mono uppercase tracking-wider opacity-50">
                            {activeProject.role}
                          </span>
                        </div>
                        <h3 className="text-2xl sm:text-3xl font-bold mb-2 leading-tight">
                          {activeProject.title}
                        </h3>
                        <div className="text-xs font-mono uppercase tracking-wider opacity-50 mb-4">
                          {activeProject.category}
                        </div>
                        <p className="text-sm sm:text-base opacity-75 leading-relaxed">
                          {activeProject.description}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-1.5 mt-5">
                        {activeProject.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2.5 py-1 rounded-full text-[10px] font-mono border border-white/15 bg-white/5"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

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
                <div className="text-[10px] font-mono uppercase tracking-[0.25em] opacity-60 mb-1">
                  Anthropic Academy · Certificate
                </div>
                <h3 className="text-xl sm:text-2xl font-bold leading-tight">{activeCert.title}</h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveCert(null)}
                aria-label="Close"
                className="shrink-0 h-9 w-9 rounded-full border border-white/20 bg-white/5 hover:bg-white/15 transition-colors flex items-center justify-center"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden border border-white/10 bg-black/40">
              <Image
                src={`/certs/anthropic/${activeCert.slug}.jpg`}
                alt={activeCert.title}
                fill
                sizes="(max-width: 1024px) 100vw, 1024px"
                className="object-contain"
                priority
              />
            </div>

            <div className="mt-4 flex justify-end">
              <a
                href={activeCert.verifyUrl ?? `/certs/anthropic/${activeCert.slug}.jpg`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border border-white/20 bg-white/5 hover:bg-white/15 transition-colors"
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
    </div>
  );
}
