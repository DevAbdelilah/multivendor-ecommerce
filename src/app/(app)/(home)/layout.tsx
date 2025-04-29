import configPromise from "@payload-config";
import { getPayload } from "payload";
import { Footer } from "./footer";
import Navbar from "./navbar";
import { SearfcheFilters } from "./searche-filters";
import { Category } from "@/payload-types";
import { CustomCategory } from "./types";

interface Props {
  children: React.ReactNode;
}

const Layout = async ({ children }: Props) => {
  const payload = await getPayload({
    config: configPromise,
  });

  // First get all parent categories sorted by name
  const allCategories = await payload.find({
    collection: "categories",
    depth: 1,
    pagination: false,
    where: {
      parent: {
        exists: false,
      },
    },
    sort: "name",
  });

  // Separate the "all" category from others
  const allCategory = allCategories.docs.find((doc) => doc.slug === "all");
  const otherCategories = allCategories.docs.filter(
    (doc) => doc.slug !== "all"
  );

  // Combine them with "all" first, then others in alphabetical order
  const sortedData = allCategory
    ? [allCategory, ...otherCategories]
    : [...otherCategories];

  const formattedData: CustomCategory[] = sortedData.map((doc) => ({
    ...doc,
    subcategories: (doc.subcategories?.docs ?? []).map((doc) => ({
      ...(doc as Category),
      subcategories: undefined,
    })),
  }));

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <SearfcheFilters data={formattedData} />
      <div className="flex-1 bg-[#F4F4F0]">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
