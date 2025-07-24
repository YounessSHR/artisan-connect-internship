
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import {
  Home,
  ShoppingBag,
  Users,
  Newspaper,
  Info,
  Mail,
} from "lucide-react";

const navLinks = [
  { href: "/", label: "Accueil", icon: Home },
  { href: "/products", label: "Boutique", icon: ShoppingBag },
  { href: "/cooperatives", label: "Coopératives", icon: Users },
  { href: "/blog", label: "Blog", icon: Newspaper },
  { href: "/about", label: "À Propos", icon: Info },
  { href: "/contact", label: "Contact", icon: Mail },
];

export function MobileNav() {
  const { setOpenMobile } = useSidebar();

  return (
    <div className="flex-grow p-4 space-y-2">
      {navLinks.map((link) => (
        <Button
          key={link.href}
          variant="ghost"
          className="w-full justify-start"
          asChild
        >
          <Link href={link.href} onClick={() => setOpenMobile(false)}>
            <link.icon className="mr-2 h-4 w-4" />
            {link.label}
          </Link>
        </Button>
      ))}
    </div>
  );
}
