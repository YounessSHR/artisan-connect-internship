
import { notFound } from "next/navigation";
import { getCooperativeById } from "@/services/cooperativeService";
import { CooperativeDetailContent } from './cooperative-detail-content';
import { getProductsByCooperative, getProductsByArtisan } from "@/services/productService";
import type { Product, Cooperative, Artisan } from '@/lib/definitions';

type Props = {
  params: { id: string };
};

type ArtisanWithProducts = Artisan & {
    products: Product[];
}

type CooperativeWithArtisanProducts = Cooperative & {
    artisans: ArtisanWithProducts[];
}

export default async function CooperativeDetailPage({ params }: Props) {
  const cooperative = await getCooperativeById(params.id);

  if (!cooperative) {
    notFound();
  }

  // Fetch all products for the cooperative once
  const allCooperativeProducts = await getProductsByCooperative(cooperative.id);

  // Then, distribute them to the respective artisans
  const artisansWithProducts = cooperative.artisans?.map(artisan => {
    const products = allCooperativeProducts.filter(p => p.artisanId === artisan.id);
    return { ...artisan, products };
  }) || [];

  const cooperativeWithProducts: CooperativeWithArtisanProducts = {
    ...cooperative,
    artisans: artisansWithProducts,
  }

  // Pass all products for the cooperative to the detail content
  return <CooperativeDetailContent cooperative={cooperativeWithProducts} cooperativeProducts={allCooperativeProducts} />;
}
