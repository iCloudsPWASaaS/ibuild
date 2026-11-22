import type { ProductsProps } from "../types";
import { Star, ShoppingCart, Sparkles } from "lucide-react";
import { SectionButton } from "../../../components/ui/index";
import { ImageWithFallback } from "../../../helper/ImageWithFallback";
import { getIndaxImage, getRandomImage } from "../../../helper/function";
import { productImages } from "../../../helper/data";

export function ProductsFeatured({label="Featured Collection",title, description, products, className = "" }: ProductsProps) {
  const featuredProduct = products[0];
  const otherProducts = products.slice(1, products.length);

  return (

<section className={` py-20 bg-gradient-primary text-white section-spacing ${className}`}>
  <div className="container mx-auto px-4">

    {/* Header */}
    <div className="text-center max-w-3xl mx-auto mb-16">

      <div className="inline-flex items-center gap-2 mb-6 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 scroll-animation scroll-fade-up">
        <Sparkles className="w-5 h-5 text-yellow-400" />
        <span className="font-semibold">{label}</span>
      </div>

      <h2 className="text-5xl md:text-6xl font-bold mb-6 scroll-animation scroll-fade-up delay-100">
        {title}
      </h2>

      {description && (
        <p className="text-xl text-white/80 leading-relaxed scroll-animation scroll-fade-up delay-200">
          {description}
        </p>
      )}
    </div>

    {/* Hero Product */}
    <div className="max-w-6xl mx-auto mb-12 scroll-animation ">
      <div className="grid md:grid-cols-2 gap-12 items-center bg-white/10 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-white/20">

        {/* Hero Image */}
        <div className="relative">

          <div className="relative rounded-2xl overflow-hidden shadow-2xl scroll-animation scroll-float delay-400">
            <ImageWithFallback
              src={featuredProduct.image}
              alt={featuredProduct.name}
              srcSet={getRandomImage(productImages)}
              className="w-full aspect-square object-cover"
            />

            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/30 to-blue-500/30" />
          </div>

          {/* Floating Badge */}
          <div className="absolute -top-4 -right-4 bg-yellow-400 text-gray-900 px-6 py-3 rounded-full font-bold text-lg shadow-xl scroll-animation scroll-scale delay-600">
            Best Seller
          </div>
        </div>

        {/* Hero Content */}
        <div>
          <h3 className="text-4xl md:text-5xl font-bold mb-4 scroll-animation ">
            {featuredProduct.name}
          </h3>

          <p className="text-xl text-white/80 mb-6 leading-relaxed scroll-animation ">
            {featuredProduct.description}
          </p>

          {/* Rating */}
          {featuredProduct.rating && (
            <div className="flex items-center gap-2 mb-6 scroll-animation ">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-6 h-6 ${
                      i < (featuredProduct.rating ?? 0)
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-white/30"
                    }`}
                  />
                ))}
              </div>

              {featuredProduct.reviews && (
                <span className="text-white/80 text-lg">
                  ({featuredProduct.reviews} reviews)
                </span>
              )}
            </div>
          )}

          {/* Price */}
          <div className="mb-8 scroll-animation">
            <span className="text-6xl font-bold">
              ${featuredProduct.price}
            </span>
          </div>

          {/* CTA */}
          <div className="scroll-animation ">
            <SectionButton variant={"web"} className="px-10 py-6 text-lg group">
              <ShoppingCart className="w-6 h-6 mr-2 group-hover:scale-110 transition-transform" />
              Add to Cart
            </SectionButton>
          </div>
        </div>

      </div>
    </div>

    {/* Other Products */}
    <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
      {otherProducts.map((product, index) => (
        <div
          key={product.id}
          className={`bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden border border-white/20 hover:bg-white/20 transition-all group product-card-hover scroll-animation scroll-fade-up delay-${Math.min(
            2000,
            (index + 1) * 200
          )}`}
        >
          <div className="aspect-square relative overflow-hidden">
            <ImageWithFallback
              src={product.image}
              alt={product.name}
              srcSet={getIndaxImage(productImages,index)}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
          </div>

          <div className="p-6">
            <h4 className="text-xl font-bold mb-2">{product.name}</h4>

            <p className="text-white/70 text-sm mb-4 line-clamp-2">
              {product.description}
            </p>

            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold">${product.price}</span>

              <SectionButton
                size="sm"
                variant={"web"}
                className="border-white/30 text-white hover:bg-white hover:text-gray-900"
              >
                View
              </SectionButton>
            </div>
          </div>
        </div>
      ))}
    </div>

  </div>

  {/* Background Effects */}
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary rounded-full filter blur-3xl opacity-20" />
    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary rounded-full filter blur-3xl opacity-20" />
  </div>
</section>

  );
}
