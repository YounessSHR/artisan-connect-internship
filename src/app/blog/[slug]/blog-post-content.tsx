
"use client";

import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import type { BlogPost } from "@/lib/definitions";
import DOMPurify from 'isomorphic-dompurify';

export function BlogPostContent({ post, recentPosts }: { post: BlogPost; recentPosts: BlogPost[] }) {

  const sanitizedContent = DOMPurify.sanitize(post.content);

  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-4 gap-8 lg:gap-12">
          <article className="lg:col-span-3">
            <div className="mb-8">
              <h1 className="font-headline text-3xl md:text-4xl font-bold mb-4">
                {post.title}
              </h1>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>{new Date(post.date).toLocaleDateString("fr-FR", { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                <span>•</span>
                <span>Par {post.author}</span>
              </div>
               <div className="mt-4 flex flex-wrap gap-2">
                {post.tags.map(tag => (
                  <Badge key={tag} variant="secondary">{tag}</Badge>
                ))}
              </div>
            </div>

            <div className="relative aspect-video rounded-lg overflow-hidden shadow-lg mb-8">
              <Image
                src={post.imageUrl}
                alt={post.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 900px"
                data-ai-hint={post.imageHint}
              />
            </div>

            <div
              className="prose prose-lg max-w-none text-foreground/90 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: sanitizedContent }}
            />
          </article>

          <aside className="lg:col-span-1 lg:sticky top-24 self-start">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-headline">
                  Articles Récents
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {recentPosts.map((recentPost) => (
                    <li key={recentPost.slug}>
                      <Link href={`/blog/${recentPost.slug}`} className="group">
                        <p className="font-semibold group-hover:text-primary transition-colors">
                          {recentPost.title}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(recentPost.date).toLocaleDateString("fr-FR", { month: 'long', day: 'numeric' })}
                        </p>
                      </Link>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>
    </div>
  );
}
