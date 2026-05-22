"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const projects = [
  {
    id: 1,
    title: "Shell Eco-marathon",
    category: "Web Development",
    year: "2024",
    color: "#FF6B4A",
    thumbnail: "/projects/eco-marathon.png",
    blurb:
      "Real-time telemetry dashboard for an endurance race team. Next.js, TypeScript, WebSockets.",
    tags: ["Next.js", "TypeScript", "WebSocket"],
  },
  {
    id: 2,
    title: "Maserati",
    category: "Event Support",
    year: "2023",
    color: "#7C5CFF",
    thumbnail: "/projects/maserati.png",
    blurb:
      "Cross-platform event ops with payment processing and cloud sync. Built for high-pressure rollouts.",
    tags: ["React Native", "Stripe", "AWS"],
  },
  {
    id: 3,
    title: "Comtac Training",
    category: "Web Development",
    year: "2023",
    color: "#22C55E",
    thumbnail: "/projects/comtac-training.png",
    blurb:
      "Accessibility-first learning platform with a full design system and component library.",
    tags: ["React", "Design System", "A11y"],
  },
];

const skills = [
  {
    heading: "Languages & Frameworks",
    items: ["JavaScript", "TypeScript", "React", "Next.js", "Node.js", "PHP"],
  },
  { heading: "Databases", items: ["MongoDB", "MySQL", "PostgreSQL", "Neon"] },
  {
    heading: "Cloud & Infrastructure",
    items: ["AWS EC2", "ELB", "RDS", "S3", "Lambda", "Vercel"],
  },
  {
    heading: "APIs & Services",
    items: ["Stripe", "Mux", "ElevenLabs", "OpenAI", "GraphQL"],
  },
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

function TiltCard({
  children,
  accent,
}: {
  children: React.ReactNode;
  accent: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, glowX: 50, glowY: 50 });

  return (
    <div
      ref={ref}
      className="relative will-change-transform transition-transform duration-200 ease-out"
      style={{
        transform: `perspective(1200px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={(e) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width;
        const py = (e.clientY - rect.top) / rect.height;
        setTilt({
          rx: (0.5 - py) * 10,
          ry: (px - 0.5) * 12,
          glowX: px * 100,
          glowY: py * 100,
        });
      }}
      onMouseLeave={() =>
        setTilt({ rx: 0, ry: 0, glowX: 50, glowY: 50 })
      }
    >
      {children}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 hover:opacity-100 transition-opacity"
        style={{
          background: `radial-gradient(circle at ${tilt.glowX}% ${tilt.glowY}%, ${accent}33, transparent 50%)`,
        }}
      />
    </div>
  );
}

// Map Open-Meteo WMO codes to Basmilius weather icon slugs.
// https://github.com/basmilius/weather-icons (MIT)
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
  const [weather, setWeather] = useState<{ temp: number; icon: string } | null>(
    null,
  );

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
    // Open-Meteo — no API key, CORS-friendly. Coords: Mountain View, CA.
    const url =
      "https://api.open-meteo.com/v1/forecast?latitude=37.3861&longitude=-122.0839&current=temperature_2m,weather_code,is_day&temperature_unit=fahrenheit";

    const fetchWeather = async () => {
      try {
        const res = await fetch(url);
        const data = await res.json();
        setWeather({
          temp: Math.round(data.current.temperature_2m),
          icon: codeToBasmiliusIcon(
            data.current.weather_code,
            data.current.is_day === 1,
          ),
        });
      } catch {
        // leave null — UI degrades to time-only
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

export default function Home() {
  return (
    <div className="min-h-screen relative overflow-hidden text-white">
      {/* Background — gradient + grain */}
      <div
        className="fixed inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 50% at 20% 10%, #2a1f5c 0%, transparent 70%), radial-gradient(50% 50% at 80% 30%, #5c1f4a 0%, transparent 70%), radial-gradient(60% 60% at 60% 100%, #1f3a5c 0%, transparent 70%), #0b0a14",
        }}
      />
      <div
        className="fixed inset-0 -z-10 opacity-[0.07] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
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
              backgroundImage: "linear-gradient(90deg, #FF6B4A, #7C5CFF, #22C55E)",
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
              style={{
                background: "linear-gradient(90deg, #FF6B4A, #7C5CFF)",
              }}
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

          {/* Floating chips */}
          <div className="mt-20 flex flex-wrap gap-2">
            {["20+ yrs", "web", "mobile", "cloud", "leadership", "shipping"].map(
              (t, i) => (
                <span
                  key={t}
                  className="px-4 py-1.5 rounded-full text-xs font-mono border border-white/15 bg-white/5 backdrop-blur-sm"
                  style={{
                    animation: `float 6s ease-in-out infinite`,
                    animationDelay: `${i * 0.4}s`,
                  }}
                >
                  {t}
                </span>
              ),
            )}
          </div>
        </div>
        <style>{`
          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-6px); }
          }
        `}</style>
      </section>

      {/* About */}
      <section className="px-6 py-24 border-t border-white/10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-4">
            <div className="text-xs font-mono uppercase tracking-[0.3em] opacity-50">
              // about
            </div>
            <h2 className="text-3xl font-bold mt-3">The short version.</h2>
          </div>
          <div className="md:col-span-8">
            <p className="text-2xl leading-relaxed">
              I lead teams, architect scalable systems, and own projects
              end-to-end. Two decades of shipping has taught me one thing:{" "}
              <span
                className="bg-clip-text text-transparent font-semibold"
                style={{
                  backgroundImage:
                    "linear-gradient(90deg, #FF6B4A, #7C5CFF)",
                }}
              >
                taste compounds.
              </span>{" "}
              The fastest path to a great product is people who&apos;ve been
              wrong enough times to know what works.
            </p>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="px-6 py-24 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-xs font-mono uppercase tracking-[0.3em] opacity-50 mb-3">
            // toolkit
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-12">
            Things I reach for.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map((s) => (
              <div
                key={s.heading}
                className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-6 hover:bg-white/[0.06] hover:border-white/20 transition-colors"
              >
                <div className="text-xs font-mono uppercase tracking-wider opacity-60 mb-4">
                  {s.heading}
                </div>
                <ul className="space-y-1.5">
                  {s.items.map((item) => (
                    <li
                      key={item}
                      className="text-base flex items-center gap-2"
                    >
                      <span className="text-emerald-400 opacity-60">→</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section
        id="work"
        className="px-6 py-24 border-t border-white/10"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-xs font-mono uppercase tracking-[0.3em] opacity-50 mb-3">
            // selected work
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-16">
            Stuff I&apos;ve built.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {projects.map((p) => (
              <TiltCard key={p.id} accent={p.color}>
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm overflow-hidden h-full">
                  <div
                    className="relative aspect-[4/3] overflow-hidden"
                    style={{
                      background: `linear-gradient(135deg, ${p.color}22, transparent)`,
                    }}
                  >
                    <Image
                      src={p.thumbnail}
                      alt={p.title}
                      fill
                      className="object-cover"
                    />
                    <div
                      className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider"
                      style={{
                        background: p.color,
                        color: "#0b0a14",
                      }}
                    >
                      {p.year}
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="text-xs font-mono uppercase tracking-wider opacity-60 mb-2">
                      {p.category}
                    </div>
                    <h3 className="text-2xl font-bold mb-3">{p.title}</h3>
                    <p className="text-sm opacity-70 mb-4 leading-relaxed">
                      {p.blurb}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {p.tags.map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 rounded-full text-[10px] font-mono border border-white/15 bg-white/5"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-32 border-t border-white/10">
        <div className="max-w-7xl mx-auto text-center">
          <h2
            className="font-bold leading-[0.95] tracking-tight"
            style={{ fontSize: "clamp(2.5rem, 8vw, 7rem)" }}
          >
            Got something
            <br />
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, #FF6B4A, #7C5CFF, #22C55E)",
              }}
            >
              worth building?
            </span>
          </h2>
          <div className="mt-12 flex justify-center">
            <MagneticLink
              href="mailto:jeremymoseley@me.com"
              className="px-8 py-4 rounded-full text-base font-medium"
              style={{
                background: "linear-gradient(90deg, #FF6B4A, #7C5CFF)",
              }}
            >
              Let&apos;s talk →
            </MagneticLink>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm">
            <a
              href="tel:+14082108423"
              className="opacity-80 hover:opacity-100 transition-opacity"
            >
              408-210-8423
            </a>
            <span className="opacity-20">·</span>
            <a
              href="mailto:jeremymoseley@me.com"
              className="opacity-80 hover:opacity-100 transition-opacity"
            >
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
          <div className="mt-16 text-xs font-mono opacity-50">
            © 2026 · Jeremy Moseley
          </div>
        </div>
      </section>
    </div>
  );
}
