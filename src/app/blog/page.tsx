
import { getAllPosts } from "@/services/blogService";
import { PostCard } from "@/components/post-card";
import { Card } from "@/components/ui/card";
import { Newspaper } from "lucide-react";

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary mb-4">
          Notre Blog
        </h1>
        <p className="max-w-3xl mx-auto text-lg text-muted-foreground">
          Découvrez les histoires derrière nos produits, nos artisans et la culture marocaine.
        </p>
      </div>
      {posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <Card className="text-center p-12">
           <div className="flex flex-col items-center gap-4">
                <Newspaper className="h-16 w-16 text-muted-foreground" strokeWidth={1} />
                <h2 className="font-headline text-2xl font-semibold">Aucun article pour le moment</h2>
                <p className="text-muted-foreground max-w-md">
                    Nous sommes en train de rédiger des histoires inspirantes sur nos artisans. Revenez bientôt pour découvrir leurs récits !
                </p>
            </div>
        </Card>
      )}
    </div>
  );
}
