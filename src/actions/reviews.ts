
'use server';

import { db } from '@/lib/firebase-admin';
import type { Review } from '@/lib/definitions';
import { FieldValue } from 'firebase-admin/firestore';
import { z } from 'zod';

const ReviewSchema = z.object({
  reviewText: z.string().min(10, "L'avis doit contenir au moins 10 caractères."),
  rating: z.number().min(1, "Veuillez sélectionner une note.").max(5),
});

type ReviewData = z.infer<typeof ReviewSchema>;

type UserInfo = {
  uid: string;
  name: string;
}

export async function submitReview(
  productId: string,
  values: ReviewData,
  user: UserInfo
): Promise<{ success: boolean; message: string; review?: Review }> {

  const validation = ReviewSchema.safeParse(values);

  if (!validation.success) {
    return {
      success: false,
      message: validation.error.errors.map((e) => e.message).join(', '),
    };
  }

  if (!user || !user.uid || !user.name) {
      return { success: false, message: 'User information is required.' };
  }

  try {
    const reviewData: Omit<Review, 'id' | 'date'> = {
      author: user.name,
      authorId: user.uid,
      rating: values.rating,
      text: values.reviewText,
    };
    
    const reviewWithTimestamp = {
      ...reviewData,
      date: FieldValue.serverTimestamp(),
    }

    const reviewsColRef = db.collection('products').doc(productId).collection('reviews');
    const newReviewRef = await reviewsColRef.add(reviewWithTimestamp);
    
    const optimisticReview: Review = {
        id: newReviewRef.id,
        ...reviewData,
        date: new Date().toISOString()
    }

    return { success: true, message: 'Merci pour votre avis !', review: optimisticReview };
  } catch (error) {
    console.error('Failed to submit review:', error);
    return {
      success: false,
      message:
        "Une erreur s'est produite lors de la soumission de votre avis.",
    };
  }
}
