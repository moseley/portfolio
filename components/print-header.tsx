"use client";

import { useTimeWeather } from "@/lib/use-time-weather";

export default function PrintHeader() {
  const { time, weather, sun } = useTimeWeather();

  return (
    <div className="print-only px-6" style={{ marginBottom: "0.3in" }}>
      <div
        className="max-w-7xl mx-auto"
        style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/icons/logo.svg" alt="JM" width={50} height={50} />

        <div style={{ fontSize: "0.8rem", fontFamily: "monospace", textAlign: "center" }}>
          {time || "--:--"} · Silicon Valley
          {weather && <> · {weather.temp}°F {weather.description}</>}
          {sun && <> · Sunset {sun.set}</>}
        </div>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/qr-jeremymoseley.svg" alt="jeremymoseley.com" width={70} height={70} />
      </div>
    </div>
  );
}
