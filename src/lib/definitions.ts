
/**
 * @fileoverview This file contains all the core TypeScript type definitions for the application's data models.
 * Centralizing these types ensures consistency across the client, server actions, and database services.
 * It serves as a single source of truth for the shape of our data.
 */

// Represents a review submitted by a user for a product.
export interface Review {
  id: string; // The unique ID of the review document.
  author: string; // The public display name of the user who wrote the review.
  authorId: string; // The Firebase UID of the author, for linking to the user profile.
  rating: number; // A star rating from 1 to 5.
  text: string; // The main content of the review.
  date: string; // The date the review was submitted, in ISO string format.
  authorAvatarUrl?: string; // An optional URL for the author's profile picture.
}

// Represents a product available for sale in the store.
export interface Product {
  id: string; // The unique ID of the product document.
  name: string;
  description: string;
  price: number;
  imageUrl: string; // URL for the main product image.
  imageHint?: string; // A hint for AI-powered image generation or search.
  categoryId: string; // The slug of the category this product belongs to.
  cooperativeId: string; // The ID of the cooperative that produces this product.
  artisanId?: string; // Optional: The ID of a specific artisan who made the product.
}

// An extended Product type that includes its calculated average rating.
export type ProductWithRating = Product & {
  avgRating: number;
};

// Represents a product category.
export interface Category {
  id: string;
  name: string;
  slug: string; // A URL-friendly identifier for the category.
  icon: string; // The name of a lucide-react icon to display.
}

// Represents an individual artisan who is part of a cooperative.
export interface Artisan {
  id: string; // A unique ID for the artisan (often a UUID).
  name: string;
  bio: string; // A short biography of the artisan.
  imageUrl: string;
  imageHint?: string;
}

// Represents an artisan cooperative.
export interface Cooperative {
  id: string; // The unique ID of the cooperative document.
  name: string;
  story: string; // The story and background of the cooperative.
  mission: string; // The cooperative's mission statement.
  artisans: Artisan[]; // An array of artisans belonging to this cooperative.
  imageUrl: string;
  imageHint?: string;
  contact: {
    email: string;
    phone: string;
    address: string;
  };
}

// Represents an item in the user's shopping cart. It extends the Product type with quantity.
export interface CartItem extends Product {
  quantity: number;
}

// Represents a blog post.
export interface BlogPost {
  slug: string; // The URL-friendly identifier, used as the document ID.
  title: string;
  excerpt: string; // A short summary of the post.
  content: string; // The full content of the post, can contain HTML.
  imageUrl: string;
  imageHint?: string;
  author: string;
  date: string; // The publication date, in "YYYY-MM-DD" format.
  tags: string[];
}

// Represents a user's public profile data.
export interface UserProfile {
  uid: string; // The Firebase Authentication user ID.
  name: string;
  email: string;
  isAdmin?: boolean; // Indicates if the user has administrative privileges.
  emailVerified?: boolean; // The user's email verification status from Firebase Auth.
  avatarUrl?: string; // URL for the user's profile picture. Can be a data URL.
}

// A generic type for search parameters passed to server components from the URL.
export type SearchParams = {
  [key: string]: string | string[] | undefined;
};
