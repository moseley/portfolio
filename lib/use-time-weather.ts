"use client";

import { useEffect, useState } from "react";

export type SunData = { rise: string; set: string; riseIso: string; setIso: string };
export type WeatherData = { temp: number; icon: string; description: string };

function codeToBasmiliusIcon(code: number, isDay: boolean): string {
  const d = isDay ? "day" : "night";
  if (code === 0) return `clear-${d}`;
  if (code === 1 || code === 2) return `partly-cloudy-${d}`;
  if (code === 3) return `overcast-${d}`;
  if (code === 45 || code === 48) return `fog-${d}`;
  if (code >= 51 && code <= 57) return "drizzle";
  if (code >= 61 && code <= 67) return "rain";
  if (code >= 71 && code <= 77) return "snow";
  if (code >= 80 && code <= 82) return "rain";
  if (code === 85 || code === 86) return "snow";
  if (code === 95) return `thunderstorms-${d}`;
  if (code === 96 || code === 99) return `thunderstorms-${d}-extreme`;
  return `clear-${d}`;
}

function codeToDescription(code: number): string {
  if (code === 0) return "Clear";
  if (code === 1) return "Mostly Clear";
  if (code === 2) return "Partly Cloudy";
  if (code === 3) return "Overcast";
  if (code === 45 || code === 48) return "Foggy";
  if (code >= 51 && code <= 57) return "Drizzle";
  if (code >= 61 && code <= 67) return "Rain";
  if (code >= 71 && code <= 77) return "Snow";
  if (code >= 80 && code <= 82) return "Showers";
  if (code === 85 || code === 86) return "Snow Showers";
  if (code === 95) return "Thunderstorms";
  if (code === 96 || code === 99) return "Severe Storms";
  return "Clear";
}

function fmtPT(iso: string) {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Los_Angeles",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  })
    .format(new Date(iso))
    .toLowerCase();
}

export function useTimeWeather() {
  const [time, setTime] = useState("");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [sun, setSun] = useState<SunData | null>(null);

  // Clock — 60s tick
  useEffect(() => {
    const tick = () => {
      setTime(
        new Intl.DateTimeFormat("en-US", {
          timeZone: "America/Los_Angeles",
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        })
          .format(new Date())
          .toLowerCase(),
      );
    };
    tick();
    const i = setInterval(tick, 60000);
    return () => clearInterval(i);
  }, []);

  // Weather + sun fetch — every 15 min
  useEffect(() => {
    const url =
      "https://api.open-meteo.com/v1/forecast?latitude=37.3861&longitude=-122.0839&current=temperature_2m,weather_code,is_day&daily=sunrise,sunset&temperature_unit=fahrenheit&timezone=America%2FLos_Angeles";
    const fetchWeather = async () => {
      try {
        const res = await fetch(url);
        const data = await res.json();
        setWeather({
          temp: Math.round(data.current.temperature_2m),
          icon: codeToBasmiliusIcon(data.current.weather_code, data.current.is_day === 1),
          description: codeToDescription(data.current.weather_code),
        });
        if (data.daily?.sunrise?.[0] && data.daily?.sunset?.[0]) {
          setSun({
            rise: fmtPT(data.daily.sunrise[0]),
            set: fmtPT(data.daily.sunset[0]),
            riseIso: data.daily.sunrise[0],
            setIso: data.daily.sunset[0],
          });
        }
      } catch {
        // leave null
      }
    };
    fetchWeather();
    const i = setInterval(fetchWeather, 15 * 60 * 1000);
    return () => clearInterval(i);
  }, []);

  return { time, weather, sun };
}
