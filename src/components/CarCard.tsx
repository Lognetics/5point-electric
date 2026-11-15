import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Car } from "@/lib/content";
import { formatPrice } from "@/lib/cars";

export function CarCard({ car, sizes = "(min-width: 1280px) 25vw, (min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw", tone = "light" }: { car: Car; sizes?: string; tone?: "light" | "dark" }) {
  const [cover, second] = car.images;
  const dark = tone === "dark";
  return (
    <Link href={`/cars/${car.slug}`} className="group block">
      <div className="relative aspect-[4/5] overflow-hidden rounded-[14px] bg-moss">
        <Image src={cover.src} alt={cover.alt} fill sizes={sizes} className="object-cover transition-[transform,opacity] duration-[1.2s] ease-out-soft group-hover:scale-[1.04]" />
        {second && (
          <Image src={second.src} alt="" fill sizes={sizes} className="object-cover opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
        )}
        <span className="absolute top-3.5 left-3.5 rounded-full bg-ink/60 px-2.5 py-1 font-mono text-[0.525rem] tracking-[0.06em] text-white uppercase backdrop-blur-md">
          {car.headline}
        </span>
      </div>
      <div className="mt-4 flex items-start justify-between gap-3">
        <div>
          <p className={`label ${dark ? "text-white/50" : "text-stone"}`}>{car.year} {car.make}</p>
          <h3 className="mt-1 text-[1.2rem] leading-tight tracking-[-0.02em]">{car.model}</h3>
        </div>
        <ArrowUpRight size={20} className={`mt-1 shrink-0 transition-transform duration-500 ease-out-soft group-hover:translate-x-1 group-hover:-translate-y-1 ${dark ? "text-leaf" : "text-deep"}`} aria-hidden="true" />
      </div>
      <p className="mt-2 text-[0.95rem] font-medium tracking-[-0.01em]">{formatPrice(car.price)}</p>
      <dl className={`mt-3 grid grid-cols-3 gap-2 border-t pt-3 ${dark ? "border-white/15" : "border-ink/12"}`}>
        {car.highlights.slice(0, 3).map((h) => (
          <div key={h.label}>
            <dt className={`font-mono text-[0.5rem] tracking-[0.06em] uppercase ${dark ? "text-white/50" : "text-stone"}`}>{h.label}</dt>
            <dd className="mt-0.5 text-[0.75rem]">{h.value}</dd>
          </div>
        ))}
      </dl>
    </Link>
  );
}
