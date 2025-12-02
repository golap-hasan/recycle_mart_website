import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";

const spotlightAds = [
  {
    id: "p1",
    name: "Refurbished iPhone 13",
    price: "৳ 58,500",
    location: "Dhanmondi, Dhaka",
    image:
      "https://images.pexels.com/photos/6078123/pexels-photo-6078123.jpeg",
    href: "/ads/electronics/iphone-13",
  },
  {
    id: "p2",
    name: "Gaming Laptop RTX 4060",
    price: "৳ 119,000",
    location: "Gulshan, Dhaka",
    image:
      "https://images.pexels.com/photos/2047905/pexels-photo-2047905.jpeg",
    href: "/ads/electronics/laptop-rtx4060",
  },
  {
    id: "p3",
    name: "Motorbike - 125cc",
    price: "৳ 85,000",
    location: "Mirpur, Dhaka",
    image:
      "https://images.pexels.com/photos/1082655/pexels-photo-1082655.jpeg",
    href: "/ads/vehicles/bike-125",
  },
  {
    id: "p4",
    name: "LED TV 43\"",
    price: "৳ 31,900",
    location: "Uttara, Dhaka",
    image:
      "https://images.pexels.com/photos/306763/pexels-photo-306763.jpeg",
    href: "/ads/electronics/tv-43",
  },
  {
    id: "p5",
    name: "Apple Watch Ultra",
    price: "৳ 67,500",
    location: "Banani, Dhaka",
    image:
      "https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg",
    href: "/ads/electronics/apple-watch-ultra",
  },
  {
    id: "p6",
    name: "Premium Gaming Rig RTX 4080",
    price: "৳ 238,000",
    location: "Bashundhara, Dhaka",
    image:
      "https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg",
    href: "/ads/electronics/gaming-rig-4080",
  },
  {
    id: "p7",
    name: "City Hybrid Bicycle 2024",
    price: "৳ 42,000",
    location: "Mohakhali, Dhaka",
    image:
      "https://images.pexels.com/photos/276517/pexels-photo-276517.jpeg",
    href: "/ads/vehicles/hybrid-bicycle",
  },
  {
    id: "p8",
    name: "MacBook Pro M3 Max",
    price: "৳ 315,000",
    location: "Chattogram",
    image:
      "https://images.pexels.com/photos/1261427/pexels-photo-1261427.jpeg",
    href: "/ads/electronics/macbook-pro-m3",
  },
  {
    id: "p9",
    name: "Luxury Sofa Set 7 Seater",
    price: "৳ 178,000",
    location: "Sylhet",
    image:
      "https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg",
    href: "/ads/home-living/luxury-sofa",
  },
  {
    id: "p10",
    name: "Canon EOS R6 II Kit",
    price: "৳ 255,000",
    location: "Khulna",
    image:
      "https://images.pexels.com/photos/212372/pexels-photo-212372.jpeg",
    href: "/ads/electronics/canon-r6",
  },
  {
    id: "p11",
    name: "Apple iPad Pro 13 M4",
    price: "৳ 185,000",
    location: "Rajshahi",
    image:
      "https://images.pexels.com/photos/5082555/pexels-photo-5082555.jpeg",
    href: "/ads/electronics/ipad-pro-m4",
  },
  {
    id: "p12",
    name: "Dyson V15 Detect Absolute",
    price: "৳ 92,000",
    location: "Barishal",
    image:
      "https://images.pexels.com/photos/4107284/pexels-photo-4107284.jpeg",
    href: "/ads/home-appliances/dyson-v15",
  },
] as const;

export default function TopAds() {
  return (
    <section className="py-10">
      <div className="container mx-auto px-4">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="text-2xl font-semibold">Top Ads</h2>
          <Link href="/ads?top_ads" className="text-primary hover:underline">
            See all
          </Link>
        </div>
        <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          {spotlightAds.map((ad) => (
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
