
'use server';

import { revalidatePath } from 'next/cache';
import { db } from '@/lib/firebase-admin';
import type { Cooperative, Artisan } from '@/lib/definitions';
import { z } from 'zod';
import { v4 as uuidv4 } from 'uuid';

const artisanSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères."),
  bio: z.string().min(10, "La bio doit contenir au moins 10 caractères."),
  imageUrl: z.string().url("URL d'image invalide.").optional().or(z.literal('')),
  imageHint: z.string().optional(),
});

const CooperativeSchema = z.object({
  name: z.string().min(3, { message: "Le nom doit contenir au moins 3 caractères." }),
  story: z.string().min(10, { message: "L'histoire doit contenir au moins 10 caractères." }),
  mission: z.string().min(10, { message: "La mission doit contenir au moins 10 caractères." }),
  imageUrl: z.string().url({ message: "Veuillez entrer une URL d'image valide." }).optional().or(z.literal('')),
  imageHint: z.string().optional(),
  contact: z.object({
    email: z.string().email("Email invalide."),
    phone: z.string().min(10, "Numéro de téléphone invalide."),
    address: z.string().min(5, "Adresse invalide."),
  }),
  artisans: z.array(artisanSchema).optional(),
});

export type CooperativeFormInput = z.infer<typeof CooperativeSchema>;

function processArtisans(artisans: any[] | undefined): Artisan[] {
    if (!artisans) return [];
    return artisans.map(artisan => {
        // An artisan is new if they don't have an ID or if it's a temporary one from the form.
        const isNewArtisan = !artisan.id || artisan.id.startsWith('new_');
        return {
            ...artisan,
            id: isNewArtisan ? uuidv4() : artisan.id,
            imageUrl: artisan.imageUrl || `https://placehold.co/128x128.png`,
            imageHint: artisan.imageHint || 'artisan portrait',
        };
    });
}

export async function createCooperative(
  data: CooperativeFormInput
): Promise<{ success: boolean; message: string; cooperativeId?: string }> {
  const validation = CooperativeSchema.safeParse(data);

  if (!validation.success) {
    return {
      success: false,
      message: validation.error.errors.map((e) => e.message).join(', '),
    };
  }

  const { artisans, ...coopData } = validation.data;
  
  try {
    const processedArtisans = processArtisans(artisans);
    const finalData: Omit<Cooperative, 'id'> = {
      ...coopData,
      artisans: processedArtisans,
      imageUrl: coopData.imageUrl || `https://placehold.co/600x400.png`,
      imageHint: coopData.imageHint || 'cooperative',
    };

    const docRef = await db.collection('cooperatives').add(finalData);

    revalidatePath('/admin/cooperatives');
    revalidatePath('/cooperatives');

    return { success: true, message: 'Coopérative ajoutée avec succès!', cooperativeId: docRef.id };
  } catch (error: any) {
    console.error('Failed to create cooperative:', error);
    return {
      success: false,
      message: "Une erreur s'est produite lors de la création de la coopérative.",
    };
  }
}

export async function updateCooperative(
  cooperativeId: string,
  data: CooperativeFormInput
): Promise<{ success: boolean; message: string }> {
  if (!cooperativeId) {
    return { success: false, message: 'Cooperative ID is required.' };
  }

  const validation = CooperativeSchema.safeParse(data);

  if (!validation.success) {
    return {
      success: false,
message: validation.error.errors.map((e) => e.message).join(', '),
    };
  }

  const { artisans, ...coopData } = validation.data;

  try {
    const processedArtisans = processArtisans(artisans);
    const finalData: Partial<Cooperative> = {
      ...coopData,
      artisans: processedArtisans,
      imageUrl: coopData.imageUrl || `https://placehold.co/600x400.png`,
      imageHint: coopData.imageHint || 'cooperative',
    };

    await db.collection('cooperatives').doc(cooperativeId).update(finalData);

    revalidatePath('/admin/cooperatives');
    revalidatePath(`/cooperatives/${cooperativeId}`);
    revalidatePath('/cooperatives');

    return { success: true, message: 'Coopérative mise à jour avec succès!' };
  } catch (error: any) {
    console.error('Failed to update cooperative:', error);
    return {
      success: false,
      message: "Une erreur s'est produite lors de la mise à jour de la coopérative.",
    };
  }
}


export async function deleteCooperative(
  cooperativeId: string
): Promise<{ success: boolean; message: string }> {
  if (!cooperativeId) {
    return { success: false, message: 'Cooperative ID is required.' };
  }

  try {
    // Note: This does not delete associated products.
    // In a real application, you might want to handle that logic.
    await db.collection('cooperatives').doc(cooperativeId).delete();

    revalidatePath('/admin/cooperatives');
    revalidatePath('/cooperatives');

    return { success: true, message: 'Coopérative supprimée avec succès!' };
  } catch (error: any) {
    console.error('Failed to delete cooperative:', error);
    return {
      success: false,
      message: "Une erreur s'est produite lors de la suppression de la coopérative.",
    };
  }
}

    