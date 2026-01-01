'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ListTree, Grid3X3, List, Heart, Search } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { type FiltersProps } from '@/components/ads/filters';

const Filters = dynamic<FiltersProps>(() => import('@/components/ads/filters'), {
  ssr: false,
});

import { LocationSelector } from '@/components/ads/LocationSelector';
import { Category } from '@/types/category.type';
import { Ad } from '@/types/ad.type';
import { timeAgo } from '@/lib/utils';
import { useSmartFilter } from '@/hooks/useSmartFilter';

type Props = {
  listings: Ad[];
  categories?: Category[];
};

export default function AllAdsExplorer({
  listings,
  categories = [],
}: Props) {
  const { getFilter, updateFilter } = useSmartFilter();

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
        <TabsList className="grid w-full max-w-[400px] grid-cols-2 mb-4 rounded-full">
          <TabsTrigger value="list" className="flex items-center gap-2 rounded-full">
            <List className="h-4 w-4" />
            List View
          </TabsTrigger>
          <TabsTrigger value="grid" className="flex items-center gap-2 rounded-full">
            <Grid3X3 className="h-4 w-4" />
            Grid View
          </TabsTrigger>
        </TabsList>

        <div className="flex flex-col gap-4 bg-background/80">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex w-full flex-1 flex-wrap items-center gap-3 lg:justify-end">
              {/* Location Selector */}
              <LocationSelector />

              <div className="relative flex-1 min-w-48">
                <Input
                  placeholder="What are you looking for?"
                  defaultValue={getFilter('searchTerm')}
                  onChange={(e) => updateFilter('searchTerm', e.target.value, 500)}
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
              <Filters showAsSheet={true} categories={categories} />
            </div>

            {/* Filter */}
            <div className="hidden lg:block border-r border-border/40 pr-6">
              <Filters categories={categories} />
            </div>

            {/* Ads */}
            <TabsContent value="list" className="order-1 space-y-6 lg:order-2">
              <div className="grid gap-4 grid-cols-1">
                {listings.map(listing => (
                  <article
                    key={listing.id}
                    className="group relative overflow-hidden rounded-2xl border border-border/40 bg-background/90 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                  >
                    <Link href={`/ads/${listing.id}`} className="flex h-full">
                      <div className="relative w-32 h-32 shrink-0 overflow-hidden rounded-l-2xl">
                        <Image
                          src={listing.coverImage || "/placeholder-image.png"}
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
                            ৳ {listing.price.toLocaleString()}
                          </p>
                        </div>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <p className="flex items-center gap-2">
                            <span className="inline-flex h-2 w-2 rounded-full bg-primary" />
                            {listing.location}
                          </p>
                          <p className="text-muted-foreground/80">
                            Posted {timeAgo(listing.postedAt)}
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
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
                          src={listing.coverImage || "/placeholder-image.png"}
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
                            ৳ {listing.price.toLocaleString()}
                          </p>
                        </div>
                        <div className="mt-auto space-y-1 text-xs text-muted-foreground">
                          <p className="flex items-center gap-2">
                            <span className="inline-flex h-2 w-2 rounded-full bg-primary" />
                            {listing.location}
                          </p>
                          <p className="text-muted-foreground/80">
                            Posted {timeAgo(listing.postedAt)}
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
