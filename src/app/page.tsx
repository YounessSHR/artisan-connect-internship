
import { getFeaturedProducts } from "@/services/productService";
import { getCategories } from "@/lib/categories";
import { HomeClient } from "@/components/home-client";

export default async function Home() {
  const featuredProducts = await getFeaturedProducts();
  const categories = getCategories();
  
  return (
    <HomeClient featuredProducts={featuredProducts} categories={categories} />
  );
}
