
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutPage() {
  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-12 sm:py-16">
        <div className="text-center">
          <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary mb-4">
            Notre Histoire
          </h1>
          <p className="max-w-3xl mx-auto text-lg text-muted-foreground">
            ArtisanConnect est né d'une profonde appréciation pour le riche
            patrimoine culturel du Maroc et ses artisans talentueux.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center my-12">
          <div className="relative aspect-square rounded-lg overflow-hidden shadow-lg">
            <Image
              src="https://placehold.co/600x600.png"
              alt="Artisans marocains fabriquant des produits"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              data-ai-hint="moroccan artisans"
            />
          </div>
          <div className="space-y-6">
            <h2 className="text-3xl font-semibold text-gray-800 font-headline">
              Autonomiser les Femmes, Préserver la Tradition
            </h2>
            <p className="text-foreground/80 leading-relaxed">
              Nous travaillons directement avec des coopératives de femmes dans les zones rurales du
              Maroc, leur donnant les moyens d'atteindre l'indépendance financière et de
              préserver leur savoir-faire ancestral. Chaque achat que vous effectuez
              soutient ces femmes talentueuses et leurs communautés.
            </p>
            <p className="text-foreground/80 leading-relaxed">
              Notre mission est de combler le fossé entre ces incroyables artisans
              et un public mondial qui valorise l'authenticité, la qualité et
              la production éthique. Nous croyons aux principes du commerce équitable, en veillant à
              ce que chaque artisan soit rémunéré équitablement pour ses compétences et
              son dévouement.
            </p>
            <Button asChild size="lg">
              <Link href="/cooperatives">Découvrez nos coopératives</Link>
            </Button>
          </div>
        </div>

        <div className="text-center py-12">
            <h2 className="text-3xl font-bold mb-8 font-headline">Pourquoi choisir ArtisanConnect?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Card className="transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                    <CardHeader>
                        <CardTitle className="text-xl font-headline">Authentique & Fait Main</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">Chaque article est une pièce d'art unique, fabriquée à la main avec des techniques traditionnelles.</p>
                    </CardContent>
                </Card>
                <Card className="transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                    <CardHeader>
                        <CardTitle className="text-xl font-headline">Éthiquement Sourcé</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">Nous travaillons en partenariat direct avec les coopératives, garantissant des salaires équitables et des pratiques durables.</p>
                    </CardContent>
                </Card>
                 <Card className="transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                    <CardHeader>
                        <CardTitle className="text-xl font-headline">Impact Communautaire</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">Votre achat soutient directement les femmes artisanes et aide à préserver le patrimoine marocain.</p>
                    </CardContent>
                </Card>
            </div>
        </div>
      </div>
    </div>
  );
}
