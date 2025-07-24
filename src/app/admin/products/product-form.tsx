
"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createProduct, updateProduct } from "@/actions/products";
import { getCategories } from "@/lib/categories";
import type { Cooperative, Product } from "@/lib/definitions";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

const productFormSchema = z.object({
  name: z.string().min(3, "Le nom doit contenir au moins 3 caractères."),
  description: z.string().min(10, "La description doit contenir au moins 10 caractères."),
  price: z.coerce.number().positive("Le prix doit être un nombre positif."),
  cooperativeId: z.string({ required_error: "Veuillez sélectionner une coopérative." }).min(1, "Veuillez sélectionner une coopérative."),
  categoryId: z.string({ required_error: "Veuillez sélectionner une catégorie." }).min(1, "Veuillez sélectionner une catégorie."),
  imageUrl: z.string().url("URL invalide.").optional().or(z.literal('')),
  imageHint: z.string().optional(),
  artisanId: z.string().optional(),
});

type ProductFormValues = z.infer<typeof productFormSchema>;

interface ProductFormProps {
    product?: Product | null;
    cooperatives: Cooperative[];
    onFormSubmit?: () => void;
}

export function ProductForm({ product, cooperatives, onFormSubmit }: ProductFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const categories = getCategories();
  const isEditing = !!product;

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: product ? {
      name: product.name || "",
      description: product.description || "",
      price: product.price || 0,
      cooperativeId: product.cooperativeId || "",
      categoryId: product.categoryId || "",
      imageUrl: product.imageUrl || "",
      imageHint: product.imageHint || "",
      artisanId: product.artisanId || "",
    } : {
      name: "",
      description: "",
      price: 0,
      cooperativeId: "",
      categoryId: "",
      imageUrl: "",
      imageHint: "",
      artisanId: "",
    },
  });

  const selectedCooperativeId = form.watch("cooperativeId");
  
  const artisansOfSelectedCooperative = useMemo(() => {
    if (!selectedCooperativeId) return [];
    const coop = cooperatives.find(c => c.id === selectedCooperativeId);
    return coop?.artisans || [];
  }, [selectedCooperativeId, cooperatives]);

  async function onSubmit(data: ProductFormValues) {
    setIsLoading(true);
    const result = isEditing
      ? await updateProduct(product!.id, data)
      : await createProduct(data);
    setIsLoading(false);

    if (result.success) {
      toast({
        title: "Succès",
        description: result.message,
      });
      onFormSubmit?.();
      router.refresh(); 
    } else {
      toast({
        title: "Erreur",
        description: result.message,
        variant: "destructive",
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom du produit</FormLabel>
              <FormControl>
                <Input placeholder="Tapis Berbère..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Description détaillée du produit..." {...field} rows={4} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Prix</FormLabel>
                <FormControl>
                    <Input type="number" step="0.01" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Catégorie</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                    <SelectTrigger>
                        <SelectValue placeholder="Sélectionner une catégorie" />
                    </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                    {categories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.slug}>
                        {cat.name}
                        </SelectItem>
                    ))}
                    </SelectContent>
                </Select>
                <FormMessage />
                </FormItem>
            )}
        />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="cooperativeId"
              render={({ field }) => (
                  <FormItem>
                  <FormLabel>Coopérative</FormLabel>
                  <Select onValueChange={(value) => {
                      field.onChange(value)
                      form.setValue('artisanId', '');
                  }} defaultValue={field.value}>
                      <FormControl>
                      <SelectTrigger>
                          <SelectValue placeholder="Sélectionner une coopérative" />
                      </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                      {cooperatives.map((coop) => (
                          <SelectItem key={coop.id} value={coop.id}>
                          {coop.name}
                          </SelectItem>
                      ))}
                      </SelectContent>
                  </Select>
                  <FormMessage />
                  </FormItem>
              )}
            />
            {artisansOfSelectedCooperative.length > 0 && (
              <FormField
                control={form.control}
                name="artisanId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Artisan (Optionnel)</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value || ""}>
                        <FormControl>
                        <SelectTrigger>
                            <SelectValue placeholder="Sélectionner un artisan" />
                        </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                        {artisansOfSelectedCooperative.map((artisan) => (
                            <SelectItem key={artisan.id} value={artisan.id}>
                            {artisan.name}
                            </SelectItem>
                        ))}
                        </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
        </div>
        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL de l'image (Optionnel)</FormLabel>
              <FormControl>
                <Input placeholder="https://placehold.co/600x400.png" {...field} value={field.value ?? ''} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="imageHint"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Indice pour l'image (Optionnel)</FormLabel>
              <FormControl>
                <Input placeholder="e.g., 'berber rug'" {...field} value={field.value ?? ''} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end pt-4">
            <Button type="submit" disabled={isLoading} size="lg">
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isLoading ? (isEditing ? "Sauvegarde..." : "Ajout...") : (isEditing ? "Sauvegarder les changements" : "Ajouter le produit")}
            </Button>
        </div>
      </form>
    </Form>
  );
}
