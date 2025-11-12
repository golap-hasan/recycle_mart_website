import type { Metadata } from "next";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import AllAdsExplorer from "@/components/all-ads/AllAdsExplorer";

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
    imageUrl: "https://images.pexels.com/photos/5081398/pexels-photo-5081398.jpeg",
    isFeatured: true,
    isUrgent: false,
  },
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
    id: "toyota-premio",
    title: "Toyota Premio 2017 (Registered 2019)",
    price: "৳ 2,150,000",
    location: "Chattogram",
    postedAt: "3 days ago",
    imageUrl: "https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg",
    isFeatured: true,
    isUrgent: true,
  },
  {
    id: "family-apartment",
    title: "2,200 sqft Apartment for Rent in Bashundhara R/A",
    price: "৳ 90,000 / month",
    location: "Bashundhara, Dhaka",
    postedAt: "5 days ago",
    imageUrl: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg",
    isFeatured: false,
    isUrgent: false,
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
    id: "office-space",
    title: "Serviced Office Space - Gulshan Avenue",
    price: "৳ 2,50,000 / month",
    location: "Gulshan 1, Dhaka",
    postedAt: "1 week ago",
    imageUrl: "https://images.pexels.com/photos/325185/pexels-photo-325185.jpeg",
    isFeatured: false,
    isUrgent: true,
  },
];

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "All Ads", href: "/all-ads" },
  { label: "Bangladesh" },
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
    <main className="bg-muted/10">
      <section className="container custom-width mx-auto space-y-8 px-6 py-10">
        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumbs.map((item, index) => (
              <BreadcrumbItem key={item.label}>
                {item.href ? (
                  <BreadcrumbLink asChild>
                    <Link href={item.href}>{item.label}</Link>
                  </BreadcrumbLink>
                ) : (
                  <BreadcrumbPage>{item.label}</BreadcrumbPage>
                )}
                {index < breadcrumbs.length - 1 ? <BreadcrumbSeparator /> : null}
              </BreadcrumbItem>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
        <AllAdsExplorer listings={sampleListings} sortOptions={sortOptions} locationOptions={locationOptions} />
      </section>
    </main>
  );
};

export default AllAdsPage;