import type { BlogProps } from "../types";
import { Clock } from "lucide-react";
import { ImageWithFallback } from "../../../helper/ImageWithFallback";
import { getRandomImage } from "../../../helper/function";
import { blogImages } from "../../../helper/data";

export function BlogGrid({ title, description, posts, className = "" }: BlogProps) {
  return (
    <section className={`py-20 background-color section-spacing ${className}`}>
  <div className="container mx-auto px-4">

    {/* Title */}
    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 text-center scroll-animation scroll-fade-up">
      {title}
    </h2>

    {description && (
      <p className="text-lg text-gray-600 mb-16 text-center scroll-animation scroll-fade-up delay-100">
        {description}
      </p>
    )}

    {/* Posts Grid */}
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {posts.map((post, index) => {
        return (
          <article
            key={post.id}
            className={`bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-all group scroll-animation scroll-fade-up`}
               style={{ animationDelay: `${index * 0.2}s` }}
          >
            {post.image && (
              <div className="aspect-video overflow-hidden">
                <ImageWithFallback
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  srcSet={getRandomImage(blogImages)}
                />
              </div>
            )}
            <div className="p-6">
              {post.category && (
                <span className="inline-block px-3 py-1 bg-primary-light text-primary rounded-full text-sm font-semibold mb-4">
                  {post.category}
                </span>
              )}
              <h3 className="text-xl font-bold text-gray-900 mb-3 transition-colors">
                {post.title}
              </h3>
              <p className="text-gray-600 mb-4 line-clamp-2">{post.description}</p>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>{post.author}</span>
                <div className="flex items-center gap-4">
                  <span>{post.date}</span>
                  {post.readTime && (
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{post.readTime}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  </div>
</section>

  );
}
