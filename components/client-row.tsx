"use client";

import Image from "next/image";
import { startTransition, useEffect, useRef, useState } from "react";
import { stillFor, type Client } from "@/content/work";
import ProjectDetail from "@/components/project-detail";
import ProjectGallery from "@/components/project-gallery";
import ProjectTabs from "@/components/project-tabs";

export default function ClientRow({
  client,
  clientIndex,
  open,
  activeProjectSlug,
  onToggle,
  onProjectChange,
}: {
  client: Client;
  clientIndex: number;
  open: boolean;
  activeProjectSlug?: string;
  onToggle: () => void;
  onProjectChange: (slug: string) => void;
}) {
  const rowRef = useRef<HTMLLIElement>(null);
  const expandedOnce = useRef(false);
  const [activeIndex, setActiveIndex] = useState(() =>
    Math.max(
      0,
      client.projects.findIndex(
        (project) => project.slug === activeProjectSlug,
      ),
    ),
  );
  const [mobileProject, setMobileProject] = useState(
    client.projects.length === 1 ? 0 : -1,
  );
  const [imageIndexes, setImageIndexes] = useState<Record<string, number>>({});
  const activeProject = client.projects[activeIndex] ?? client.projects[0];

  useEffect(() => {
    const next = client.projects.findIndex(
      (project) => project.slug === activeProjectSlug,
    );
    if (next >= 0) {
      startTransition(() => {
        setActiveIndex(next);
        setMobileProject(next);
      });
    }
  }, [activeProjectSlug, client.projects]);

  useEffect(() => {
    // Only scroll on a user-driven expand, never on the initial mount —
    // the first row is open by default and would scroll the page on load.
    if (!expandedOnce.current) {
      expandedOnce.current = true;
      return;
    }
    if (!open || window.matchMedia("(min-width: 768px)").matches) return;
    const header =
      document.querySelector("header")?.getBoundingClientRect().height ?? 0;
    const top = rowRef.current?.getBoundingClientRect().top;
    if (top !== undefined)
      window.scrollTo({
        top: window.scrollY + top - header,
        behavior: "smooth",
      });
  }, [open]);

  const selectProject = (index: number) => {
    setActiveIndex(index);
    onProjectChange(client.projects[index].slug);
  };
  return (
    <li
      ref={rowRef}
      id={`work-${client.slug}`}
      className="overflow-hidden border-b border-line"
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls={`work-panel-${client.slug}`}
        onClick={onToggle}
        className="group relative grid min-h-19 w-full grid-cols-[64px_minmax(0,1fr)_auto] items-center gap-x-6 overflow-hidden px-2.5 py-7 text-left transition-colors hover:bg-hover max-md:grid-cols-[minmax(0,1fr)_auto] max-md:gap-3 max-md:py-4"
      >
        <span className="font-mono text-[13px] text-(--muted) max-md:hidden">
          {String(clientIndex + 1).padStart(2, "0")}
        </span>
        <span className="flex min-w-0 items-baseline gap-x-4 gap-y-1 max-md:block">
          <span className="text-[clamp(28px,3.4vw,44px)] font-bold leading-[0.95] tracking-[-0.01em] max-md:block max-md:text-[26px]">
            {client.title ?? client.name}
          </span>
          <span className="font-mono text-[12.5px] uppercase tracking-[0.16em] text-(--muted) max-md:mt-1 max-md:block max-md:text-[10.5px]">
            {client.projects.length > 1
              ? `${client.projects.length} Projects`
              : client.projects[0].name}
          </span>
        </span>
        <span className="flex items-center gap-5 font-mono text-[11.5px] uppercase text-(--muted) max-md:flex-row-reverse max-md:gap-3">
          <span className="hidden md:inline">{client.discipline}</span>
          <span
            aria-hidden="true"
            className="flex h-8.5 w-8.5 shrink-0 items-center justify-center rounded-full border border-line text-xl font-light transition-transform duration-300 group-aria-expanded:rotate-45"
          >
            +
          </span>
          <span
            className="relative h-12.5 w-19 shrink-0 overflow-hidden rounded-sm border border-line md:absolute md:right-53.75 md:top-1/2 md:h-25 md:w-42 md:-translate-y-1/2 md:rotate-[-2.5deg] md:opacity-0 md:group-hover:opacity-100 md:group-aria-expanded:opacity-0"
            style={{ transition: "opacity 800ms ease" }}
          >
            <Image
              src={client.cardImage ?? stillFor(client.projects[0].screenshots[0])}
              alt=""
              fill
              sizes="168px"
              className="h-full w-full object-cover object-top opacity-75"
            />
          </span>
        </span>
      </button>
      <div
        id={`work-panel-${client.slug}`}
        role="region"
        aria-label={`${client.name} projects`}
        className="grid transition-[grid-template-rows] duration-440 ease-[cubic-bezier(.2,.8,.2,1)] motion-reduce:transition-none"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div
          className="min-h-0 overflow-hidden"
          aria-hidden={!open}
          inert={!open}
        >
          <div className="px-2.5 pt-1.5 pb-14 max-md:px-5 max-md:pb-10">
            <ProjectTabs
              projects={client.projects}
              clientIndex={clientIndex}
              activeIndex={activeIndex}
              onChange={selectProject}
            />
            <div className="hidden border-b border-line max-md:block">
              {client.projects.map((project, index) => (
                <div key={project.slug}>
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      setMobileProject(mobileProject === index ? -1 : index);
                      selectProject(index);
                    }}
                    className="flex min-h-12 w-full items-center gap-3 border-t border-line text-left font-medium"
                  >
                    <span className="font-mono text-[11px] text-(--muted)">
                      {String(clientIndex + 1).padStart(2, "0")}.{index + 1}
                    </span>
                    <span className="flex-1">{project.name}</span>
                    <span
                      className={`text-xl transition-transform ${mobileProject === index ? "rotate-45" : ""}`}
                    >
                      +
                    </span>
                  </button>
                  <div
                    className="grid transition-[grid-template-rows] motion-reduce:transition-none"
                    style={{
                      gridTemplateRows: mobileProject === index ? "1fr" : "0fr",
                    }}
                  >
                    <div className="min-h-0 overflow-hidden">
                      <div className="pb-8 pt-5">
                        <ProjectGallery
                          project={project}
                          imageIndex={
                            imageIndexes[`${clientIndex}:${index}`] ?? 0
                          }
                          onImageChange={(imageIndex) =>
                            setImageIndexes((current) => ({
                              ...current,
                              [`${clientIndex}:${index}`]: imageIndex,
                            }))
                          }
                        />
                        <div className="mt-7">
                          <ProjectDetail
                            clientName={client.name}
                            project={project}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div
              role="tabpanel"
              aria-labelledby={`work-tab-${clientIndex}-${activeIndex}`}
              className="grid grid-cols-[minmax(320px,1.15fr)_minmax(0,1fr)] gap-11 transition-opacity duration-300 motion-reduce:duration-100 max-md:hidden md:max-lg:grid-cols-1 md:max-lg:gap-8"
            >
              <ProjectGallery
                project={activeProject}
                imageIndex={imageIndexes[`${clientIndex}:${activeIndex}`] ?? 0}
                onImageChange={(imageIndex) =>
                  setImageIndexes((current) => ({
                    ...current,
                    [`${clientIndex}:${activeIndex}`]: imageIndex,
                  }))
                }
              />
              <ProjectDetail clientName={client.name} project={activeProject} />
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}
