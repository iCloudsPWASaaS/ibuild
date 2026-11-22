import type { FAQProps } from "../types";
import { HelpCircle } from "lucide-react";

export function FAQGrid({ title, description, items, className = "" }: FAQProps) {
  return (

    <section className={`py-20 bg-gradient-extra-light section-spacing ${className}`}>
  <div className="container mx-auto px-4">

    {/* Header */}
    <div className="text-center max-w-3xl mx-auto mb-16">
      <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6
                     scroll-animation scroll-fade-up delay-100">
        {title}
      </h2>

      {description && (
        <p className="text-xl text-gray-600 leading-relaxed
                      scroll-animation scroll-fade-up delay-200">
          {description}
        </p>
      )}
    </div>

    {/* FAQ Grid */}
    <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
      {items.map((item, index) => (
        <div
          key={index}
          className={`bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all
                      scroll-animation scroll-fade-up delay-${(index + 1) * 100}`}
        >
          {/* Icon */}
          <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mb-6">
            <HelpCircle className="w-6 h-6 text-white" />
          </div>

          {/* Question */}
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            {item.question}
          </h3>

          {/* Answer */}
          <p className="text-gray-600 leading-relaxed">{item.answer}</p>
        </div>
      ))}
    </div>
  </div>
</section>

  );
}
