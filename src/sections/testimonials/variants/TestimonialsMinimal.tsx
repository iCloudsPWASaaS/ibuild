import type { TestimonialsProps } from "../types";
import { Quote } from "lucide-react";

export function TestimonialsMinimal({ title, testimonials, className = "" }: TestimonialsProps) {
  return (
    <section className={`py-32 background-color section-spacing ${className}`}>
  <div className="container mx-auto px-4">
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <h2 className="text-6xl md:text-7xl font-bold text-gray-900 mb-20 scroll-animation scroll-fade-up-subtle delay-100">
        {title}
      </h2>

      {/* Testimonials List */}
      <div className="space-y-20">
        {testimonials.map((testimonial, index) => (
          <div
            key={testimonial.id}
            className={`relative scroll-animation scroll-fade-up delay-${(index + 1) * 200}`}
          >
            {/* Quote Icon */}
            <div className="absolute -left-4 -top-4 opacity-20">
              <Quote className="w-16 h-16 text-gray-900" />
            </div>

            {/* Content */}
            <div className="relative">
              <blockquote className="text-3xl md:text-4xl text-gray-800 leading-relaxed mb-8 font-medium scroll-animation scroll-fade-up delay-100">
                "{testimonial.content}"
              </blockquote>

              {/* Author Info */}
              <div className="flex items-center gap-6 scroll-animation scroll-fade-up delay-200">
                {/* Divider Line */}
                <div className="w-16 h-px bg-gray-900" />

                <div>
                  <div className="font-bold text-xl text-gray-900">
                    {testimonial.name}
                  </div>
                  <div className="text-gray-600">
                    {testimonial.role}
                    {testimonial.company && `, ${testimonial.company}`}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Divider */}
            {index < testimonials.length - 1 && (
              <div
                className={`h-px bg-gray-200 mt-20 scroll-animation scroll-grow-width delay-${(index + 1) * 300}`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="mt-20 text-center scroll-animation scroll-fade-up delay-600">
        <a
          href="#"
          className="inline-flex items-center text-gray-900 hover:text-gray-700 font-semibold text-xl group"
        >
          Read more stories
          <span className="ml-2 text-2xl animate-arrow-x">→</span>
        </a>
      </div>
    </div>
  </div>
</section>

  );
}
