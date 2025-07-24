
"use client";

import Link from "next/link";
import { ShoppingBag, Search, User, LogOut, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { useAuth } from "@/hooks/use-auth";
import { SearchInput } from "./search-input";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useMounted } from "@/hooks/use-mounted";

export default function Header() {
  const { cartCount } = useCart();
  const { user, logout, isAdmin } = useAuth();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const isMounted = useMounted();

  return (
    <header className="bg-background/95 sticky top-0 z-40 border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between flex-wrap h-20">
           <div className="flex items-center gap-4">
            {isMounted && <SidebarTrigger className="md:hidden"/>}
            <Link
                href="/"
                className="hidden md:block font-headline text-3xl font-bold text-primary"
            >
                ArtisanConnect
            </Link>
          </div>

          <div className="flex items-center justify-end space-x-2">
            <Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Search className="h-5 w-5" />
                  <span className="sr-only">Rechercher</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="p-0 max-w-lg">
                <DialogTitle className="sr-only">Rechercher des produits</DialogTitle>
                <div className="p-6">
                  <SearchInput onSearch={() => setIsSearchOpen(false)} />
                </div>
              </DialogContent>
            </Dialog>

            <Button asChild variant="ghost" size="icon" className="relative">
              <Link href="/cart">
                <ShoppingBag className="h-5 w-5" />
                {isMounted && cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
                    {cartCount}
                  </span>
                )}
                <span className="sr-only">Panier</span>
              </Link>
            </Button>
            
            {isMounted && user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                    <span className="sr-only">Profil</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Mon Compte</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/profile">Profil</Link>
                  </DropdownMenuItem>
                  {isAdmin && (
                    <DropdownMenuItem asChild>
                      <Link href="/admin">
                        <ShieldCheck className="mr-2 h-4 w-4" />
                        Admin
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem disabled>Commandes</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Déconnexion</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : isMounted ? (
              <div className="sm:flex items-center gap-2">
                <Button variant="ghost" asChild>
                  <Link href="/login">Se Connecter</Link>
                </Button>
                <Button asChild>
                  <Link href="/register">S'inscrire</Link>
                </Button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </header>
  );
}
