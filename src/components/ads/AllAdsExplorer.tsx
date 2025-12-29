'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ListTree, Search, Grid3X3, List, Heart } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  sortOptions as defaultSortOptions,
  locationOptions as defaultLocationOptions,
} from '@/components/ads/filters';

const Filters = dynamic(() => import('@/components/ads/filters'), {
  ssr: false,
});

type Option = { value: string; label: string };

type Props = {
  listings: {
    id: string;
    title: string;
    price: string;
    location: string;
    postedAt: string;
    imageUrl: string;
    isFeatured?: boolean;
    isUrgent?: boolean;
  }[];
  sortOptions?: Option[];
  locationOptions?: Option[];
};

export default function AllAdsExplorer({
  listings,
  sortOptions = defaultSortOptions,
  locationOptions = defaultLocationOptions,
}: Props) {
  return (
    <section>
      <div className="mb-6 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold text-foreground">
            Buy & Sell Anything in Bangladesh
          </h1>
          <p className="text-sm text-muted-foreground">
            Showing {listings.length} curated ads — refine filters to discover
            more deals tailored to you.
          </p>
        </div>
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <ListTree className="h-4 w-4" />
          <span>Browse by category or location</span>
        </div>
      </div>

      <Tabs defaultValue="list" className="w-full">
        <TabsList className="grid w-full max-w-[400px] grid-cols-2 mb-4">
          <TabsTrigger value="list" className="flex items-center gap-2">
            <List className="h-4 w-4" />
            List View
          </TabsTrigger>
          <TabsTrigger value="grid" className="flex items-center gap-2">
            <Grid3X3 className="h-4 w-4" />
            Grid View
          </TabsTrigger>
        </TabsList>

        <div className="flex flex-col gap-4 bg-background/80">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <span className="text-foreground">Sort by:</span>
              <Select defaultValue={sortOptions[0]?.value ?? 'newest'}>
                <SelectTrigger className="h-9 min-w-[200px] rounded-full border-border/40 bg-background text-sm">
                  <SelectValue placeholder="Select order" />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex w-full flex-1 flex-wrap items-center gap-3 lg:justify-end">
              <Select defaultValue={locationOptions[0]?.value ?? 'dhaka'}>
                <SelectTrigger className="h-10 min-w-40 rounded-full border-border/40 bg-background text-sm">
                  <SelectValue placeholder="Select city" />
                </SelectTrigger>
                <SelectContent>
                  {locationOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="relative flex-1 min-w-48">
                <Input
                  placeholder="What are you looking for?"
                  className="h-10 rounded-full border-border/40 bg-background pl-5 pr-12 text-sm"
                />
                <Button
                  size="icon"
                  className="absolute right-1 top-1 h-8 w-8 rounded-full bg-primary text-primary-foreground shadow"
                >
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
            {/* Mobile Filter Button */}
            <div className="lg:hidden">
              <Filters showAsSheet={true} />
            </div>

            {/* Filter */}
            <div className="hidden lg:block">
              <Filters />
            </div>

            {/* Ads */}
            <TabsContent value="list" className="order-1 space-y-6 lg:order-2">
              <div className="grid gap-4 grid-cols-1">
                {listings.map(listing => (
                  <article
                    key={listing.id}
                    className="group relative overflow-hidden rounded-2xl border border-border/40 bg-background/90 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                  >
                    <Link href={`/ads/apple-iphone-14`} className="flex h-full">
                      <div className="relative w-32 h-32 shrink-0 overflow-hidden rounded-l-2xl">
                        <Image
                          src={listing.imageUrl}
                          alt={listing.title}
                          fill
                          className="object-cover transition duration-300 group-hover:scale-105"
                          sizes="128px"
                        />
                        <div className="absolute left-2 top-2 flex gap-1">
                          {listing.isFeatured ? (
                            <Badge className="rounded-full bg-amber-500 text-white text-xs px-2 py-0.5">
                              Featured
                            </Badge>
                          ) : null}
                          {listing.isUrgent ? (
                            <Badge className="rounded-full bg-red-500 text-white text-xs px-2 py-0.5">
                              Urgent
                            </Badge>
                          ) : null}
                        </div>
                      </div>
                      <div className="flex flex-1 flex-col justify-between p-4">
                        <div className="space-y-1">
                          <h3 className="line-clamp-2 text-base font-semibold text-foreground">
                            {listing.title}
                          </h3>
                          <p className="text-lg font-bold text-primary">
                            {listing.price}
                          </p>
                        </div>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <p className="flex items-center gap-2">
                            <span className="inline-flex h-2 w-2 rounded-full bg-primary" />
                            {listing.location}
                          </p>
                          <p className="text-muted-foreground/80">
                            Posted {listing.postedAt}
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full border border-border/40 bg-background/80 text-muted-foreground shadow-sm transition hover:text-primary"
                      >
                        <Heart className="h-4 w-4" />
                      </button>
                    </Link>
                  </article>
                ))}
              </div>

              <Card className="border-border/40 bg-background/90">
                <CardContent className="flex flex-col items-center justify-between gap-4 py-6 text-sm text-muted-foreground sm:flex-row">
                  <span>Didn&apos;t find what you&apos;re looking for?</span>
                  <Link href="/ads/create">
                    <Button className="rounded-full bg-primary text-primary-foreground">
                      Post an ad for free
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Grid View */}
            <TabsContent value="grid" className="order-1 space-y-6 lg:order-2">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {listings.map(listing => (
                  <article
                    key={listing.id}
                    className="group relative overflow-hidden rounded-3xl border border-border/40 bg-background/90 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                  >
                    <Link
                      href={`/ads/${listing.id}`}
                      className="flex h-full flex-col"
                    >
                      <div className="relative aspect-4/3 overflow-hidden">
                        <Image
                          src={listing.imageUrl}
                          alt={listing.title}
                          fill
                          className="object-cover transition duration-300 group-hover:scale-105"
                          sizes="(min-width: 1024px) 320px, (min-width: 768px) 45vw, 90vw"
                        />
                        <div className="absolute left-4 top-4 flex gap-2">
                          {listing.isFeatured ? (
                            <Badge className="rounded-full bg-amber-500 text-white">
                              Featured
                            </Badge>
                          ) : null}
                          {listing.isUrgent ? (
                            <Badge className="rounded-full bg-red-500 text-white">
                              Urgent
                            </Badge>
                          ) : null}
                        </div>
                        <button
                          type="button"
                          className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full border border-border/40 bg-background/80 text-muted-foreground shadow-sm transition hover:text-primary"
                        >
                          <Heart className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="flex flex-1 flex-col gap-3 p-5">
                        <div className="space-y-1">
                          <h3 className="line-clamp-2 text-base font-semibold text-foreground">
                            {listing.title}
                          </h3>
                          <p className="text-sm font-bold text-primary">
                            {listing.price}
                          </p>
                        </div>
                        <div className="mt-auto space-y-1 text-xs text-muted-foreground">
                          <p className="flex items-center gap-2">
                            <span className="inline-flex h-2 w-2 rounded-full bg-primary" />
                            {listing.location}
                          </p>
                          <p className="text-muted-foreground/80">
                            Posted {listing.postedAt}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            </TabsContent>
          </div>
        </div>
      </Tabs>

      <section className="grid gap-6 rounded-3xl border border-border/30 bg-background/60 p-8 text-sm text-muted-foreground md:grid-cols-3 mt-6">
        <div className="space-y-3">
          <h2 className="text-base font-semibold text-foreground">
            Why sell with Recycle Mart?
          </h2>
          <p>
            Reach millions of verified buyers across Bangladesh with simple
            listing tools and trusted support.
          </p>
        </div>
        <div className="space-y-3">
          <h2 className="text-base font-semibold text-foreground">
            Secure transactions
          </h2>
          <p>
            Avoid scams with safety tips, verified sellers, and our dedicated
            customer care team.
          </p>
        </div>
        <div className="space-y-3">
          <h2 className="text-base font-semibold text-foreground">
            Need help?
          </h2>
          <p>
            Call us at{' '}
            <span className="font-semibold text-primary">01302-000000</span> or
            email support@allpricebd.com.
          </p>
        </div>
      </section>
    </section>
  );
}
