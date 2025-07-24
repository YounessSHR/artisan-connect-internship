
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createBlogPost, updateBlogPost } from "@/actions/blog";
import type { BlogPost } from "@/lib/definitions";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const blogPostSchema = z.object({
  title: z.string().min(5, "Le titre doit contenir au moins 5 caractères."),
  excerpt: z.string().min(10, "L'extrait doit contenir au moins 10 caractères."),
  content: z.string().min(50, "Le contenu doit contenir au moins 50 caractères."),
  imageUrl: z.string().url("URL d'image invalide.").optional().or(z.literal('')),
  imageHint: z.string().optional(),
  author: z.string().min(2, "Le nom de l'auteur est requis."),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "La date doit être au format AAAA-MM-JJ."),
  tags: z.string().min(1, "Veuillez ajouter au moins un tag."),
});

type BlogPostFormValues = z.infer<typeof blogPostSchema>;

interface BlogPostFormProps {
  post?: BlogPost | null;
  onFormSubmit?: () => void;
}

export function BlogPostForm({ post, onFormSubmit }: BlogPostFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const isEditing = !!post;

  const form = useForm<BlogPostFormValues>({
    resolver: zodResolver(blogPostSchema),
    defaultValues: post ? {
        ...post,
        tags: post.tags.join(', '),
    } : {
      title: "",
      excerpt: "",
      content: "",
      imageUrl: "",
      imageHint: "",
      author: "Admin",
      date: new Date().toISOString().split('T')[0], // Default to today
      tags: "",
    }
  });

  async function onSubmit(data: any) {
    setIsLoading(true);
    
    const result = isEditing
      ? await updateBlogPost(post.slug, data)
      : await createBlogPost(data);

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
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Titre de l'article</FormLabel>
              <FormControl>
                <Input {...field} placeholder="L'artisanat au coeur de la culture..." />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="excerpt"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Extrait</FormLabel>
              <FormControl>
                <Textarea {...field} rows={2} placeholder="Un court résumé de l'article." />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contenu</FormLabel>
              <FormControl>
                <Textarea {...field} rows={10} placeholder="Le contenu complet de l'article. Vous pouvez utiliser du HTML simple." />
              </FormControl>
              <FormDescription>
                Vous pouvez utiliser des balises HTML simples comme `&lt;p&gt;`, `&lt;h3&gt;`, `&lt;b&gt;` pour formater le texte.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Separator />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField control={form.control} name="author" render={({ field }) => ( <FormItem><FormLabel>Auteur</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )} />
            <FormField control={form.control} name="date" render={({ field }) => ( <FormItem><FormLabel>Date de publication</FormLabel><FormControl><Input type="date" {...field} /></FormControl><FormMessage /></FormItem> )} />
        </div>

        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tags</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Artisanat, Maroc, Culture" />
              </FormControl>
              <FormDescription>
                Séparez les tags par des virgules.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Separator />
        
        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL de l'image (Optionnel)</FormLabel>
              <FormControl>
                <Input placeholder="https://placehold.co/1200x675.png" {...field} />
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
                <Input placeholder="e.g., 'moroccan pottery'" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        

        <div className="flex justify-end pt-4">
          <Button type="submit" disabled={isLoading} size="lg">
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isLoading ? "Enregistrement..." : isEditing ? "Sauvegarder les changements" : "Publier l'article"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
