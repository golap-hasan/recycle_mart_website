"use client";

import Link from "next/link";
import Image from "next/image";
import { MapPin, Clock } from "lucide-react";

// Sample related ads - in real app, this would come from API
const sampleRelatedAds = [
  {
    id: "gaming-pc",
    title: "Custom Gaming PC (Ryzen 7, RTX 3070)",
    price: "৳ 95,000",
    location: "Mirpur, Dhaka",
    postedAt: "Yesterday",
    imageUrl: "https://images.pexels.com/photos/2115257/pexels-photo-2115257.jpeg",
    isFeatured: false,
    isUrgent: true,
  },
  {
    id: "dslr-kit",
    title: "Canon EOS R6 with 24-105mm Lens (Warranty)",
    price: "৳ 195,000",
    location: "Sylhet",
    postedAt: "1 week ago",
    imageUrl: "https://images.pexels.com/photos/64609/pexels-photo-64609.jpeg",
    isFeatured: false,
    isUrgent: false,
  },
  {
    id: "toyota-premio",
    title: "Toyota Premio 2017 (Registered 2019)",
    price: "৳ 2,150,000",
    location: "Chattogram",
    postedAt: "3 days ago",
    imageUrl: "https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg",
    isFeatured: true,
    isUrgent: true,
  },
];

type RelatedAdsProps = {
  currentAdId: string;
  category: string;
};

export default function RelatedAds({ currentAdId, category }: RelatedAdsProps) {
  // Filter out current ad and limit to 3
  const relatedAds = sampleRelatedAds.filter(ad => ad.id !== currentAdId).slice(0, 3);

  if (relatedAds.length === 0) return null;

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Related Ads</h2>
        <Link
          href={`/all-ads?category=${encodeURIComponent(category)}`}
          className="text-sm text-primary hover:underline"
        >
          View all {category} ads →
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {relatedAds.map((ad) => (
          <div key={ad.id} className="overflow-hidden hover:shadow-lg transition-shadow rounded-xl border border-border/40 bg-card">
            <Link href={`/all-ads/${ad.id}`}>
              <div className="relative aspect-4/3 overflow-hidden">
                <Image
                  src={ad.imageUrl}
                  alt={ad.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {ad.isFeatured && (
                  <span className="absolute top-2 left-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary text-primary-foreground">
                    Featured
                  </span>
                )}
                {ad.isUrgent && (
                  <span className="absolute top-2 right-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                    Urgent
                  </span>
                )}
              </div>
              <div className="p-4">
                <div className="space-y-2">
                  <h3 className="font-semibold group-hover:text-primary transition-colors">
                    {ad.title}
                  </h3>
                  <p className="text-lg font-bold text-primary">{ad.price}</p>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      <span className="truncate">{ad.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{ad.postedAt}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
