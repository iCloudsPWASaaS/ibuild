import { useEffect } from "react";
import { Plus, Minus } from "lucide-react";
import type { FAQProps } from "../types";

export function FAQAccordion({ title, description, items, className = "" }:FAQProps) {

  // 1. Scroll Animation Initialization
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("scroll-show");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    const elements = document.querySelectorAll(".scroll-animation");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // 2. Click Handler (Pure DOM Manipulation)
  const handleToggle = (e:any) => {
    const btn = e.currentTarget;
    const currentItem = btn.closest('.faq-item');
    
    // Check if currently open
    const isAlreadyOpen = currentItem.classList.contains('active');

    // Close ALL items first (Accordion behavior)
    const allItems = document.querySelectorAll('.faq-item');
    allItems.forEach(item => {
      item.classList.remove('active');
      item.classList.remove('border-primary', 'shadow-lg');
      item.classList.add('border-primary-light');
    });

    // Toggle current item logic
    if (!isAlreadyOpen) {
      currentItem.classList.add('active');
      currentItem.classList.remove('border-primary-light');
      currentItem.classList.add('border-primary', 'shadow-lg');
    }
  };

  return (
    <section className={`py-20 background-color faq-section section-spacing ${className}`}>
      <div className="container mx-auto px-4">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block mb-4 px-4 py-2 bg-primary-light text-primary rounded-full text-sm font-semibold scroll-animation scroll-fade-scale delay-100">
            FAQ
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 scroll-animation scroll-fade-up delay-150">
            {title}
          </h2>

          {description && (
            <p className="text-lg text-gray-600 leading-relaxed scroll-animation scroll-fade-up delay-200">
              {description}
            </p>
          )}
        </div>

        {/* FAQ List */}
        <div className="max-w-3xl mx-auto space-y-4">
          {items.map((item, index) => {
            // LOGIC: If index is 0, add 'active' class by default
            const isFirst = index === 0;
            const activeClass = isFirst ? "active" : "";
            const borderClass = isFirst 
              ? "border-primary shadow-lg" 
              : "border-primary-light hover:border-gray-300";

            return (
              <div
                key={index}
                // Apply classes based on isFirst
                className={`faq-item bg-white border-2 rounded-xl overflow-hidden transition-all duration-300 scroll-animation scroll-fade-up ${activeClass} ${borderClass}`}
                style={{ animationDelay: `${100 + index * 50}ms` }}
              >
                <button
                  type="button"
                  onClick={handleToggle}
                  className="w-full flex items-center justify-between p-6 text-left outline-none cursor-pointer"
                >
                  <span className="text-lg font-bold text-gray-900 pr-8">
                    {item.question}
                  </span>

                  {/* Icon Wrapper */}
                  <div className="icon-wrapper shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-colors bg-primary-light text-gray-600">
                    <Plus className="icon-plus w-5 h-5" />
                    <Minus className="icon-minus w-5 h-5" />
                  </div>
                </button>

                {/* Answer Content */}
                <div className="faq-answer">
                  <div className="px-6 pb-6 pt-0 text-gray-600 leading-relaxed">
                    {item.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16 scroll-animation scroll-fade-up delay-600">
          <p className="text-gray-600 mb-4">Still have questions?</p>
          <a href="#" className="text-primary font-semibold text-lg hover:underline">
            Contact our support team →
          </a>
        </div>

      </div>
    </section>
  );
}