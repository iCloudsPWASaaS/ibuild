import { useEffect } from "react";
import type { TestimonialsProps } from "../types";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

export function TestimonialsCarousel({ title, description, testimonials, className = "" }:TestimonialsProps) {

  useEffect(() => {

    const slides = document.querySelectorAll(".testimonial-slide");
    const prevBtn = document.querySelector(".testimonial-prev");
    const nextBtn = document.querySelector(".testimonial-next");
    const dots = document.querySelectorAll(".testimonial-dot");

    let currentIndex = 0;

    function showSlide(index:number, direction = 1) {

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
        dot.classList.remove("w-12", "bg-primary");
        dot.classList.add("w-3", "bg-gray-300");

        if (i === index) {
          dot.classList.remove("w-3", "bg-gray-300");
          dot.classList.add("w-12", "bg-primary");
        }
      });

      currentIndex = index;
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        const next = (currentIndex + 1) % slides.length;
        showSlide(next, 1);
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        const prev = (currentIndex - 1 + slides.length) % slides.length;
        showSlide(prev, -1);
      });
    }

    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        showSlide(index, index > currentIndex ? 1 : -1);
      });
    });

    showSlide(0);

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
        <div className="max-w-4xl mx-auto relative">

          {/* Slides */}
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="testimonial-slide  bg-white rounded-3xl shadow-2xl p-12 md:p-16 relative overflow-hidden"
            >
              <div className="absolute top-8 right-8 opacity-10">
                <Quote className="w-32 h-32 text-primary" />
              </div>

              <div className="relative z-10">

                {/* Rating */}
                {item.rating && (
                  <div className="flex items-center justify-center gap-2 mb-8">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-7 h-7 ${
                          i < (item.rating ?? 0)
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                )}

                <blockquote className="text-2xl md:text-3xl text-gray-800 leading-relaxed text-center mb-12 font-medium">
                  "{item.content}"
                </blockquote>

                <div className="text-center">
                  <div className="font-bold text-xl text-gray-900 mb-1">
                    {item.name}
                  </div>

                  <div className="text-gray-600">
                    {item.role}
                    {item.company && (
                      <span className="font-semibold">
                        {" "}at {item.company}
                      </span>
                    )}
                  </div>
                </div>

              </div>
            </div>
          ))}

          {/* Buttons */}
          <button className="testimonial-prev absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-14 h-14 bg-white rounded-full shadow-xl flex items-center justify-center">
            <ChevronLeft className="w-7 h-7 text-gray-900" />
          </button>

          <button className="testimonial-next absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-14 h-14 bg-white rounded-full shadow-xl flex items-center justify-center">
            <ChevronRight className="w-7 h-7 text-gray-900" />
          </button>

          {/* Dots */}
          <div className="flex justify-center gap-3 mt-12">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className="testimonial-dot w-3 h-3 rounded-full bg-gray-300 transition-all"
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}