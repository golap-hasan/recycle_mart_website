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
import { sampleAd } from "@/components/ads/adsData";
import Link from "next/link";

type Props = {
  params: Promise<{ id: string }>;
};

// Generate metadata for the ad details page
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;

  // In real app, fetch ad data based on id
  if (id !== sampleAd.id) {
    return {
      title: "Ad Not Found | All Price BD",
    };
  }

  return {
    title: `${sampleAd.title} | All Price BD`,
    description: sampleAd.description.slice(0, 160),
    keywords: [
      sampleAd.category,
      sampleAd.brand,
      sampleAd.model,
      "Bangladesh",
      "buy",
      "sell",
    ],
    openGraph: {
      title: sampleAd.title,
      description: sampleAd.description.slice(0, 160),
      images: [sampleAd.images[0]],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: sampleAd.title,
      description: sampleAd.description.slice(0, 160),
      images: [sampleAd.images[0]],
    },
  };
}

export default async function AdDetailsPage({ params }: Props) {
  const { id } = await params;

  // In real app, fetch ad data based on id
  if (id !== sampleAd.id) {
    notFound();
  }

  const ad = sampleAd;

  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "Ads", href: "/ads" },
    {
      name: ad.title.length > 50 ? ad.title.slice(0, 50) + "..." : ad.title,
      isCurrent: true,
    },
  ];

  return (
    <PageLayout paddingSize="small">
      <div className="max-w-7xl mx-auto">
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
                <button className="w-full h-11 bg-primary text-primary-foreground rounded-lg font-semibold flex items-center justify-center gap-2">
                  <Phone className="h-4 w-4" />
                  Call Seller
                </button>
                <Link href={"/chat"} className="w-full h-11 border border-border rounded-lg flex items-center justify-center gap-2">
                  <MessageCircle className="h-4 w-4" />
                  Send Message
                </Link>
              </div>
            </div>

            {/* Seller Info */}
            <SellerInfo seller={ad.seller} />

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
                  <button className="h-8 w-8 rounded-full hover:bg-muted flex items-center justify-center">
                    <Heart className="h-4 w-4" />
                  </button>
                  <button className="h-8 w-8 rounded-full hover:bg-muted flex items-center justify-center">
                    <Share2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {ad.isFeatured && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                  Featured
                </span>
              )}
              {ad.isUrgent && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 ml-2">
                  Urgent
                </span>
              )}
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-primary">
                {ad.price}
              </span>
              {ad.originalPrice && (
                <span className="text-lg text-muted-foreground line-through">
                  {ad.originalPrice}
                </span>
              )}
            </div>

            {/* Location and Date */}
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {ad.location}
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {ad.postedAt}
              </div>
              <div className="flex items-center gap-1">
                <Eye className="h-4 w-4" />
                {ad.views} views
              </div>
            </div>

            <hr className="bg-border/30 h-px border-0" />

            {/* Description */}
            <div className="space-y-2">
              <h2 className="text-lg font-semibold">Description</h2>
              <div className="prose prose-sm max-w-none text-muted-foreground">
                <p>{ad.description}</p>
              </div>
            </div>

            {/* Specifications */}
            {ad.specifications && ad.specifications.length > 0 && (
              <>
                <hr className="bg-border/30 h-px border-0" />
                <div className="space-y-3">
                  <h2 className="text-lg font-semibold">Specifications</h2>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {ad.specifications.map((spec, index) => (
                      <div
                        key={index}
                        className="flex justify-between py-1"
                      >
                        <span className="text-sm text-muted-foreground">
                          {spec.label}:
                        </span>
                        <span className="text-sm font-medium">
                          {spec.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Related Ads */}
        <RelatedAds currentAdId={ad.id} category={ad.category} />
      </div>
    </PageLayout>
  );
}
