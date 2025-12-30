import { Check, Crown, Zap, Ticket, Loader2 } from "lucide-react";
import { format } from "date-fns";

import { ProfilePageHeader } from "@/components/profile/ProfilePageHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { fetchAllPlans, fetchMyInvoices, fetchMySubscription } from "@/services/profile";

const getPlanConfig = (name: string) => {
  switch (name.toLowerCase()) {
    case 'free':
      return { 
        icon: <Ticket className="h-6 w-6 text-slate-500" />, 
        color: "slate", 
        description: "Perfect for casual sellers getting started." 
      };
    case 'basic':
      return { 
        icon: <Zap className="h-6 w-6 text-blue-500" />, 
        color: "blue", 
        description: "Ideal for regular sellers with more items.",
      };
    case 'premium':
      return { 
        icon: <Crown className="h-6 w-6 text-amber-500" />, 
        color: "amber", 
        description: "Best for power users and small businesses.",
        popular: true 
      };
    default:
      return { 
        icon: <Zap className="h-6 w-6 text-primary" />, 
        color: "primary", 
        description: "Standard plan for growth." 
      };
  }
};

export default async function SubscriptionPage() {
  const [plansRes, mySubRes, invoicesRes] = await Promise.all([
    fetchAllPlans(),
    fetchMySubscription(),
    fetchMyInvoices(),
  ]);

  const plans = plansRes?.success ? plansRes.data || [] : [];
  const currentSub = mySubRes?.success ? mySubRes.data : null;
  const invoices = invoicesRes?.success ? invoicesRes.data || [] : [];

  return (
    <div className="space-y-8">
      <ProfilePageHeader
        title="Subscription & billing"
        description="Choose the right plan to boost your sales and visibility on Recycle Mart."
      />

      {/* Plans Section */}
      <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {plans.map((plan: any) => {
          const config = getPlanConfig(plan.name);
          // Default to Free plan if no subscription found
          const isCurrent = currentSub 
            ? currentSub.plan?._id === plan._id 
            : plan.name.toLowerCase() === 'free';

          return (
            <Card 
              key={plan._id} 
              className={`relative flex flex-col border-border/60 bg-card/95 shadow-md transition-all hover:shadow-lg ${config.popular ? 'border-primary ring-1 ring-primary/20' : ''}`}
            >
              {config.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-primary-foreground">
                  Most Popular
                </div>
              )}
              
              <CardHeader>
                <div className="mb-2 flex items-center justify-between">
                  <div className={`rounded-xl bg-primary/10 p-2.5`}>
                    {config.icon}
                  </div>
                  {isCurrent && (
                    <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                      {currentSub ? "Active Plan" : "Auto Activated"}
                    </Badge>
                  )}
                </div>
                <CardTitle className="text-xl font-bold">{plan.name}</CardTitle>
                <CardDescription className="min-h-[40px] leading-relaxed">
                  {config.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="flex-1 space-y-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold">৳{plan.price}</span>
                  <span className="text-sm text-muted-foreground font-medium">/{plan.durationUnit?.toLowerCase()}ly</span>
                </div>

                <div className="space-y-3">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/80">Included features</p>
                  <ul className="space-y-2.5">
                    {plan.features?.map((feature: string) => (
                      <li key={feature} className="flex items-start gap-2.5 text-sm text-muted-foreground leading-snug">
                        <Check className="h-4 w-4 mt-0.5 shrink-0 text-primary" />
                        <span>{feature}</span>
                      </li>
                    ))}
                    <li className="flex items-start gap-2.5 text-sm text-muted-foreground leading-snug">
                      <Check className="h-4 w-4 mt-0.5 shrink-0 text-primary" />
                      <span>{plan.adsLimit} Active ads listing</span>
                    </li>
                  </ul>
                </div>
              </CardContent>

              <CardFooter className="pt-0">
                {!(plan.name.toLowerCase() === 'free' && currentSub && !isCurrent) && (
                  <Button 
                    variant={isCurrent ? "outline" : "default"} 
                    className={`w-full rounded-full h-11 transition-all ${!isCurrent && 'shadow-sm shadow-primary/20'}`}
                    disabled={isCurrent}
                  >
                    {isCurrent 
                      ? "Current Plan" 
                      : `Upgrade to ${plan.name}`
                    }
                  </Button>
                )}
              </CardFooter>
            </Card>
          );
        })}
      </section>

      {/* Billing History Section */}
      <Card className="border-border/60 bg-card/95 shadow-sm">
        <CardHeader>
          <CardTitle className="text-base font-semibold">Billing history</CardTitle>
          <CardDescription>Track your payments and download invoices.</CardDescription>
        </CardHeader>
        <CardContent className="overflow-hidden rounded-xl border border-border/40 p-0">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead className="w-[150px]">Invoice</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.length > 0 ? (
                invoices.map((bill: any) => (
                  <TableRow key={bill._id} className="hover:bg-muted/30">
                    <TableCell className="font-medium text-foreground">{bill.transactionId || bill._id.substring(0, 10)}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {bill.createdAt ? format(new Date(bill.createdAt), "dd MMM yyyy") : "N/A"}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="font-normal">{bill.planName || "Subscription"}</Badge>
                    </TableCell>
                    <TableCell className="font-semibold">৳{bill.amount}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end">
                        <Badge variant="outline" className={`border-emerald-400/50 bg-emerald-500/5 text-emerald-600 dark:text-emerald-300 capitalize`}>
                          {bill.status}
                        </Badge>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                    No billing history found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
