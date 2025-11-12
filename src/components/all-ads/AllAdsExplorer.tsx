"use client";

import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Bookmark, FilterIcon, ListTree, Search } from "lucide-react";
import ListingCard, { ListingCardProps } from "@/components/all-ads/listing-card";

const Filters = dynamic(() => import("@/components/all-ads/filters"), { ssr: true });

type Option = { value: string; label: string };

type Props = {
  listings: ListingCardProps[];
  sortOptions: Option[];
  locationOptions: Option[];
};

export default function AllAdsExplorer({ listings, sortOptions, locationOptions }: Props) {
  return (
    <section className="container custom-width mx-auto space-y-8 px-6 py-10">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold text-foreground">Buy & Sell Anything in Bangladesh</h1>
          <p className="text-sm text-muted-foreground">
            Showing {listings.length} curated ads — refine filters to discover more deals tailored to you.
          </p>
        </div>
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <ListTree className="h-4 w-4" />
          <span>Browse by category or location</span>
        </div>
      </div>

      <Tabs defaultValue="list" className="w-full">
        <div className="flex flex-col gap-4 rounded-3xl border border-border/30 bg-background/80 p-6 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <span className="text-foreground">Sort by:</span>
              <Select defaultValue={sortOptions[0]?.value ?? "newest"}>
                <SelectTrigger className="h-9 min-w-[200px] rounded-full border-border/40 bg-background text-sm">
                  <SelectValue placeholder="Select order" />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex w-full flex-1 flex-wrap items-center gap-3 lg:justify-end">
              <Select defaultValue={locationOptions[0]?.value ?? "dhaka"}>
                <SelectTrigger className="h-10 min-w-40 rounded-full border-border/40 bg-background text-sm">
                  <SelectValue placeholder="Select city" />
                </SelectTrigger>
                <SelectContent>
                  {locationOptions.map((option) => (
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
                <Button size="icon" className="absolute right-1 top-1 h-8 w-8 rounded-full bg-primary text-primary-foreground shadow">
                  <Search className="h-4 w-4" />
                </Button>
              </div>

              <Button variant="outline" className="rounded-full border-border/50 text-sm">
                <FilterIcon className="mr-2 h-4 w-4" /> All filters
              </Button>
              <Button className="rounded-full bg-primary text-primary-foreground text-sm">
                <Bookmark className="mr-2 h-4 w-4" /> Save search
              </Button>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
            <div className="order-2 lg:order-1">
              <Filters />
            </div>

            <TabsContent value="list" className="order-1 space-y-6 lg:order-2">
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {listings.map((listing) => (
                  <ListingCard key={listing.id} {...listing} />
                ))}
              </div>

              <Card className="border-border/40 bg-background/90">
                <CardContent className="flex flex-col items-center justify-between gap-4 py-6 text-sm text-muted-foreground sm:flex-row">
                  <span>Didn’t find what you’re looking for?</span>
                  <Button className="rounded-full bg-primary text-primary-foreground">Post an ad for free</Button>
                </CardContent>
              </Card>

              <div className="flex items-center justify-between rounded-full border border-border/30 bg-background/70 px-6 py-3 text-sm text-muted-foreground">
                <span>Page 1 of 24</span>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="rounded-full border-border/50">
                    Previous
                  </Button>
                  <Button size="sm" className="rounded-full bg-primary text-primary-foreground">
                    Next
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="grid" className="order-1 space-y-6 lg:order-2">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {listings.map((listing) => (
                  <ListingCard key={`${listing.id}-grid`} {...listing} />
                ))}
              </div>
            </TabsContent>
          </div>
        </div>
      </Tabs>

      <Separator className="bg-border/30" />

      <section className="grid gap-6 rounded-3xl border border-border/30 bg-background/60 p-8 text-sm text-muted-foreground md:grid-cols-3">
        <div className="space-y-3">
          <h2 className="text-base font-semibold text-foreground">Why sell with All Price BD?</h2>
          <p>Reach millions of verified buyers across Bangladesh with simple listing tools and trusted support.</p>
        </div>
        <div className="space-y-3">
          <h2 className="text-base font-semibold text-foreground">Secure transactions</h2>
          <p>Avoid scams with safety tips, verified sellers, and our dedicated customer care team.</p>
        </div>
        <div className="space-y-3">
          <h2 className="text-base font-semibold text-foreground">Need help?</h2>
          <p>
            Call us at <span className="font-semibold text-primary">01302-000000</span> or email support@allpricebd.com.
          </p>
        </div>
      </section>
    </section>
  );
}
