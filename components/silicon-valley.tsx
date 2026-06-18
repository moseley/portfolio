type SunData = { rise: string; set: string; riseIso: string; setIso: string };

export default function SiliconValley({
  time,
  weather,
  sun,
  isDaytime,
}: {
  time: string;
  weather: { temp: number; icon: string; description: string } | null;
  sun: SunData | null;
  isDaytime: boolean;
}) {
  return (
    <div className="flex items-stretch gap-5 font-mono">
      {/* Time & Location */}
      <div className="flex flex-col justify-center items-start gap-0.5">
        <span className="text-2xl leading-none opacity-90">{time || "--:--"}</span>
        <span className="text-xs opacity-50">Silicon Valley</span>
      </div>

      {/* Weather — icons flank the temperature */}
      {weather && (
        <div className="flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`/icons/weather/${weather.icon}.svg`}
            alt={weather.icon.replace(/-/g, " ")}
            width={24}
            height={24}
            className={isDaytime ? "opacity-90" : "opacity-50"}
            style={isDaytime ? { filter: "drop-shadow(0 0 1px rgba(0,0,0,0.25))" } : undefined}
          />
          <div className="flex flex-col justify-center items-start gap-0.5">
            <span className="text-2xl leading-none opacity-90">{weather.temp}°F</span>
            <span className="text-xs opacity-50">{weather.description}</span>
          </div>
          {sun && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={`/icons/weather/${isDaytime ? "sunset" : "sunrise"}.svg`}
              alt={isDaytime ? "sunset" : "sunrise"}
              width={24}
              height={24}
              className={isDaytime ? "opacity-90" : "opacity-50"}
            />
          )}
        </div>
      )}

      {/* Sun time */}
      {sun && (
        <div className="flex flex-col justify-center items-start gap-0.5">
          <span className="text-2xl leading-none opacity-90">
            {isDaytime ? sun.set : sun.rise}
          </span>
          <span className="text-xs opacity-50">{isDaytime ? "Sunset" : "Sunrise"}</span>
        </div>
      )}
    </div>
  );
}
