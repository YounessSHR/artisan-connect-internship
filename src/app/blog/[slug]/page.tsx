import { getPostBySlug, getRecentPosts, getAllPosts } from "@/services/blogService";
import { BlogPostContent } from './blog-post-content';
import { notFound } from "next/navigation";

type Props = {
  params: { slug: string };
};

export default async function BlogPostPage({ params }: Props) {
  const post = await getPostBySlug(params.slug);
  
  if (!post) {
    notFound();
  }

  const recentPosts = await getRecentPosts(3, params.slug);

  return <BlogPostContent post={post} recentPosts={recentPosts} />;
}

// Optional: a function to generate static paths at build time.
// This improves performance by pre-rendering blog posts.
export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}
