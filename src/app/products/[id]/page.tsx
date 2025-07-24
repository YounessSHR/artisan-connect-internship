

"use server";

import { getProductById, getProductReviews } from "@/services/productService";
import { getCategoryBySlug } from "@/lib/categories";
import { getCooperativeById } from "@/services/cooperativeService";
import { ProductPageContent } from './product-page-content';
import { notFound } from "next/navigation";
import { getAllProducts } from "@/services/productService";

type Props = {
  params: { id: string };
};

// This function generates static paths at build time.
export async function generateStaticParams() {
  const products = await getAllProducts();
 
  return products.map((product) => ({
    id: product.id,
  }));
}

export default async function ProductDetailPage({ params }: Props) {
  const { id } = params;
  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  // Fetch all related data in parallel
  const [cooperative, reviews] = await Promise.all([
    getCooperativeById(product.cooperativeId),
    getProductReviews(product.id)
  ]);
  
  // Derive category data from the existing static list
  const categoryData = getCategoryBySlug(product.categoryId);
  const category = categoryData ? { name: categoryData.name, slug: categoryData.slug } : undefined;

  return (
    <ProductPageContent product={product} cooperative={cooperative} category={category} initialReviews={reviews} />
  );
}
