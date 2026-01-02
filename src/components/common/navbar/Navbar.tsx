import { fetchAllCategories } from "@/services/category";
import NavBottom from "./NavBottom";
import NavMiddle from "./NavMiddle";
import NavTop from "./NavTop";

export default async function Navbar() {
  const categoriesRes = await fetchAllCategories();
  const categories = categoriesRes.success ? categoriesRes.data : [];

  return (
    <header className="bg-primary text-white">
      <NavTop />
      <NavMiddle categories={categories} />
      <NavBottom categories={categories} />
    </header>
  );
}
