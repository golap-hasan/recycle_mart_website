import Link from "next/link";
import ListingCard, { type ListingCardProps } from "@/components/ads/ListingCard";

const featuredAds: ListingCardProps[] = [
  {
    id: "premium-iphone-14",
    title: "Apple iPhone 14 Pro 512GB (Boxed)",
    price: "৳ 152,000",
    location: "Banani, Dhaka",
    postedAt: "3 hours ago",
    imageUrl: "https://images.pexels.com/photos/47261/pexels-photo-47261.jpeg",
    isFeatured: true,
  },
  {
    id: "gaming-setup",
    title: "Custom Gaming PC RTX 4070Ti",
    price: "৳ 195,000",
    location: "Dhanmondi, Dhaka",
    postedAt: "Yesterday",
    imageUrl: "https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg",
    isFeatured: true,
  },
  {
    id: "hybrid-car",
    title: "Toyota Aqua 2019 S Package",
    price: "৳ 1,480,000",
    location: "Mirpur DOHS, Dhaka",
    postedAt: "2 days ago",
    imageUrl: "https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg",
    isFeatured: true,
  },
  {
    id: "luxury-sofa",
    title: "Italian Leather Sectional Sofa",
    price: "৳ 220,000",
    location: "Gulshan 1, Dhaka",
    postedAt: "4 hours ago",
    imageUrl: "https://images.pexels.com/photos/276551/pexels-photo-276551.jpeg",
    isFeatured: true,
  },
  {
    id: "mirrorless-kits",
    title: "Sony A7 IV Mirrorless Combo",
    price: "৳ 285,000",
    location: "Wari, Dhaka",
    postedAt: "1 day ago",
    imageUrl: "https://images.pexels.com/photos/1442338/pexels-photo-1442338.jpeg",
    isFeatured: true,
  },
  {
    id: "smart-apartment",
    title: "Smart Apartment Furniture Set",
    price: "৳ 95,000",
    location: "Motijheel, Dhaka",
    postedAt: "6 hours ago",
    imageUrl: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg",
    isFeatured: true,
  },
  {
    id: "flagship-android",
    title: "Samsung S24 Ultra Graphite",
    price: "৳ 165,000",
    location: "Uttara, Dhaka",
    postedAt: "30 minutes ago",
    imageUrl: "https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg",
    isFeatured: true,
  },
  {
    id: "studio-monitors",
    title: "Yamaha HS8 Studio Monitor Pair",
    price: "৳ 72,500",
    location: "Tejgaon, Dhaka",
    postedAt: "Today",
    imageUrl: "https://images.pexels.com/photos/164938/pexels-photo-164938.jpeg",
    isFeatured: true,
  },
] as const;

export default function FeaturedProducts() {
  return (
    <section className="py-10 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="text-2xl font-semibold">Featured Products</h2>
          <Link href="/ads?featured" className="text-primary hover:underline">
            See all
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          {featuredAds.map((ad) => (
            <ListingCard key={ad.id} {...ad} />
          ))}
        </div>
      </div>
    </section>
  );
}
