
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FileQuestion } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="container mx-auto flex items-center justify-center min-h-[calc(100vh-10rem)] px-4 py-12">
      <div className="text-center">
        <FileQuestion
          className="mx-auto h-24 w-24 text-primary mb-6"
          strokeWidth={1}
        />
        <h1 className="text-6xl font-bold font-headline text-primary">404</h1>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground">
          Page non trouvée
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Désolé, nous n'avons pas pu trouver la page que vous recherchez.
        </p>
        <Button asChild size="lg" className="mt-8">
          <Link href="/">Retour à l'accueil</Link>
        </Button>
      </div>
    </div>
  );
}
