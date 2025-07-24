
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { FirebaseError } from "firebase/app";
import { registerUser as createFirestoreUser } from "@/actions/auth";
import { useRouter } from "next/navigation";


const registerSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Le nom doit contenir au moins 2 caractères." }),
  email: z
    .string()
    .email({ message: "Veuillez entrer une adresse e-mail valide." }),
  password: z
    .string()
    .min(8, { message: "Le mot de passe doit contenir au moins 8 caractères." }),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const { register } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    }
  });

  const onSubmit = async (data: RegisterFormValues) => {
    setIsLoading(true);
    try {
      // Step 1: Create user in Firebase Auth (client-side) & send verification email
      const firebaseUser = await register(data.name, data.email, data.password);
      
      // Step 2: Call server action to create Firestore document and set claims
      const firestoreResult = await createFirestoreUser({ uid: firebaseUser.uid, name: data.name, email: data.email });

      if (!firestoreResult.success) {
        // If Firestore creation fails, we should inform the user.
        // In a real production app, you might want to delete the auth user or have a retry mechanism.
        throw new Error(firestoreResult.message);
      }
      
      toast({
        title: "Inscription réussie !",
        description: "Un e-mail de vérification a été envoyé à votre adresse.",
      });

      // Redirect to the verify-email page
      router.push('/verify-email');

    } catch (error: any) {
       let description = "Une erreur inconnue s'est produite.";
       if (error instanceof FirebaseError) {
        if (error.code === 'auth/email-already-in-use') {
          description = "Cette adresse e-mail est déjà utilisée par un autre compte.";
        }
       } else {
         description = error.message;
       }
       toast({
        title: "Erreur d'inscription",
        description: description,
        variant: "destructive",
      });
       setIsLoading(false);
    } 
  };

  return (
    <div className="container flex min-h-[calc(100vh-10rem)] items-center justify-center py-12">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-headline">Créer un Compte</CardTitle>
          <CardDescription>Rejoignez la communauté ArtisanConnect</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
               <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="nom@exemple.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mot de passe</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                S'inscrire
              </Button>
            </form>
          </Form>
          <div className="mt-8 text-center text-sm">
            Vous avez déjà un compte?{" "}
            <Link
              href="/login"
              className="font-semibold text-primary hover:underline"
            >
              Se connecter
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
