'use server';

import { auth, db } from '@/lib/firebase-admin';

// This server action is now only responsible for creating the Firestore user document
// and setting the admin claim if necessary. The auth user is created on the client.
export async function registerUser(
  userData: { uid: string, name: string, email: string }
): Promise<{ success: boolean; message:string }> {

  const { uid, name, email } = userData;

  try {
    // Check if this is the very first user in the system by checking the users collection.
    const usersCollection = await db.collection('users').get();
    const isFirstUser = usersCollection.empty;

    // If they are the first user, grant them the 'isAdmin' custom claim.
    if (isFirstUser) {
        await auth.setCustomUserClaims(uid, { isAdmin: true });
    }

    // Create the user profile document in Firestore
    const userProfile = {
      name: name,
      email: email,
      isAdmin: isFirstUser, // Also store the admin status in the Firestore document
    };
    await db.collection('users').doc(uid).set(userProfile);

    return {
      success: true,
      message: 'User document created successfully in Firestore.',
    };
  } catch (error: any) {
    console.error('Error creating user document in Firestore:', error);
    // This error won't be directly visible to the user, but it's important for debugging.
    return { success: false, message: "Failed to create user document." };
  }
}
