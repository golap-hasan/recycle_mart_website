"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MenuIcon, Search, Heart } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export default function NavBottom() {
  const toSlug = (value: string) =>
    value
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

  const categories = [
    {
      title: "Smart / Android Merchants",
      items: ["Smartphones", "Android Tablets", "Wearables"],
    },
    {
      title: "Mobile, Electronics & Gadgets",
      items: ["Laptops", "Headphones", "Smart Home"],
    },
    {
      title: "Vehicles & Accessories",
      items: ["Cars", "Motorcycles", "Parts & Accessories"],
    },
    {
      title: "Home & Living",
      items: ["Furniture", "Kitchen & Dining", "Decor"],
    },
    {
      title: "Property",
      items: ["Apartments", "Commercial Space", "Land"],
    },
    {
      title: "Others",
      items: [
        "Air Conditioners",
        "Refrigerators",
        "Washing Machines",
        "Microwaves",
      ],
    },
  ];
  return (
    <div className="border-t border-white/15 text-white">
      <div className="mx-auto flex custom-width items-center justify-between py-3 px-6">
        {/* Categories Dropdown (Desktop) */}
        <div className="hidden lg:block">
          <Popover>
            <PopoverTrigger asChild>
              <Button className="h-10 flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-white/20">
                <MenuIcon className="h-4 w-4" />
                <span>All categories</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-80 border-white/20 bg-primary/95 p-0 text-white">
              <ScrollArea className="h-[calc(100vh-500px)]">
                <ul className="grid gap-3 p-4">
                  {categories.map((category) => (
                    <li
                      key={category.title}
                      className="rounded-lg border border-white/20 bg-white/10 p-3 transition hover:border-white/30"
                    >
                      <Link href={`/categories/${toSlug(category.title)}`} className="text-sm font-semibold">
                        {category.title}
                      </Link>
                      <div className="mt-2 flex flex-wrap gap-2 text-xs text-white/80">
                        {category.items.map((item) => (
                          <Link
                            key={item}
                            href={`/categories/${toSlug(item)}`}
                            className="rounded-sm border border-white/25 bg-white/5 px-2 py-1 transition hover:border-white/40 hover:bg-white/10"
                          >
                            {item}
                          </Link>
                        ))}
                      </div>
                    </li>
                  ))}
                </ul>
              </ScrollArea>
            </PopoverContent>
          </Popover>
        </div>

        {/* Search Bar (Desktop) */}
        <div className="hidden flex-1 px-8 lg:flex">
          <div className="relative w-full">
            <Input
              type="search"
              placeholder="Search the marketplace"
              className="h-11 rounded-full border-white/30 bg-white/10 pl-6 pr-14 text-sm font-medium text-white placeholder:text-white/70"
            />
            <Button
              size="icon"
              className="absolute right-1 top-1 h-9 w-9 rounded-full bg-white/15 text-white shadow hover:bg-white/25"
            >
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Action Icons (Desktop) */}
        <div className="hidden lg:flex items-center gap-3">
          <Link href="/wishlist">
            <Button className="h-10 flex items-center gap-2 rounded-full bg-white/20 px-5 py-2 text-sm font-semibold text-white shadow transition hover:bg-white/30">
              <Heart className="h-4 w-4" />
              Favorites
            </Button>
          </Link>
        </div>

        {/* Mobile & Tablet View */}
        <div className="flex items-center justify-between w-full lg:hidden">
          {/* Hamburger Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="border-white/30 bg-white/10 text-white hover:bg-white/20 rounded-full"
              >
                <MenuIcon />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="border-white/20 bg-primary/95 text-white"
            >
              <SheetHeader className="border-b border-white/20">
                <SheetTitle className="text-white/85">Categories</SheetTitle>
              </SheetHeader>
              <ScrollArea className="h-full px-6 py-4">
                <nav className="space-y-4 text-sm">
                  {categories.map((category) => (
                    <div key={category.title} className="space-y-2">
                      <Link href={`/categories/${toSlug(category.title)}`} className="block font-semibold">
                        {category.title}
                      </Link>
                      <div className="flex flex-wrap gap-2 text-white/80">
                        {category.items.map((item) => (
                          <Link
                            key={item}
                            href={`/categories/${toSlug(item)}`}
                            className="rounded-full border border-white/25 px-3 py-1 text-xs transition hover:bg-white/15"
                          >
                            {item}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </nav>
              </ScrollArea>
            </SheetContent>
          </Sheet>

          {/* Search Bar (Tablet) */}
          <div className="hidden md:flex flex-1 mx-4">
            <div className="relative w-full">
              <Input
                type="search"
                placeholder="Search the marketplace"
                className="h-10 rounded-full border-white/30 bg-white/10 pr-11 text-sm font-medium text-white placeholder:text-white/70"
              />
              <Button
                size="icon"
                className="absolute right-1 top-1 h-8 w-8 rounded-full bg-white/15 text-white hover:bg-white/25"
              >
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="md:hidden border-white/30 bg-white/10 text-white hover:bg-white/20 rounded-full"
            >
              <Search className="h-4 w-4" />
            </Button>
            <Link href="/wishlist">
              <Button size="icon" className="flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-primary shadow-md transition hover:bg-white">
                <Heart className="h-4 w-4" />
                <span className="hidden sm:inline">Saved</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
