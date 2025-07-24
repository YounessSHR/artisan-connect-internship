
"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { UsersTable } from "./users-table";
import { useAuth } from "@/hooks/use-auth";

// This page now acts as a client-side entry point for user management.
// The actual data fetching and rendering is handled by the UsersTable component.
export default function AdminUsersPage() {
    const { isAdmin } = useAuth();

    // Although the layout has an auth guard, we can add a check here for robustness.
    if (!isAdmin) {
        return null;
    }

    return (
        <div className="flex flex-col h-full w-full">
            <header className="flex items-center gap-4 mb-6 flex-shrink-0">
                <SidebarTrigger className="md:hidden" />
                <h1 className="font-headline text-2xl font-bold">Gestion des Utilisateurs</h1>
            </header>
            <div className="flex-grow min-h-0 overflow-auto">
                <UsersTable />
            </div>
        </div>
    );
}
