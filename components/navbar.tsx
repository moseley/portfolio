"use client";

import React from "react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import SiliconValley from "@/components/silicon-valley";
import { useTimeWeather } from "@/lib/use-time-weather";

const Navbar = React.forwardRef<HTMLElement, {
  isDaytime: boolean;
  onIsDaytimeChange: (v: boolean) => void;
}>(function Navbar({ isDaytime, onIsDaytimeChange }, ref) {
  const { time, weather, sun } = useTimeWeather();

  const overrideRef = useRef<"day" | "night" | null>(null);
  const [showThemePicker, setShowThemePicker] = useState(false);

  function applyOverride(mode: "day" | "night" | null) {
    overrideRef.current = mode;
    setShowThemePicker(false);
    if (mode !== null) onIsDaytimeChange(mode === "day");
  }

  // Derive isDaytime from sun data, rechecked every minute
  useEffect(() => {
    if (!sun) return;
    const check = () => {
      if (overrideRef.current !== null) return;
      const now = new Date();
      const rise = new Date(sun.riseIso);
      const set = new Date(sun.setIso);
      onIsDaytimeChange(now >= rise && now < set);
    };
    check();
    const i = setInterval(check, 60000);
    return () => clearInterval(i);
  }, [sun, onIsDaytimeChange]);

  // Close theme picker on outside click
  useEffect(() => {
    if (!showThemePicker) return;
    const id = setTimeout(() => {
      document.addEventListener("click", () => setShowThemePicker(false), { once: true });
    }, 0);
    return () => clearTimeout(id);
  }, [showThemePicker]);

  return (
    <header ref={ref} className="sticky top-0 z-50 backdrop-blur-md border-b transition-colors duration-700 bg-[var(--header-bg)] border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="relative inline-flex items-center gap-2">
          <Link href="/" className="flex items-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/icons/logo.svg"
              alt="JM"
              width={80}
              height={80}
              className=""
              style={{ filter: "var(--logo-filter)" }}
            />
          </Link>
          {showThemePicker && (
            <button
              onClick={() => applyOverride(isDaytime ? "night" : "day")}
              className="focus:outline-none opacity-60 hover:opacity-100 transition-opacity"
              title={isDaytime ? "Switch to evening" : "Switch to daytime"}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/icons/weather/${isDaytime ? "clear-night" : "clear-day"}.svg`}
                alt={isDaytime ? "Evening" : "Daytime"}
                width={18}
                height={18}
              />
            </button>
          )}
        </div>

        <SiliconValley time={time} weather={weather} sun={sun} isDaytime={isDaytime} />

        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={() => setShowThemePicker((p) => !p)}
            className="hidden"
            aria-label="Toggle theme picker"
          />
          <button
            type="button"
            aria-label="Scroll to contact"
            onClick={() => { document.getElementById("footer")?.scrollIntoView({ behavior: "smooth" }); }}
            className="flex w-9 h-9 rounded-full items-center justify-center border transition-colors cursor-pointer border-[var(--btn-primary-border)] bg-[var(--text)] text-[var(--btn-primary-text)] hover:bg-transparent hover:text-[var(--text)]"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"/>
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
});

export default Navbar;
