import SectionLabel from "@/components/section-label";

type Tool = { name: string; icon: string; mono?: boolean };

const tools: Tool[] = [
  { name: "TypeScript",  icon: "/icons/typescript.svg",  mono: true },
  { name: "JavaScript",  icon: "/icons/javascript.svg",  mono: true },
  { name: "React",       icon: "/icons/react.svg",       mono: true },
  { name: "Next.js",     icon: "/icons/nextjs.svg",      mono: true },
  { name: "Node.js",     icon: "/icons/nodejs.svg",      mono: true },
  { name: "GraphQL",     icon: "/icons/graphql.svg",     mono: true },
  { name: "SQL",         icon: "/icons/sql.svg",         mono: true },
  { name: "AWS",         icon: "/icons/aws.svg",         mono: true },
  { name: "Vercel",      icon: "/icons/vercel.svg",      mono: true },
  { name: "Stripe",      icon: "/icons/stripe.svg",      mono: true },
  { name: "ElevenLabs",  icon: "/icons/elevenlabs.svg",  mono: true },
  { name: "ChatGPT",     icon: "/icons/openai.svg",      mono: true },
  { name: "Claude",      icon: "/icons/claude.svg",      mono: true },
  { name: "OpenClaw",    icon: "/icons/openclaw.svg",  mono: true },
  { name: "Hermes",      icon: "/icons/hermes.png",    mono: true },
];

export default function Skills({ isDaytime }: { isDaytime: boolean }) {
  return (
    <section className="px-6 pt-8 pb-10 sm:py-24 border-t transition-colors duration-700 border-[var(--border)]">
      <div className="max-w-7xl mx-auto">
        <SectionLabel className="mb-3">toolkit</SectionLabel>
        <h2 className="text-3xl md:text-4xl font-bold mb-10">Things I reach for.</h2>
        <div className="flex flex-wrap gap-3">
          {tools.map((t) => (
            <div key={t.name} className="group relative">
              <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-xl border backdrop-blur-sm flex items-center justify-center transition-colors border-[var(--border)] bg-[var(--surface)] hover:bg-[var(--surface-hover)] hover:border-[var(--border-strong)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={t.icon}
                  alt={t.name}
                  width={22}
                  height={22}
                  className="opacity-80 group-hover:opacity-100 transition-opacity"
                  style={t.mono ? { filter: isDaytime ? undefined : "invert(1)" } : undefined}
                />
              </div>
              <div
                role="tooltip"
                className="pointer-events-none absolute left-1/2 -translate-x-1/2 top-full mt-2 whitespace-nowrap px-2 py-1 rounded-md text-xs font-mono border opacity-0 group-hover:opacity-100 transition-opacity z-10 bg-[var(--tooltip-bg)] text-white border-[var(--tooltip-border)]"
              >
                {t.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
