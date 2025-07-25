
"use server";

/**
 * @fileoverview This file contains server-side functions for interacting with the 'products' collection in Firestore.
 * It includes functions for fetching, searching, and enriching product data with ratings.
 * These functions are intended for use in Server Components and Server Actions.
 */

import { db } from "@/lib/firebase-admin";
import type { Product, Review, ProductWithRating, UserProfile } from "@/lib/definitions";
import type { Query, CollectionReference } from "firebase-admin/firestore";

type GetProductsOptions = {
    page?: number;
    pageSize?: number;
    category?: string;
    sortBy?: string;
};

/**
 * Fetches all products from the database without pagination or sorting.
 * @returns {Promise<Product[]>} A list of all products.
 */
export const getAllProducts = async (): Promise<Product[]> => {
    const productsCol = db.collection('products');
    const productsSnapshot = await productsCol.get();
    const productList = productsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
    return productList;
};

/**
 * Gets the total count of products, with an optional category filter.
 * @param {{ category?: string }} [options] - Options object.
 * @returns {Promise<number>} The total number of products matching the criteria.
 */
export const getProductsCount = async (options: { category?: string } = {}): Promise<number> => {
    let productsQuery: Query | CollectionReference = db.collection('products');
    if (options.category) {
        productsQuery = productsQuery.where("categoryId", "==", options.category);
    }
    const snapshot = await productsQuery.count().get();
    return snapshot.data().count;
};

/**
 * Fetches all reviews for a specific product, ordered by date.
 * It also enriches each review with the author's avatar URL.
 * @param {string} productId - The ID of the product to fetch reviews for.
 * @returns {Promise<Review[]>} A list of reviews for the product.
 */
export const getProductReviews = async (productId: string): Promise<Review[]> => {
    if (!productId) return [];
    const reviewsCol = db.collection('products').doc(productId).collection('reviews').orderBy('date', 'desc');
    const reviewsSnapshot = await reviewsCol.get();

    // Fetch all user profiles in one go to avoid multiple DB calls in a loop.
    const authorIds = [...new Set(reviewsSnapshot.docs.map(doc => doc.data().authorId).filter(id => !!id))];
    let authorProfiles: Map<string, UserProfile> = new Map();

    if (authorIds.length > 0) {
        // Firestore 'in' queries are limited to 30 items. For a larger app, this might need chunking.
        const usersSnapshot = await db.collection('users').where('__name__', 'in', authorIds).get();
        usersSnapshot.forEach(doc => {
            authorProfiles.set(doc.id, doc.data() as UserProfile);
        });
    }

    return reviewsSnapshot.docs.map(doc => {
        const data = doc.data();
        const authorProfile = authorProfiles.get(data.authorId);
        return { 
            id: doc.id, 
            ...data,
            date: data.date.toDate().toISOString(),
            authorAvatarUrl: authorProfile?.avatarUrl || '',
        } as Review
    });
}


/**
 * Fetches products, enriches them with average ratings, sorts, and paginates them.
 * Note: For performance at scale, calculating and storing avgRating directly on the product document
 * (e.g., via a Cloud Function triggered on review changes) would be more efficient than calculating it on-the-fly.
 * This implementation is a good starting point for small to medium-sized catalogs.
 * @param {GetProductsOptions} [options] - Options for filtering, sorting, and pagination.
 * @returns {Promise<{ products: ProductWithRating[], totalProducts: number }>} Paginated and sorted products with ratings.
 */
export const getProductsWithRatings = async (options: GetProductsOptions = {}): Promise<{ products: ProductWithRating[], totalProducts: number }> => {
    const { page = 1, pageSize = 9, category, sortBy = 'rating-desc' } = options;
    const productsCol = db.collection("products");
    
    // Step 1: Base query with category filter
    let baseQuery: Query = productsCol;
    if (category) {
        baseQuery = baseQuery.where("categoryId", "==", category);
    }
    
    // Get all products that match the filter. We will sort and paginate them in code.
    const allMatchingProductsSnapshot = await baseQuery.get();
    let products = allMatchingProductsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
    } as Product));

    const totalProducts = products.length;

    // Step 2: Enrich with average ratings
    let productsWithRatings = await Promise.all(
        products.map(async (p) => {
            const reviewsSnapshot = await db.collection('products').doc(p.id).collection('reviews').get();
            const reviews = reviewsSnapshot.docs.map(doc => doc.data() as Review);
            const avgRating = reviews.length > 0
                ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
                : 0;
            return { ...p, avgRating };
        })
    );
    
    // Step 3: Sort the entire filtered list in-memory
    productsWithRatings.sort((a, b) => {
        switch (sortBy) {
            case 'rating-desc':
                return b.avgRating - a.avgRating;
            case 'price-asc':
                return a.price - b.price;
            case 'price-desc':
                return b.price - a.price;
            case 'name-asc':
                return a.name.localeCompare(b.name);
            default:
                return b.avgRating - a.avgRating; // Default sort
        }
    });

    // Step 4: Apply pagination to the sorted list
    const startIndex = (page - 1) * pageSize;
    const paginatedProducts = productsWithRatings.slice(startIndex, startIndex + pageSize);

    return { products: paginatedProducts, totalProducts };
};


/**
 * Fetches a single product by its ID.
 * @param {string} id - The document ID of the product.
 * @returns {Promise<Product | undefined>} The product object or undefined if not found.
 */
export const getProductById = async (id: string): Promise<Product | undefined> => {
    if (!id) return undefined;
    const productDocRef = db.collection('products').doc(id);
    const productSnap = await productDocRef.get();
    if (productSnap.exists) {
      return { id: productSnap.id, ...productSnap.data() } as Product;
    }
    return undefined;
};

/**
 * Fetches all products belonging to a specific cooperative.
 * @param {string} cooperativeId - The ID of the cooperative.
 * @returns {Promise<Product[]>} A list of products from the cooperative.
 */
export const getProductsByCooperative = async (cooperativeId: string): Promise<Product[]> => {
    if (!cooperativeId) return [];
    const q = db.collection("products").where("cooperativeId", "==", cooperativeId);
    const querySnapshot = await q.get();
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
};

/**
 * Fetches all products made by a specific artisan.
 * @param {string} [artisanId] - The ID of the artisan.
 * @returns {Promise<ProductWithRating[]>} A list of products with their average ratings.
 */
export const getProductsByArtisan = async (artisanId?: string): Promise<ProductWithRating[]> => {
    if (!artisanId) return [];
    const q = db.collection("products").where("artisanId", "==", artisanId);
    const querySnapshot = await q.get();
    const products = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));

    const productsWithRatings = await Promise.all(
        products.map(async (p) => {
            const reviewsSnapshot = await db.collection('products').doc(p.id).collection('reviews').get();
            const reviews = reviewsSnapshot.docs.map(doc => doc.data() as Review);
            const avgRating = reviews.length > 0
                ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
                : 0;
            return { ...p, avgRating };
        })
    );

    return productsWithRatings;
};

/**
 * Fetches a list of featured products.
 * This implementation fetches a pool of highly-rated products and returns the top ones.
 * For a production app, this could be improved by adding a 'featured' flag to product documents.
 * @returns {Promise<ProductWithRating[]>} A list of featured products.
 */
export async function getFeaturedProducts(): Promise<ProductWithRating[]> {
  const { products: recentProducts } = await getProductsWithRatings({ pageSize: 50, sortBy: "rating-desc" });
  return recentProducts.slice(0, 8);
};

/**
 * Performs a simple text-based search for products.
 * The search is case-insensitive and checks the product name and description.
 * For a large-scale application, a dedicated search service like Algolia or Typesense would be more performant.
 * @param {string} queryText - The text to search for.
 * @returns {Promise<ProductWithRating[]>} A list of products matching the query.
 */
export async function searchProducts(queryText: string): Promise<ProductWithRating[]> {
  if (!queryText) return [];
  
  const productsSnapshot = await db.collection('products').get();
  const allProducts = productsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
  
  const lowerCaseQuery = queryText.toLowerCase();
  const filteredProducts = allProducts.filter(p =>
    p.name.toLowerCase().includes(lowerCaseQuery) ||
    p.description.toLowerCase().includes(lowerCaseQuery)
  );

  const productsWithRatings = await Promise.all(
    filteredProducts.map(async (p) => {
        const reviewsSnapshot = await db.collection('products').doc(p.id).collection('reviews').get();
        const reviews = reviewsSnapshot.docs.map(doc => doc.data() as Review);
        const avgRating = reviews.length > 0
            ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
            : 0;
        return { ...p, avgRating };
    })
  );

  return productsWithRatings;
};
