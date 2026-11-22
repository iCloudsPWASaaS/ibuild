import  { useEffect } from "react";
import type { ProductsProps } from "../types";
import { Star, ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react";
import { SectionButton } from "../../../components/ui/index";
import { ImageWithFallback } from "../../../helper/ImageWithFallback";
import { productImages } from "../../../helper/data";
import { getIndaxImage } from "../../../helper/function";

export function ProductsCarousel({
  title,
  description,
  products,
  className = "",
}: ProductsProps) {

  useEffect(() => {
    const slides = document.querySelectorAll(".product-slide");
    const dots = document.querySelectorAll(".product-dot");
    let currentIndex = 0;

    function showSlide(index: number, direction = 1) {
      slides.forEach((slide, i) => {
        slide.classList.add("hidden");
        slide.classList.remove("slide-enter-right", "slide-enter-left");

        if (i === index) {
          slide.classList.remove("hidden");
          slide.classList.add(
            direction > 0 ? "slide-enter-right" : "slide-enter-left"
          );
        }
      });

      dots.forEach((dot, i) => {
        dot.classList.remove("w-8", "bg-primary");
        dot.classList.add("w-2", "bg-gray-300");

        if (i === index) {
          dot.classList.remove("w-2", "bg-gray-300");
          dot.classList.add("w-8", "bg-primary");
        }
      });

      currentIndex = index;
    }

    const nextBtn = document.querySelector(".carousel-next");
    const prevBtn = document.querySelector(".carousel-prev");

    nextBtn?.addEventListener("click", () => {
      const next = (currentIndex + 1) % slides.length;
      showSlide(next, 1);
    });

    prevBtn?.addEventListener("click", () => {
      const prev = (currentIndex - 1 + slides.length) % slides.length;
      showSlide(prev, -1);
    });

    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        showSlide(index, index > currentIndex ? 1 : -1);
      });
    });

    showSlide(0, 1);
  }, []);

  return (
    <section className={`py-20 bg-gradient-extra-light section-spacing ${className}`}>
      <div className="container mx-auto px-4">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 scroll-animation scroll-fade-up delay-100">
            {title}
          </h2>

          {description && (
            <p className="text-xl text-gray-600 leading-relaxed scroll-animation scroll-fade-up delay-200">
              {description}
            </p>
          )}
        </div>

        {/* Carousel */}
        <div className="max-w-5xl mx-auto relative">

          {products.map((product:any, index) => (
            <div
              key={index}
              className="product-slide  bg-white rounded-2xl shadow-2xl overflow-hidden"
            >
              <div className="grid md:grid-cols-2">

                {/* Image */}
                <div className="relative aspect-square bg-gray-100">
                  <ImageWithFallback
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    srcSet={getIndaxImage(productImages,index)}
                  />

                  {product.category && (
                    <div className="absolute top-6 left-6 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full text-sm font-semibold text-gray-700 shadow-lg">
                      {product.category}
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="p-8 md:p-12 flex flex-col justify-center">

                  <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    {product.name}
                  </h3>

                  <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                    {product.description}
                  </p>

                  {product?.rating && (
                    <div className="flex items-center gap-2 mb-6">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-5 h-5 ${
                              i < product?.rating
                                ? "text-yellow-400 fill-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>

                      {product.reviews && (
                        <span className="text-gray-500">
                          {product.reviews} reviews
                        </span>
                      )}
                    </div>
                  )}

                  <div className="mb-8">
                    <span className="text-5xl font-bold text-gray-900">
                      ${product.price}
                    </span>
                  </div>

                  <div className="flex gap-4">
                    <SectionButton variant="web" className="flex-1 text-white py-6 text-lg">
                      <ShoppingCart className="w-5 h-5 mr-2" />
                      Add to Cart
                    </SectionButton>

                    <SectionButton variant="outline" className="px-6 py-6">
                      Details
                    </SectionButton>
                  </div>

                </div>
              </div>
            </div>
          ))}

          {/* Navigation */}
          <button className="carousel-prev absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors z-10">
            <ChevronLeft className="w-6 h-6 text-gray-900" />
          </button>

          <button className="carousel-next absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors z-10">
            <ChevronRight className="w-6 h-6 text-gray-900" />
          </button>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {products.map((_, index) => (
              <button
                key={index}
                className="product-dot h-2 w-2 bg-gray-300 rounded-full transition-all"
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}