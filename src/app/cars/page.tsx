import type { Metadata } from "next";
import { CarShop } from "@/components/CarShop";
import { PageHero } from "@/components/PageHero";
import { getCars } from "@/lib/content";

export const metadata: Metadata = {
  title: "Shop Electric Cars & Plug-In Hybrids in Nigeria",
  description:
    "Buy fully electric cars and plug-in hybrids in Nigeria from 5Point Electric Technology, including Xiaomi, ZEEKR, AVATR, Geely, and BYD models. Pickup and delivery nationwide.",
  alternates: { canonical: "/cars" },
};

export default function CarsPage() {
  const cars = getCars();
  return (
    <>
      <PageHero
        eyebrow="Shop Cars"
        title="Electric and plug-in hybrid cars, ready to drive."
        lead="Browse fully electric and plug-in hybrid vehicles available at 5Point Electric Technology, with pickup and delivery nationwide."
      />
      <section className="section !pt-14 lg:!pt-20">
        <div className="wrap">
          <CarShop cars={cars} />
          <p className="mt-16 max-w-2xl text-[0.75rem] text-stone">
            Specifications are as supplied for each model. Prices are in Nigerian naira; please confirm price and
            availability with our team before purchase.
          </p>
        </div>
      </section>
    </>
  );
}
