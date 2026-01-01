'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ListTree, Grid3X3, List, Search } from 'lucide-react';
import { AdListCard } from '@/components/ads/AdListCard';
import { AdGridCard } from '@/components/ads/AdGridCard';
import Filters from '@/components/ads/filters';

import { LocationSelector } from '@/components/ads/LocationSelector';
import { Category } from '@/types/category.type';
import { Ad, AdMeta } from '@/types/ad.type';
import { useSmartFilter } from '@/hooks/useSmartFilter';
import CustomPagination from '@/tools/CustomPagination';

type Props = {
  listings: Ad[];
  categories?: Category[];
  meta?: AdMeta;
};

export default function AllAdsExplorer({
  listings,
  categories = [],
  meta,
}: Props) {
  const { getFilter, updateFilter } = useSmartFilter();
  const currentView = getFilter('view') || 'list';

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

      <Tabs 
        value={currentView} 
        onValueChange={(val) => updateFilter('view', val)} 
        className="w-full"
      >
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
                  <AdListCard key={listing.id} ad={listing} />
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

              {/* Pagination for List View */}
              {meta && meta.totalPage > 1 && (
                <div className="mt-8 flex justify-center">
                  <CustomPagination
                    currentPage={meta.page}
                    totalPages={meta.totalPage}
                  />
                </div>
              )}
            </TabsContent>

            {/* Grid View */}
            <TabsContent value="grid" className="order-1 space-y-6 lg:order-2">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {listings.map(listing => (
                  <AdGridCard key={listing.id} ad={listing} />
                ))}
              </div>

              {/* Pagination for Grid View */}
              {meta && meta.totalPage > 1 && (
                <div className="mt-8 flex justify-center">
                  <CustomPagination
                    currentPage={meta.page}
                    totalPages={meta.totalPage}
                  />
                </div>
              )}
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
