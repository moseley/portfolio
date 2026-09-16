import type { Project } from "@/content/work";

export default function ProjectDetail({
  clientName,
  project,
}: {
  clientName: string;
  project: Project;
}) {
  const meta = [
    ["Client", clientName],
    ["Project", project.name],
    ["Partners", project.partners],
    ["Role", project.role],
    ["Website", project.website?.label],
    ["Live Demo", project.demo?.label],
  ].filter((item): item is [string, string] => Boolean(item[1]));
  return (
    <div className="flex flex-col gap-6">
      <dl className="grid grid-cols-[92px_1fr] items-baseline gap-x-4.5 gap-y-2.75 max-md:block">
        {meta.map(([label, value]) => (
          <div key={label} className="contents max-md:block">
            <dt className="font-mono text-[11.5px] uppercase tracking-[0.14em] text-(--muted) max-md:mt-3">
              {label}
            </dt>
            <dd className="text-[15px] font-medium max-md:mt-1">
              {label === "Website" && project.website ? (
                <a
                  href={project.website.href}
                  target="_blank"
                  rel="noopener"
                  className="text-(--accent) underline underline-offset-3"
                >
                  {value} ↗
                </a>
              ) : label === "Live Demo" && project.demo ? (
                <a
                  href={project.demo.href}
                  target="_blank"
                  rel="noopener"
                  className="text-(--accent) underline underline-offset-3"
                >
                  {value} ↗
                </a>
              ) : (
                value
              )}
            </dd>
          </div>
        ))}
      </dl>
      <div className="flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-line px-3.5 py-1.5 text-[12.5px] text-(--muted)"
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="flex flex-col gap-4 max-w-[60ch] max-md:max-w-none">
        {(Array.isArray(project.body) ? project.body : [project.body ?? "Project details coming soon."]).map((para, i) => (
          <p key={i} className="text-pretty text-base leading-relaxed max-md:text-[15.5px]">
            {para}
          </p>
        ))}
      </div>
    </div>
  );
}
