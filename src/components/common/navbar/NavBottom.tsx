"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MenuIcon, Heart } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

import { Category } from "@/types/category.type";
import Image from "next/image";

export default function NavBottom({ categories }: { categories: Category[] }) {
  return (
    <div className="hidden lg:block border-t border-white/15 text-white">
      <div className="mx-auto flex container items-center justify-between py-3 px-5">
        {/* Categories Dropdown (Desktop Only) */}
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-1">
          <Popover>
            <PopoverTrigger asChild>
              <Button className="h-10 flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-white/20 shrink-0 mr-4">
                <MenuIcon className="h-4 w-4" />
                <span>All categories</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-[800px] border-white/20 bg-primary/95 p-6 text-white rounded-3xl backdrop-blur-md">
              <ScrollArea className="h-fit">
                <div className="grid grid-cols-4 gap-4">
                  {categories.map((category) => (
                    <Link
                      key={category._id}
                      href={`/ads?category=${category.slug}`}
                      className="group flex flex-col items-center justify-center p-4 rounded-2xl border border-white/10 bg-white/5 transition hover:border-white/30 hover:bg-white/15 text-center"
                    >
                      {category.icon && (
                         <div className="relative w-12 h-12 mb-3 transition-transform group-hover:scale-110">
                            <Image src={category.icon} alt={category.name} fill className="object-contain]" />
                         </div>
                      )}
                      <span className="text-xs font-bold uppercase tracking-wider">
                        {category.name}
                      </span>
                    </Link>
                  ))}
                </div>
              </ScrollArea>
            </PopoverContent>
          </Popover>
        </div>

        {/* Favorites Button (Desktop Only) */}
        <div className="flex items-center gap-3">
          <Link href="/profile/favourites">
            <Button className="h-10 flex items-center gap-2 rounded-full bg-white/20 px-5 py-2 text-sm font-semibold text-white shadow transition hover:bg-white/30">
              <Heart className="h-4 w-4" />
              Favorites
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
