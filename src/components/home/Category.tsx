"use client";

import Link from "next/link";
import {
  Armchair,
  Bike,
  Building,
  Car,
  Cog,
  Fan,
  Headphones,
  Home,
  House,
  Lamp,
  LandPlot,
  Laptop,
  Package,
  Smartphone,
  Snowflake,
  Sparkles,
  Store,
  Tablet,
  UtensilsCrossed,
  WashingMachine,
  Watch,
} from "lucide-react";

import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import PageLayout from "@/tools/PageLayout";

type CategoryItem = {
  label: string;
  icon: LucideIcon;
};

type CategoryConfig = {
  title: string;
  items: CategoryItem[];
  icon: LucideIcon;
  accent: string;
  listings: string;
};

const categories: CategoryConfig[] = [
  {
    title: "Smart / Android Merchants",
    items: [
      { label: "Smartphones", icon: Smartphone },
      { label: "Android Tablets", icon: Tablet },
      { label: "Wearables", icon: Watch },
    ],

    icon: Smartphone,
    accent: "from-primary/20 via-primary/10 to-transparent",
    listings: "24.6K listings",
  },
  {
    title: "Mobile, Electronics & Gadgets",
    items: [
      { label: "Laptops", icon: Laptop },
      { label: "Headphones", icon: Headphones },
      { label: "Smart Home", icon: House },
    ],

    icon: Sparkles,
    accent: "from-indigo-400/25 via-indigo-300/10 to-transparent",
    listings: "19.8K listings",
  },
  {
    title: "Vehicles & Accessories",
    items: [
      { label: "Cars", icon: Car },
      { label: "Motorcycles", icon: Bike },
      { label: "Parts & Accessories", icon: Cog },
    ],

    icon: Car,
    accent: "from-emerald-400/25 via-emerald-300/10 to-transparent",
    listings: "8.4K listings",
  },
  {
    title: "Home & Living",
    items: [
      { label: "Furniture", icon: Armchair },
      { label: "Kitchen & Dining", icon: UtensilsCrossed },
      { label: "Decor", icon: Lamp },
    ],

    icon: Home,
    accent: "from-amber-400/25 via-amber-300/10 to-transparent",
    listings: "11.2K listings",
  },
  {
    title: "Property",
    items: [
      { label: "Apartments", icon: Building },
      { label: "Commercial Space", icon: Store },
      { label: "Land", icon: LandPlot },
    ],

    icon: LandPlot,
    accent: "from-rose-400/25 via-rose-300/10 to-transparent",
    listings: "6.5K listings",
  },
  {
    title: "Others",
    items: [
      { label: "Air Conditioners", icon: Fan },
      { label: "Refrigerators", icon: Snowflake },
      { label: "Washing Machines", icon: WashingMachine },
    ],

    icon: Package,
    accent: "from-sky-400/25 via-sky-300/10 to-transparent",
    listings: "3.9K listings",
  },
];

const toSlug = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

const Category = () => {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-88 w-88 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/15 blur-3xl" />
      <PageLayout>
        <div className="space-y-2 pb-10">
          <div className="mx-auto max-w-3xl space-y-2 text-center">
            <span className="text-sm font-semibold uppercase tracking-[0.3em] text-foreground">
              Browse the marketplace
            </span>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-foreground">
              Categories curated for every need
            </h2>
            <p className="mx-auto max-w-2xl text-base text-muted-foreground">
              Pick a category to explore tailored deals and trending listings. Each block surfaces
              the most active sub-collections so you can dive in instantly.
            </p>
          </div>
        </div>

        <div className="relative space-y-10">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-6 text-center">
            {categories.map(({ title, listings, icon: Icon }) => (
              <div key={title} className="flex flex-col items-center gap-2">
                <span className="inline-flex size-12 items-center justify-center rounded-xl border border-border/40 bg-background/70 text-primary shadow-sm">
                  <Icon className="h-6 w-6" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-foreground">{title}</p>
                  <p className="text-xs text-muted-foreground">{listings}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mx-auto grid max-w-7xl gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
            {categories.flatMap(({ title, accent, items }) =>
              items.map(({ label, icon: ItemIcon }) => (
                <Link
                  key={`${title}-${label}`}
                  href={`/categories/${toSlug(title)}/${toSlug(label)}`}
                  className="group relative overflow-hidden rounded-2xl border border-border/40 bg-card/95 p-5 transition hover:-translate-y-1 hover:border-primary/40"
                >
                  <div
                    className={cn(
                      "pointer-events-none absolute inset-0 bg-linear-to-br opacity-0 transition group-hover:opacity-100",
                      accent
                    )}
                  />
                  <div className="relative z-10 flex items-start gap-4">
                    <span className="inline-flex size-12 items-center justify-center rounded-xl border border-border/40 bg-background/80 text-primary shadow-sm transition group-hover:border-primary/40 group-hover:text-primary">
                      <ItemIcon className="h-6 w-6" />
                    </span>
                    <div className="space-y-1">
                      <p className="text-sm font-semibold text-foreground">{label}</p>
                      <p className="text-xs uppercase tracking-wider text-muted-foreground">{title}</p>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </PageLayout>
    </section>
  );
};

export default Category;