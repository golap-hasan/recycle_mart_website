import { Bell, Heart, Megaphone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ProfilePageHeader } from "@/components/profile/ProfilePageHeader";

const stats = [
  {
    label: "Active Ads",
    value: "12",
    change: "+3 this week",
    icon: Megaphone,
  },
  {
    label: "Saved Ads",
    value: "28",
    change: "5 new",
    icon: Heart,
  },
  {
    label: "Alerts",
    value: "4",
    change: "2 unread",
    icon: Bell,
  },
];

// const recentActivity = [
//   {
//     title: "Bike Helmet added to favourites",
//     meta: "Today at 10:45 AM",
//     badge: "Favourite",
//   },
//   {
//     title: "Gaming Laptop ad boosted",
//     meta: "Yesterday at 6:12 PM",
//     badge: "Promotion",
//   },
//   {
//     title: "Alert matched: iPhone 14 Pro",
//     meta: "Yesterday at 9:20 AM",
//     badge: "Alert",
//   },
// ];

export default function ProfileDashboardPage() {
  return (
    <div className="space-y-6">
      <ProfilePageHeader
        title="Welcome back"
        description="Track your ads, favourites, alerts and account performance in one place."
      />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {stats.map((item) => {
          const Icon = item.icon;
          return (
            <Card key={item.label} className="border-border/60 bg-card/95 shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{item.label}</CardTitle>
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </span>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-semibold text-foreground">{item.value}</p>
                <p className="text-xs text-muted-foreground">{item.change}</p>
              </CardContent>
            </Card>
          );
        })}
      </section>

      <section className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <Card className="border-border/60 bg-card/95 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center justify-between text-base font-semibold">
              Profile completion
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                80% complete
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Progress value={80} className="h-2" />
            </div>
            <div className="grid gap-3 text-sm text-muted-foreground">
              <div className="flex items-center justify-between">
                <span>Verify phone number</span>
                <Badge variant="outline" className="border-emerald-300 text-emerald-700 dark:border-emerald-500/60 dark:text-emerald-300">
                  Done
                </Badge>
              </div>
              <Separator className="bg-border/60" />
              <div className="flex items-center justify-between">
                <span>Add payment method</span>
                <Badge variant="outline" className="border-amber-300 text-amber-600 dark:border-amber-400/60 dark:text-amber-200">
                  Pending
                </Badge>
              </div>
              <Separator className="bg-border/60" />
              <div className="flex items-center justify-between">
                <span>Post your first ad</span>
                <Badge variant="outline" className="border-primary/40 text-primary">
                  In progress
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/60 bg-primary/5 shadow-sm dark:bg-primary/10">
          <CardHeader className="space-y-3">
            <CardTitle className="text-base font-semibold text-primary dark:text-primary-foreground/90">
              Boost your ads and reach more buyers
            </CardTitle>
            <p className="text-sm text-primary/80 dark:text-primary-foreground/75">
              Featured listings get 5x more views. Promote your best ads to stay ahead of the competition.
            </p>
          </CardHeader>
          <CardContent>
            <Button className="w-full rounded-full" variant="default">
              Explore promotion plans
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* <Card className="border-border/60 bg-card/95 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base font-semibold">
            <TrendingUp className="h-4 w-4 text-primary" /> Recent activity
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {recentActivity.map((item) => (
            <div key={item.title} className="flex flex-col gap-1 rounded-xl border border-border/40 bg-muted/30 p-4 text-sm dark:bg-muted/20">
              <div className="flex items-center justify-between">
                <p className="font-medium text-foreground">{item.title}</p>
                <Badge variant="outline" className="border-primary/40 text-primary">
                  {item.badge}
                </Badge>
              </div>
              <span className="text-xs text-muted-foreground">{item.meta}</span>
            </div>
          ))}
        </CardContent>
      </Card> */}
    </div>
  );
}