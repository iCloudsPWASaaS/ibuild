import type { ProductsProps } from "../types";
import { Star, ShoppingCart, Check } from "lucide-react";
import { SectionButton } from "../../../components/ui/index";
import { ImageWithFallback } from "../../../helper/ImageWithFallback";
import { getIndaxImage } from "../../../helper/function";
import { productImages } from "../../../helper/data";

export function ProductsSplit({ label = "Featured Product", title, description, products, className = "" }: ProductsProps) {
   const featuredProducts = products;

  return (
    <section className={`py-20 bg-white section-spacing ${className}`}>
      <div className="container mx-auto px-4">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">

          <h2
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 scroll-animation scroll-fade-up-subtle"

          >
            {title}
          </h2>

          {description && (
            <p
              className="text-lg text-gray-600 leading-relaxed scroll-animation scroll-fade-up-subtle delay-200"

            >
              {description}
            </p>
          )}
        </div>

        {/* Products - Alternating Split Layout */}
        <div className="max-w-6xl mx-auto space-y-24">
          {featuredProducts.map((product, index) => {
            const isEven = index % 2 === 0;


            return (
              <div
                key={product.id}
                className={`flex flex-col ${isEven ? "md:flex-row" : "md:flex-row-reverse"
                  } gap-12 items-center scroll-animation scroll-fade-up`}

              >
                {/* Product Image */}
                <div
                  className="md:w-1/2 scroll-animation scroll-fade-scale delay-200"

                >
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
                    <ImageWithFallback
                      src={product.image}
                      alt={product.name}
                      className="w-full aspect-square object-cover group-hover:scale-110 transition-transform duration-500"
                      srcSet={getIndaxImage(productImages,index)}
                    />

                    {product.category && (
                      <div className="absolute top-6 left-6 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full text-sm font-bold text-gray-900 shadow-lg">
                        {product.category}
                      </div>
                    )}

                    {/* Floating Price Badge */}
                    <div
                      className="absolute bottom-6 right-6 bg-gradient-primary-warm text-white px-6 py-3 rounded-full shadow-xl scroll-animation scroll-scale delay-400"

                    >
                      <span className="text-2xl font-bold">${product.price}</span>
                    </div>
                  </div>
                </div>

                {/* Product Info */}
                <div
                  className={`md:w-1/2 scroll-animation ${isEven ? "scroll-slide-right" : "scroll-slide-left"
                    } delay-300`}

                >
                  <div className="inline-block mb-4 px-4 py-2 bg-primary-light text-primary rounded-full text-sm font-semibold">
                    {label}
                  </div>

                  <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    {product.name}
                  </h3>

                  {/* Rating */}
                  {product.rating && (
                    <div className="flex items-center gap-2 mb-6">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-5 h-5 ${i < (product.rating ?? 0)
                                ? "text-yellow-400 fill-yellow-400"
                                : "text-gray-300"
                              }`}
                          />
                        ))}
                      </div>

                      {product.reviews && (
                        <span className="text-gray-600">
                          ({product.reviews} reviews)
                        </span>
                      )}
                    </div>
                  )}

                  <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                    {product.description}
                  </p>

                  {/* Features List */}
                  <div className="space-y-3 mb-8">
                    {product?.features?.map((feature, idx) => (
                      <div
                        key={idx}
                        className={`flex items-center gap-3 scroll-animation scroll-slide-left delay-${400 + idx * 100
                          }`}

                      >
                        <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <Check className="w-4 h-4 text-primary" />
                        </div>
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex gap-4">
                    <SectionButton variant={"web"} className="px-8 py-6 text-lg group">
                      <ShoppingCart className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                      Add to Cart
                    </SectionButton>

                    <SectionButton variant="outline" className="px-8 py-6 text-lg">
                      Learn More
                    </SectionButton>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
