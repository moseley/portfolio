"use client";

import { useState } from "react";
import SectionLabel from "@/components/section-label";
import { work } from "@/content/work";
import ClientRow from "@/components/client-row";

export default function SelectedWork() {
  const [openClient, setOpenClient] = useState(0);
  const [projectSlugs, setProjectSlugs] = useState<Record<number, string>>({});
  const toggle = (index: number) => {
    const nextOpen = openClient === index ? -1 : index;
    setOpenClient(nextOpen);
    if (nextOpen >= 0) {
      const client = work[nextOpen];
      setProjectSlugs((current) => ({
        ...current,
        [nextOpen]: current[nextOpen] ?? client.projects[0].slug,
      }));
    }
  };

  return (
    <section
      id="work"
      className="border-t border-line px-6 pt-8 pb-20 transition-colors duration-400 max-md:px-5 max-md:pt-10"
    >
      <div className="mx-auto mb-10 max-w-7xl">
        <SectionLabel className="mb-3">selected work</SectionLabel>
        <h2 className="text-[clamp(44px,6vw,76px)] font-bold leading-[0.95] tracking-[-0.01em] max-md:text-[40px]">
          Stuff I&apos;ve built.
        </h2>
      </div>
      <ul role="list" className="mx-auto max-w-7xl border-t border-line">
        {work.map((client, index) => (
          <ClientRow
            key={client.slug}
            client={client}
            clientIndex={index}
            open={openClient === index}
            activeProjectSlug={projectSlugs[index]}
            onToggle={() => toggle(index)}
            onProjectChange={(slug) => {
              setProjectSlugs((current) => ({ ...current, [index]: slug }));
            }}
          />
        ))}
      </ul>
    </section>
  );
}
