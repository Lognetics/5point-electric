"use client";

import { useState } from "react";
import { CITY_POINTS, MAP_HEIGHT, MAP_WIDTH, NIGERIA_PATH } from "@/lib/nigeria-map";

const CITIES = [
  { name: "Abuja", note: "Office and operations", point: CITY_POINTS.abuja },
  { name: "Lagos", note: "Operational location", point: CITY_POINTS.lagos },
  { name: "Port Harcourt", note: "Operational location", point: CITY_POINTS.portHarcourt },
];

/** City list and Nigeria map. Hovering or focusing a city lights it up on the map. */
export function ReachMap() {
  const [active, setActive] = useState<string | null>(null);
  const { abuja } = CITY_POINTS;

  return (
    <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
      <ul className="border-t border-white/15 lg:col-span-6">
        {CITIES.map((c) => (
          <li
            key={c.name}
            tabIndex={0}
            onMouseEnter={() => setActive(c.name)}
            onMouseLeave={() => setActive(null)}
            onFocus={() => setActive(c.name)}
            onBlur={() => setActive(null)}
            className="group flex items-baseline justify-between gap-4 border-b border-white/15 py-5 outline-none lg:py-7"
          >
            <span className={`d-3 transition-colors duration-300 lg:!text-[3.5rem] ${active === c.name ? "text-leaf" : ""}`}>{c.name}</span>
            <span className="label text-right text-white/55">{c.note}</span>
          </li>
        ))}
      </ul>

      <div className="lg:col-span-6">
        <svg
          viewBox={`-10 -10 ${MAP_WIDTH + 20} ${MAP_HEIGHT + 20}`}
          className="h-auto w-full"
          role="img"
          aria-label="Map of Nigeria marking Abuja, Lagos, and Port Harcourt"
        >
          <defs>
            <pattern id="map-dots" width="12" height="12" patternUnits="userSpaceOnUse">
              <circle cx="3" cy="3" r="1.9" fill="#63C27A" fillOpacity="0.28" />
            </pattern>
            <clipPath id="map-clip">
              <path d={NIGERIA_PATH} />
            </clipPath>
          </defs>
          <rect x="0" y="0" width={MAP_WIDTH} height={MAP_HEIGHT} fill="url(#map-dots)" clipPath="url(#map-clip)" />
          <path d={NIGERIA_PATH} fill="none" stroke="#fff" strokeOpacity="0.28" strokeWidth="1.2" strokeLinejoin="round" />
          {CITIES.slice(1).map((c) => (
            <line key={c.name} x1={abuja.x} y1={abuja.y} x2={c.point.x} y2={c.point.y} stroke="#63C27A" strokeOpacity="0.75" strokeWidth="1.5" strokeDasharray="2 7" strokeLinecap="round" />
          ))}
          {CITIES.map((c, i) => {
            const on = active === c.name;
            return (
              <g key={c.name}>
                <circle cx={c.point.x} cy={c.point.y} r="12" fill="#63C27A" className="map-pulse" style={{ animationDelay: `${i * 0.6}s` }} />
                <circle cx={c.point.x} cy={c.point.y} r={on ? 11 : 7.5} fill={on ? "#fff" : "#63C27A"} stroke="#10241A" strokeWidth="2.5" style={{ transition: "r .3s, fill .3s" }} />
                <text x={c.point.x + 18} y={c.point.y + 8} fill="#fff" fontSize="24" fontWeight="500" paintOrder="stroke" stroke="#10241A" strokeWidth="6">
                  {c.name}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
