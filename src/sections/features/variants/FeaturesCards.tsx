import type { FeaturesProps } from "../types";
import { ArrowRight } from "lucide-react";

export function FeaturesCards({ title, description, features, className = "" }: FeaturesProps) {
  return (
    <section className={`py-20 bg-gradient-extra-light section-spacing ${className}`}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6
                         scroll-animation scroll-fade-up delay-100">
            {title ?? ""}
          </h2>

          {description && (
            <p className="text-xl text-gray-600 leading-relaxed
                          scroll-animation scroll-fade-up delay-200">
              {description}
            </p>
          )}
        </div>

        {/* Features Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features?.map((feature, index) => {

            // Dynamic delay for each card: 100ms, 200ms, 300ms…
            const delayClass = `delay-${(index + 1) * 100}`;

            return (
              <div
                key={index}
                className={`group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all overflow-hidden
                            scroll-animation scroll-fade-scale ${delayClass}`}
              >
                {/* Background Gradient */}
                <div className="absolute inset-0 bg-gradient-primary-light opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Content */}
                <div className="relative z-10">
                  {/* Icon */}
                  {/* {Icon && <div className="w-16 h-16 bg-primary-light rounded-xl flex items-center justify-center mb-6 transition-colors">
                    <Icon className="w-8 h-8 text-primary group-hover:text-white transition-colors" />
                  </div>} */}

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 transition-colors">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 leading-relaxed mb-6 transition-colors">
                    {feature.description}
                  </p>

                  {/* Learn More Link */}
                  <div className="flex items-center text-primary group-hover:text-white font-semibold transition-colors">
                    <span className="mr-2">Learn more</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>

                {/* Decorative Circle */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary-light group-hover:bg-white/10 rounded-full transition-colors" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
