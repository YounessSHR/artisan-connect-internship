
'use server';

import { revalidatePath } from 'next/cache';
import { db } from '@/lib/firebase-admin';
import type { Product } from '@/lib/definitions';
import { z } from 'zod';

const ProductSchema = z.object({
  name: z.string().min(3, { message: "Le nom doit contenir au moins 3 caractères." }),
  description: z.string().min(10, { message: "La description doit contenir au moins 10 caractères." }),
  price: z.coerce.number().min(0, { message: "Le prix doit être un nombre positif." }),
  cooperativeId: z.string().min(1, { message: "Veuillez sélectionner une coopérative." }),
  categoryId: z.string().min(1, { message: "Veuillez sélectionner une catégorie." }),
  imageUrl: z.string().url({ message: "Veuillez entrer une URL d'image valide." }).optional().or(z.literal('')),
  imageHint: z.string().optional(),
  artisanId: z.string().optional(),
});

export type ProductFormInput = z.infer<typeof ProductSchema>;

export async function createProduct(
  data: ProductFormInput
): Promise<{ success: boolean; message: string; productId?: string }> {
  const validation = ProductSchema.safeParse(data);

  if (!validation.success) {
    return {
      success: false,
      message: validation.error.errors.map((e) => e.message).join(', '),
    };
  }
  
  const { name, description, price, cooperativeId, categoryId, imageUrl, imageHint, artisanId } = validation.data;

  try {
    const productData: Omit<Product, 'id'> = {
      name,
      description,
      price,
      cooperativeId,
      categoryId,
      imageUrl: imageUrl || `https://placehold.co/600x400.png`,
      imageHint: imageHint || 'product',
      artisanId: artisanId || '', 
    };

    const docRef = await db.collection('products').add(productData);

    revalidatePath('/admin/products');
    revalidatePath('/products');

    return { success: true, message: 'Produit ajouté avec succès!', productId: docRef.id };
  } catch (error: any) {
    console.error('Failed to create product:', error);
    return {
      success: false,
      message: "Une erreur s'est produite lors de la création du produit.",
    };
  }
}

export async function updateProduct(
  productId: string,
  data: ProductFormInput
): Promise<{ success: boolean; message: string }> {
  if (!productId) {
    return { success: false, message: 'Product ID is required.' };
  }

  const validation = ProductSchema.safeParse(data);

  if (!validation.success) {
    return {
      success: false,
      message: validation.error.errors.map((e) => e.message).join(', '),
    };
  }

  const { name, description, price, cooperativeId, categoryId, imageUrl, imageHint, artisanId } = validation.data;

  try {
    const productData: Partial<Omit<Product, 'id'>> = {
      name,
      description,
      price,
      cooperativeId,
      categoryId,
      imageUrl: imageUrl || `https://placehold.co/600x400.png`,
      imageHint: imageHint || 'product',
      artisanId: artisanId || '',
    };

    await db.collection('products').doc(productId).update(productData);

    revalidatePath('/admin/products');
    revalidatePath(`/products/${productId}`);
    revalidatePath('/products');

    return { success: true, message: 'Produit mis à jour avec succès!' };
  } catch (error: any) {
    console.error('Failed to update product:', error);
    return {
      success: false,
      message: "Une erreur s'est produite lors de la mise à jour du produit.",
    };
  }
}


export async function deleteProduct(
  productId: string
): Promise<{ success: boolean; message: string }> {
  if (!productId) {
    return { success: false, message: 'Product ID is required.' };
  }

  try {
    await db.collection('products').doc(productId).delete();

    revalidatePath('/admin/products');
    revalidatePath('/products');

    return { success: true, message: 'Produit supprimé avec succès!' };
  } catch (error: any) {
    console.error('Failed to delete product:', error);
    return {
      success: false,
      message: "Une erreur s'est produite lors de la suppression du produit.",
    };
  }
}

    