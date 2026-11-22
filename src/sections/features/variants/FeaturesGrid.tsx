import type { FeaturesProps } from "../types";
import DynamicIcon from "../../../components/ui/icon";

export function FeaturesGrid({ title, description, features, className = "" }: FeaturesProps) {
  return (
    <section className={`py-20 background-color section-spacing ${className}`}>
  <div className="container mx-auto px-4">
    {/* Header */}
    <div className="text-center max-w-3xl mx-auto mb-16">
      <div className="inline-block mb-4 px-4 py-2 bg-primary-light text-primary rounded-full text-sm font-semibold
                      scroll-animation scroll-fade-up delay-100">
        Features
      </div>

      <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6
                     scroll-animation scroll-fade-up delay-200">
        {title}
      </h2>

      {description && (
        <p className="text-lg text-gray-600 leading-relaxed
                      scroll-animation scroll-fade-up delay-300">
          {description}
        </p>
      )}
    </div>

    {/* Features Grid */}
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {features.map((feature, index) => {
        const Icon = feature.icon;
        const delayClass = `features-delay-${index + 1}`; // staggered delay per card

        return (
          <div
            key={index}
            className={`bg-gradient-extra-light border border-primary-light rounded-xl p-8 hover:shadow-xl transition-all group
                        scroll-animation features-scroll-fade-scale ${delayClass}`}
          >
            {/* Icon */}
            <div className="w-14 h-14 bg-gradient-primary rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <DynamicIcon name={Icon} className="w-7 h-7 text-white" />
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              {feature.title}
            </h3>

            {/* Description */}
            <p className="text-gray-600 leading-relaxed">
              {feature.description}
            </p>

            {/* Hover Effect Line */}
            <div className="mt-6 h-1 w-0 bg-gradient-primary group-hover:w-full transition-all duration-300" />
          </div>
        );
      })}
    </div>
  </div>
</section>

  );
}
