
"use server";

/**
 * @fileoverview This file contains server-side functions for interacting with the 'cooperatives' collection in Firestore.
 * These functions are designed to be used in Server Components and Server Actions.
 * They provide a clean and reusable API for fetching cooperative data.
 */

import { db } from "@/lib/firebase-admin";
import type { Cooperative } from "@/lib/definitions";
import type { Query } from "firebase-admin/firestore";

/**
 * Fetches a paginated list of cooperatives from Firestore.
 * @param {object} options - Pagination options.
 * @param {number} [options.page=1] - The page number to fetch.
 * @param {number} [options.pageSize=10] - The number of cooperatives per page.
 * @returns {Promise<{cooperatives: Cooperative[], totalCooperatives: number}>} An object containing the list of cooperatives and the total count.
 */
export const getCooperatives = async ({ page = 1, pageSize = 10 }: { page?: number; pageSize?: number }): Promise<{ cooperatives: Cooperative[], totalCooperatives: number }> => {
    const cooperativesCol = db.collection('cooperatives');

    // Get the total count for pagination purposes.
    const countSnapshot = await cooperativesCol.count().get();
    const totalCooperatives = countSnapshot.data().count;

    // Build the query with ordering and pagination.
    let query: Query = cooperativesCol.orderBy('name');

    if (page > 1) {
      const offset = (page - 1) * pageSize;
      query = query.offset(offset);
    }
    
    query = query.limit(pageSize);
    
    const snapshot = await query.get();
    const coopList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Cooperative));
    
    return { cooperatives: coopList, totalCooperatives };
};

/**
 * Fetches all cooperatives from Firestore, ordered by name.
 * This is useful for populating dropdowns or lists where pagination is not needed.
 * @returns {Promise<Cooperative[]>} A promise that resolves to an array of all cooperatives.
 */
export const getAllCooperatives = async (): Promise<Cooperative[]> => {
    const coopSnapshot = await db.collection('cooperatives').orderBy('name').get();
    const coopList = coopSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Cooperative));
    return coopList;
}

/**
 * Fetches a single cooperative by its document ID.
 * @param {string} id - The ID of the cooperative to fetch.
 * @returns {Promise<Cooperative | undefined>} A promise that resolves to the cooperative object, or undefined if not found.
 */
export const getCooperativeById = async (id: string): Promise<Cooperative | undefined> => {
    if (!id) return undefined;
    const coopSnap = await db.collection('cooperatives').doc(id).get();
    if (coopSnap.exists) {
      return { id: coopSnap.id, ...coopSnap.data() } as Cooperative;
    }
    return undefined;
};

/**
 * Gets the total count of documents in the 'cooperatives' collection.
 * @returns {Promise<number>} A promise that resolves to the total number of cooperatives.
 */
export const getCooperativesCount = async (): Promise<number> => {
    const snapshot = await db.collection('cooperatives').count().get();
    return snapshot.data().count;
};
