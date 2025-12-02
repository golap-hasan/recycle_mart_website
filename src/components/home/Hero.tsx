"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles, Zap, ShieldCheck } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const heroSlides = [
  {
    id: 1,
    href: "/ads/featured",
    imageSrc: "https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg?auto=compress&cs=tinysrgb&w=1600",
    title: "Find Your Dream Ride",
    description: "Explore thousands of verified vehicles at unbeatable prices.",
    cta: "Browse Cars",
    badge: "Featured",
    badgeColor: "bg-amber-500",
  },
  {
    id: 2,
    href: "/ads/electronics",
    imageSrc: "https://images.pexels.com/photos/5082579/pexels-photo-5082579.jpeg?auto=compress&cs=tinysrgb&w=1600",
    title: "Latest Mobile Gadgets",
    description: "Explore the newest smartphones and accessories from top brands.",
    cta: "Shop Mobile Gadgets",
    badge: "New Arrivals",
    badgeColor: "bg-blue-500",
  },
  {
    id: 3,
    href: "/ads/property",
    imageSrc: "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1600",
    title: "Prime Properties",
    description: "Discover the best homes and commercial spaces near you.",
    cta: "View Properties",
    badge: "Hot Deals",
    badgeColor: "bg-rose-500",
  },
] as const;

const Hero = () => {
  const [carouselApi, setCarouselApi] = React.useState<CarouselApi | null>(null);
  const autoplayRef = React.useRef<ReturnType<typeof setInterval> | null>(null);

  const stopAutoplay = React.useCallback(() => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    }
  }, []);

  const startAutoplay = React.useCallback(() => {
    stopAutoplay();
    if (!carouselApi) return;
    autoplayRef.current = setInterval(() => {
      if (!carouselApi) return;
      if (carouselApi.canScrollNext()) {
        carouselApi.scrollNext();
      } else {
        carouselApi.scrollTo(0);
      }
    }, 5000);
  }, [carouselApi, stopAutoplay]);

  React.useEffect(() => {
    if (!carouselApi) return;
    startAutoplay();
    return () => stopAutoplay();
  }, [carouselApi, startAutoplay, stopAutoplay]);

  return (
    <section className="relative py-6">
      <div className="grid gap-6 lg:grid-cols-[1fr_300px] h-[500px] lg:h-[600px]">
        {/* Main Carousel */}
        <div className="relative overflow-hidden rounded-3xl shadow-2xl">
          <Carousel
            className="w-full h-full"
            setApi={setCarouselApi}
            onMouseEnter={stopAutoplay}
            onFocusCapture={stopAutoplay}
            onMouseLeave={startAutoplay}
            onBlurCapture={startAutoplay}
          >
            <CarouselContent className="ml-0">
              {heroSlides.map((slide) => (
                <CarouselItem key={slide.id} className="pl-0 h-full relative group">
                  <Link href={slide.href} className="block h-[600px] w-full relative">
                    <Image
                      src={slide.imageSrc}
                      alt={slide.title}
                      fill
                      className="object-cover"
                      priority={slide.id === 1}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full md:w-2/3 space-y-4">
                      <Badge className={`${slide.badgeColor} text-white border-none px-3 py-1 text-sm`}>{slide.badge}</Badge>
                      <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight">
                        {slide.title}
                      </h2>
                      <p className="text-lg text-gray-200 line-clamp-2">{slide.description}</p>
                      <Button size="lg" className="rounded-full gap-2 mt-4 bg-white text-black hover:bg-gray-100 border-none">
                        {slide.cta} <ArrowRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>

        {/* Side Banners */}
        <div className="hidden lg:flex flex-col gap-6 h-full">
          <Link href="/ads?verified=true" className="relative flex-1 overflow-hidden rounded-3xl bg-orange-50 group shadow-lg">
            <div className="absolute inset-0 p-6 flex flex-col justify-between z-10">
              <div>
                <span className="inline-flex p-2 rounded-full bg-orange-100 text-orange-600 mb-3">
                  <ShieldCheck className="w-5 h-5" />
                </span>
                <h3 className="text-xl font-bold text-gray-900">Verified Sellers</h3>
                <p className="text-sm text-gray-600 mt-1">Shop with confidence.</p>
              </div>
              <div className="flex items-center text-sm font-medium text-orange-600 group-hover:translate-x-1 transition-transform">
                Learn more <ArrowRight className="w-4 h-4 ml-1" />
              </div>
            </div>
            <div className="absolute right-0 bottom-0 w-32 h-32 bg-orange-200/50 rounded-full blur-3xl -mr-10 -mb-10" />
            <Image
              src="https://images.pexels.com/photos/4467687/pexels-photo-4467687.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Safety"
              fill
              className="object-cover opacity-10 group-hover:opacity-20 transition-opacity"
            />
          </Link>

          <Link href="/ads?urgent=true" className="relative flex-1 overflow-hidden rounded-3xl bg-purple-50 group shadow-lg">
            <div className="absolute inset-0 p-6 flex flex-col justify-between z-10">
              <div>
                <span className="inline-flex p-2 rounded-full bg-purple-100 text-purple-600 mb-3">
                  <Zap className="w-5 h-5" />
                </span>
                <h3 className="text-xl font-bold text-gray-900">Urgent Sales</h3>
                <p className="text-sm text-gray-600 mt-1">Grab deals before they're gone.</p>
              </div>
              <div className="flex items-center text-sm font-medium text-purple-600 group-hover:translate-x-1 transition-transform">
                View Deals <ArrowRight className="w-4 h-4 ml-1" />
              </div>
            </div>
            <div className="absolute right-0 bottom-0 w-32 h-32 bg-purple-200/50 rounded-full blur-3xl -mr-10 -mb-10" />
            <Image
              src="https://images.pexels.com/photos/6214476/pexels-photo-6214476.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Urgent"
              fill
              className="object-cover opacity-10 group-hover:opacity-20 transition-opacity"
            />
          </Link>

          <Link href="/ads?premium=true" className="relative flex-1 overflow-hidden rounded-3xl bg-emerald-50 group shadow-lg">
            <div className="absolute inset-0 p-6 flex flex-col justify-between z-10">
              <div>
                <span className="inline-flex p-2 rounded-full bg-emerald-100 text-emerald-600 mb-3">
                  <Sparkles className="w-5 h-5" />
                </span>
                <h3 className="text-xl font-bold text-gray-900">Premium Ads</h3>
                <p className="text-sm text-gray-600 mt-1">Boost your ad visibility.</p>
              </div>
              <div className="flex items-center text-sm font-medium text-emerald-600 group-hover:translate-x-1 transition-transform">
                Get Premium <ArrowRight className="w-4 h-4 ml-1" />
              </div>
            </div>
            <div className="absolute right-0 bottom-0 w-32 h-32 bg-emerald-200/50 rounded-full blur-3xl -mr-10 -mb-10" />
            <Image
              src="https://images.pexels.com/photos/699459/pexels-photo-699459.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Premium"
              fill
              className="object-cover opacity-10 group-hover:opacity-20 transition-opacity"
            />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;