

"use client";

import { useMemo, useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { getCategories } from "@/lib/categories";
import { ProductCard } from "@/components/product-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { ProductWithRating, Category } from "@/lib/definitions";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { getProductsWithRatings } from "@/services/productService";
import { Skeleton } from "@/components/ui/skeleton";
import { Gem, Home, Palette, Scissors, ShoppingBag, Utensils, Briefcase, LucideIcon } from "lucide-react";


const PRODUCTS_PER_PAGE = 9;

const iconMap: { [key: string]: LucideIcon } = {
    Utensils,
    Briefcase,
    Home,
    ShoppingBag,
    Gem,
    Scissors,
    Palette
};

function ProductsLoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
      {Array.from({ length: 9 }).map((_, i) => (
        <div key={i} className="space-y-2">
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-6 w-1/4" />
        </div>
      ))}
    </div>
  )
}

function ProductList({ products, totalPages, currentPage }: { products: ProductWithRating[], totalPages: number, currentPage: number }) {
  const searchParams = useSearchParams();

  const createPageURL = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `/products?${params.toString()}`;
  };

  return (
    <>
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-24 bg-card rounded-lg">
          <p className="text-muted-foreground text-xl">
            Aucun produit ne correspond à vos critères.
          </p>
        </div>
      )}
      {totalPages > 1 && (
        <div className="mt-12">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  href={createPageURL(currentPage - 1)}
                  aria-disabled={currentPage <= 1}
                  className={currentPage <= 1 ? "pointer-events-none opacity-50" : undefined}
                />
              </PaginationItem>

              {Array.from({ length: totalPages }).map((_, index) => (
                  <PaginationItem key={index}>
                      <PaginationLink href={createPageURL(index + 1)} isActive={currentPage === index + 1}>
                          {index + 1}
                      </PaginationLink>
                  </PaginationItem>
              ))}
              
              <PaginationItem>
                <PaginationNext 
                  href={createPageURL(currentPage + 1)}
                  aria-disabled={currentPage >= totalPages}
                  className={currentPage >= totalPages ? "pointer-events-none opacity-50" : undefined}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </>
  );
}

function PageContent() {
  const categories = useMemo(() => getCategories(), []);
  const router = useRouter();
  const searchParams = useSearchParams();

  const [products, setProducts] = useState<ProductWithRating[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  
  const currentPage = Number(searchParams.get('page')) || 1;
  const currentCategory = searchParams.get("category") || "all";
  const currentSort = searchParams.get("sort") || "rating-desc";

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const { products: fetchedProducts, totalProducts } = await getProductsWithRatings({ 
        page: currentPage, 
        pageSize: PRODUCTS_PER_PAGE,
        category: (currentCategory === 'all' || !currentCategory) ? undefined : currentCategory,
        sortBy: currentSort || undefined,
      });
      
      setProducts(fetchedProducts);
      setTotalPages(Math.ceil(totalProducts / PRODUCTS_PER_PAGE));
      setLoading(false);
    };

    fetchProducts();
  }, [searchParams, currentPage, currentCategory, currentSort]);

  const handleFilterChange = (key: 'sort' | 'category', value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (key === 'category' && value === 'all') {
      params.delete('category');
    } else {
      params.set(key, value);
    }
    
    // Reset to page 1 whenever a filter changes
    params.set('page', '1');
    router.push(`/products?${params.toString()}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary">
          Nos Produits
        </h1>
        <p className="max-w-3xl mx-auto text-lg text-muted-foreground">
          Explorez notre collection d'artisanat marocain authentique.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
        <aside className="lg:sticky top-24 self-start">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline text-xl">Filtres</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              <div>
                <Label className="font-semibold text-base mb-3 block">Trier par</Label>
                <Select value={currentSort} onValueChange={(value) => handleFilterChange('sort', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Trier les produits" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rating-desc">
                      Meilleures notes
                    </SelectItem>
                     <SelectItem value="price-asc">
                      Prix: croissant
                    </SelectItem>
                    <SelectItem value="price-desc">
                      Prix: décroissant
                    </SelectItem>
                    <SelectItem value="name-asc">
                      Nom: A-Z
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="font-semibold text-base mb-4 block">Catégories</Label>
                <div className="space-y-2">
                   <Button
                      variant="ghost"
                      onClick={() => handleFilterChange('category', "all")}
                      className={cn(
                        "w-full justify-start text-left",
                        currentCategory === "all" && "bg-accent font-semibold"
                      )}
                    >
                      Tous les produits
                    </Button>
                  {categories.map((category) => {
                    const Icon = iconMap[category.icon];
                    return (
                     <Button
                      key={category.id}
                      variant="ghost"
                      onClick={() => handleFilterChange('category', category.slug)}
                      className={cn(
                        "w-full justify-start text-left",
                        currentCategory === category.slug && "bg-accent font-semibold"
                      )}
                    >
                      {Icon && <Icon className="mr-2 h-4 w-4 text-muted-foreground" />}
                      {category.name}
                    </Button>
                  )})}
                </div>
              </div>
            </CardContent>
          </Card>
        </aside>

        <main>
          {loading ? <ProductsLoadingSkeleton/> : <ProductList products={products} totalPages={totalPages} currentPage={currentPage}/>}
        </main>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<ProductsLoadingSkeleton />}>
      <PageContent />
    </Suspense>
  )
}
