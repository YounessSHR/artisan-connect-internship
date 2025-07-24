
"use client";

import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, MapPin } from "lucide-react";
import { ArtisanProfile } from "@/components/artisan-profile";
import type { Cooperative, Product, Artisan } from "@/lib/definitions";
import { ProductCard } from "@/components/product-card";

type ArtisanWithProducts = Artisan & {
    products: Product[];
}

type CooperativeWithArtisanProducts = Cooperative & {
    artisans: ArtisanWithProducts[];
}

export function CooperativeDetailContent({ cooperative, cooperativeProducts }: { cooperative: CooperativeWithArtisanProducts, cooperativeProducts: Product[] }) {

  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          <div className="lg:col-span-2">
             <div className="aspect-square relative rounded-lg overflow-hidden shadow-lg sticky top-24">
                <Image
                    src={`${cooperative.imageUrl}`}
                    alt={cooperative.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    data-ai-hint={cooperative.imageHint}
                  />
              </div>
          </div>
          <div className="lg:col-span-3">
            <h1 className="font-headline text-4xl md:text-5xl font-bold mb-4">
              {cooperative.name}
            </h1>
            <p className="text-lg text-muted-foreground mb-6">{cooperative.story}</p>
            <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <Card>
                    <CardHeader><CardTitle className="font-headline text-xl">Notre Mission</CardTitle></CardHeader>
                    <CardContent><p className="text-foreground/80">{cooperative.mission}</p></CardContent>
                </Card>
                <Card>
                  <CardHeader><CardTitle className="font-headline text-xl">Contact</CardTitle></CardHeader>
                  <CardContent className="space-y-3 text-sm">
                      <p className="flex items-start gap-3"><Mail className="h-5 w-5 text-primary mt-1 shrink-0"/> {cooperative.contact.email}</p>
                      <p className="flex items-start gap-3"><Phone className="h-5 w-5 text-primary mt-1 shrink-0"/> {cooperative.contact.phone}</p>
                      <p className="flex items-start gap-3"><MapPin className="h-5 w-5 text-primary mt-1 shrink-0"/> {cooperative.contact.address}</p>
                  </CardContent>
              </Card>
            </div>
            {cooperativeProducts.length > 0 && (
              <div>
                <h3 className="font-headline text-2xl font-bold mb-4">Produits de cette coopérative</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {cooperativeProducts.map(product => (
                    <ProductCard product={product} key={product.id} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {cooperative.artisans && cooperative.artisans.length > 0 && (
          <div className="my-16">
            <h2 className="font-headline text-3xl font-bold mb-8 text-center scroll-m-20" id="artisans">Rencontrez nos Artisans</h2>
            <div className="space-y-12">
              {cooperative.artisans.map(artisan => (
                <div key={artisan.id} id={`artisan-${artisan.id}`} className="scroll-m-20">
                  <ArtisanProfile artisan={artisan} products={artisan.products} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
