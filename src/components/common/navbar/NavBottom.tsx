"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Search, Heart, GitCompare, ShoppingBag } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function NavBottom() {
  return (
    <div>
      <div className="custom-width mx-auto flex items-center justify-between py-3 px-6">
        {/* Categories Dropdown (Desktop) */}
        <div className="hidden lg:block">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button>
                <Menu />
                <span>All Categories</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Category 1</DropdownMenuItem>
              <DropdownMenuItem>Category 2</DropdownMenuItem>
              <DropdownMenuItem>Category 3</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Search Bar (Desktop) */}
        <div className="hidden lg:flex flex-1 mx-8">
          <div className="relative w-full">
            <Input type="search" placeholder="Search the store" />
            <Button size="icon" className="absolute right-0 top-0 rounded-l-none">
              <Search />
            </Button>
          </div>
        </div>

        {/* Action Icons (Desktop) */}
        <div className="hidden lg:flex items-center gap-4">
          <Link href="/compare">
            <Button size="icon">
              <GitCompare />
            </Button>
          </Link>
          <Link href="/wishlist">
            <Button size="icon">
              <Heart />
            </Button>
          </Link>
          <Link href="/cart">
            <Button size="icon">
              <ShoppingBag />
            </Button>
          </Link>
        </div>

        {/* Mobile & Tablet View */}
        <div className="flex items-center justify-between w-full lg:hidden">
          {/* Hamburger Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              {/* ... mobile nav content ... */}
            </SheetContent>
          </Sheet>

          {/* Search Bar (Tablet) */}
          <div className="hidden md:flex flex-1 mx-4">
            <div className="relative w-full">
              <Input type="search" placeholder="Search the store" />
              <Button size="icon" className="absolute right-0 top-0 rounded-l-none">
                <Search />
              </Button>
            </div>
          </div>

          {/* Search Icon (Mobile) */}
          <div className="md:hidden">
            <Button variant="outline" size="icon">
              <Search />
            </Button>
          </div>

          {/* Cart Icon */}
          <Link href="/cart">
            <Button size="icon">
              <ShoppingBag />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
