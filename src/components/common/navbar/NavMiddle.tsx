import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Menu,
  MapPin,
  MessageCircle,
  User,
  ListTree,
  Globe,
  PlusCircle,
} from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const NavMiddle = () => {
  return (
    <div className="text-white">
      <div className="custom-width mx-auto flex items-center justify-between py-4 px-5">
        {/* Logo */}
        <Link href="/">
          <Image
            src="/logo.png"
            alt="ALL PRICE BD"
            width={100}
            height={20}
            className="h-10 md:h-20 w-auto"
          />
        </Link>

        {/* Desktop Primary Actions */}
        <div className="hidden lg:flex flex-1 items-center gap-6">
          <div className="flex flex-1 items-center justify-center gap-3">
            <Link
              href="/all-ads"
              className="group flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/20"
            >
              <ListTree className="h-4 w-4 text-white/80" />
              <span>Browse listings</span>
            </Link>
            <button
              className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/20"
              type="button"
            >
              <MapPin className="h-4 w-4 text-white/80" />
              <span>All Bangladesh</span>
            </button>
            <Link
              href="/language"
              className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/20"
            >
              <Globe className="h-4 w-4 text-white/80" />
              <span>বাংলা</span>
            </Link>
          </div>
        </div>

        {/* Desktop Utility Links */}
        <div className="hidden lg:flex items-center gap-3 text-sm">
          <Link
            href="/chat"
            className="flex items-center gap-2 rounded-full px-4 py-2 transition hover:bg-white/15"
          >
            <MessageCircle className="h-4 w-4" />
            <span>Inbox</span>
          </Link>
          <Link
            href="/account"
            className="flex items-center gap-2 rounded-full px-4 py-2 transition hover:bg-white/15"
          >
            <User className="h-4 w-4" />
            <span>Dashboard</span>
          </Link>
          <Button
            size="sm"
            className="flex items-center gap-2 rounded-full bg-linear-to-r from-pink-400 to-orange-500 px-5 py-4.5 text-sm font-semibold text-white hover:from-pink-300 hover:to-orange-400"
          >
            <PlusCircle className="h-4 w-4" />
            Post Add Free
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="border-white/30 bg-white/10 text-white hover:bg-white/20 rounded-full"
              >
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="w-[320px] border-white/20 bg-primary/95 p-0 text-white"
            >
              <SheetHeader className="px-6 py-4">
                <SheetTitle className="flex items-center">
                  <Link href="/" className="inline-flex">
                    <Image
                      src="/logo.png"
                      alt="e-market logo"
                      width={80}
                      height={20}
                    />
                  </Link>
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-1 flex-col">
                <div className="flex flex-col gap-5 px-6 py-6">
                  <div className="rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white">
                    <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/85">
                      Marketplace
                    </p>
                    <p>Connect with buyers & sellers near you.</p>
                  </div>

                  <Link
                    href="/ads"
                    className="flex items-center gap-3 rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-base font-semibold transition hover:bg-white/15"
                  >
                    <ListTree className="h-5 w-5 text-white/80" />
                    Explore listings
                  </Link>

                  <button
                    type="button"
                    className="flex items-center justify-between rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm font-semibold text-white"
                  >
                    <span className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-white/80" />
                      All Bangladesh
                    </span>
                    <span className="text-xs text-white/70">Change</span>
                  </button>

                  <Link
                    href="/language"
                    className="flex items-center gap-3 rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/15"
                  >
                    <Globe className="h-4 w-4 text-white/80" />
                    বাংলা
                  </Link>

                  <div className="grid grid-cols-2 gap-3">
                    <Link
                      href="/chat"
                      className="flex items-center gap-2 rounded-xl border border-white/20 px-4 py-3 text-sm transition hover:bg-white/15"
                    >
                      <MessageCircle className="h-4 w-4" />
                      Inbox
                    </Link>
                    <Link
                      href="/account"
                      className="flex items-center gap-2 rounded-xl border border-white/20 px-4 py-3 text-sm transition hover:bg-white/15"
                    >
                      <User className="h-4 w-4" />
                      Dashboard
                    </Link>
                  </div>
                </div>
                <div className="mt-auto border-t border-border px-6 py-6">
                  <Button className="w-full gap-2 rounded-full bg-linear-to-r from-pink-400 to-orange-500 text-base font-semibold text-white shadow-lg hover:from-pink-300 hover:to-orange-400">
                    <PlusCircle className="h-5 w-5" />
                    Post Add Free
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
};

export default NavMiddle;
