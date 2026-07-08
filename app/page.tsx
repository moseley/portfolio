"use client";

import { useEffect, useRef, useState } from "react";
import { daytime, evening } from "@/lib/themes";
import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import About from "@/components/about";
import Skills from "@/components/skills";
import Projects from "@/components/projects";
import Credentials from "@/components/credentials";
import Footer from "@/components/footer";
import PrintHeader from "@/components/print-header";
import { Analytics } from "@vercel/analytics/next";

export default function Home() {
  const [isDaytime, setIsDaytime] = useState(() => {
    const ptH = (new Date().getUTCHours() - 7 + 24) % 24;
    return ptH >= 6 && ptH < 20;
  });

  const navRef = useRef<HTMLElement>(null);
  const [navH, setNavH] = useState(80);

  useEffect(() => {
    const theme = isDaytime ? daytime : evening;
    const root = document.documentElement;
    Object.entries(theme).forEach(([k, v]) => root.style.setProperty(k, v));
  }, [isDaytime]);

  useEffect(() => {
    if (!navRef.current) return;
    const ro = new ResizeObserver(() => setNavH(navRef.current!.offsetHeight));
    ro.observe(navRef.current);
    return () => ro.disconnect();
  }, []);

  const snap: React.CSSProperties = { scrollSnapAlign: "start" };

  return (
    <div
      className="print-root h-screen overflow-y-scroll overflow-x-clip transition-colors duration-700 text-[--text]"
      style={{ scrollSnapType: "y mandatory", scrollPaddingTop: navH }}
    >
      <Navbar
        ref={navRef}
        isDaytime={isDaytime}
        onIsDaytimeChange={setIsDaytime}
      />
      <div className="print-snap" style={snap}>
        <PrintHeader />
        <Hero />
      </div>
      <div className="print-snap" style={snap}>
        <About />
      </div>
      <div className="print-snap" style={snap}>
        <Skills isDaytime={isDaytime} />
      </div>
      <div className="print-snap" style={snap}>
        <Projects />
      </div>
      <div className="print-snap" style={snap}>
        <Credentials />
      </div>
      <div id="footer" className="print-snap" style={snap}>
        <Footer onToggleTheme={() => setIsDaytime((d) => !d)} />
      </div>
      {/* Print-only resume pages */}
      {[1, 2].map((n) => (
        <div key={n} className="print-snap print-resume-page">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`/resume-pages/page-${n}.png`} alt={`Resume page ${n}`} />
        </div>
      ))}
      <Analytics />
    </div>
  );
}
