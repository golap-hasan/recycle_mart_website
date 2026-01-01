import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  Heart,
  Share2,
  Phone,
  MessageCircle,
  MapPin,
  Calendar,
  Eye,
} from "lucide-react";
import CustomBreadcrumb from "@/tools/CustomBreadcrumb";
import PageLayout from "@/tools/PageLayout";
import SellerInfo from "@/components/ads/details/SellerInfo";
import RelatedAds from "@/components/ads/details/RelatedAds";
import ImageGallery from "@/components/ads/details/ImageGallery";
import Link from "next/link";
import { fetchAdById } from "@/services/ads";
import { timeAgo } from "@/lib/utils";

type Props = {
  params: Promise<{ id: string }>;
};

// Generate metadata for the ad details page
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const res = await fetchAdById(id);

  if (!res.success || !res.data) {
    return {
      title: "Ad Not Found | Recycle Mart",
    };
  }

  const ad = res.data;

  return {
    title: `${ad.title} | Recycle Mart`,
    description: ad.description.slice(0, 160),
    keywords: [
      ad.categoryId?.name || "Ads",
      ad.location,
      "Bangladesh",
      "buy",
      "sell",
    ],
    openGraph: {
      title: ad.title,
      description: ad.description.slice(0, 160),
      images: [ad.images[0]],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: ad.title,
      description: ad.description.slice(0, 160),
      images: [ad.images[0]],
    },
  };
}

export default async function AdDetailsPage({ params }: Props) {
  // throw new Error("Testing our cool error page!");
  const { id } = await params;
  // await new Promise((resolve) => setTimeout(resolve, 5000));
  const res = await fetchAdById(id);

  if (!res.success || !res.data) {
    notFound();
  }
  const ad = res.data;

  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "Ads", href: "/ads" },
    {
      name: ad.categoryId?.name || "Category",
      href: ad.categoryId ? `/ads?category=${ad.categoryId.slug}` : "/ads",
    },
    {
      name: ad.title?.length > 50 ? ad.title.slice(0, 50) + "..." : ad.title || "Ad Details",
      isCurrent: true,
    },
  ];

  return (
    <PageLayout paddingSize="small">
      <div className="container mx-auto">
        <CustomBreadcrumb links={breadcrumbs} />
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <ImageGallery images={ad.images} title={ad.title} />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Actions */}
            <div className="rounded-xl border border-border/40 bg-card p-6">
              <div className="space-y-4">
                <button className="w-full h-11 bg-primary text-primary-foreground rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors">
                  <Phone className="h-4 w-4" />
                  Call {ad.contactPhone}
                </button>
                <Link 
                  href={`/chat?recipient=${ad.user._id}`} 
                  className="w-full h-11 border border-border rounded-lg flex items-center justify-center gap-2 hover:bg-accent transition-colors"
                >
                  <MessageCircle className="h-4 w-4" />
                  Send Message
                </Link>
              </div>
            </div>

            {/* Seller Info */}
            <SellerInfo seller={ad.user} location={ad.location} />

            {/* Safety Tips */}
            <div className="rounded-xl border border-border/40 bg-card p-6">
              <h3 className="font-semibold mb-3">Safety Tips</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Meet in public places</li>
                <li>• Check item before buying</li>
                <li>• Use secure payment methods</li>
                <li>• Report suspicious ads</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Product Info - Full Width */}
        <div className="mt-8 rounded-xl border border-border/40 bg-card p-6">
          <div className="space-y-4">
            {/* Title and Badges */}
            <div className="space-y-2">
              <div className="flex items-start justify-between gap-4">
                <h1 className="text-2xl font-bold text-foreground">
                  {ad.title}
                </h1>
                <div className="flex items-center gap-2">
                  <button className="h-8 w-8 rounded-full hover:bg-muted flex items-center justify-center transition-colors">
                    <Heart className="h-4 w-4" />
                  </button>
                  <button className="h-8 w-8 rounded-full hover:bg-muted flex items-center justify-center transition-colors">
                    <Share2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground capitalize">
                  {ad.condition}
                </span>
                {ad.isFeatured && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700">
                    Featured
                  </span>
                )}
                {ad.isUrgent && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
                    Urgent
                  </span>
                )}
              </div>
            </div>

            {/* Price */}
            <div className="flex items-baseline justify-between">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold text-primary">
                  ৳ {ad.price.toLocaleString()}
                </span>
                {ad.negotiable && (
                  <span className="text-sm font-medium text-muted-foreground">
                    (Negotiable)
                  </span>
                )}
              </div>
            </div>

            {/* Location and Date */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {ad.location}
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                Posted {timeAgo(ad.createdAt)}
              </div>
              <div className="flex items-center gap-1">
                <Eye className="h-4 w-4" />
                {ad.views} views
              </div>
            </div>

            <hr className="bg-border/30 h-px border-0" />

            {/* Description */}
            <div className="space-y-3">
              <h2 className="text-lg font-semibold">Description</h2>
              <div className="prose prose-sm max-w-none text-muted-foreground whitespace-pre-line">
                {ad.description}
              </div>
            </div>

            {/* In a real app, specifications would be here. For now, let's keep the layout simple */}
          </div>
        </div>

        {/* Related Ads */}
        {ad.categoryId && (
          <RelatedAds 
            currentAdId={ad._id} 
            category={ad.categoryId.name} 
          />
        )}
      </div>
    </PageLayout>
  );
}
