
import type { Category } from "@/lib/definitions";

const categories: Omit<Category, 'iconComponent'>[] = [
  { id: "1", name: "Cuisine & Salle à Manger", slug: "cuisine-salle-a-manger", icon: "Utensils" },
  { id: "2", name: "Sacs & Sacs à Main", slug: "sacs-sacs-a-main", icon: "Briefcase" },
  { id: "3", name: "Décoration Intérieure", slug: "decoration-interieure", icon: "Home" },
  { id: "4", name: "Chaussures", slug: "chaussures", icon: "ShoppingBag" },
  { id: "5", name: "Bijoux", slug: "bijoux", icon: "Gem" },
  { id: "6", name: "Pour Elle", slug: "pour-elle", icon: "Scissors" },
  { id: "7", name: "Pour Lui", slug: "pour-lui", icon: "Palette" },
];

export const getCategories = (): Category[] => categories;

export const getCategoryBySlug = (slug: string): Category | undefined => categories.find(c => c.slug === slug);

    
