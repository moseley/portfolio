"use client";

import type { Project } from "@/content/work";

export default function ProjectTabs({
  projects,
  clientIndex,
  activeIndex,
  onChange,
}: {
  projects: Project[];
  clientIndex: number;
  activeIndex: number;
  onChange: (index: number) => void;
}) {
  if (projects.length < 2) return null;
  return (
    <div
      role="tablist"
      aria-label="Projects"
      className="mb-6.5 flex flex-wrap gap-x-6.5 border-b border-line"
    >
      {projects.map((project, index) => (
        <button
          key={project.slug}
          id={`work-tab-${clientIndex}-${index}`}
          type="button"
          role="tab"
          aria-selected={activeIndex === index}
          tabIndex={activeIndex === index ? 0 : -1}
          onClick={(event) => {
            event.stopPropagation();
            onChange(index);
          }}
          onKeyDown={(event) => {
            if (event.key === "ArrowRight") {
              event.preventDefault();
              onChange((index + 1) % projects.length);
            }
            if (event.key === "ArrowLeft") {
              event.preventDefault();
              onChange((index - 1 + projects.length) % projects.length);
            }
          }}
          className={`-mb-px flex items-center gap-2 border-b-2 py-3 text-left text-[15px] font-medium transition-colors ${activeIndex === index ? "border-(--text) text-(--text)" : "border-transparent text-(--muted) hover:text-(--text)"}`}
        >
          <span className="font-mono text-[11px] opacity-60">
            {String(clientIndex + 1).padStart(2, "0")}.{index + 1}
          </span>
          {project.name}
        </button>
      ))}
    </div>
  );
}
