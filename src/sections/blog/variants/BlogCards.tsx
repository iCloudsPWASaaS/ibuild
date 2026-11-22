import type { BlogProps } from "../types";
import { ArrowRight } from "lucide-react";
import { ImageWithFallback } from "../../../helper/ImageWithFallback";
import { blogImages } from "../../../helper/data";
import { getRandomImage } from "../../../helper/function";

export function BlogCards({ title, description, posts, className = "" }: BlogProps) {
  return (
    <section className={`py-20 bg-gradient-to-br from-gray-50 to-blue-50 section-spacing ${className}`}>
  <div className="container mx-auto px-4">

    {/* Header */}
    <div className="text-center max-w-3xl mx-auto mb-16">
      <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 scroll-animation scroll-fade-up ">
        {title}
      </h2>
      {description && (
        <p className="text-xl text-gray-600 scroll-animation scroll-fade-up delay-100">
          {description}
        </p>
      )}
    </div>

    {/* Posts Grid */}
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {posts.map((post, index) => {
        return (
          <article
            key={post.id}
            className={`bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all scroll-animation scroll-scale  `}
            style={{ animationDelay: `${index * 0.2}s` }}
          >
            {post.image && (
              <div className="aspect-video">
                <ImageWithFallback
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                  srcSet={getRandomImage(blogImages)}
                />
              </div>
            )}
            <div className="p-8">
              {post.category && (
                <span className="inline-block px-4 py-2 bg-gradient-primary text-white rounded-full text-sm font-bold mb-4">
                  {post.category}
                </span>
              )}
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{post.title}</h3>
              <p className="text-gray-600 mb-6">{post.description}</p>
              <div className="flex items-center justify-between mb-6 text-sm text-gray-500">
                <span>{post.author}</span>
                <span>{post.date}</span>
              </div>
              <a href="#" className="inline-flex items-center text-primary font-semibold group">
                Read More <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </article>
        );
      })}
    </div>
  </div>
</section>

  );
}
