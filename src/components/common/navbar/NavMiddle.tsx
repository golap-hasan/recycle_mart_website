'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Menu,
  MapPin,
  MessageCircle,
  User,
  ListTree,
  Globe,
  PlusCircle,
  Search,
  Heart,
  MenuIcon,
} from 'lucide-react';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useUser } from '@/context/UserContext';

const NavMiddle = () => {
  const toSlug = (value: string) =>
    value
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

  const { user } = useUser();

  const categories = [
    {
      title: 'Mobiles',
      items: ['Smartphones', 'Android Tablets', 'Wearables'],
    },
    {
      title: 'Electronics and Gadgets',
      items: ['Laptops', 'Headphones', 'Smart Home'],
    },
    {
      title: 'Vehicles',
      items: ['Cars', 'Motorcycles', 'Parts & Accessories'],
    },
    {
      title: 'Home Living',
      items: ['Furniture', 'Kitchen & Dining', 'Decor'],
    },
    {
      title: 'Property',
      items: ['Apartments', 'Commercial Space', 'Land'],
    },
    {
      title: 'Others',
      items: [
        'Air Conditioners',
        'Refrigerators',
        'Washing Machines',
        'Microwaves',
      ],
    },
  ];

  return (
    <div className="text-white">
      <div className="container mx-auto flex items-center justify-between py-4 px-5">
        {/* Logo */}
        <Link href="/">
          <Image
            src="/logo.png"
            alt="Recycle Mart"
            width={100}
            height={20}
            className="h-10 md:h-20 w-auto"
          />
        </Link>

        {/* Desktop Primary Actions */}
        <div className="hidden lg:flex flex-1 items-center gap-6">
          <div className="flex flex-1 items-center justify-center gap-3">
            <Link
              href="/ads"
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
            href={user ? '/chat' : '/auth/login'}
            className="flex items-center gap-2 rounded-full px-4 py-2 transition hover:bg-white/15"
          >
            <MessageCircle className="h-4 w-4" />
            <span>Inbox</span>
          </Link>
          <Link
            href={user ? '/profile' : '/auth/login'}
            className="flex items-center gap-2 rounded-full px-4 py-2 transition hover:bg-white/15"
          >
            <User className="h-4 w-4" />
            <span>Dashboard</span>
          </Link>
          <Link href={user ? '/ads/create' : '/auth/login'}>
            <Button
              size="sm"
              className="flex items-center gap-2 rounded-full bg-linear-to-r from-pink-400 to-orange-500 px-5 py-4.5 text-sm font-semibold text-white hover:from-pink-300 hover:to-orange-400"
            >
              <PlusCircle className="h-4 w-4" />
              Post an Ad for Free
            </Button>
          </Link>
        </div>

        {/* Mobile & Tablet View */}
        <div className="flex items-center gap-2 lg:hidden">
          {/* Categories Menu (Mobile) */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="border-white/30 bg-white/10 text-white hover:bg-white/20 rounded-full"
              >
                <MenuIcon className="h-5 w-5" />
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
                  {categories.map(category => (
                    <div key={category.title} className="space-y-2">
                      <Link
                        href={`/ads?category=${toSlug(category.title)}`}
                        className="block font-semibold"
                      >
                        {category.title}
                      </Link>
                      <div className="flex flex-wrap gap-2 text-white/80">
                        {category.items.map(item => (
                          <Link
                            key={item}
                            href={`/ads?category=${toSlug(item)}`}
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

          {/* Search Button (Mobile only) */}
          <Sheet>
            <SheetTitle className="sr-only">Search</SheetTitle>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="md:hidden border-white/30 bg-white/10 text-white hover:bg-white/20 rounded-full"
              >
                <Search className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent
              showClose={false}
              side="top"
              className="border-white/20 bg-primary/95 text-white p-4"
            >
              <div className="relative w-full">
                <Input
                  type="search"
                  placeholder="Search marketplace..."
                  className="rounded-full border-white/30 bg-white/10 pr-12 text-sm font-medium text-white placeholder:text-white/70"
                />
              </div>
            </SheetContent>
          </Sheet>

          {/* Search Bar (Tablet) */}
          <div className="hidden md:flex flex-1 mx-3 max-w-md">
            <div className="relative w-full">
              <Input
                type="search"
                placeholder="Search marketplace..."
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

          {/* Favorites Button */}
          <Link href="/profile/favourites">
            <Button
              size="icon"
              className="flex items-center gap-2 rounded-full bg-white/20 px-3 py-2 text-sm font-semibold text-white shadow transition hover:bg-white/30"
            >
              <Heart className="h-4 w-4" />
              <span className="hidden sm:inline">Saved</span>
            </Button>
          </Link>

          {/* Main Menu (Mobile) */}
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
              side="right"
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
