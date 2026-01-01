import type { Metadata } from "next";
import CustomBreadcrumb from "@/tools/CustomBreadcrumb";
import AllAdsExplorer from "@/components/ads/AllAdsExplorer";
import PageLayout from "@/tools/PageLayout";
import { fetchAllAds } from "@/services/ads";
import { fetchAllCategories } from "@/services/category";
import { Ad } from "@/types/ad.type";

export const metadata: Metadata = {
  title: "All Ads | Recycle Mart",
  description:
    "Browse the latest listings across Bangladesh. Filter by category, price, location, and more to find the perfect deal on Recycle Mart.",
};

const breadcrumbs = [
  { name: "Home", href: "/" },
  { name: "All Ads", isCurrent: true },
];

const AllAdsPage = async (props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const searchParams = await props.searchParams;
  
  // Parallel fetching
  const [categoriesRes, adsRes] = await Promise.all([
    fetchAllCategories(),
    fetchAllAds(searchParams),
  ]);

  const categories = categoriesRes?.success ? categoriesRes.data : [];
  const listings = (adsRes?.success ? adsRes.data : []) as Ad[];

  return (
    <PageLayout paddingSize="small">
      <div className="custom-width mx-auto">
        <CustomBreadcrumb links={breadcrumbs} />
        <AllAdsExplorer
          listings={listings}
          categories={categories}
        />
      </div>
    </PageLayout>
  );
};

export default AllAdsPage;
