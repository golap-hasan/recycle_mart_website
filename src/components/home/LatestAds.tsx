import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";

const latestAds = [
  {
    id: "b1",
    name: "Refrigerator 240L",
    price: "৳ 27,500",
    location: "Bashundhara, Dhaka",
    image:
      "https://images.pexels.com/photos/373548/pexels-photo-373548.jpeg",
    href: "/ads/home-appliances/fridge-240l",
  },
  {
    id: "b2",
    name: "Washing Machine 7kg",
    price: "৳ 21,900",
    location: "Uttara, Dhaka",
    image:
      "https://images.pexels.com/photos/3967642/pexels-photo-3967642.jpeg",
    href: "/ads/home-appliances/wm-7kg",
  },
  {
    id: "b3",
    name: "DSLR Camera Kit",
    price: "৳ 38,000",
    location: "Chattogram City",
    image:
      "https://images.pexels.com/photos/51383/camera-lens-lens-reflection-51383.jpeg",
    href: "/ads/electronics/dslr-kit",
  },
  {
    id: "b4",
    name: "AC 1 Ton Inverter",
    price: "৳ 46,500",
    location: "Sylhet",
    image:
      "https://images.pexels.com/photos/3968081/pexels-photo-3968081.jpeg",
    href: "/ads/home-appliances/ac-1ton",
  },
  {
    id: "b5",
    name: "Premium Mountain Bike",
    price: "৳ 32,000",
    location: "Cumilla",
    image:
      "https://images.pexels.com/photos/2088205/pexels-photo-2088205.jpeg",
    href: "/ads/vehicles/mountain-bike-premium",
  },
  {
    id: "b6",
    name: "MacBook Air M2 13\"",
    price: "৳ 98,500",
    location: "Banani, Dhaka",
    image:
      "https://images.pexels.com/photos/872957/pexels-photo-872957.jpeg",
    href: "/ads/electronics/macbook-air-m2",
  },
  {
    id: "b7",
    name: "Wireless ANC Headphones",
    price: "৳ 18,900",
    location: "Jatrabari, Dhaka",
    image:
      "https://images.pexels.com/photos/374870/pexels-photo-374870.jpeg",
    href: "/ads/electronics/anc-headphones",
  },
  {
    id: "b8",
    name: "Premium Office Chair",
    price: "৳ 26,500",
    location: "Mohakhali, Dhaka",
    image:
      "https://images.pexels.com/photos/245240/pexels-photo-245240.jpeg",
    href: "/ads/home-living/premium-chair",
  },
  {
    id: "b9",
    name: "PlayStation 5 Slim Bundle",
    price: "৳ 68,000",
    location: "Keraniganj",
    image:
      "https://images.pexels.com/photos/845434/pexels-photo-845434.jpeg",
    href: "/ads/electronics/ps5-slim",
  },
  {
    id: "b10",
    name: "iPhone 15 Pro Max 256GB",
    price: "৳ 165,500",
    location: "Khulna City",
    image:
      "https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg",
    href: "/ads/electronics/iphone-15-pro-max",
  },
  {
    id: "b11",
    name: "Home Generator 5kW",
    price: "৳ 55,000",
    location: "Barishal",
    image:
      "https://images.pexels.com/photos/10547278/pexels-photo-10547278.jpeg",
    href: "/ads/home-appliances/home-generator",
  },
  {
    id: "b12",
    name: "Kitchen Appliance Combo",
    price: "৳ 29,900",
    location: "Rajshahi",
    image:
      "https://images.pexels.com/photos/1861789/pexels-photo-1861789.jpeg",
    href: "/ads/home-appliances/kitchen-combo",
  },
] as const;

export default function LatestAds() {
  return (
    <section className="py-10 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="text-2xl font-semibold">Latest Ads</h2>
          <Link href="/ads?latest_ads" className="text-primary hover:underline">
            See all
          </Link>
        </div>
        <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          {latestAds.map((ad) => (
            <Link
              key={ad.id}
              href={ad.href}
              className="group rounded-md border bg-card shadow-sm overflow-hidden"
            >
              <div className="aspect-square relative">
                <Image
                  src={ad.image}
                  alt={ad.name}
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 16vw"
                  className="object-cover"
                />
              </div>
              <div className="p-3">
                <div className="line-clamp-1 font-medium group-hover:text-primary transition-colors">
                  {ad.name}
                </div>
                <div className="mt-1 text-sm text-muted-foreground">{ad.price}</div>
                <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                  <MapPin className="h-3 w-3" />
                  {ad.location}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
