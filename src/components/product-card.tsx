
"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import type { ProductWithRating } from "@/lib/definitions";
import { useCart } from "@/hooks/use-cart";
import { useToast } from "@/hooks/use-toast";
import { ShoppingCart } from "lucide-react";
import StarRating from "./star-rating";

interface ProductCardProps {
  product: ProductWithRating;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    toast({
      title: "Ajouté au panier",
      description: `${product.name} a été ajouté à votre panier.`,
    });
  };

  const { avgRating } = product;

  return (
    <Card className="flex flex-col h-full overflow-hidden transition-all duration-300 hover:shadow-xl group">
        <Link href={`/products/${product.id}`} className="block overflow-hidden">
            <CardContent className="p-0">
                <div className="aspect-square relative bg-muted">
                <Image
                    src={`${product.imageUrl}`}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    data-ai-hint={product.imageHint}
                />
                </div>
            </CardContent>
        </Link>
        <CardHeader className="p-4 flex-grow">
            <CardTitle className="text-lg font-headline font-semibold mb-1">
                <Link href={`/products/${product.id}`} className="hover:text-primary stretched-link">
                {product.name}
                </Link>
            </CardTitle>
            {avgRating > 0 && (
                <div className="flex items-center gap-1">
                    <StarRating rating={avgRating} size="sm" />
                </div>
            )}
            <CardDescription className="text-primary font-semibold text-base pt-1">
                ${product.price.toFixed(2)}
            </CardDescription>
        </CardHeader>
        <CardFooter className="p-4 pt-0">
            <Button onClick={handleAddToCart} className="w-full">
                <ShoppingCart className="mr-2 h-4 w-4" />
                Ajouter au panier
            </Button>
        </CardFooter>
    </Card>
  );
}
