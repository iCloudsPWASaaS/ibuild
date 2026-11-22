import type { TestimonialsProps } from "../types";
import { Star, Quote } from "lucide-react";
import { ImageWithFallback } from "../../../helper/ImageWithFallback";
import { getRandomImage } from "../../../helper/function";
import { teamImages } from "../../../helper/data";

export function TestimonialsGrid({label="Testimonials", title, description, testimonials, className = "" }: TestimonialsProps) {
  return (
 <section className={`py-20 background-color section-spacing ${className}`}>
  <div className="container mx-auto px-4">
    {/* Header */}
    <div className="text-center max-w-3xl mx-auto mb-16 scroll-animation scroll-fade-up-subtle">
      <div className="inline-block mb-4 px-4 py-2 bg-primary-light text-primary rounded-full text-sm font-semibold scroll-animation scroll-fade-scale delay-100">
      {label}
      </div>

      <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 scroll-fade-up delay-200">
        {title}
      </h2>

      {description && (
        <p className="text-lg text-gray-600 leading-relaxed scroll-fade-up delay-300">
          {description}
        </p>
      )}
    </div>

    {/* Testimonials Grid */}
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
  {testimonials.map((testimonial, index) => (
  <div
    key={testimonial.id}
    className={`relative bg-gradient-extra-light border-gray-200 rounded-2xl p-10 overflow-hidden group scroll-animation scroll-fade-up delay-${(index + 1) * 200} transition-all transform hover:-translate-y-1 hover:shadow-xl`}
  >
    {/* Quote Icon */}
    <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mb-6 scroll-scale">
      <Quote className="w-6 h-6 text-white" />
    </div>

    {/* Rating */}
    {testimonial.rating && (
      <div className="flex items-center gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-5 h-5 ${i < (testimonial.rating ?? 0)
              ? "text-yellow-400 fill-yellow-400"
              : "text-gray-300"
            }`}
          />
        ))}
      </div>
    )}

    {/* Content */}
    <p className="text-gray-700 leading-relaxed mb-8 scroll-fade-up delay-200">
      "{testimonial.content}"
    </p>

    {/* Author */}
    <div className="flex items-center gap-4 pt-6 border-t border-gray-200 scroll-fade-up delay-300">
      <div className="shrink-0">
      {testimonial.image ? (
        <ImageWithFallback
          src={testimonial.image}
          alt={testimonial.name}
          className="w-12 h-12 rounded-full object-cover scroll-scale"
          srcSet={getRandomImage(teamImages)}
        />
      ) : (
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center text-white font-bold scroll-scale">
          {testimonial.name.charAt(0)}
        </div>
      )}
      </div>
      <div>
        <div className="font-bold text-gray-900">{testimonial.name}</div>
        <div className="text-sm text-gray-600">
          {testimonial.role}
          {testimonial.company && ` at ${testimonial.company}`}
        </div>
      </div>
    </div>
  </div>
))}

    </div>
  </div>
</section> 

  );
}
