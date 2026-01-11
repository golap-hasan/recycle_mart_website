import { fetchAllCategories } from "@/services/category";
import NavMiddle from "./NavMiddle";
import NavTop from "./NavTop";

export default async function Navbar() {
  const categoriesRes = await fetchAllCategories();
  const categories = categoriesRes.success ? categoriesRes.data : [];

  return (
    <>
      <div className="bg-primary dark:bg-teal-950 text-white">
        <NavTop />
      </div>
      <div className="sticky top-0 z-50 bg-primary dark:bg-teal-950 text-white shadow-md">
        <NavMiddle categories={categories} />
      </div>
    </>
  );
}
