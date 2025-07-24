
import { getAllCooperatives } from "@/services/cooperativeService";
import { CooperativeCard } from "@/components/cooperative-card";
import { Card } from "@/components/ui/card";
import { Users } from "lucide-react";

export default async function CooperativesPage() {
  const cooperatives = await getAllCooperatives();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary mb-4">
          Nos Coopératives Partenaires
        </h1>
        <p className="max-w-3xl mx-auto text-lg text-muted-foreground">
          Découvrez les artisans talentueux qui sont au cœur de nos créations. Chaque coopérative a une histoire unique et un savoir-faire exceptionnel.
        </p>
      </div>
      {cooperatives.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cooperatives.map((coop) => (
            <CooperativeCard key={coop.id} cooperative={coop} />
          ))}
        </div>
      ) : (
         <Card className="text-center p-12">
           <div className="flex flex-col items-center gap-4">
                <Users className="h-16 w-16 text-muted-foreground" strokeWidth={1} />
                <h2 className="font-headline text-2xl font-semibold">Aucune coopérative à afficher</h2>
                <p className="text-muted-foreground max-w-md">
                   Nous travaillons activement à l'établissement de nouveaux partenariats. Nos coopératives partenaires seront bientôt présentées ici.
                </p>
            </div>
        </Card>
      )}
    </div>
  );
}
