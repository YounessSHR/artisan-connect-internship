
'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { auth, db } from '@/lib/firebase-admin';
import type { DecodedIdToken } from 'firebase-admin/auth';
import type { UserProfile } from '@/lib/definitions';

// Helper function to verify admin status from a provided token
async function verifyAdmin(idToken: string | undefined): Promise<DecodedIdToken> {
    if (!idToken) {
        throw new Error('Unauthorized - No token provided');
    }
    const decodedToken = await auth.verifyIdToken(idToken);

    if (!decodedToken.isAdmin) {
        throw new Error('Caller is not an admin');
    }
    return decodedToken;
}

// Schema for updating user profile information
const profileFormSchema = z.object({
  name: z.string().min(2, { message: "Le nom doit contenir au moins 2 caractères." }),
});
export type ProfileFormInput = z.infer<typeof profileFormSchema>;

// Schema for changing the user's password
const passwordFormSchema = z.object({
    newPassword: z.string().min(8, { message: "Le nouveau mot de passe doit contenir au moins 8 caractères." }),
});
export type PasswordFormInput = z.infer<typeof passwordFormSchema>;


export async function updateUserProfile(
  userId: string,
  data: ProfileFormInput
): Promise<{ success: boolean; message: string }> {
  if (!userId) {
    return { success: false, message: 'User ID is required.' };
  }

  const validation = profileFormSchema.safeParse(data);

  if (!validation.success) {
    return {
      success: false,
      message: validation.error.errors.map((e) => e.message).join(', '),
    };
  }

  try {
    const { name } = validation.data;
    
    // Update Firestore document
    await db.collection('users').doc(userId).update({
      name: name,
    });
    
    // Update Firebase Auth display name
    await auth.updateUser(userId, {
      displayName: name,
    });

    revalidatePath('/profile');
    revalidatePath('/admin/users');

    return { success: true, message: 'Profil mis à jour avec succès!' };
  } catch (error: any) {
    console.error('Failed to update user profile:', error);
    return {
      success: false,
      message: "Une erreur s'est produite lors de la mise à jour de votre profil.",
    };
  }
}

// Stores the image as a Base64 data URI in Firestore and Firebase Auth
export async function updateUserAvatar(
    userId: string,
    avatarDataUrl: string
): Promise<{ success: boolean, message: string }> {
    if (!userId) {
        return { success: false, message: "User ID is required."};
    }
    if (!avatarDataUrl.startsWith('data:image/')) {
        return { success: false, message: "Invalid image data URL format."};
    }

    try {
        // Update Firestore document with the Data URL
        await db.collection('users').doc(userId).update({
            avatarUrl: avatarDataUrl,
        });

        // Update Firebase Auth photoURL with the Data URL
        await auth.updateUser(userId, {
            photoURL: avatarDataUrl
        });

        revalidatePath('/profile');

        return { success: true, message: "Photo de profil mise à jour." };

    } catch (error: any) {
        console.error("Failed to update avatar:", error);
        // Firestore has a 1MB limit for documents. Check for that error.
        if (error.message.includes('exceeds the maximum size')) {
            return { success: false, message: "L'image est trop volumineuse. Veuillez choisir un fichier de moins de 1 Mo." };
        }
        return { success: false, message: "Impossible de mettre à jour la photo de profil." };
    }
}

// This action is now simpler. It only sets the new password,
// because re-authentication happened securely on the client.
export async function changeUserPassword(
  userId: string,
  data: PasswordFormInput
): Promise<{ success: boolean; message: string }> {
    if (!userId) {
        return { success: false, message: "Informations utilisateur manquantes." };
    }

    const validation = passwordFormSchema.safeParse(data);
    if (!validation.success) {
        return {
            success: false,
            message: validation.error.errors.map((e) => e.message).join(', '),
        };
    }

    const { newPassword } = validation.data;

    try {
        await auth.updateUser(userId, {
            password: newPassword,
        });

        return { success: true, message: "Mot de passe mis à jour avec succès!" };

    } catch (error: any) {
        console.error("Failed to change password:", error);
        return { success: false, message: "Une erreur s'est produite lors de la mise à jour du mot de passe." };
    }
}


export async function setUserAdminStatus(
  token: string,
  targetUserId: string,
  isAdmin: boolean
): Promise<{ success: boolean; message: string }> {
  try {
    const adminUser = await verifyAdmin(token);

    if (adminUser.uid === targetUserId) {
        return { success: false, message: "Vous ne pouvez pas modifier votre propre statut d'administrateur." };
    }

    // Set custom claim in Firebase Auth
    await auth.setCustomUserClaims(targetUserId, { isAdmin });

    // Update the isAdmin field in the Firestore user document
    await db.collection('users').doc(targetUserId).update({ isAdmin });

    revalidatePath('/admin/users');

    return { success: true, message: `Statut de l'utilisateur mis à jour.` };
  } catch (error: any) {
    console.error("Failed to set user admin status:", error);
    if (error.message.includes('Unauthorized') || error.message.includes('Caller is not an admin')) {
        return { success: false, message: "Non autorisé. Seuls les administrateurs peuvent effectuer cette action." };
    }
    return { success: false, message: "Une erreur s'est produite." };
  }
}

export const getAllUsers = async (token?: string): Promise<{ success: boolean; users?: UserProfile[]; message?: string; }> => {
  try {
    await verifyAdmin(token); // Secure this action
    
    const listUsersResult = await auth.listUsers();
    const allAuthUsers = listUsersResult.users;

    const usersCollection = db.collection('users');
    const firestoreDocs = await usersCollection.get();
    const firestoreUsers = new Map(firestoreDocs.docs.map(doc => [doc.id, doc.data()]));

    const userList: UserProfile[] = allAuthUsers.map(userRecord => {
        const firestoreData = firestoreUsers.get(userRecord.uid);
        return {
            uid: userRecord.uid,
            name: userRecord.displayName || firestoreData?.name || 'N/A',
            email: userRecord.email || firestoreData?.email || 'N/A',
            isAdmin: (userRecord.customClaims?.isAdmin as boolean) || false,
            avatarUrl: userRecord.photoURL || firestoreData?.avatarUrl || '',
        };
    }).sort((a,b) => a.name.localeCompare(b.name));

    return { success: true, users: userList };

  } catch (error: any) {
    console.error("Failed to get all users:", error);
     if (error.message.includes('Unauthorized') || error.message.includes('Caller is not an admin')) {
        return { success: false, message: "Non autorisé." };
    }
    return { success: false, message: "Une erreur s'est produite lors de la récupération des utilisateurs." };
  }
};
