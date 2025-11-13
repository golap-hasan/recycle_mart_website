import type { Metadata } from "next";
import CustomBreadcrumb from "@/tools/CustomBreadcrumb";
import AllAdsExplorer from "@/components/all-ads/AllAdsExplorer";
import PageLayout from "@/tools/PageLayout";

export const metadata: Metadata = {
  title: "All Ads | All Price BD",
  description:
    "Browse the latest listings across Bangladesh. Filter by category, price, location, and more to find the perfect deal on All Price BD.",
};

const sampleListings = [
  {
    id: "apple-iphone-14",
    title: "Apple iPhone 14 Pro Max 256GB (Used)",
    price: "৳ 135,000",
    location: "Banani, Dhaka",
    postedAt: "2 hours ago",
    imageUrl:
      "https://images.pexels.com/photos/5081398/pexels-photo-5081398.jpeg",
    isUrgent: true,
  },
  {
    id: "gaming-pc",
    title: "Custom Gaming PC (Ryzen 7, RTX 3070)",
    price: "৳ 95,000",
    location: "Mirpur, Dhaka",
    postedAt: "Yesterday",
    imageUrl:
      "https://images.pexels.com/photos/2115257/pexels-photo-2115257.jpeg",
  },
  {
    id: "toyota-premio",
    title: "Toyota Premio 2017 (Registered 2019)",
    price: "৳ 2,150,000",
    location: "Chattogram",
    postedAt: "3 days ago",
    imageUrl:
      "https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg",
  },
  {
    id: "family-apartment",
    title: "2,200 sqft Apartment for Rent in Bashundhara R/A",
    price: "৳ 90,000 / month",
    location: "Bashundhara, Dhaka",
    postedAt: "5 days ago",
    imageUrl:
      "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg",
    isUrgent: true,
  },
  {
    id: "dslr-kit",
    title: "Canon EOS R6 with 24-105mm Lens (Warranty)",
    price: "৳ 195,000",
    location: "Sylhet",
    postedAt: "1 week ago",
    imageUrl: "https://images.pexels.com/photos/64609/pexels-photo-64609.jpeg",
  },
  {
    id: "office-space",
    title: "Serviced Office Space - Gulshan Avenue",
    price: "৳ 2,50,000 / month",
    location: "Gulshan 1, Dhaka",
    postedAt: "1 week ago",
    imageUrl:
      "https://images.pexels.com/photos/325185/pexels-photo-325185.jpeg",
    isUrgent: true,
  },
];

const breadcrumbs = [
  { name: "Home", href: "/" },
  { name: "All Ads", isCurrent: true },
];
const sortOptions = [
  { value: "newest", label: "Date: Newest first" },
  { value: "oldest", label: "Date: Oldest first" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
];

const locationOptions = [
  { value: "dhaka", label: "Dhaka" },
  { value: "chattogram", label: "Chattogram" },
  { value: "sylhet", label: "Sylhet" },
  { value: "rajshahi", label: "Rajshahi" },
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
