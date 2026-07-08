import { notFound } from "next/navigation";
import { getBlogPost, getBlogCategories } from "@/lib/content";
import { BlogPostForm } from "@/components/admin/blog-post-form";

export default async function AdminEditBlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [post, categories] = await Promise.all([getBlogPost(slug), getBlogCategories()]);
  if (!post) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground">Edit Post</h1>
      <p className="mt-1 truncate text-sm text-muted">/blog/{post.slug}</p>
      <div className="mt-6">
        <BlogPostForm post={post} categories={categories} />
      </div>
    </div>
  );
}
