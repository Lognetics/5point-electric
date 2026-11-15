"use client";

import { useEffect, useMemo, useState } from "react";
import type { Car } from "@/lib/content";
import { BODY_TYPES, POWERTRAINS } from "@/lib/cars";
import { CarCard } from "./CarCard";

type Sort = "featured" | "price-asc" | "price-desc";
const ALL = "all";

const pill = (on: boolean) =>
  `min-h-10 rounded-full border px-4 py-1.5 text-[0.775rem] transition-colors ${
    on ? "border-ink bg-ink text-white" : "border-ink/20 hover:border-ink"
  }`;

/** Car catalogue grouped by powertrain, with body-type filters and price sorting. */
export function CarShop({ cars }: { cars: Car[] }) {
  const [powertrain, setPowertrain] = useState<string>(ALL);
  const [body, setBody] = useState<string>(ALL);
  const [sort, setSort] = useState<Sort>("featured");

  // Links such as /cars?type=hybrid open on that category.
  useEffect(() => {
    const type = new URLSearchParams(window.location.search).get("type");
    if (type && POWERTRAINS.some((p) => p.id === type)) setPowertrain(type);
  }, []);

  const bodies = BODY_TYPES.filter((b) => cars.some((c) => c.bodyType === b.id));
  const filtered = useMemo(() => {
    const list = cars.filter((c) => (powertrain === ALL || c.powertrain === powertrain) && (body === ALL || c.bodyType === body));
    if (sort === "featured") return list;
    return [...list].sort((a, b) => ((a.price ?? Infinity) - (b.price ?? Infinity)) * (sort === "price-asc" ? 1 : -1));
  }, [cars, powertrain, body, sort]);

  const groups = POWERTRAINS.filter((p) => powertrain === ALL || p.id === powertrain)
    .map((p) => ({ ...p, cars: filtered.filter((c) => c.powertrain === p.id) }))
    .filter((g) => g.cars.length > 0);

  return (
    <div>
      <div className="flex flex-col gap-5 border-b border-ink/12 pb-7 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-4">
          <div role="group" aria-label="Filter by powertrain" className="flex flex-wrap gap-2">
            {[{ id: ALL, label: "All cars" }, ...POWERTRAINS].map((p) => (
              <button key={p.id} type="button" aria-pressed={powertrain === p.id} onClick={() => setPowertrain(p.id)} className={pill(powertrain === p.id)}>
                {p.label}
                <span className="ml-2 opacity-55">{p.id === ALL ? cars.length : cars.filter((c) => c.powertrain === p.id).length}</span>
              </button>
            ))}
          </div>
          <div role="group" aria-label="Filter by body type" className="flex flex-wrap gap-2">
            {[{ id: ALL, label: "Any body type" }, ...bodies].map((b) => (
              <button key={b.id} type="button" aria-pressed={body === b.id} onClick={() => setBody(b.id)} className={pill(body === b.id)}>
                {b.label}
              </button>
            ))}
          </div>
        </div>
        <label className="flex items-center gap-3 text-[0.775rem]">
          <span className="label text-stone">Sort</span>
          <select value={sort} onChange={(e) => setSort(e.target.value as Sort)} className="field !min-h-10 w-auto pr-6">
            <option value="featured">Featured</option>
            <option value="price-asc">Price: low to high</option>
            <option value="price-desc">Price: high to low</option>
          </select>
        </label>
      </div>

      <p className="sr-only" role="status">
        {filtered.length} {filtered.length === 1 ? "car" : "cars"} shown
      </p>

      {groups.length > 0 ? (
        <div className="mt-12 space-y-20 lg:mt-16 lg:space-y-28">
          {groups.map((g) => (
            <section key={g.id} aria-labelledby={`group-${g.id}`}>
              <div className="mb-9 flex flex-col justify-between gap-3 md:flex-row md:items-end">
                <div>
                  <p className="label mb-3 text-deep">{g.cars.length} {g.cars.length === 1 ? "car" : "cars"}</p>
                  <h2 id={`group-${g.id}`} className="d-3">{g.label}</h2>
                </div>
                <p className="max-w-md text-stone">{g.blurb}</p>
              </div>
              <ul className="grid gap-x-6 gap-y-12 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
                {g.cars.map((car) => (
                  <li key={car.slug} className="page-enter">
                    <CarCard car={car} />
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      ) : (
        <div className="mt-12 rounded-[14px] bg-white px-6 py-16 text-center">
          <p className="d-3">No cars match these filters.</p>
          <button type="button" onClick={() => { setPowertrain(ALL); setBody(ALL); }} className="link-arrow mt-5">
            Show all cars
          </button>
        </div>
      )}
    </div>
  );
}
