import type { Metadata } from "next";
import CustomBreadcrumb from "@/tools/CustomBreadcrumb";
import AllAdsExplorer from "@/components/ads/AllAdsExplorer";
import PageLayout from "@/tools/PageLayout";
import { sampleListings } from "@/components/ads/adsData";
import { sortOptions, locationOptions } from "@/components/ads/filters";

export const metadata: Metadata = {
  title: "All Ads | Recycle Mart",
  description:
    "Browse the latest listings across Bangladesh. Filter by category, price, location, and more to find the perfect deal on Recycle Mart.",
};

const breadcrumbs = [
  { name: "Home", href: "/" },
  { name: "All Ads", isCurrent: true },
];

const AllAdsPage = () => {
  return (
    <PageLayout paddingSize="small">
      <div className="max-w-7xl mx-auto">
        <CustomBreadcrumb links={breadcrumbs} />
        <AllAdsExplorer
          listings={sampleListings}
          sortOptions={sortOptions}
          locationOptions={locationOptions}
        />
      </div>
    </PageLayout>
  );
};

export default AllAdsPage;
