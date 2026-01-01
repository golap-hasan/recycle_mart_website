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
  // throw new Error("Testing our cool error page!");
  const searchParams = await props.searchParams;
  // await new Promise((resolve) => setTimeout(resolve, 5000));
  
  // Parallel fetching
  const [categoriesRes, adsRes] = await Promise.all([
    fetchAllCategories(),
    fetchAllAds({ ...searchParams, 'limit':'10' }),
  ]);

  const categories = categoriesRes?.success ? categoriesRes.data : [];
  const listings = (adsRes?.success ? adsRes.data : []) as Ad[];
  const meta = adsRes?.meta;

  return (
    <PageLayout paddingSize="small">
      <div className="custom-width mx-auto">
        <CustomBreadcrumb links={breadcrumbs} />
        <AllAdsExplorer
          listings={listings}
          categories={categories}
          meta={meta}
        />
      </div>
    </PageLayout>
  );
};

export default AllAdsPage;
