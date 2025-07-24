
"use client"

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product-card";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ArrowRight, Utensils, Briefcase, Home, ShoppingBag, Gem, Scissors, Palette } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";
import type { ProductWithRating, Category } from "@/lib/definitions";
import { Skeleton } from "@/components/ui/skeleton";
import type { LucideIcon } from "lucide-react";

const heroSlides = [
  {
    title: "Un Voyage au Cœur de l'Artisanat Marocain",
    subtitle: "Authenticité, Engagement Local, Impact Écologique, Héritage Culturel.",
    imageUrl: "https://placehold.co/1600x900.png",
    imageHint: "moroccan souk",
    buttonLink: "/products",
    buttonText: "Découvrir",
  },
  {
    title: "La Beauté des Tapis Berbères",
    subtitle: "Chaque fil raconte une histoire. Apportez une âme à votre intérieur.",
    imageUrl: "https://placehold.co/1600x900.png",
    imageHint: "berber rug close-up",
    buttonLink: "/products?category=decoration-interieure",
    buttonText: "Voir les Tapis",
  },
  {
    title: "Élégance Faite Main",
    subtitle: "Découvrez nos collections uniques de bijoux et d'accessoires.",
    imageUrl: "https://placehold.co/1600x900.png",
    imageHint: "moroccan jewelry woman",
    buttonLink: "/products?category=bijoux",
    buttonText: "Explorer les Bijoux",
  },
];

const iconMap: { [key: string]: LucideIcon } = {
    Utensils,
    Briefcase,
    Home,
    ShoppingBag,
    Gem,
    Scissors,
    Palette
};

interface HomeClientProps {
    featuredProducts: ProductWithRating[];
    categories: Category[];
}

export function HomeClient({ featuredProducts, categories }: HomeClientProps) {
    return (
        <div className="flex flex-col min-h-screen">
        <main className="flex-grow">
            <section className="w-full relative">
            <Carousel
                plugins={[
                Autoplay({
                    delay: 5000,
                    stopOnInteraction: true,
                }),
                ]}
                className="w-full"
                opts={{ loop: true }}
            >
                <CarouselContent className="h-[70vh] min-h-[450px]">
                {heroSlides.map((slide, index) => (
                    <CarouselItem key={index} className="h-full">
                    <div className="relative h-full w-full flex items-center justify-center text-center text-white">
                        <Image
                        src={slide.imageUrl}
                        alt={slide.title}
                        fill
                        className="object-cover brightness-50"
                        priority={index === 0}
                        sizes="100vw"
                        data-ai-hint={slide.imageHint}
                        />
                        <div className="relative z-10 px-4 sm:px-6">
                        <h1 className="font-headline text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4">
                            {slide.title}
                        </h1>
                        <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto">
                            {slide.subtitle}
                        </p>
                        <div>
                            <Button
                            asChild
                            size="lg"
                            className="bg-white text-primary hover:bg-white/90"
                            >
                            <Link href={slide.buttonLink}>{slide.buttonText}</Link>
                            </Button>
                        </div>
                        </div>
                    </div>
                    </CarouselItem>
                ))}
                </CarouselContent>
                <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-20 hidden md:flex h-10 w-10" />
                <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-20 hidden md:flex h-10 w-10" />
            </Carousel>
            </section>

            <section className="py-16 lg:py-24 bg-background">
            <div className="container mx-auto px-4">
                <h2 className="font-headline text-3xl md:text-4xl font-bold text-center mb-12">
                Produits Phares
                </h2>
                {featuredProducts && featuredProducts.length > 0 ? (
                    <Carousel
                    opts={{
                        align: "start",
                        loop: true,
                    }}
                    plugins={[
                        Autoplay({
                        delay: 3000,
                        stopOnInteraction: false,
                        }),
                    ]}
                    className="w-full"
                    >
                    <CarouselContent>
                        {featuredProducts.map((product, index) => (
                        <CarouselItem
                            key={index}
                            className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                        >
                            <div className="p-1 h-full">
                            <ProductCard product={product} />
                            </div>
                        </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="hidden sm:flex" />
                    <CarouselNext className="hidden sm:flex" />
                    </Carousel>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="space-y-2">
                            <Skeleton className="h-64 w-full" />
                            <Skeleton className="h-6 w-3/4" />
                            <Skeleton className="h-6 w-1/4" />
                        </div>
                        ))}
                    </div>
                )}
            </div>
            </section>

            <section className="py-16 lg:py-24">
            <div className="container mx-auto px-4">
                <h2 className="font-headline text-3xl md:text-4xl font-bold text-center mb-12">
                Nos Catégories
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {categories.slice(0, 6).map((category, index) => {
                    const Icon = iconMap[category.icon];
                    return (
                        <div key={category.id}>
                        <Link
                            href={`/products?category=${category.slug}`}
                            className="group block h-full"
                        >
                            <Card className="overflow-hidden h-full flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                            <CardHeader className="p-6">
                                <CardTitle className="flex items-center gap-3 font-headline text-2xl">
                                {Icon && <Icon className="h-8 w-8 text-primary" />}
                                {category.name}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-6 pt-0 flex-grow">
                                <CardDescription>
                                Explorez notre collection de{" "}
                                {category.name.toLowerCase()}.
                                </CardDescription>
                            </CardContent>
                            <CardContent className="p-6 pt-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <Button variant="link" className="p-0 text-base">
                                Voir plus <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </CardContent>
                            </Card>
                        </Link>
                        </div>
                    )
                })}
                </div>
            </div>
            </section>
        </main>
        </div>
    );
}
