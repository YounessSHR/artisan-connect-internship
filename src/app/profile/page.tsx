
"use client";

import withAuth from "@/components/with-auth";
import { useAuth } from "@/hooks/use-auth";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProfileForm } from "@/components/profile-form";
import { Button } from "@/components/ui/button";
import { ChangePasswordForm } from "@/components/change-password-form";
import { ProfileAvatar } from "@/components/profile-avatar";


function ProfilePage() {
  const { user, logout } = useAuth();

  // withAuth ensures user is not null, but we check anyway for type safety
  if (!user) {
    return null;
  }

  return (
    <div className="bg-muted/40 flex-grow">
      <div className="container mx-auto px-4 py-8 sm:py-12">
        <div className="grid items-start gap-8 md:grid-cols-3">
          <div className="grid gap-6 md:sticky top-24">
            <Card>
              <CardContent className="p-6">
                 <ProfileAvatar user={user} />
              </CardContent>
            </Card>
             <Card>
                <CardContent className="p-4">
                    <Button onClick={logout} variant="ghost" className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10">
                        Se Déconnecter
                    </Button>
                </CardContent>
             </Card>
          </div>

          <div className="md:col-span-2">
            <Tabs defaultValue="profile">
              <TabsList className="mb-6 grid w-full grid-cols-3">
                <TabsTrigger value="profile">Profil</TabsTrigger>
                <TabsTrigger value="settings">Paramètres</TabsTrigger>
                <TabsTrigger value="orders" disabled>Commandes</TabsTrigger>
              </TabsList>
              
              <TabsContent value="profile">
                 <ProfileForm user={user} />
              </TabsContent>

              <TabsContent value="settings">
                <ChangePasswordForm />
              </TabsContent>

               <TabsContent value="orders">
                <Card>
                    <CardContent className="p-6">
                        <p>L'historique des commandes sera bientôt disponible.</p>
                    </CardContent>
                </Card>
              </TabsContent>

            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withAuth(ProfilePage);
