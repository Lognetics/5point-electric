import { CITY_POINTS, MAP_HEIGHT, MAP_WIDTH, NIGERIA_PATH } from "@/lib/nigeria-map";

const CITIES = [
  { name: "Abuja", point: CITY_POINTS.abuja, primary: true },
  { name: "Lagos", point: CITY_POINTS.lagos, primary: false },
  { name: "Port Harcourt", point: CITY_POINTS.portHarcourt, primary: false },
];

export function NigeriaMap() {
  const { abuja } = CITY_POINTS;
  return (
    <svg
      viewBox={`-10 -10 ${MAP_WIDTH + 20} ${MAP_HEIGHT + 20}`}
      className="h-auto w-full"
      role="img"
      aria-label="Map of Nigeria marking Abuja, Lagos, and Port Harcourt"
    >
      <defs>
        <pattern id="map-dots" width="13" height="13" patternUnits="userSpaceOnUse">
          <circle cx="3" cy="3" r="2" fill="#fff" fillOpacity="0.2" />
        </pattern>
        <clipPath id="map-clip">
          <path d={NIGERIA_PATH} />
        </clipPath>
      </defs>
      <path d={NIGERIA_PATH} fill="#fff" fillOpacity="0.025" />
      <rect x="0" y="0" width={MAP_WIDTH} height={MAP_HEIGHT} fill="url(#map-dots)" clipPath="url(#map-clip)" />
      <path d={NIGERIA_PATH} fill="none" stroke="#fff" strokeOpacity="0.4" strokeWidth="1.25" strokeLinejoin="round" />

      {CITIES.filter((c) => !c.primary).map((c) => (
        <line
          key={c.name}
          x1={abuja.x}
          y1={abuja.y}
          x2={c.point.x}
          y2={c.point.y}
          stroke="#35B96B"
          strokeOpacity="0.7"
          strokeWidth="1.5"
          strokeDasharray="2 7"
          strokeLinecap="round"
        />
      ))}

      {CITIES.map((c, i) => (
        <g key={c.name}>
          <circle
            cx={c.point.x}
            cy={c.point.y}
            r="11"
            fill="#35B96B"
            className="map-pulse"
            style={{ animationDelay: `${i * 0.5}s` }}
          />
          <circle cx={c.point.x} cy={c.point.y} r={c.primary ? 8 : 6.5} fill="#35B96B" stroke="#101D2C" strokeWidth="2.5" />
          <text
            x={c.point.x + 18}
            y={c.point.y + 8}
            fill="#fff"
            fontSize="25"
            fontWeight="600"
            className="font-display"
            paintOrder="stroke"
            stroke="#101D2C"
            strokeWidth="6"
          >
            {c.name}
          </text>
        </g>
      ))}
    </svg>
  );
}
