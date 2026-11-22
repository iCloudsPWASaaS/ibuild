import DynamicIcon from "../../../components/ui/icon";
import type { FeaturesProps } from "../types";
import { Check } from "lucide-react";

export function FeaturesList({ title, description, features, className = "" }: FeaturesProps) {
  // Split features into two columns
  const midPoint = Math.ceil(features.length / 2);
  const leftFeatures = features.slice(0, midPoint);
  const rightFeatures = features.slice(midPoint);

  return (
<section className={`py-20 background-color section-spacing ${className}`}>
  <div className="container mx-auto px-4">
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-16">
        <div className="inline-block mb-4 px-4 py-2 bg-primary-light text-primary rounded-full text-sm font-semibold
                        scroll-animation scroll-fade-up" data-delay="100">
          Features
        </div>

        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 scroll-animation scroll-fade-up" data-delay="200">
          {title}
        </h2>

        {description && (
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed scroll-animation scroll-fade-up" data-delay="300">
            {description}
          </p>
        )}
      </div>

      {/* Two Column List */}
      <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
        {/* Left Column */}
        <div className="space-y-6">
          {leftFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="flex gap-4 group scroll-animation scroll-slide-left "
                data-delay={100 + index * 100}
              >
                {/* Icon */}
                <div className="shrink-0 w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <DynamicIcon name={Icon} className="w-6 h-6 text-white" />
                </div>

                {/* Content */}
                <div className="flex-1 hover-text">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>

                {/* Check Mark */}
                <div className="shrink-0">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-primary" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {rightFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="flex gap-4 group scroll-animation scroll-slide-right "
                data-delay={100 + index * 100}
              >
                {/* Icon */}
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <DynamicIcon name={Icon} className="w-6 h-6 text-white" />
                </div>

                {/* Content */}
                <div className="flex-1 hover-text">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>

                {/* Check Mark */}
                <div className="flex-shrink-0">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-primary" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  </div>
</section>


  );
}
