import SectionLabel from "@/components/section-label";
import { P } from "@/components/ui";

export default function Footer({
  onToggleTheme,
}: {
  onToggleTheme: () => void;
}) {
  return (
    <section className="px-6 pt-8 pb-10 sm:py-32 border-t transition-colors duration-700 border-[var(--border)]">
      <div className="max-w-7xl mx-auto text-center">
        <SectionLabel className="mb-6">new opportunities</SectionLabel>
        <h2
          className="font-bold leading-[0.95] tracking-tight"
          style={{ fontSize: "clamp(2.5rem, 8vw, 7rem)" }}
        >
          Building a{" "}
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage: "var(--gradient-hero)",
              textShadow: "none",
            }}
          >
            team
          </span>
          ?
        </h2>
        <P className="mt-8 max-w-2xl mx-auto">
          I&apos;m looking for a team where craft matters. Two decades of
          shipping means I can step in, level up and turn ambitious roadmaps
          into products. If that&apos;s what you&apos;re after, I&apos;d love to
          talk.
        </P>

        <div className="print-hide mt-12 flex justify-center">
          <a
            href="mailto:jeremymoseley@me.com?subject=Opportunity%20for%20Jeremy%20Moseley"
            className="inline-block px-8 py-4 rounded-full text-base font-medium text-white"
            style={{ background: "var(--gradient-accent)" }}
          >
            Email me →
          </a>
        </div>
        <p className="print-only mt-8 text-base font-medium">
          jeremymoseley@me.com
        </p>
        <p className="mt-5 text-sm font-mono opacity-50">
          Email is the best way to reach me.
        </p>

        <div className="print-hide mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm">
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="opacity-80 hover:opacity-100 transition-opacity underline underline-offset-4 decoration-[--link-deco]"
          >
            Résumé ↗
          </a>
          <span className="opacity-20">·</span>
          <a
            href="https://github.com/moseley"
            target="_blank"
            rel="noopener noreferrer"
            className="opacity-80 hover:opacity-100 transition-opacity underline underline-offset-4 decoration-[--link-deco]"
          >
            GitHub ↗
          </a>
          <span className="opacity-20">·</span>
          <a
            href="https://www.linkedin.com/in/jeremymoseley/"
            target="_blank"
            rel="noopener noreferrer"
            className="opacity-80 hover:opacity-100 transition-opacity underline underline-offset-4 decoration-[--link-deco]"
          >
            LinkedIn ↗
          </a>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/qr-jeremymoseley.svg"
          alt="jeremymoseley.com"
          className="print-only mt-10"
          width={90}
          height={90}
          style={{ marginLeft: "auto", marginRight: "auto" }}
        />
        <div className="mt-16 text-xs font-mono opacity-50">
          © 2026 ·{" "}
          <button
            type="button"
            onClick={onToggleTheme}
            className="hover:opacity-70 transition-opacity"
          >
            Jeremy Moseley
          </button>
        </div>
      </div>
    </section>
  );
}
