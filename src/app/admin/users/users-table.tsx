
"use client";

import { useState, useTransition, useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import type { UserProfile } from "@/lib/definitions";
import { setUserAdminStatus, getAllUsers } from "@/actions/users";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

// This is now a pure Client Component that fetches its own data.
export function UsersTable() {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const { user, getIdToken } = useAuth(); // The currently logged-in admin

  useEffect(() => {
    const fetchUsers = async () => {
        setLoading(true);
        setError(null);
        try {
            const token = await getIdToken();
            const result = await getAllUsers(token);
            if (result.success && result.users) {
                setUsers(result.users);
            } else {
                setError(result.message || "Failed to load users.");
                toast({ title: "Erreur", description: result.message, variant: "destructive" });
            }
        } catch (err: any) {
            setError("An unexpected error occurred.");
             toast({ title: "Erreur", description: err.message, variant: "destructive" });
        } finally {
            setLoading(false);
        }
    };

    fetchUsers();
  }, [getIdToken, toast]);


  const handleAdminChange = (targetUserId: string, newIsAdmin: boolean) => {
    if (user?.uid === targetUserId) {
        toast({ title: "Action non autorisée", description: "Vous ne pouvez pas modifier votre propre statut.", variant: "destructive" });
        return;
    }

    startTransition(async () => {
        const token = await getIdToken();
        if (!token) {
            toast({ title: "Erreur d'authentification", description: "Veuillez vous reconnecter.", variant: "destructive"});
            return;
        }

        const result = await setUserAdminStatus(token, targetUserId, newIsAdmin);

        if (result.success) {
            toast({
              title: "Succès",
              description: result.message,
            });
            // Optimistically update the UI
            setUsers(currentUsers => currentUsers.map(u => u.uid === targetUserId ? {...u, isAdmin: newIsAdmin} : u));
        } else {
            toast({
              title: "Erreur",
              description: result.message,
              variant: "destructive",
            });
        }
    });
  };

  if (loading) {
      return (
          <Card>
              <CardHeader><CardTitle>Tous les utilisateurs</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                  {Array.from({length: 5}).map((_, i) => (
                      <div key={i} className="flex justify-between items-center">
                          <div className="space-y-2">
                            <Skeleton className="h-4 w-[250px]" />
                            <Skeleton className="h-4 w-[200px]" />
                          </div>
                          <Skeleton className="h-6 w-11 rounded-full" />
                      </div>
                  ))}
              </CardContent>
          </Card>
      );
  }

  if (error) {
    return (
        <Card className="text-center p-8">
            <p className="text-destructive">{error}</p>
        </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Tous les utilisateurs ({users.length})</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Rôle</TableHead>
              <TableHead className="text-right">Admin</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((targetUser) => (
              <TableRow key={targetUser.uid}>
                <TableCell className="font-medium">{targetUser.name}</TableCell>
                <TableCell>{targetUser.email}</TableCell>
                <TableCell>
                    {targetUser.isAdmin ? 
                        <Badge>Admin</Badge> : 
                        <Badge variant="secondary">Utilisateur</Badge>
                    }
                </TableCell>
                <TableCell className="text-right">
                  <Switch
                    checked={targetUser.isAdmin}
                    onCheckedChange={(isChecked) => handleAdminChange(targetUser.uid, isChecked)}
                    disabled={isPending || user?.uid === targetUser.uid}
                    aria-label={`Définir ${targetUser.name} comme admin`}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {users.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            Aucun utilisateur trouvé.
          </div>
        )}
      </CardContent>
    </Card>
  );
}
