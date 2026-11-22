import type { PricingProps } from "../types";
import { Check } from "lucide-react";

export function PricingMinimal({lebel="Pricing Plans", title, tiers, className = "" }: PricingProps) {
  return (

    <section className={`py-32 background-color section-spacing ${className}`}>
  <div className="container mx-auto px-4">
    <div className="max-w-5xl mx-auto">

      <div
        className="inline-block mb-4 px-4 py-2 bg-primary-light text-primary rounded-full text-sm font-semibold scroll-animation scroll-fade-up-subtle"
      >
      {lebel}
      </div>
      {/* Header */}
      <h2 className="text-5xl md:text-7xl font-bold text-gray-900 mb-20 scroll-animation scroll-fade-up">
        {title}
      </h2>

      {/* Pricing Tiers - Stacked List */}
      <div className="space-y-0">
        {tiers.map((tier, index) => (
          <div
            key={index}
            className={`hover-text scroll-animation scroll-fade-up delay-${Math.min(
              1000,
              index * 300
            )}`}
          >
            <a
              href="#"
              className="block border-b border-gray-200 py-12 hover:bg-gray-50 transition-colors px-8 -mx-8"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">

                {/* Left: Plan Details */}
                <div className="flex-1">
                  <div className="flex items-baseline gap-4 mb-6">
                    <h3 className="text-4xl font-bold text-gray-900 transition-colors">
                      {tier.name}
                    </h3>

                    <div>
                      <span className="text-5xl font-bold text-gray-900">
                        {tier.price}
                      </span>
                      <span className="text-gray-600 text-xl">
                        /{tier.interval}
                      </span>
                    </div>
                  </div>

                  {/* Features - Inline */}
                  <div className="flex flex-wrap gap-x-8 gap-y-3">
                    {tier.features.slice(0, 4).map((feature, idx) => (
                      <div
                        key={idx}
                        className={`flex items-center gap-2`}
                      >
                        <Check className="w-5 h-5 text-primary flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}

                    {tier.features.length > 4 && (
                      <span className="text-gray-500">
                        +{tier.features.length - 4} more features
                      </span>
                    )}
                  </div>
                </div>

                {/* Right: Arrow */}
                <div className="flex items-center">
                  <div className="text-gray-400 transition-colors pricing-arrow">
                    <svg
                      className="w-12 h-12"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </div>
                </div>

              </div>
            </a>
          </div>
        ))}
      </div>

      {/* Bottom Note */}
      <div className="mt-20 pt-12 border-t border-gray-200 scroll-animation scroll-fade delay-800">
        <p className="text-2xl text-gray-600 mb-6">
          All plans include 14-day free trial
        </p>

        <p className="text-gray-500">
          Questions about pricing?{" "}
          <a href="#" className="text-primary hover:text-blue-700 underline">
            Talk to our sales team
          </a>
        </p>
      </div>

    </div>
  </div>
</section>
  );
}
