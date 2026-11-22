import type { ServicesProps } from "../types";
import { ArrowRight } from "lucide-react";
import { SectionButton } from "../../../components/ui/index";
import DynamicIcon from "../../../components/ui/icon";

export function ServicesCards({ label = "Our Services", title, description, services, className = "" }: ServicesProps) {
  return (
    <section className={`py-20 background-color section-spacing ${className}`}>
      <div className="container mx-auto px-4">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">

          <div
            data-scroll
            className="inline-block mb-4 px-4 py-2 bg-primary-light text-primary rounded-full text-sm font-semibold scroll-animation scroll-fade-up"
          >
            {label}
          </div>

          <h2
            data-scroll
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 scroll-animation scroll-fade-up delay-100"
          >
            {title}
          </h2>

          {description && (
            <p
              data-scroll
              className="text-lg text-gray-600 leading-relaxed scroll-animation scroll-fade-up delay-200"
            >
              {description}
            </p>
          )}
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service:any, index) => {
            const Icon = service.icon;

            return (
              <div
                key={index}
                data-scroll
                className={`group relative bg-white border-2 border-gray-200 rounded-2xl p-8
transition-all duration-500 ease-out
hover:-translate-y-3 hover:shadow-2xl hover:border-primary
scroll-animation scroll-fade-up delay-${Math.min(
                  2000,
                  (index + 1) * 100
                )}`}
              >
                {/* Icon */}
                <div className="relative z-10 w-16 h-16 bg-gradient-primary rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <DynamicIcon name={Icon} className="w-8 h-8 text-white" />
                </div>

                {/* Title */}
                <h3 className="relative z-10 text-2xl font-bold text-gray-900 mb-3">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="relative z-10 text-gray-600 leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Price */}
                {service.price && (
                  <div className="relative z-10 mb-6">
                    <span className="text-3xl font-bold text-gray-900">
                      {service.price}
                    </span>
                    <span className="text-gray-500 ml-2">/ month</span>
                  </div>
                )}

                {/* Button */}
                <SectionButton
                  variant="outline"
                  className="relative z-10 w-full group-hover:bg-primary group-hover:text-white transition-all"
                >
                  Learn More
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </SectionButton>

                {/* Hover Background */}
                <div className="absolute inset-0 gradient-background-full-medium  rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            );
          })}
        </div>
      </div>
    </section>

  );
}
