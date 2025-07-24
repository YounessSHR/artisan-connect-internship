
"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import { Skeleton } from "@/components/ui/skeleton";

export default function withAuth<P extends object>(
  WrappedComponent: React.ComponentType<P>
) {
  const WithAuthComponent = (props: P) => {
    const router = useRouter();
    const pathname = usePathname();
    const { user, isAuthenticated, loading } = useAuth();

    useEffect(() => {
      if (loading) return; // Wait until loading is false

      if (!isAuthenticated) {
        router.replace("/login");
        return;
      }
      
      // If user is authenticated but email is not verified, and they are trying to access
      // a page other than the verification page, redirect them.
      if (isAuthenticated && !user?.emailVerified && pathname !== '/verify-email') {
          router.replace('/verify-email');
      }

    }, [loading, isAuthenticated, user, router, pathname]);

    if (loading || !isAuthenticated || !user?.emailVerified) {
      return <AuthLoadingScreen />;
    }

    return <WrappedComponent {...props} />;
  };

  WithAuthComponent.displayName = `withAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;
  
  return WithAuthComponent;
}

function AuthLoadingScreen() {
    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-2xl mx-auto">
                <div className="space-y-4">
                    <Skeleton className="h-12 w-1/2 mx-auto" />
                    <Skeleton className="h-8 w-3/4 mx-auto" />
                    <div className="p-4 border rounded-lg">
                        <div className="flex items-center gap-4">
                            <Skeleton className="h-20 w-20 rounded-full" />
                            <div className="space-y-2">
                                <Skeleton className="h-8 w-48" />
                                <Skeleton className="h-6 w-64" />
                            </div>
                        </div>
                        <div className="mt-6 space-y-4">
                            <Skeleton className="h-6 w-32" />
                            <Skeleton className="h-5 w-full" />
                            <Skeleton className="h-5 w-full" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
