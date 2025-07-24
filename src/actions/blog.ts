
'use server';

import { revalidatePath } from 'next/cache';
import { db } from '@/lib/firebase-admin';
import { z } from 'zod';
import type { BlogPost } from '@/lib/definitions';

// Helper function to generate a URL-friendly slug from a title
function createSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '');
}

const blogPostSchema = z.object({
  title: z.string().min(5, "Le titre doit contenir au moins 5 caractères."),
  excerpt: z.string().min(10, "L'extrait doit contenir au moins 10 caractères."),
  content: z.string().min(50, "Le contenu doit contenir au moins 50 caractères."),
  imageUrl: z.string().url("URL d'image invalide.").optional().or(z.literal('')),
  imageHint: z.string().optional(),
  author: z.string().min(2, "Le nom de l'auteur est requis."),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "La date doit être au format YYYY-MM-DD."),
  tags: z.string().min(1, "Veuillez ajouter au moins un tag.").transform(val => val.split(',').map(tag => tag.trim())),
});

export type BlogPostFormInput = z.infer<typeof blogPostSchema>;

export async function createBlogPost(data: BlogPostFormInput): Promise<{ success: boolean; message: string; slug?: string }> {
  const validation = blogPostSchema.safeParse(data);
  if (!validation.success) {
    return { success: false, message: validation.error.errors.map(e => e.message).join(', ') };
  }

  const { title, ...rest } = validation.data;
  const slug = createSlug(title);

  try {
    const docRef = db.collection('blogPosts').doc(slug);
    const doc = await docRef.get();
    if (doc.exists) {
      return { success: false, message: "Un article avec un titre similaire existe déjà, veuillez en choisir un autre." };
    }

    const postData: Omit<BlogPost, 'slug'> = {
      ...rest,
      title,
      imageUrl: rest.imageUrl || `https://placehold.co/1200x675.png`,
      imageHint: rest.imageHint || 'blog post',
    };

    await docRef.set(postData);

    revalidatePath('/admin/blog');
    revalidatePath('/blog');
    revalidatePath(`/blog/${slug}`);

    return { success: true, message: 'Article de blog créé avec succès!', slug };
  } catch (error: any) {
    console.error('Failed to create blog post:', error);
    return { success: false, message: "Une erreur s'est produite lors de la création de l'article." };
  }
}

export async function updateBlogPost(slug: string, data: BlogPostFormInput): Promise<{ success: boolean; message: string }> {
  if (!slug) {
    return { success: false, message: 'Le slug de l\'article est requis.' };
  }

  const validation = blogPostSchema.safeParse(data);
  if (!validation.success) {
    return { success: false, message: validation.error.errors.map(e => e.message).join(', ') };
  }

  try {
    const postData: Omit<BlogPost, 'slug'> = {
      ...validation.data,
      imageUrl: validation.data.imageUrl || `https://placehold.co/1200x675.png`,
      imageHint: validation.data.imageHint || 'blog post',
    };
    
    await db.collection('blogPosts').doc(slug).update(postData);

    revalidatePath('/admin/blog');
    revalidatePath('/blog');
    revalidatePath(`/blog/${slug}`);

    return { success: true, message: 'Article de blog mis à jour avec succès!' };
  } catch (error: any) {
    console.error('Failed to update blog post:', error);
    return { success: false, message: "Une erreur s'est produite lors de la mise à jour de l'article." };
  }
}

export async function deleteBlogPost(slug: string): Promise<{ success: boolean; message: string }> {
  if (!slug) {
    return { success: false, message: 'Le slug de l\'article est requis.' };
  }

  try {
    await db.collection('blogPosts').doc(slug).delete();

    revalidatePath('/admin/blog');
    revalidatePath('/blog');

    return { success: true, message: 'Article de blog supprimé avec succès!' };
  } catch (error: any) {
    console.error('Failed to delete blog post:', error);
    return { success: false, message: "Une erreur s'est produite lors de la suppression de l'article." };
  }
}

    