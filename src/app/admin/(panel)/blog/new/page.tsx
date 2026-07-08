import { BlogPostForm } from "@/components/admin/blog-post-form";
import { getBlogCategories } from "@/lib/content";

export default async function AdminNewBlogPostPage() {
  const categories = await getBlogCategories();
  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground">New Blog Post</h1>
      <p className="mt-1 text-sm text-muted">
        The post goes live on the blog as soon as you publish it.
      </p>
      <div className="mt-6">
        <BlogPostForm categories={categories} />
      </div>
    </div>
  );
}
