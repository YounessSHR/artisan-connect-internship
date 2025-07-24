
import { db } from "@/lib/firebase-admin";
import type { BlogPost } from '@/lib/definitions';

export const getAllPosts = async (): Promise<BlogPost[]> => {
  const postsCol = db.collection('blogPosts').orderBy('date', 'desc');
  const postsSnapshot = await postsCol.get();
  const postList = postsSnapshot.docs.map(doc => ({
    slug: doc.id,
    ...doc.data()
  } as BlogPost));
  return postList;
};

export const getPostBySlug = async (slug: string): Promise<BlogPost | undefined> => {
  const postDocRef = db.collection('blogPosts').doc(slug);
  const postSnap = await postDocRef.get();
  if (postSnap.exists) {
    return { slug: postSnap.id, ...postSnap.data() } as BlogPost;
  }
  return undefined;
};

export const getRecentPosts = async (count: number, excludeSlug?: string): Promise<BlogPost[]> => {
    const allPosts = await getAllPosts();
    return allPosts
        .filter(post => post.slug !== excludeSlug)
        .slice(0, count);
}
