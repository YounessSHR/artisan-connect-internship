
/**
 * @fileoverview This script seeds the Firestore database with initial data from MOCK_DATA.ts.
 * To run this script, use the command: `npm run db:seed`
 *
 * This script will:
 * 1. Connect to the Firestore database using the Admin SDK.
 * 2. Clear any existing data in the 'products', 'cooperatives', and 'blogPosts' collections.
 * 3. Populate these collections with the data from `MOCK_DATA.ts`.
 *
 * Note: This is a destructive operation. It will delete all data in the specified collections
 * before seeding. Make sure your FIREBASE_SERVICE_ACCOUNT is correctly set in your .env file.
 */
import { db } from '@/lib/firebase-admin';
import { MOCK_PRODUCTS, MOCK_COOPERATIVES, MOCK_BLOG_POSTS } from '@/lib/MOCK_DATA';
import type { Product, Cooperative, BlogPost } from '@/lib/definitions';

async function seedCollection<T extends { id?: string; slug?: string }>(
  collectionName: string,
  data: T[]
) {
  console.log(`Starting to seed collection: ${collectionName}...`);
  const collectionRef = db.collection(collectionName);

  // Firestore doesn't have a simple "clear collection" in the Admin SDK.
  // A common practice for seeding is to delete all existing documents first.
  const snapshot = await collectionRef.get();
  if (!snapshot.empty) {
    console.log(`Clearing existing documents from ${collectionName}...`);
    const batch = db.batch();
    snapshot.docs.forEach(doc => {
      batch.delete(doc.ref);
    });
    await batch.commit();
    console.log(`Cleared ${snapshot.size} documents.`);
  }

  // Add new documents
  let count = 0;
  for (const item of data) {
    // Use 'slug' for blog posts, 'id' for others as the document ID
    const docId = collectionName === 'blogPosts' ? item.slug : item.id;
    if (!docId) {
      console.warn(`Skipping item in ${collectionName} due to missing 'id' or 'slug'.`, item);
      continue;
    }
    const { id, slug, ...rest } = item;
    await collectionRef.doc(docId).set(rest);
    count++;
  }
  console.log(`Seeded ${count} documents into ${collectionName}.`);
}

async function main() {
  console.log('Starting database seeding process...');
  try {
    await seedCollection<Product>('products', MOCK_PRODUCTS);
    await seedCollection<Cooperative>('cooperatives', MOCK_COOPERATIVES);
    await seedCollection<BlogPost>('blogPosts', MOCK_BLOG_POSTS);
    console.log('Database seeding completed successfully!');
  } catch (error) {
    console.error('Error during database seeding:', error);
    process.exit(1);
  }
}

main();
