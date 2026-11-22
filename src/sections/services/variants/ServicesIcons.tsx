import DynamicIcon from "../../../components/ui/icon";
import type { ServicesProps } from "../types";

export function ServicesIcons({ title, description, services, className = "" }: ServicesProps) {
  return (
  <section className={`py-20 background-color section-spacing ${className}`}>
    <div className="container mx-auto px-4">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 scroll-animation scroll-fade-up">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          {title}
        </h2>

        {description && (
          <p className="text-lg text-gray-600 leading-relaxed scroll-animation scroll-fade-up delay-100">
            {description}
          </p>
        )}
      </div>

      {/* Services Icon Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {services.map((service:any, index) => {
          const Icon = service.icon;
          const delay = (index + 1) * 100;

          return (
            <div
              key={index}
              className={`group text-center hover-text hover-bg-btn scroll-animation scroll-fade-scale delay-${delay} hover-service`}
            >
              {/* Icon */}
              <div className="w-24 h-24 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl icon-hover-rotate">
                <DynamicIcon name={Icon} className="w-12 h-12 text-white transition-colors" />
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-gray-600 leading-relaxed px-2">
                {service.description}
              </p>

              {/* Price Badge */}
              {service.price && (
                <div
                  // Logic: Uses new 'scroll-zoom-in' class + delay
                  className={`mt-4 scroll-animation scroll-zoom-in delay-${Math.min((index * 100) + 300, 2000)}`}
                >
                  <button className="inline-block px-4 py-2 bg-primary-light rounded-full text-sm font-semibold transition-colors">
                    {service.price}
                  </button>
                </div>
              )}

              {/* Hover Effect Line */}
              <div
                className="h-1 bg-gradient-primary mt-6 mx-auto animate-divider"
                style={{ maxWidth: "60%" }}
              />
            </div>
          );
        })}
      </div>

      {/* Bottom CTA */}
      <div className="text-center mt-16 scroll-animation scroll-fade-up delay-600">
        <p className="text-gray-600 mb-6">
          Can't find what you're looking for?
        </p>
        <a
          href="#"
          className="inline-flex items-center text-primary hover:text-indigo-700 font-semibold text-lg group "
        >
          Contact us for custom solutions
          <span className="ml-2 pricing-arrow">→</span>
        </a>
      </div>
    </div>
  </section>


  );
}
