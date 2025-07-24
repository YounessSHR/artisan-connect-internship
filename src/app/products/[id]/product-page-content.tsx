
"use client"
import Image from "next/image";
import Link from "next/link";
import { ProductAddToCart } from "./product-add-to-cart";
import StarRating from "@/components/star-rating";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { Product, Cooperative, Review, Artisan } from "@/lib/definitions";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { submitReview } from "@/actions/reviews";
import { useToast } from "@/hooks/use-toast";
import { Loader2, User, Star } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";


const reviewSchema = z.object({
  reviewText: z.string().min(10, "L'avis doit contenir au moins 10 caractères."),
  rating: z.number().min(1, "Veuillez sélectionner une note.").max(5),
});

type CategoryInfo = {
    name: string;
    slug: string;
}

type ExtendedCooperative = Cooperative & {
    artisanDetails?: Artisan;
}

export function ProductPageContent({ product, cooperative, category, initialReviews }: { product: Product, cooperative?: ExtendedCooperative, category?: CategoryInfo, initialReviews: Review[] }) {

  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

  const averageRating = reviews.length > 0 
    ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
    : 0;

  const form = useForm<z.infer<typeof reviewSchema>>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      reviewText: "",
      rating: 0,
    }
  });

  const onSubmitReview = async (values: z.infer<typeof reviewSchema>) => {
    if (!user) return;
    setIsSubmittingReview(true);

    const result = await submitReview(product.id, values, user);

    if (result.success && result.review) {
      toast({ title: "Avis soumis", description: "Merci pour votre contribution !" });
      // Add the new review, making sure to include the current user's avatar for instant UI update.
      const newReviewWithAvatar = { ...result.review, authorAvatarUrl: user.avatarUrl };
      setReviews(prev => [newReviewWithAvatar, ...prev]);
      form.reset();
    } else {
      toast({ title: "Erreur", description: result.message, variant: "destructive" });
    }
    setIsSubmittingReview(false);
  }
  
  const artisan = cooperative?.artisans?.find(a => a.id === product.artisanId);


  return (
    <div className="container mx-auto px-4 py-8 sm:py-12">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        <div className="aspect-square relative bg-card rounded-lg shadow-sm overflow-hidden sticky top-24 self-start">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            data-ai-hint={product.imageHint}
          />
        </div>
        <div className="flex flex-col">
          <h1 className="font-headline text-3xl md:text-4xl font-bold mb-2">{product.name}</h1>
          <div className="flex items-center gap-2 text-muted-foreground mb-4">
            {cooperative && (
                <Link href={`/cooperatives/${cooperative.id}`} className="hover:text-primary">
                Vendu par {cooperative.name}
                </Link>
            )}
            {category && (
                <>
                <span>•</span>
                <Link href={`/products?category=${category.slug}`} className="hover:text-primary">{category.name}</Link>
                </>
            )}
          </div>
          
           {reviews.length > 0 && (
            <a href="#reviews" className="flex items-center gap-2 mb-4">
              <StarRating rating={averageRating} />
              <span className="text-sm text-muted-foreground hover:underline">({reviews.length} avis)</span>
            </a>
          )}
          <p className="text-3xl font-semibold text-primary mb-6">
            ${product.price.toFixed(2)}
          </p>
          <p className="text-foreground/80 leading-relaxed mb-6">
            {product.description}
          </p>
          <ProductAddToCart product={product} />

          <Separator className="my-8" />
          
          <div>
            <h3 className="font-headline text-xl font-semibold mb-4">Détails du produit</h3>
            <div className="text-sm text-muted-foreground space-y-2">
                {category && <p><span className="font-semibold text-foreground">Catégorie:</span> {category.name}</p>}
                {cooperative && <p><span className="font-semibold text-foreground">Coopérative:</span> {cooperative.name}</p>}
                <p className="flex items-center gap-2">
                  <span className="font-semibold text-foreground">Artisan:</span>
                  {artisan ? (
                    <Link href={`/cooperatives/${cooperative?.id}#artisan-${artisan.id}`} className="flex items-center gap-2 text-primary hover:underline">
                      <User className="h-4 w-4" />
                      {artisan.name}
                    </Link>
                  ) : (
                    "Collectif de la coopérative"
                  )}
                </p>
            </div>
          </div>

        </div>
      </div>
      
      <div id="reviews" className="mt-16 scroll-m-20">
          <h2 className="font-headline text-3xl font-bold mb-6">Avis des clients</h2>
          
           {isAuthenticated && (
             <Card className="mb-8 p-6">
               <CardHeader className="p-0 mb-4">
                 <CardTitle className="font-headline">Laissez votre avis</CardTitle>
                 <CardDescription>Partagez votre expérience avec la communauté</CardDescription>
               </CardHeader>
               <CardContent className="p-0">
                 <Form {...form}>
                   <form onSubmit={form.handleSubmit(onSubmitReview)} className="space-y-4">
                     <FormField
                        control={form.control}
                        name="rating"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Votre note</FormLabel>
                             <FormControl>
                               <div className="flex items-center gap-1">
                                  {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                      type="button"
                                      key={star}
                                      onClick={() => field.onChange(star)}
                                      className="text-2xl text-amber-400 focus:outline-none focus:ring-2 focus:ring-ring rounded-sm"
                                    >
                                      <Star className={`h-6 w-6 transition-colors ${field.value >= star ? 'fill-amber-400' : 'fill-muted-foreground/20'}`} />
                                    </button>
                                  ))}
                                </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                     <FormField
                        control={form.control}
                        name="reviewText"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Votre avis</FormLabel>
                            <FormControl>
                              <Textarea {...field} placeholder="Décrivez votre expérience avec ce produit..." />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button type="submit" disabled={isSubmittingReview}>
                        {isSubmittingReview && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Soumettre l'avis
                      </Button>
                   </form>
                 </Form>
               </CardContent>
             </Card>
           )}

          {reviews.length > 0 ? (
            <div className="space-y-8">
              {reviews.map((review) => (
                <div key={review.id} className="flex items-start gap-4">
                   <Avatar>
                      <AvatarImage src={review.authorAvatarUrl} alt={review.author} />
                      <AvatarFallback>{review.author.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                  <div className="flex-grow">
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-semibold">{review.author}</p>
                      {review.date && <span className="text-xs text-muted-foreground">{new Date(review.date).toLocaleDateString()}</span>}
                    </div>
                    <StarRating rating={review.rating} />
                    <p className="text-foreground/80 mt-2">{review.text}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <Card className="text-center p-8">
              <p className="text-muted-foreground">Aucun avis pour ce produit pour le moment.</p>
            </Card>
          )}
        </div>
    </div>
  );
}
