"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Moon, Sun, ChevronDown } from "lucide-react";
import { useTheme } from "next-themes";
import { promoMessages } from "./shared";

export default function NavTop() {
  const [promoIndex, setPromoIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const intervalRef = useRef<number | null>(null);
  const timeoutRef = useRef<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const { setTheme, theme } = useTheme();

  useEffect(() => {
    const id = window.setTimeout(() => setMounted(true), 0);
    return () => window.clearTimeout(id);
  }, []);

  useEffect(() => {
    intervalRef.current = window.setInterval(() => {
      setIsAnimating(true);
      timeoutRef.current = window.setTimeout(() => {
        setPromoIndex((prev) => (prev + 1) % promoMessages.length);
        setIsAnimating(false);
      }, 500);
    }, 4000);

    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, []);

  const nextMessage = promoMessages[(promoIndex + 1) % promoMessages.length];
  const transitionClass = isAnimating
    ? "transition-transform duration-500 ease-in-out"
    : "transition-none";

  return (
    <section className="border-b border-gray-600">
      {/* Mobile Top Row */}
      <div className="flex md:hidden h-10 items-center justify-end px-4 text-sm">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-auto p-0 flex items-center text-white">
              My Account
              <ChevronDown className="h-3 w-3 ml-1" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Orders</DropdownMenuItem>
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <div className="h-4 w-px bg-border mx-3"></div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-auto p-0 flex items-center text-white">
              USD
              <ChevronDown className="h-3 w-3 ml-1" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>USD</DropdownMenuItem>
            <DropdownMenuItem>EUR</DropdownMenuItem>
            <DropdownMenuItem>GBP</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="custom-width mx-auto hidden md:flex h-9 text-sm items-center justify-between px-6 xl:px-0">
        <div className="relative h-full min-w-0 flex-1 overflow-hidden">
          <span
            className={`absolute inset-0 flex items-center ${transitionClass} ${
              isAnimating ? "-translate-y-full" : "translate-y-0"
            }`}
          >
            {promoMessages[promoIndex]}
          </span>
          <span
            className={`absolute inset-0 flex items-center ${transitionClass} ${
              isAnimating ? "translate-y-0" : "translate-y-full"
            }`}
          >
            {nextMessage}
          </span>
        </div>
        <div className="flex items-center space-x-6 text-sm">
          <Button variant="ghost" size="sm" className="h-auto p-0 hover:bg-transparent text-white">
            Gift Certificates
          </Button>
          <div className="h-4 w-px bg-border"></div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-auto p-0 hover:bg-transparent text-white">
                My Account
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Orders</DropdownMenuItem>
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <div className="h-4 w-px bg-border"></div>
          {mounted && (
            <Button
              variant="ghost"
              size="icon"
              className="group relative rounded-full hidden md:flex p-0 text-white"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            >
              <Moon
                className={`absolute h-5 w-5 transition-all ${
                  theme === "dark" ? "scale-100 opacity-100" : "scale-0 opacity-0"
                }`}
                aria-hidden="true"
              />
              <Sun
                className={`h-5 w-5 transition-all ${
                  theme === "dark" ? "scale-0 opacity-0" : "scale-100 opacity-100"
                }`}
                aria-hidden="true"
              />
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
