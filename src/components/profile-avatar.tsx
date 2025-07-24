
"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import type { UserProfile } from "@/lib/definitions";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import { Loader2, Camera } from "lucide-react";
import { updateUserAvatar } from "@/actions/users";

interface ProfileAvatarProps {
  user: UserProfile;
}

// Function to read file as a Data URL
const toBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

export function ProfileAvatar({ user }: ProfileAvatarProps) {
    const { toast } = useToast();
    const { updateLocalUser } = useAuth();
    const [isUploading, setIsUploading] = useState(false);
    
    const handleAvatarChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file || !user) return;

        // Firestore documents have a 1MB limit. We check for a slightly smaller size
        // to account for Base64 encoding overhead.
        if (file.size > 1024 * 1024 * 0.7) { 
            toast({
                title: "Fichier trop volumineux",
                description: "Veuillez sélectionner une image de moins de 700 Ko.",
                variant: "destructive",
            });
            return;
        }

        setIsUploading(true);

        try {
            const dataUrl = await toBase64(file);
            const result = await updateUserAvatar(user.uid, dataUrl);

            if (result.success) {
                updateLocalUser({ avatarUrl: dataUrl });
                toast({
                    title: "Succès",
                    description: "Votre photo de profil a été mise à jour.",
                });
            } else {
                 throw new Error(result.message);
            }

        } catch (error: any) {
             toast({
                title: "Erreur de téléversement",
                description: error.message || "Impossible de mettre à jour la photo de profil.",
                variant: "destructive",
            });
        } finally {
            setIsUploading(false);
        }
    };
    
    return (
        <div className="flex items-center gap-4">
            <div className="relative group">
                <Avatar className="h-20 w-20">
                    <AvatarImage src={user.avatarUrl} alt={user.name ?? ""} />
                    <AvatarFallback>{user.name?.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
                <label htmlFor="avatar-upload" className="absolute inset-0 bg-black/50 flex items-center justify-center text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                    {isUploading ? (
                        <Loader2 className="h-6 w-6 animate-spin" />
                    ) : (
                        <Camera className="h-6 w-6" />
                    )}
                    <input type="file" id="avatar-upload" accept="image/png, image/jpeg" className="sr-only" onChange={handleAvatarChange} disabled={isUploading} />
                </label>
            </div>

            <div className="grid gap-1">
            <div className="text-xl font-bold font-headline">{user.name}</div>
            <div className="text-sm text-muted-foreground break-all">{user.email}</div>
            {user.emailVerified ? (
                <Badge variant="secondary" className="w-fit mt-1 bg-green-100 text-green-800">Vérifié</Badge>
            ) : (
                <Badge variant="destructive" className="w-fit mt-1">Non Vérifié</Badge>
            )}
            </div>
      </div>
    )
}
