
"use client";

import React, { createContext, useState, useEffect, ReactNode, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import { 
  onIdTokenChanged, 
  signInWithEmailAndPassword, 
  signOut, 
  type User as FirebaseUser, 
  reauthenticateWithCredential, 
  EmailAuthProvider, 
  sendPasswordResetEmail,
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase"; // This is the client-side firebase instance
import type { UserProfile } from "@/lib/definitions";

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<FirebaseUser>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<FirebaseUser>;
  reauthenticate: (password: string) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  getIdToken: () => Promise<string | null>;
  updateLocalUser: (newProfileData: Partial<UserProfile>) => void;
  sendVerificationEmail: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

const PROTECTED_ROUTES = ['/profile', '/admin'];
const PUBLIC_ONLY_ROUTES = ['/login', '/register', '/forgot-password'];
const VERIFY_EMAIL_ROUTE = '/verify-email';


export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = onIdTokenChanged(auth, async (firebaseUser: FirebaseUser | null) => {
      setLoading(true);
      
      if (firebaseUser) {
        const idTokenResult = await firebaseUser.getIdTokenResult(true); // Force refresh
        const userIsAdmin = idTokenResult.claims.isAdmin === true;
        
        setIsAdmin(userIsAdmin);

        const userDocRef = doc(db, "users", firebaseUser.uid);
        const userDoc = await getDoc(userDocRef);
        
        let userProfile: UserProfile;

        if (userDoc.exists()) {
          const docData = userDoc.data();
          userProfile = { 
              uid: firebaseUser.uid, 
              ...docData, 
              name: firebaseUser.displayName || docData.name,
              avatarUrl: firebaseUser.photoURL || docData.avatarUrl,
              isAdmin: userIsAdmin, 
              emailVerified: firebaseUser.emailVerified 
          } as UserProfile;
        } else {
          userProfile = { 
            uid: firebaseUser.uid, 
            name: firebaseUser.displayName || 'New User', 
            email: firebaseUser.email!, 
            isAdmin: userIsAdmin,
            emailVerified: firebaseUser.emailVerified,
            avatarUrl: firebaseUser.photoURL || '',
          };
        }
        setUser(userProfile);

        // --- Auth Routing Logic ---
        if (userProfile.emailVerified) {
            if(PUBLIC_ONLY_ROUTES.includes(pathname) || pathname === VERIFY_EMAIL_ROUTE) {
                router.push('/profile');
            }
        } else {
            if(pathname !== VERIFY_EMAIL_ROUTE) {
                router.push(VERIFY_EMAIL_ROUTE);
            }
        }

      } else {
        setUser(null);
        setIsAdmin(false);
        if (PROTECTED_ROUTES.some(route => pathname.startsWith(route))) {
            router.push('/login');
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const login = async (email: string, password: string): Promise<FirebaseUser> => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  };

  const register = async (name: string, email: string, password: string): Promise<FirebaseUser> => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const firebaseUser = userCredential.user;
    await updateProfile(firebaseUser, { displayName: name });
    await sendEmailVerification(firebaseUser);
    return firebaseUser;
  };
  
  const logout = async () => {
    await signOut(auth);
    router.push("/");
  };

  const reauthenticate = async (password: string): Promise<void> => {
    const currentUser = auth.currentUser;
    if (!currentUser || !currentUser.email) {
        throw new Error("User not found for re-authentication.");
    }
    const credential = EmailAuthProvider.credential(currentUser.email, password);
    await reauthenticateWithCredential(currentUser, credential);
  };

  const resetPassword = async (email: string): Promise<void> => {
      await sendPasswordResetEmail(auth, email);
  };

  const getIdToken = useCallback(async (): Promise<string | null> => {
      const currentUser = auth.currentUser;
      if (!currentUser) return null;
      return await currentUser.getIdToken();
  }, []);
  
  const updateLocalUser = useCallback((newProfileData: Partial<UserProfile>) => {
    setUser(currentUser => {
      if (!currentUser) return null;
      return { ...currentUser, ...newProfileData };
    });
  }, []);

  const sendVerificationEmail = async (): Promise<void> => {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      throw new Error("No user is currently signed in.");
    }
    await sendEmailVerification(currentUser);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isAdmin,
        loading,
        login,
        logout,
        register,
        reauthenticate,
        resetPassword,
        getIdToken,
        updateLocalUser,
        sendVerificationEmail
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
