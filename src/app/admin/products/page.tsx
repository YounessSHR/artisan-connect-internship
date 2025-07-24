
import { getProductsWithRatings } from "@/services/productService";
import { getAllCooperatives } from "@/services/cooperativeService";
import { ProductsTable } from "./products-table";
import { SidebarTrigger } from "@/components/ui/sidebar";

const PRODUCTS_PER_PAGE = 10;

export default async function AdminProductsPage({ searchParams }: { searchParams: { page?: string }}) {
  const currentPage = Number(searchParams?.page) || 1;

  // We need all cooperatives to map names and for the product form dropdown.
  // In a very large-scale app, we might optimize this, but for now it's fine.
  const [productsData, cooperatives] = await Promise.all([
    getProductsWithRatings({ page: currentPage, pageSize: PRODUCTS_PER_PAGE }),
    getAllCooperatives(),
  ]);

  const { products, totalProducts } = productsData;
  const totalPages = Math.ceil(totalProducts / PRODUCTS_PER_PAGE);

  const cooperativeMap = new Map(cooperatives.map(c => [c.id, c.name]));

  const productsWithCooperativeNames = products.map(product => ({
    ...product,
    cooperativeName: cooperativeMap.get(product.cooperativeId) || "N/A",
  }));

  return (
    <div className="flex flex-col h-full w-full">
      <header className="flex items-center gap-4 mb-6 flex-shrink-0">
        <SidebarTrigger className="md:hidden" />
        <h1 className="font-headline text-2xl font-bold">Gestion des Produits</h1>
      </header>
      <div className="flex-grow min-h-0 overflow-auto">
        <ProductsTable 
          products={productsWithCooperativeNames} 
          cooperatives={cooperatives}
          totalPages={totalPages}
          currentPage={currentPage}
          totalProducts={totalProducts}
        />
      </div>
    </div>
  );
}
