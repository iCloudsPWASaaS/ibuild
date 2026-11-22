import type { ProductsProps } from "../types";
import { Star, ShoppingCart } from "lucide-react";
import { SectionButton } from "../../../components/ui/index";
import { ImageWithFallback } from "../../../helper/ImageWithFallback";
import { getIndaxImage } from "../../../helper/function";
import { productImages } from "../../../helper/data";

export function ProductsGrid({ label="Our Products",title, description, products, className = "" }: ProductsProps) {
  return (

    <section className={`py-20 background-color section-spacing ${className}`}>
  <div className="container mx-auto px-4">

    {/* Header */}
    <div className="text-center max-w-3xl mx-auto mb-16">
      <div className="inline-block mb-4 px-4 py-2 bg-primary-light text-primary rounded-full text-sm font-semibold scroll-animation scroll-fade-up">
       {label}
      </div>

      <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 scroll-animation scroll-fade-up delay-100">
        {title}
      </h2>

      {description && (
        <p className="text-lg text-gray-600 leading-relaxed scroll-animation scroll-fade-up delay-200">
          {description}
        </p>
      )}
    </div>

    {/* Products Grid */}
    <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product, index) => (
        <div
          key={product.id}
          className={`group bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-all product-card-hover scroll-animation scroll-fade-up delay-${Math.min(
            1000,
            (index + 1) * 200
          )}`}
        >
          {/* Product Image */}
          <div className="relative aspect-square overflow-hidden bg-gray-100">
            <ImageWithFallback
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              srcSet={getIndaxImage(productImages,index)}
            />

            {/* Category Badge */}
            {product.category && (
              <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-gray-700">
                {product.category}
              </div>
            )}

            {/* Quick Add Button */}
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <SectionButton variant={"web"} className="bg-white text-white hover:bg-gray-100">
                <ShoppingCart className="w-4 h-4 mr-2" />
                Quick Add
              </SectionButton>
            </div>
          </div>

          {/* Product Info */}
          <div className="p-4">
            <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1">
              {product.name}
            </h3>

            <p className="text-sm text-gray-600 mb-3 line-clamp-2">
              {product.description}
            </p>

            {/* Rating */}
            {product.rating && (
              <div className="flex items-center gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < (product.rating ?? 0)
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}

                {product.reviews && (
                  <span className="text-xs text-gray-500 ml-1">
                    ({product.reviews})
                  </span>
                )}
              </div>
            )}

            {/* Price */}
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-gray-900">
                ${product.price}
              </span>

              <SectionButton
                variant={"web"}
                size="sm"
                className="bg-primary text-white"
              >
                View
              </SectionButton>
            </div>
          </div>
        </div>
      ))}
    </div>

  </div>
</section>

  );
}
