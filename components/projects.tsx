"use client";

import Image from "next/image";
import { useEffect, useEffectEvent, useRef, useState } from "react";
import SectionLabel from "@/components/section-label";

const projects = [
  {
    id: 1,
    client: "Shell",
    project: "Eco-marathon",
    partners: ["Publicis"],
    role: "Lead Engineer",
    year: "2024",
    color: "#ffc800",
    thumbnail: "/projects/shell/eco-marathon.png",
    thumbnailPosition: "0% 0%",
    images: ["/projects/shell/eco-marathon.png"],
    description:
      "Shell Eco-marathon is a global competition where high school and university teams engineer the most fuel-efficient vehicles, staged across regional events in the Americas, Europe, and Asia. In partnership with Publicis, I built the web app at the center of the competition experience—powering team submissions of technical documents, logistics, lodging, race results, and social event coverage. Each team received a shareable profile link bringing their info, race results, prizes, category, and video profile together in one place. I also provided on-site support across the 2009 and 2010 Americas and Europe events in the U.S. and Germany.",
    tags: [
      "Web App Development",
      "Event Platform",
      "Sustainability",
      "On-site Support",
    ],
  },
  {
    id: 2,
    client: "Maserati",
    project: "Digital Event Campaigns",
    partners: ["Ross Madrid"],
    role: "Digital Campaign Developer",
    year: "2023",
    color: "#2563eb",
    thumbnail: "/projects/maserati/winter.png",
    thumbnailPosition: "center 80%",
    images: [
      "/projects/maserati/winter.png",
      "/projects/maserati/aspen.png",
      "/projects/maserati/rsvp.png",
    ],
    description:
      "Maserati ran a series of custom event campaigns to engage owners and prospects—test-drive invitations, race weekends, and new-vehicle unveilings. Working with Ross Madrid, I built each campaign end to end, keeping a cohesive theme across print, email, and web while tailoring every one to its own creative direction and registration data requirements. The work spanned experiences like the Aspen Winter Drive, the Trofeo Maserati North America race series, and the year-end Winter Revel—each with a distinct look and a registration flow built to capture the specific attendee details that event called for.",
    tags: [
      "Email Development",
      "Landing Pages",
      "Event Registration",
      "Print-to-Digital",
    ],
  },
  {
    id: 3,
    client: "Comtac",
    project: "Firefighter Training Simulation",
    role: "Full-Stack Web Developer",
    year: "2023",
    color: "#22d3ee",
    thumbnail: "/projects/comtac/simulation.jpg",
    thumbnailPosition: "center 30%",
    images: ["/projects/comtac/simulation.jpg"],
    website: "https://www.comtactraining.com",
    description:
      "Comtac's firefighter training app is a voice-driven simulation built on a real-time speech and media pipeline. I developed the web app, which captures the trainee's microphone audio and transcribes it with ElevenLabs, sends the transcribed commands to the OpenAI API to generate context-appropriate responses, then synthesizes dispatcher and arriving-unit speech back through ElevenLabs. Voice recordings are stored on Amazon S3, and all incident video—including the 360-degree structure walkthroughs—is hosted and streamed through Mux. Session data, including the self-evaluation and final score, is captured and saved for review.",
    tags: [
      "Web App Development",
      "Simulation",
      "Voice Interaction",
      "E-Learning",
    ],
  },
  {
    id: 4,
    client: "Beechcraft",
    project: "Journey",
    partners: ["Ross Madrid"],
    role: "Full-Stack Web Developer",
    year: "2013",
    color: "#0d9488",
    thumbnail: "/projects/beechcraft/journey.png",
    thumbnailPosition: "center 30%",
    images: ["/projects/beechcraft/journey.png"],
    description:
      "Journey is a content hub for Beechcraft that archives the company's press releases, technical documents, videos, highlight reels, employee spotlights, customer success stories, and recent campaigns in one place. I built the website, where every piece of content is tagged by intended audience and a recommendation algorithm surfaces the articles and media each visitor is most likely to engage with based on their profile. Content is presented in a dynamic grid, with size and spacing allocated to each item according to its type and prominence.",
    tags: [
      "Web Development",
      "Content Platform",
      "Personalization",
      "Dynamic Grid Layout",
    ],
  },
];

type Project = {
  id: number;
  client: string;
  project: string;
  partners?: string[];
  role: string;
  year: string;
  color: string;
  thumbnail: string;
  thumbnailPosition?: string;
  images: string[];
  description: string;
  tags: string[];
  website?: string;
};

// 63:88 portrait ratio throughout
const RATIO_W = 63;
const RATIO_H = 88;
const CARD_W = 210;
const CARD_H = Math.round((CARD_W * RATIO_H) / RATIO_W); // 293

function ProjectCard({
  project,
  onClick,
  isActive,
}: {
  project: Project;
  onClick: () => void;
  isActive: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isActive}
      className="group relative shrink-0 rounded-2xl overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 cursor-pointer transition-all duration-300 hover:scale-[1.03]"
      style={{
        width: CARD_W,
        height: CARD_H,
        scrollSnapAlign: "start",
        border: "7px solid #ffffff",
        opacity: isActive ? 0 : undefined,
        transition: "opacity 150ms ease-out, transform 300ms",
      }}
    >
      {/* Thumbnail */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(135deg, ${project.color}44, ${project.color}11)`,
        }}
      >
        <Image
          src={project.thumbnail}
          alt={`${project.client} – ${project.project}`}
          fill
          className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            transition: "opacity 500ms, transform 500ms",
            objectPosition: project.thumbnailPosition ?? "center center",
          }}
        />
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/30 to-transparent" />

      {/* Bent page corner — top right, appears on hover */}
      <div
        className="absolute top-0 right-0 pointer-events-none"
        style={{ transform: "rotate(180deg)" }}
      >
        <div
          className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            width: 0,
            height: 0,
            borderStyle: "solid",
            borderWidth: "0 40px 40px 0",
            borderColor: "transparent rgba(0,0,0,0.35) transparent transparent",
          }}
        />
        <div
          className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 origin-top-right"
          style={{
            width: 0,
            height: 0,
            borderStyle: "solid",
            borderWidth: "36px 36px 0 0",
            borderColor:
              "rgba(255,255,255,0.85) transparent transparent transparent",
          }}
        />
      </div>

      {/* Title area — always on dark overlay, always white text */}
      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
        <h3 className="text-lg font-bold leading-tight">{project.client}</h3>
        <div className="text-[10px] font-mono uppercase tracking-wider opacity-60 mt-0.5">
          {project.project}
        </div>
      </div>
    </button>
  );
}

export default function Projects() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [flipped, setFlipped] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);
  const [isPortrait, setIsPortrait] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const arrowLeftRef = useRef<HTMLButtonElement>(null);
  const arrowRightRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const check = () => {
      if (arrowLeftRef.current)
        arrowLeftRef.current.style.display =
          el.scrollLeft > 1 ? "flex" : "none";
      if (arrowRightRef.current)
        arrowRightRef.current.style.display =
          el.scrollLeft + el.clientWidth < el.scrollWidth - 1 ? "flex" : "none";
    };
    check();
    requestAnimationFrame(check);
    el.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    return () => {
      el.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, []);

  function scrollLeft() {
    scrollRef.current?.scrollBy({
      left: -scrollRef.current.clientWidth,
      behavior: "smooth",
    });
  }
  function scrollRight() {
    scrollRef.current?.scrollBy({
      left: scrollRef.current.clientWidth,
      behavior: "smooth",
    });
  }

  const handleOrientation = useEffectEvent((matches: boolean) => {
    setIsPortrait(matches);
  });

  useEffect(() => {
    const mql = window.matchMedia("(orientation: portrait)");
    handleOrientation(mql.matches);
    const onChange = (e: MediaQueryListEvent) => handleOrientation(e.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  const closeProject = () => {
    setActiveProject(null);
    setFlipped(false);
    setSlideIndex(0);
  };

  // Keyboard dismiss + scroll lock
  useEffect(() => {
    if (!activeProject) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeProject();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [activeProject]);

  // Auto-flip to back face after a short pause
  const flipSlide = useEffectEvent(() => {
    setFlipped(false);
    setSlideIndex(0);
  });

  useEffect(() => {
    if (!activeProject) {
      flipSlide();
      return;
    }
    const t = setTimeout(() => setFlipped(true), 320);
    return () => clearTimeout(t);
  }, [activeProject]);

  // Auto-advance slideshow
  useEffect(() => {
    if (!flipped || !activeProject || activeProject.images.length <= 1) return;
    const t = setInterval(() => {
      setSlideIndex((i) => (i + 1) % activeProject.images.length);
    }, 3200);
    return () => clearInterval(t);
  }, [flipped, activeProject]);

  return (
    <>
      {/* Print-only: project text from expanded view */}
      <section className="print-only pt-8 pb-10 border-t border-[--border]">
        <div className="max-w-7xl mx-auto px-6 mb-10">
          <SectionLabel className="mb-3">selected work</SectionLabel>
          <h2 className="text-4xl md:text-6xl font-bold">
            Stuff I&apos;ve built.
          </h2>
        </div>
        <div className="max-w-7xl mx-auto px-6 flex flex-col gap-12">
          {projects.map((p) => (
            <div key={p.id}>
              <dl
                className="grid grid-cols-[auto_1fr] gap-x-5 gap-y-1 text-sm font-mono mb-3"
                style={{ breakInside: "avoid" }}
              >
                <dt
                  style={{ opacity: 0.4 }}
                  className="uppercase tracking-wider"
                >
                  Client
                </dt>
                <dd className="font-semibold text-base">{p.client}</dd>
                <dt
                  style={{ opacity: 0.4 }}
                  className="uppercase tracking-wider"
                >
                  Project
                </dt>
                <dd className="text-base">{p.project}</dd>
                {(p.partners?.length ?? 0) > 0 && (
                  <>
                    <dt
                      style={{ opacity: 0.4 }}
                      className="uppercase tracking-wider"
                    >
                      Partners
                    </dt>
                    <dd className="text-base">{p.partners!.join(", ")}</dd>
                  </>
                )}
                <dt
                  style={{ opacity: 0.4 }}
                  className="uppercase tracking-wider"
                >
                  Role
                </dt>
                <dd className="text-base">{p.role}</dd>
                <dt
                  style={{ opacity: 0.4 }}
                  className="uppercase tracking-wider"
                >
                  Year
                </dt>
                <dd className="text-base">{p.year}</dd>
                {p.website && (
                  <>
                    <dt style={{ opacity: 0.4 }} className="uppercase tracking-wider">
                      Website
                    </dt>
                    <dd className="text-base">{p.website.replace(/^https?:\/\/www\./, "")}</dd>
                  </>
                )}
              </dl>
              <div className="flex flex-wrap gap-2 mb-3">
                {p.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full text-xs font-mono border border-[--border]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <p className="text-sm leading-relaxed" style={{ opacity: 0.75 }}>
                {p.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Horizontal card slider */}
      <section
        id="work"
        className="print-hide pt-8 pb-10 sm:py-24 border-t transition-colors duration-700 border-[--border]"
      >
        <div className="max-w-7xl mx-auto px-6 mb-10">
          <SectionLabel className="mb-3">selected work</SectionLabel>
          <h2 className="text-4xl md:text-6xl font-bold">
            Stuff I&apos;ve built.
          </h2>
        </div>

        <div className="relative">
          {/* Edge fades */}
          <div
            className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 z-10"
            style={{
              background:
                "linear-gradient(to right, var(--edge-fade), transparent)",
            }}
          />
          <div
            className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 z-10"
            style={{
              background:
                "linear-gradient(to left, var(--edge-fade), transparent)",
            }}
          />

          <button
            ref={arrowLeftRef}
            type="button"
            onClick={scrollLeft}
            aria-label="Scroll to previous cards"
            className="absolute left-3 z-20 h-10 w-10 rounded-full border items-center justify-center shadow-md transition-colors border-[--border] bg-[--surface] hover:bg-[--surface-hover]"
            style={{ top: `${CARD_H / 2 - 20}px`, display: "none" }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            ref={arrowRightRef}
            type="button"
            onClick={scrollRight}
            aria-label="Scroll to next cards"
            className="absolute right-3 z-20 h-10 w-10 rounded-full border items-center justify-center shadow-md transition-colors border-[--border] bg-[--surface] hover:bg-[--surface-hover]"
            style={{ top: `${CARD_H / 2 - 20}px`, display: "none" }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>

          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto pb-6 pr-6"
            style={{
              paddingLeft: "max(1.5rem, calc((100vw - 80rem) / 2 + 1.5rem))",
              scrollSnapType: "x mandatory",
              scrollPaddingLeft:
                "max(1.5rem, calc((100vw - 80rem) / 2 + 1.5rem))",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {projects.map((p) => (
              <ProjectCard
                key={p.id}
                project={p}
                isActive={activeProject?.id === p.id}
                onClick={() => {
                  setActiveProject(p);
                  setFlipped(false);
                  setSlideIndex(0);
                }}
              />
            ))}
            <div className="shrink-0 w-2" aria-hidden="true" />
          </div>
        </div>
      </section>

      {/* Flip lightbox — always dark overlay, card back always dark */}
      {activeProject && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${activeProject.client} — ${activeProject.project}`}
          onClick={closeProject}
          className="fixed inset-0 z-100 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
          style={{ animation: "fadeIn 150ms ease-out" }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{ perspective: "1400px" }}
          >
            {/* Size-transitioning wrapper */}
            <div
              style={{
                width: flipped
                  ? isPortrait
                    ? `min(80vw, calc(80vh * ${RATIO_W} / ${RATIO_H}))`
                    : `min(80vw, calc(80vh * ${RATIO_H} / ${RATIO_W}))`
                  : `${CARD_W}px`,
                height: flipped
                  ? isPortrait
                    ? `min(calc(80vw * ${RATIO_H} / ${RATIO_W}), 80vh)`
                    : `min(calc(80vw * ${RATIO_W} / ${RATIO_H}), 80vh)`
                  : `${CARD_H}px`,
                transition:
                  "width 700ms cubic-bezier(0.4,0,0.2,1), height 700ms cubic-bezier(0.4,0,0.2,1)",
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
                {/* Front face */}
                <div
                  style={{
                    backfaceVisibility: "hidden",
                    border: "7px solid #ffffff",
                  }}
                  className="absolute inset-0 rounded-2xl overflow-hidden"
                >
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(135deg, ${activeProject.color}44, ${activeProject.color}11)`,
                    }}
                  >
                    <Image
                      src={activeProject.thumbnail}
                      alt={activeProject.client}
                      fill
                      className="object-cover"
                      style={{
                        objectPosition:
                          activeProject.thumbnailPosition ?? "center center",
                      }}
                      priority
                    />
                  </div>
                  <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/30 to-transparent" />
                  <div
                    className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider"
                    style={{
                      background: activeProject.color,
                      color: "#04122a",
                    }}
                  >
                    {activeProject.year}
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <div className="text-[10px] font-mono uppercase tracking-wider opacity-60 mb-0.5">
                      {activeProject.project}
                    </div>
                    <h3 className="text-lg font-bold leading-tight">
                      {activeProject.client}
                    </h3>
                  </div>
                </div>

                {/* Back face — follows theme */}
                <div
                  style={{
                    backfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                    border: "7px solid #ffffff",
                    background: "var(--bg)",
                    color: "var(--text)",
                  }}
                  className="absolute inset-0 rounded-2xl overflow-hidden"
                >
                  {/* Close button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      closeProject();
                    }}
                    aria-label="Close"
                    className="absolute top-3 right-3 z-20 h-8 w-8 rounded-full border transition-colors flex items-center justify-center border-[--border] bg-[--surface] hover:bg-[--surface-hover]"
                  >
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                  </button>

                  <div
                    className={`flex h-full ${isPortrait ? "flex-col" : "flex-row"}`}
                  >
                    {/* Slideshow — top in portrait, left in landscape */}
                    <div
                      className={`relative shrink-0 overflow-hidden ${isPortrait ? "w-full h-[45%]" : "h-full w-[45%]"}`}
                    >
                      {activeProject.images.map((img, i) => (
                        <div
                          key={img}
                          className="absolute inset-0 transition-opacity duration-700"
                          style={{ opacity: i === slideIndex ? 1 : 0 }}
                        >
                          <Image
                            src={img}
                            alt={`${activeProject.client} ${i + 1}`}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ))}
                      {/* Fade into card body */}
                      <div
                        className="absolute inset-0"
                        style={{
                          backgroundImage: isPortrait
                            ? "linear-gradient(to bottom, transparent, transparent, var(--bg))"
                            : "linear-gradient(to right, transparent, transparent, var(--bg))",
                        }}
                      />

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
                                background:
                                  i === slideIndex
                                    ? activeProject.color
                                    : "var(--border-strong)",
                              }}
                            />
                          ))}
                        </div>
                      )}

                      {activeProject.images.length > 1 && (
                        <>
                          <button
                            type="button"
                            onClick={() =>
                              setSlideIndex(
                                (i) =>
                                  (i - 1 + activeProject.images.length) %
                                  activeProject.images.length,
                              )
                            }
                            aria-label="Previous"
                            className="absolute left-2 top-1/2 -translate-y-1/2 h-7 w-7 rounded-full border border-[--border] bg-[--surface] hover:bg-[--surface-hover] transition-colors flex items-center justify-center z-10"
                          >
                            <svg
                              width="12"
                              height="12"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M15 18l-6-6 6-6" />
                            </svg>
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              setSlideIndex(
                                (i) => (i + 1) % activeProject.images.length,
                              )
                            }
                            aria-label="Next"
                            className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7 rounded-full border border-[--border] bg-[--surface] hover:bg-[--surface-hover] transition-colors flex items-center justify-center z-10"
                          >
                            <svg
                              width="12"
                              height="12"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M9 18l6-6-6-6" />
                            </svg>
                          </button>
                        </>
                      )}
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-h-0 flex flex-col p-5 sm:p-7">
                      <div className="flex-1 min-h-0 overflow-y-auto pr-1 flex flex-col gap-5 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[--border] hover:[&::-webkit-scrollbar-thumb]:bg-[--border-strong]">
                        {/* Metadata grid */}
                        <dl className="grid grid-cols-[auto_1fr] gap-x-5 gap-y-1.5 text-sm font-mono">
                          <dt className="opacity-40 uppercase tracking-wider pt-0.5">
                            Client
                          </dt>
                          <dd className="font-semibold text-base">
                            {activeProject.client}
                          </dd>

                          <dt className="opacity-40 uppercase tracking-wider pt-0.5">
                            Project
                          </dt>
                          <dd className="text-base">{activeProject.project}</dd>

                          {(activeProject.partners?.length ?? 0) > 0 && (
                            <>
                              <dt className="opacity-40 uppercase tracking-wider pt-0.5">
                                Partners
                              </dt>
                              <dd className="text-base">
                                {activeProject.partners!.join(", ")}
                              </dd>
                            </>
                          )}

                          <dt className="opacity-40 uppercase tracking-wider pt-0.5">
                            Role
                          </dt>
                          <dd className="text-base">{activeProject.role}</dd>

                          {activeProject.website && (
                            <>
                              <dt className="opacity-40 uppercase tracking-wider pt-0.5">
                                Website
                              </dt>
                              <dd className="text-base">
                                <a
                                  href={activeProject.website}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="underline underline-offset-4 decoration-[--link-deco] hover:opacity-70 transition-opacity"
                                >
                                  {activeProject.website.replace(/^https?:\/\/www\./, "")}
                                </a>
                              </dd>
                            </>
                          )}
                        </dl>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2">
                          {activeProject.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-3 py-1.5 rounded-full text-xs font-mono border border-[--border] bg-[--surface]"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* Description */}
                        <p className="text-base opacity-75 leading-relaxed">
                          {activeProject.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
