'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Trophy, Users, Ticket, Gift, Timer, CheckCircle2 } from 'lucide-react';

// Mock Data
const lotteries = [
  {
    id: '1',
    title: 'Weekly Mega Jackpot',
    drawDate: '2025-12-10T20:00:00',
    participants: 1250,
    status: 'active',
    prize: 'iPhone 15 Pro Max',
    image:
      'https://images.unsplash.com/photo-1696446701796-da61225697cc?q=80&w=1000&auto=format&fit=crop',
    ticketPrice: 20,
    totalTickets: 5000,
  },
  {
    id: '2',
    title: 'Dream Bike Bonanza',
    drawDate: '2025-12-15T18:00:00',
    participants: 850,
    status: 'active',
    prize: 'Yamaha R15 V4',
    image:
      'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=1000&auto=format&fit=crop',
    ticketPrice: 50,
    totalTickets: 2000,
  },
  {
    id: '3',
    title: 'Tech Bundle Giveaway',
    drawDate: '2025-12-05T12:00:00',
    participants: 2800,
    status: 'active',
    prize: 'MacBook Air + iPad',
    image:
      'https://www.startech.com.bd/image/cache/catalog/laptop/apple/macbook-air-m2-chip/macbook-air-m2-chip-01-500x500.webp',
    ticketPrice: 30,
    totalTickets: 3000,
  },
  {
    id: '4',
    title: 'November Grand Prize',
    drawDate: '2025-11-30T20:00:00',
    participants: 5000,
    status: 'completed',
    prize: 'Toyota Aqua 2018',
    winner: 'Karim Ahmed',
    image:
      'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?q=80&w=1000&auto=format&fit=crop',
    ticketPrice: 100,
    totalTickets: 5000,
  },
];

const CountdownTimer = ({ targetDate }: { targetDate: string }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = new Date(targetDate).getTime() - now;

      if (distance < 0) {
        clearInterval(interval);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        ),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="flex gap-2 text-center">
      {Object.entries(timeLeft).map(([unit, value]) => (
        <div
          key={unit}
          className="flex flex-col rounded-md bg-primary/10 p-2 min-w-[50px]"
        >
          <span className="text-lg font-bold text-primary">{value}</span>
          <span className="text-[10px] uppercase text-muted-foreground">
            {unit.charAt(0)}
          </span>
        </div>
      ))}
    </div>
  );
};

export default function LotteryPage() {
  const [selectedLottery, setSelectedLottery] = useState<
    (typeof lotteries)[0] | null
  >(null);

  return (
    <div className="min-h-screen bg-muted/20 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-primary py-16 text-primary-foreground lg:py-24">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="container relative mx-auto px-4 text-center">
          <Badge className="mb-4 bg-white/20 text-white hover:bg-white/30">
            Win Big Today
          </Badge>
          <h1 className="mb-6 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            Recycle Mart <span className="text-yellow-300">Lottery</span>
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-primary-foreground/90 sm:text-xl">
            Participate in our exciting lotteries with just a small entry fee.
            Win amazing prizes like iPhones, Motorbikes, and more!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              size="lg"
              className="bg-white text-primary hover:bg-white/90 font-bold rounded-full px-8"
            >
              View Active Draws
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white hover:bg-white/10 rounded-full px-8"
            >
              How it Works
            </Button>
          </div>
        </div>
      </section>

      <div className="container mx-auto -mt-10 px-4 relative z-20">
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="border-none shadow-lg">
            <CardContent className="flex flex-col items-center p-6 text-center">
              <div className="mb-4 rounded-full bg-blue-100 p-4 text-blue-600">
                <Ticket className="h-8 w-8" />
              </div>
              <h3 className="mb-2 text-lg font-bold">Buy a Ticket</h3>
              <p className="text-sm text-muted-foreground">
                Choose a lottery and purchase a ticket for as low as ৳10.
              </p>
            </CardContent>
          </Card>
          <Card className="border-none shadow-lg">
            <CardContent className="flex flex-col items-center p-6 text-center">
              <div className="mb-4 rounded-full bg-purple-100 p-4 text-purple-600">
                <Timer className="h-8 w-8" />
              </div>
              <h3 className="mb-2 text-lg font-bold">Wait for Draw</h3>
              <p className="text-sm text-muted-foreground">
                Watch the live draw countdown. Winners are picked randomly.
              </p>
            </CardContent>
          </Card>
          <Card className="border-none shadow-lg">
            <CardContent className="flex flex-col items-center p-6 text-center">
              <div className="mb-4 rounded-full bg-green-100 p-4 text-green-600">
                <Gift className="h-8 w-8" />
              </div>
              <h3 className="mb-2 text-lg font-bold">Win Prizes</h3>
              <p className="text-sm text-muted-foreground">
                If your ticket number matches, you win the grand prize!
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Lotteries Section */}
      <section className="container mx-auto mt-16 px-4">
        <Tabs defaultValue="active" className="w-full">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold tracking-tight">
              Featured Lotteries
            </h2>
            <TabsList>
              <TabsTrigger value="active">Active Draws</TabsTrigger>
              <TabsTrigger value="completed">Past Winners</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="active" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {lotteries
                .filter(l => l.status === 'active')
                .map(lottery => (
                  <Card
                    key={lottery.id}
                    className="group overflow-hidden border-border/50 transition-all hover:shadow-xl hover:border-primary/50"
                  >
                    <div className="relative h-48 w-full overflow-hidden">
                      <Image
                        src={lottery.image}
                        alt={lottery.prize}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute top-3 right-3">
                        <Badge className="bg-primary text-white shadow-lg">
                          ৳{lottery.ticketPrice} / Ticket
                        </Badge>
                      </div>
                    </div>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-xl">
                            {lottery.title}
                          </CardTitle>
                          <p className="text-sm font-medium text-primary mt-1">
                            Win: {lottery.prize}
                          </p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Users className="h-4 w-4" /> {lottery.participants}{' '}
                          Joined
                        </span>
                        <span className="flex items-center gap-1">
                          <Ticket className="h-4 w-4" />{' '}
                          {lottery.totalTickets - lottery.participants} Left
                        </span>
                      </div>
                      <Progress
                        value={
                          (lottery.participants / lottery.totalTickets) * 100
                        }
                        className="h-2"
                      />

                      <div className="rounded-lg bg-muted/50 p-3">
                        <p className="mb-2 text-xs font-semibold uppercase text-muted-foreground text-center">
                          Draw Starts In
                        </p>
                        <div className="flex justify-center">
                          <CountdownTimer targetDate={lottery.drawDate} />
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            className="w-full gap-2 text-lg font-semibold py-6 rounded-xl shadow-lg shadow-primary/20"
                            onClick={() => setSelectedLottery(lottery)}
                          >
                            <Ticket className="h-5 w-5" /> Buy Ticket Now
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                          <DialogHeader>
                            <DialogTitle>Join {lottery.title}</DialogTitle>
                            <DialogDescription>
                              Enter your details to purchase a ticket for ৳
                              {lottery.ticketPrice}.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                              <Label htmlFor="name">Full Name</Label>
                              <Input id="name" placeholder="Enter your name" />
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="email">Email</Label>
                              <Input
                                id="email"
                                type="email"
                                placeholder="Enter your email"
                              />
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="phone">Phone Number</Label>
                              <Input
                                id="phone"
                                type="tel"
                                placeholder="017..."
                              />
                            </div>
                            <div className="rounded-lg border p-3 bg-muted/30">
                              <div className="flex justify-between text-sm mb-1">
                                <span>Ticket Price</span>
                                <span className="font-semibold">
                                  ৳{lottery.ticketPrice}
                                </span>
                              </div>
                              <div className="flex justify-between text-sm mb-1">
                                <span>Platform Fee</span>
                                <span className="font-semibold">৳0</span>
                              </div>
                              <div className="border-t my-2"></div>
                              <div className="flex justify-between font-bold">
                                <span>Total</span>
                                <span className="text-primary">
                                  ৳{lottery.ticketPrice}
                                </span>
                              </div>
                            </div>
                          </div>
                          <DialogFooter>
                            <Button type="submit" className="w-full">
                              Pay & Join
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </CardFooter>
                  </Card>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="completed">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {lotteries
                .filter(l => l.status === 'completed')
                .map(lottery => (
                  <Card key={lottery.id} className="opacity-90">
                    <div className="relative h-48 w-full overflow-hidden grayscale">
                      <Image
                        src={lottery.image}
                        alt={lottery.prize}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <Badge
                          variant="secondary"
                          className="text-lg px-4 py-1"
                        >
                          Ended
                        </Badge>
                      </div>
                    </div>
                    <CardHeader>
                      <CardTitle>{lottery.title}</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        Prize: {lottery.prize}
                      </p>
                    </CardHeader>
                    <CardContent>
                      <div className="rounded-xl bg-yellow-500/10 border border-yellow-500/20 p-4 flex items-center gap-4">
                        <div className="h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600">
                          <Trophy className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground uppercase font-semibold">
                            Winner
                          </p>
                          <p className="font-bold text-foreground">
                            {lottery.winner}
                          </p>
                        </div>
                      </div>
                      <div className="mt-4 flex items-center gap-2 text-sm text-green-600">
                        <CheckCircle2 className="h-4 w-4" />
                        <span>
                          Draw completed on{' '}
                          {new Date(lottery.drawDate).toLocaleDateString()}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </section>

      {/* Trust Section */}
      <section className="container mx-auto mt-20 px-4 text-center">
        <h2 className="text-2xl font-bold mb-8">Live Draws & Transparency</h2>
        <div className="relative overflow-hidden rounded-3xl bg-black text-white">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1516280440614-6697288d5d38?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center opacity-30"></div>
          <div className="relative z-10 px-6 py-16 md:px-12 md:py-24">
            <div className="mx-auto max-w-3xl space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-red-600/90 px-4 py-1 text-sm font-medium text-white animate-pulse">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                </span>
                Live Streaming
              </div>
              <h3 className="text-3xl font-bold sm:text-4xl">
                Watch Draws Live on Facebook & YouTube
              </h3>
              <p className="text-lg text-gray-300">
                We ensure 100% transparency. Every draw is streamed live. You
                can verify the results instantly. Join our community to get
                notified.
              </p>
              <div className="flex flex-wrap justify-center gap-4 pt-4">
                <Button className="bg-[#1877F2] hover:bg-[#1877F2]/90 text-white gap-2">
                  Watch on Facebook
                </Button>
                <Button className="bg-[#FF0000] hover:bg-[#FF0000]/90 text-white gap-2">
                  Watch on YouTube
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
