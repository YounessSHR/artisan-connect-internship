
import { getAllPosts } from "@/services/blogService";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { BlogPostsTable } from "./blog-posts-table";

const POSTS_PER_PAGE = 10;

export default async function AdminBlogPage({ searchParams }: { searchParams: { page?: string }}) {
  const currentPage = Number(searchParams?.page) || 1;

  // For blog, we fetch all posts and paginate on the client side for simplicity.
  // For a very large blog, server-side pagination would be better.
  const allPosts = await getAllPosts();
  const totalPosts = allPosts.length;
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);
  const postsForPage = allPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  return (
    <div className="flex flex-col h-full w-full">
      <header className="flex items-center gap-4 mb-6 flex-shrink-0">
        <SidebarTrigger className="md:hidden" />
        <h1 className="font-headline text-2xl font-bold">Gestion du Blog</h1>
      </header>
      <div className="flex-grow min-h-0 overflow-auto">
        <BlogPostsTable
          posts={postsForPage}
          totalPages={totalPages}
          currentPage={currentPage}
          totalPosts={totalPosts}
        />
      </div>
    </div>
  );
}
