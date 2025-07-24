
import { Suspense } from "react";
import { searchProducts } from "@/services/productService";
import { ProductCard } from "@/components/product-card";
import { Card } from "@/components/ui/card";
import { SearchX, Loader2 } from "lucide-react";
import type { ProductWithRating } from "@/lib/definitions";
import { Skeleton } from "@/components/ui/skeleton";

export default function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const query = searchParams.q || "";

  return (
    <div className="container mx-auto px-4 py-8">
      {query ? (
        <>
          <h1 className="font-headline text-3xl font-bold mb-2">
            Résultats de recherche
          </h1>
          <Suspense key={query} fallback={<SearchResultsSkeleton query={query} />}>
            <SearchResults query={query} />
          </Suspense>
        </>
      ) : (
        <div className="text-center py-16">
          <h1 className="font-headline text-3xl font-bold text-center">
            Veuillez saisir un terme pour lancer la recherche.
          </h1>
        </div>
      )}
    </div>
  );
}

async function SearchResults({ query }: { query: string }) {
  const results = await searchProducts(query);

  return (
    <>
      <p className="text-muted-foreground mb-8">
        {results.length} résultat{results.length !== 1 ? 's' : ''} pour "{query}"
      </p>
      {results.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {results.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <Card className="text-center p-12 mt-8">
          <div className="flex flex-col items-center gap-4">
            <SearchX className="h-16 w-16 text-muted-foreground" strokeWidth={1} />
            <h2 className="font-headline text-2xl font-semibold">Aucun résultat</h2>
            <p className="text-muted-foreground max-w-md">
              Nous n'avons trouvé aucun produit correspondant à votre recherche. Essayez un autre mot-clé ou parcourez nos catégories.
            </p>
          </div>
        </Card>
      )}
    </>
  );
}

function SearchResultsSkeleton({ query }: { query: string }) {
    return (
        <div>
            <p className="text-muted-foreground mb-8">
                Recherche des résultats pour "{query}"...
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="space-y-2">
                        <Skeleton className="h-64 w-full" />
                        <Skeleton className="h-6 w-3/4" />
                        <Skeleton className="h-6 w-1/4" />
                    </div>
                ))}
            </div>
        </div>
    )
}
