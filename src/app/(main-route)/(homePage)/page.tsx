import Category from "@/components/home/Category";
import Hero from "@/components/home/Hero";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import TopAds from "@/components/home/TopAds";
import LatestAds from "@/components/home/LatestAds";

export default function Home() {
  return (
    <div className="space-y-4 mb-4">
      <Hero />
      <Category />
      <FeaturedProducts />
      <TopAds />
      <LatestAds />
    </div>
  );
}
