import type { PricingProps } from "../types";
import { Check, X } from "lucide-react";
import { SectionButton } from "../../../components/ui/index";

export function PricingComparison({title, description, tiers, className = "" }: PricingProps) {
const uniqueFeatures = [...new Set(tiers.flatMap(item => item.features))];
  return (
    <section className={`py-20 background-color section-spacing ${className}`}>
  <div className="container mx-auto px-4">
    {/* Header */}
    <div className="text-center max-w-3xl mx-auto mb-16">
      <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 scroll-animation scroll-fade-up">
        {title}
      </h2>

      {description && (
        <p className="text-xl text-gray-600 leading-relaxed scroll-animation scroll-fade-up delay-100">
          {description}
        </p>
      )}
    </div>

    {/* Comparison Table */}
    <div className="max-w-6xl mx-auto overflow-x-auto">
      <div className="inline-block min-w-[800px] md:min-w-full">
        {/* Header Row */}
        <div className="grid grid-cols-4 gap-2 md:gap-4 mb-4 mb-4">
          <div className="p-6">
            <span className="text-lg font-semibold text-gray-700">
              Features
            </span>
          </div>

          {tiers.map((tier, index) => (
            <div
              key={index}
              className={`p-6 rounded-t-xl scroll-animation scroll-fade-up-subtle delay-${Math.min(
                1000,
                index * 100
              )} ${tier.highlighted ? "bg-primary text-white" : "bg-gray-50"}`}
            >
              <h3
                className={`text-2xl font-bold mb-2 ${
                  tier.highlighted ? "text-white" : "text-gray-900"
                }`}
              >
                {tier.name}
              </h3>

              <div className="mb-4">
                <span
                  className={`text-4xl font-bold ${
                    tier.highlighted ? "text-white" : "text-gray-900"
                  }`}
                >
                  {tier.price}
                </span>
                <span
                  className={
                    tier.highlighted ? "text-blue-100" : "text-gray-600"
                  }
                >
                  /{tier.interval}
                </span>
              </div>

              <SectionButton
                variant={tier.highlighted ? "common" : "web"}
                className={`w-full ${
                  tier.highlighted
                    ? "bg-white text-primary hover:bg-gray-100"
                    : "bg-primary text-white hover:bg-blue-700"
                }`}
              >
                {tier.ctaText || "Choose Plan"}
              </SectionButton>
            </div>
          ))}
        </div>

        {/* Feature Rows */}
        <div className="space-y-2">
          {uniqueFeatures?.map((feature, index) => (
            <div
              key={feature}
              className={`grid grid-cols-4 gap-4 scroll-animation scroll-slide-left delay-${Math.min(
                1000,
                index * 50
              )}`}
            >
              <div
                className={`p-6 flex items-center ${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                } rounded-l-xl`}
              >
                <span className="font-medium text-gray-900">{feature}</span>
              </div>

              {tiers.map((tier, tierIndex) => {
                const hasFeature =
                  tierIndex === 0
                    ? index < 4
                    : tierIndex === 1
                    ? index < 7
                    : true;

                return (
                  <div
                    key={tierIndex}
                    className={`p-6 flex items-center justify-center ${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    } ${
                      tierIndex === tiers.length - 1 ? "rounded-r-xl" : ""
                    } ${tier.highlighted ? "bg-blue-soft" : ""}`}
                  >
                    {hasFeature ? (
                      <Check className="w-6 h-6 text-primary" />
                    ) : (
                      <X className="w-6 h-6 text-gray-300" />
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Bottom CTA */}
    <div className="text-center mt-16 scroll-animation scroll-fade-up delay-600">
      <p className="text-gray-600 mb-4">
        Need a custom plan for your enterprise?
      </p>

      <a
        href="#"
        className="text-primary hover:text-blue-700 font-semibold text-lg"
      >
        Contact Sales →
      </a>
    </div>
  </div>
</section>
  );
}
