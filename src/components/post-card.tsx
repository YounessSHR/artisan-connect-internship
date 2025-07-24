
import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import type { BlogPost } from "@/lib/definitions";

interface PostCardProps {
  post: BlogPost;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <Card
      key={post.slug}
      className="flex flex-col h-full overflow-hidden transition-all duration-300 hover:shadow-xl group"
    >
      <Link href={`/blog/${post.slug}`} className="block">
        <div className="relative h-56 w-full overflow-hidden">
          <Image
            src={post.imageUrl}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            data-ai-hint={post.imageHint}
          />
        </div>
      </Link>
      <div className="flex flex-col flex-grow p-6">
        <CardHeader className="p-0 mb-4">
          <div className="text-sm text-muted-foreground mb-2">
            {new Date(post.date).toLocaleDateString("fr-FR", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
          <CardTitle className="font-headline text-xl mb-2">
            <Link
              href={`/blog/${post.slug}`}
              className="hover:text-primary transition-colors"
            >
              {post.title}
            </Link>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0 flex-grow">
          <p className="text-muted-foreground text-sm">{post.excerpt}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {post.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
        <CardFooter className="p-0 mt-6">
          <Button asChild variant="link" className="p-0">
            <Link href={`/blog/${post.slug}`}>
              Lire la suite <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
}
