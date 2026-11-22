import type { BlogProps } from "../types";
import { ImageWithFallback } from "../../../helper/ImageWithFallback";
import { getRandomImage } from "../../../helper/function";
import { blogImages } from "../../../helper/data";

export function BlogFeatured({ title, posts, className = "" }: BlogProps) {
  const featured = posts[0];
  const others = posts.slice(1, 4);

  return (
   <section className={`py-20 background-color section-spacing ${className}`}>
      <div className="container mx-auto px-4">

        {/* Title */}
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-16 text-center scroll-animation scroll-fade-up">
          {title}
        </h2>

        {/* Featured Article */}
        <div className="max-w-6xl mx-auto mb-12">
          <article className="grid md:grid-cols-2 gap-8 bg-gradient-primary rounded-3xl overflow-hidden scroll-animation scroll-fade-up">
            {featured.image && (
              <div className="aspect-video md:aspect-auto">
                <ImageWithFallback
                  src={featured.image}
                  alt={featured.title}
                  className="w-full h-full object-cover"
                  srcSet={getRandomImage(blogImages)}
                />
              </div>
            )}
            <div className="p-8 md:p-12 flex flex-col justify-center">
              {featured.category && (
                <span className="inline-block w-fit px-4 py-2 bg-primary text-white rounded-full text-sm font-bold mb-4">
                  {featured.category}
                </span>
              )}
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {featured.title}
              </h3>
              <p className="text-lg text-white mb-6">{featured.description}</p>
              <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                <span className="font-semibold">{featured.author}</span>
                <span>•</span>
                <span>{featured.date}</span>
              </div>
              <a href="#" className="inline-flex items-center text-primary font-bold text-lg">
                Read Article →
              </a>
            </div>
          </article>
        </div>

        {/* Other Posts */}
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {others.map((post, index) => {
            return (
              <article
                key={post.id}
                className={`bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all scroll-animation scroll-fade-up`}
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
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{post.title}</h3>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">{post.description}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{post.author}</span>
                    <span>{post.date}</span>
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
