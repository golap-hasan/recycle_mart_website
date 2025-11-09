"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Moon, Sun, ChevronDown } from "lucide-react";
import { useTheme } from "next-themes";
import { promoMessages } from "./shared";
import { Separator } from "@/components/ui/separator";

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
    <section className="border-b">
      {/* Mobile Top Row */}
      <div className="flex md:hidden h-10 items-center justify-end px-4 text-sm">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="text-xs">
              My Account
              <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Check Out</DropdownMenuItem>
            <DropdownMenuItem>Sign In</DropdownMenuItem>
            <DropdownMenuItem>Register</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {mounted && (
          <Button
            variant="ghost"
            size="icon"
            className="group relative rounded-full h-6 w-6"
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
      <div className="custom-width mx-auto hidden md:flex h-9 text-sm items-center justify-between px-6">
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

        <div className="flex h-5 items-center space-x-4 text-sm">
          <Button variant="ghost" size="sm" className="tracking-widest text-xs">
            GIFT CERTIFICATES
          </Button>
          <Separator orientation="vertical" />
          {/* <div className="h-4 w-px bg-border"></div> */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="tracking-widest text-xs"
              >
                MY ACCOUNT
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Check Out</DropdownMenuItem>
              <DropdownMenuItem>Sign In</DropdownMenuItem>
              <DropdownMenuItem>Register</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          {/* <div className="h-4 w-px bg-border"></div> */}
          <Separator orientation="vertical" />
          {mounted && (
            <Button
              variant="ghost"
              size="icon"
              className="group relative rounded-full h-7 w-7"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label={`Switch to ${
                theme === "dark" ? "light" : "dark"
              } mode`}
            >
              <Moon
                className={`absolute h-5 w-5 transition-all ${
                  theme === "dark"
                    ? "scale-100 opacity-100"
                    : "scale-0 opacity-0"
                }`}
                aria-hidden="true"
              />
              <Sun
                className={`h-5 w-5 transition-all ${
                  theme === "dark"
                    ? "scale-0 opacity-0"
                    : "scale-100 opacity-100"
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
