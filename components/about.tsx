import SectionLabel from "@/components/section-label";
import { P } from "@/components/ui";

export default function About() {
  return (
    <section className="px-6 pt-8 pb-10 sm:py-24 border-t transition-colors duration-700 border-[var(--border)]">
      <div className="print-stack max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-4">
          <SectionLabel>about</SectionLabel>
          <h2 className="text-3xl font-bold mt-3">The short version.</h2>
        </div>
        <div className="md:col-span-8">
          <p className="text-2xl leading-relaxed">
            I&apos;m a full-stack engineer with 20+ years of building and
            shipping products across web, mobile, and cloud — from early-stage
            startups to enterprise clients. I lead teams, architect scalable
            systems, and{" "}
            <span
              className="bg-clip-text text-transparent font-semibold"
              style={{
                backgroundImage: "var(--gradient-accent)",
                textShadow: "none",
              }}
            >
              own projects end-to-end.
            </span>
          </p>
          <P className="mt-6">
            I started in game QA at THQ — writing the Xbox Live network testing
            handbook and hunting bugs across 20+ titles — then spent eight years
            as Director of Development at a Pasadena agency, leading a team
            across 50+ client projects and building event platforms for the
            likes of Shell and Maserati. Along the way I founded eTono,
            deploying scaling AWS infrastructure and shipping everything from
            e-commerce to an AI-driven real-time speech simulator.
          </P>
        </div>
      </div>
    </section>
  );
}
