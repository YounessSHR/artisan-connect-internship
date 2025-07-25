
"use client";

import Image from "next/image";
import type { Artisan, Product } from "@/lib/definitions";
import { Card } from "@/components/ui/card";
import { ProductCard } from './product-card';

export function ArtisanProfile({ artisan, products }: { artisan: Artisan, products: Product[] }) {

    return (
        <Card className="overflow-hidden shadow-lg transform transition-all duration-300 hover:shadow-2xl">
            <div className="grid md:grid-cols-3 gap-6">
                <div className="md:col-span-1 relative min-h-[300px]">
                    <Image 
                        src={artisan.imageUrl} 
                        alt={artisan.name} 
                        fill
                        className="object-cover" 
                        sizes="(max-width: 768px) 100vw, 33vw"
                        data-ai-hint={artisan.imageHint}
                    />
                </div>
                <div className="md:col-span-2 p-6 flex flex-col">
                    <h3 className="font-headline text-3xl font-bold mb-4">{artisan.name}</h3>
                    <p className="text-foreground/80 leading-relaxed font-sans">{artisan.bio}</p>
                </div>
            </div>
            {products.length > 0 && (
                 <div className="bg-muted/50 p-6">
                    <h4 className="font-headline text-xl font-semibold mb-4">Créations de {artisan.name}</h4>
                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {products.map(product => (
                            <ProductCard key={product.id} product={{ ...product, avgRating: 0 } as any} />
                        ))}
                    </div>
                </div>
            )}
        </Card>
    );
}
