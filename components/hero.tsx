import SectionLabel from "@/components/section-label";
import NameDisplay from "@/components/name-display";
import { P } from "@/components/ui";

const tags = ["20+ yrs", "web", "mobile", "cloud", "leadership", "shipping"];

export default function Hero() {
  return (
    <section className="relative px-6 pt-8 pb-10 sm:pt-32 sm:pb-32">
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
      <div className="max-w-7xl mx-auto">
        <SectionLabel className="mb-6">building web apps</SectionLabel>
        <NameDisplay />

        <P className="mt-10 max-w-2xl">
          Full-stack engineer with 20+ years of shipping. I build products
          end-to-end — web, mobile, cloud — from scrappy startups to enterprise
          rollouts.
        </P>

        <div className="print-hide mt-12 flex flex-wrap items-center gap-4">
          <a
            href="#work"
            className="inline-block px-6 py-3 rounded-full text-sm font-medium text-white"
            style={{ background: "var(--gradient-accent)" }}
          >
            See the work →
          </a>
          <a
            href="#"
            className="inline-block px-6 py-3 rounded-full text-sm font-medium border transition-colors border-[var(--resume-border)] hover:border-[var(--resume-border-hover)]"
          >
            Download résumé
          </a>
        </div>

        <div className="mt-20 flex flex-wrap gap-2">
          {tags.map((t, i) => (
            <span
              key={t}
              className="px-4 py-1.5 rounded-full text-xs font-mono border backdrop-blur-sm border-[var(--border)] bg-[var(--surface-tag)]"
              style={{
                animation: `float 6s ease-in-out infinite`,
                animationDelay: `${i * 0.4}s`,
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
