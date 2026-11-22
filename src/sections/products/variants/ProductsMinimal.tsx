import type { ProductsProps } from "../types";
import { ShoppingCart } from "lucide-react";

export function ProductsMinimal({ title, products, className = "" }: ProductsProps) {
  return (

    <section className={`py-20 bg-white section-spacing ${className}`}>
  <div className="container mx-auto px-4">
    <div className="max-w-5xl mx-auto">

      {/* Header */}
      <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-16 scroll-animation scroll-fade-up">
        {title}
      </h2>

      {/* Products List */}
      <div className="space-y-0">
        {products.map((product, index) => (
          <div
            key={product.id}
            className={`group hover-multiple scroll-animation scroll-fade-up`}
          >
            <div className="flex items-center justify-between py-8 border-b border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors px-6 -mx-6">

              {/* Left: Product Info */}
              <div className="flex items-center gap-8 flex-1">
                
                {/* Number */}
                <div className="text-2xl font-bold text-gray-300 group-hover:text-gray-900 transition-colors w-12">
                  {String(index + 1).padStart(2, "0")}
                </div>

                {/* Product Name */}
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-1 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-gray-600">{product.description}</p>
                </div>
              </div>

              {/* Right: Price & Action */}
              <div className="flex items-center gap-8">
                
                {/* Category */}
                {product.category && (
                  <div className="hidden md:block px-4 py-2 bg-primary-light text-primary rounded-full text-sm font-medium transition-colors">
                    {product.category}
                  </div>
                )}

                {/* Price */}
                <div className="text-3xl font-bold text-gray-900 min-w-[120px] text-right">
                  ${product.price}
                </div>

                {/* Cart Button */}
                <button className="w-12 h-12 rounded-full bg-gray-100 group-hover:bg-primary flex items-center justify-center transition-colors">
                  <ShoppingCart className="w-5 h-5 text-gray-600 group-hover:text-white transition-colors" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* View All Link */}
      <div className="mt-12 text-center scroll-animation scroll-fade-up delay-600">
        <a
          href="#"
          className="inline-flex items-center text-primary hover:text-purple-700 font-semibold text-lg group"
        >
          View All Products

          <span className="ml-2 pricing-arrow">
            →
          </span>
        </a>
      </div>

    </div>
  </div>
</section>

  );
}
