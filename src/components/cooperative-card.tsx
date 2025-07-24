
import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardDescription,
  CardTitle,
  CardHeader,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import type { Cooperative } from "@/lib/definitions";

interface CooperativeCardProps {
    cooperative: Cooperative;
}

export function CooperativeCard({ cooperative }: CooperativeCardProps) {
  return (
    <Card
      key={cooperative.id}
      className="flex flex-col h-full overflow-hidden transition-all duration-300 hover:shadow-xl group"
    >
      <div className="relative h-56 w-full overflow-hidden bg-muted">
        <Image
          src={`${cooperative.imageUrl}`}
          alt={cooperative.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          data-ai-hint={cooperative.imageHint}
        />
      </div>
      <div className="flex flex-col flex-grow p-6">
        <CardHeader className="p-0 mb-2">
            <CardTitle className="font-headline text-xl">{cooperative.name}</CardTitle>
        </CardHeader>
        <CardDescription className="flex-grow mb-4 text-sm">
          {cooperative.story.substring(0, 120)}...
        </CardDescription>
        <CardFooter className="p-0">
            <Button asChild className="mt-auto w-fit">
            <Link href={`/cooperatives/${cooperative.id}`}>
                En savoir plus <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            </Button>
        </CardFooter>
      </div>
    </Card>
  );
}
