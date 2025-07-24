
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2, MailCheck } from "lucide-react";
import Link from "next/link";

const COOLDOWN_SECONDS = 60;

export default function VerifyEmailPage() {
    const { user, sendVerificationEmail, loading, logout } = useAuth();
    const router = useRouter();
    const { toast } = useToast();
    const [isSending, setIsSending] = useState(false);
    const [cooldown, setCooldown] = useState(0);

    useEffect(() => {
        // If user is verified, redirect them to their profile.
        // This handles the case where they click the link in their email and come back to the app.
        if (!loading && user?.emailVerified) {
            router.push('/profile');
        }
    }, [user, loading, router]);
    
    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (cooldown > 0) {
            timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
        }
        return () => clearTimeout(timer);
    }, [cooldown]);

    const handleResendVerification = async () => {
        setIsSending(true);
        try {
            await sendVerificationEmail();
            toast({
                title: "E-mail envoyé",
                description: "Un nouvel e-mail de vérification a été envoyé à votre adresse.",
            });
            setCooldown(COOLDOWN_SECONDS);
        } catch (error: any) {
            toast({
                title: "Erreur",
                description: error.message || "Impossible d'envoyer l'e-mail de vérification.",
                variant: "destructive",
            });
        } finally {
            setIsSending(false);
        }
    };
    
    if (loading) {
        return (
             <div className="container flex min-h-[calc(100vh-10rem)] items-center justify-center py-12">
                 <Loader2 className="h-8 w-8 animate-spin text-primary" />
             </div>
        )
    }
    
    // This case should ideally not be reached if AuthProvider redirects logged out users,
    // but it's a good safeguard.
    if (!user) {
        return (
            <div className="container flex min-h-[calc(100vh-10rem)] items-center justify-center py-12">
                 <Card className="w-full max-w-md text-center p-8">
                     <CardTitle className="text-2xl font-headline">Session expirée</CardTitle>
                     <CardDescription className="mt-2 mb-6">Veuillez vous reconnecter pour continuer.</CardDescription>
                     <Button asChild><Link href="/login">Se Connecter</Link></Button>
                 </Card>
            </div>
        )
    }

    return (
        <div className="container flex min-h-[calc(100vh-10rem)] items-center justify-center py-12">
            <Card className="w-full max-w-lg text-center shadow-lg">
                <CardHeader>
                     <MailCheck className="mx-auto h-12 w-12 text-primary" />
                    <CardTitle className="text-3xl font-headline mt-4">Vérifiez votre adresse e-mail</CardTitle>
                    <CardDescription className="pt-2 text-base">
                        Nous avons envoyé un lien de vérification à <br />
                        <strong className="text-foreground">{user.email}</strong>.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                        Veuillez cliquer sur le lien dans cet e-mail pour terminer votre inscription. Si vous ne le voyez pas, vérifiez votre dossier de spam.
                    </p>
                    <div className="flex flex-col items-center gap-4">
                        <Button onClick={handleResendVerification} disabled={isSending || cooldown > 0} className="w-full max-w-xs">
                            {isSending ? (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            ) : (
                                "Renvoyer l'e-mail"
                            )}
                             {cooldown > 0 && ` (${cooldown}s)`}
                        </Button>
                        <Button onClick={logout} variant="link">
                            Se connecter avec un autre compte
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
