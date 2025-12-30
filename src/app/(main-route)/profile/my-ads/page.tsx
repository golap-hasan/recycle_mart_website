import { BarChart3, CalendarClock, Plus, RefreshCw } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ListingCard, { type ListingCardProps } from "@/components/ads/ListingCard";
import { ProfilePageHeader } from "@/components/profile/ProfilePageHeader";

const activeAds: ListingCardProps[] = [
  {
    id: "bike-helmet-premium",
    title: "Premium Bike Helmet with Bluetooth",
    price: "৳4,800",
    location: "Mirpur, Dhaka",
    postedAt: "2 hours ago",
    imageUrl: "https://images.pexels.com/photos/6964072/pexels-photo-6964072.jpeg",
    isFeatured: true,
  },
  {
    id: "gaming-laptop-legion",
    title: "Lenovo Legion 5 RTX 3060 16GB RAM",
    price: "৳125,000",
    location: "Banani, Dhaka",
    postedAt: "6 hours ago",
    imageUrl: "https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg",
    isUrgent: true,
  },
  {
    id: "family-suv-xtrail",
    title: "Nissan X-Trail 2018 Reconditioned",
    price: "৳3,450,000",
    location: "Agrabad, Chattogram",
    postedAt: "1 day ago",
    imageUrl: "https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg",
    isFeatured: true,
  },
  {
    id: "dslr-canon-90d",
    title: "Canon 90D DSLR Body + 18-135mm Lens",
    price: "৳110,000",
    location: "Dhanmondi, Dhaka",
    postedAt: "2 days ago",
    imageUrl: "https://images.pexels.com/photos/2880569/pexels-photo-2880569.jpeg",
  },
  {
    id: "smart-tv-samsung",
    title: "Samsung 55\" QLED Smart TV (2023)",
    price: "৳95,000",
    location: "Jamal Khan, Chattogram",
    postedAt: "3 days ago",
    imageUrl: "https://images.pexels.com/photos/8452646/pexels-photo-8452646.jpeg",
  },
  {
    id: "iphone-14-pro",
    title: "iPhone 14 Pro Max Deep Purple 256GB",
    price: "৳148,000",
    location: "Gulshan 2, Dhaka",
    postedAt: "5 days ago",
    imageUrl: "https://images.pexels.com/photos/5081393/pexels-photo-5081393.jpeg",
  },
];

const adMetrics = [
  {
    label: "Total views (30d)",
    value: "42,800",
    change: "+12% vs last month",
    icon: BarChart3,
  },
  {
    label: "Leads received",
    value: "326",
    change: "+18 new this week",
    icon: RefreshCw,
  },
  {
    label: "Ads expiring soon",
    value: "3",
    change: "Extend in 2 days",
    icon: CalendarClock,
  },
];

export default function MyAdsPage() {
  return (
    <div className="space-y-6">
      <ProfilePageHeader
        title="Manage your ads"
        description="Track performance, renew listings, and promote your ads for maximum visibility."
        actions={
          <div className="flex flex-wrap items-center gap-2">
            <Button variant="outline" size="sm" className="rounded-full">
              <RefreshCw className="mr-2 h-4 w-4" /> Refresh all ads
            </Button>
            <Button size="sm" className="rounded-full">
              <Plus className="mr-2 h-4 w-4" /> Post new ad
            </Button>
          </div>
        }
      />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {adMetrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <Card key={metric.label} className="border-border/60 bg-card/95 shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{metric.label}</CardTitle>
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </span>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-semibold text-foreground">{metric.value}</p>
                <p className="text-xs text-muted-foreground">{metric.change}</p>
              </CardContent>
            </Card>
          );
        })}
      </section>

      <Tabs defaultValue="active" className="space-y-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <TabsList>
            <TabsTrigger value="active">Active ({activeAds.length})</TabsTrigger>
            <TabsTrigger value="drafts">Drafts</TabsTrigger>
            <TabsTrigger value="archived">Archived</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="active" className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {activeAds.map((ad) => (
              <ListingCard key={ad.id} {...ad} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="drafts" className="space-y-4">
          <Card className="border-dashed border-border/60 bg-card/95 text-center shadow-none">
            <CardHeader>
              <CardTitle className="text-base font-semibold text-muted-foreground">No drafts saved</CardTitle>
              <CardDescription>Create a new ad and save it as draft to publish later.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="rounded-full">Start a draft</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="archived" className="space-y-4">
          <Card className="border-dashed border-border/60 bg-card/95 shadow-none">
            <CardHeader>
              <CardTitle className="text-base font-semibold text-muted-foreground">Archived ads</CardTitle>
              <CardDescription>
                Expired and deleted ads will appear here. Restore an ad to republish quickly.
              </CardDescription>
            </CardHeader>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}