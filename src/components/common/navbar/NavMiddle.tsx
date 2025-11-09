import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Menu, Lock, Truck, Phone } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const navLinks = [
  { href: "/", label: "HOME" },
  { href: "/layout", label: "LAYOUT" },
  { href: "/features", label: "FEATURES" },
  { href: "/daily-deals", label: "DAILY DEALS" },
  { href: "/blog", label: "BLOG" },
  { href: "/pages", label: "PAGES" },
];

const NavMiddle = () => {
  return (
    <div>
      <div className="custom-width mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo */}
        <Link href="/">
          <Image src="/logo.png" alt="e-market logo" width={150} height={40} />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Utility Links */}
        <div className="hidden lg:flex items-center gap-4 text-xs text-muted-foreground">
          <Link href="/auth" className="flex items-center gap-2 hover:text-primary">
            <Lock size={14} />
            <span>Sign in or Register</span>
          </Link>
          <Link href="/track-order" className="hidden xl:flex items-center gap-2 hover:text-primary">
            <Truck size={14} />
            <span>Track your order</span>
          </Link>
          <div className="hidden xl:flex items-center gap-2 hover:text-primary">
            <Phone size={14} />
            <span>Hotline: (+84)985 432 141</span>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="border-border"
              >
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="w-[320px] border-border p-0"
            >
              <SheetHeader className="px-6 py-4">
                <SheetTitle className="flex items-center">
                  <Link href="/" className="inline-flex">
                    <Image
                      src="/logo.png"
                      alt="e-market logo"
                      width={150}
                      height={40}
                    />
                  </Link>
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-1 flex-col">
                <nav className="flex flex-col gap-3 px-6 py-6 text-base font-medium tracking-wide">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="rounded-md px-4 py-2 transition hover:bg-accent/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
                <div className="mt-auto space-y-3 border-t border-border px-6 py-6 text-sm">
                  <Link href="/auth" className="flex items-center gap-3 hover:text-primary">
                    <Lock className="h-4 w-4" />
                    <span>Sign in or Register</span>
                  </Link>
                  <Link href="/track-order" className="flex items-center gap-3 hover:text-primary">
                    <Truck className="h-4 w-4" />
                    <span>Track your order</span>
                  </Link>
                  <div className="flex items-center gap-3 text-xs uppercase tracking-wide hover:text-primary">
                    <Phone className="h-4 w-4" />
                    <span>Hotline: (+84)985 432 141</span>
                  </div>
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