import type { BlogProps } from "../types";

export function BlogMinimal({ title, posts, className = "" }: BlogProps) {
  return (
      <section className={`py-32 background-color section-spacing ${className}`}>
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">

          {/* Title */}
          <h2 className="text-6xl md:text-7xl font-bold text-gray-900 mb-20 scroll-animation scroll-fade-up">
            {title}
          </h2>

          <div className="space-y-0">
            {posts.map((post, index) => {
              return (
                <article
                  key={post.id}
                  className={`border-b border-gray-200 py-12 hover:bg-gray-50 transition-colors px-6 -mx-6 group scroll-animation scroll-fade-up`}
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <a href="#" className="block">
                    <div className="flex items-start justify-between gap-8">
                      <div className="flex-1">
                        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 transition-colors">{post.title}</h3>
                        <p className="text-lg text-gray-600 mb-4">{post.description}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>{post.author}</span>
                          <span>•</span>
                          <span>{post.date}</span>
                        </div>
                      </div>
                      <div className="text-4xl font-bold text-gray-200 group-hover:text-gray-400 transition-colors">
                        {String(index + 1).padStart(2, "0")}
                      </div>
                    </div>
                  </a>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
