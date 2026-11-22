import type { BlogProps } from "../types";
import { Clock } from "lucide-react";
import { ImageWithFallback } from "../../../helper/ImageWithFallback";
import { getRandomImage } from "../../../helper/function";
import { blogImages } from "../../../helper/data";

export function BlogList({ title, posts, className = "" }: BlogProps) {
  return (
    <section className={`py-20 background-color section-spacing ${className}`}>
  <div className="container mx-auto px-4">
    <div className="max-w-4xl mx-auto">

      {/* Title */}
      <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-16 scroll-animation scroll-fade-up">
        {title}
      </h2>

      <div className="space-y-8">
        {posts.map((post, index) => {

          return (
            <article
              key={post.id}
              className={`flex flex-col md:flex-row gap-6 pb-8 border-b border-gray-200 hover:bg-gray-50 transition-colors p-6 -mx-6 rounded-lg scroll-animation scroll-fade-up-subtle`}
            style={{ animationDelay: `${index * 0.2}s` }}
            
            >
              {post.image && (
                <div className="md:w-64 shrink-0">
                  <div className="aspect-video rounded-lg overflow-hidden">
                    <ImageWithFallback
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover"
                      srcSet={getRandomImage(blogImages)}
                    />
                  </div>
                </div>
              )}
              <div className="flex-1">
                {post.category && (
                  <span className="inline-block px-3 py-1 bg-primary-light text-primary rounded-full text-sm font-semibold mb-3">
                    {post.category}
                  </span>
                )}
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{post.title}</h3>
                <p className="text-gray-600 mb-4">{post.description}</p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span>{post.author}</span>
                  <span>•</span>
                  <span>{post.date}</span>
                  {post.readTime && (
                    <>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{post.readTime}</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  </div>
   </section>
  );
}
