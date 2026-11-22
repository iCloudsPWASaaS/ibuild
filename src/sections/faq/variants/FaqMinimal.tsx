import type { FAQProps } from "../types";

export function FAQMinimal({ title, items, className = "" }: FAQProps) {
  return (
    <section className={`py-32 background-color section-spacing ${className}`}>
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          
          {/* Header */}
          <h2 className="text-6xl md:text-7xl font-bold text-gray-900 mb-20
                         scroll-animation scroll-fade-up delay-100">
            {title}
          </h2>

          {/* FAQ List */}
          <div className="space-y-16">
            {items.map((item, index) => (
              <div
                key={index}
                className={`scroll-animation scroll-fade-up delay-${(index + 1) * 100}`}
              >
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  {item.question}
                </h3>
                <p className="text-xl text-gray-600 leading-relaxed">
                  {item.answer}
                </p>

                {/* Divider */}
                {index < items.length - 1 && (
                  <div className={`h-px bg-gray-200 mt-16 scroll-animation animate-divider delay-${(index + 1) * 100}`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
