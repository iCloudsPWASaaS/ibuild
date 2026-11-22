import type { PricingProps } from "../types";
import { Check, Sparkles } from "lucide-react";
import { SectionButton } from "../../../components/ui/index";

export function PricingCards({ lebel = "Pricing Plans", title, description, tiers, className = "" }: PricingProps) {
  return (
    <section className={`py-20 bg-gradient-extra-light section-spacing ${className}`}>
      <div className="container mx-auto px-4">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          {lebel &&
            <div
              className="inline-block mb-4 px-4 py-2 bg-primary-light text-primary rounded-full text-sm font-semibold scroll-animation scroll-fade-up-subtle"
            >
              {lebel}
            </div>}

          <h2
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 scroll-animation scroll-fade-up delay-100"
          >
            {title}
          </h2>

          {description && (
            <p
              className="text-lg text-gray-600 leading-relaxed scroll-animation scroll-fade-up delay-200"
            >
              {description}
            </p>
          )}
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 md:gap-2 lg:gap-8 max-w-5xl mx-auto">
          {tiers.map((tier, index) => (
            <div
              key={index}
              className={`relative rounded-2xl p-8 scroll-animation scroll-fade-up delay-${(index + 1) * 100} ${tier.highlighted
                  ? "bg-primary text-white shadow-2xl  z-10 transition-all duration-300 pricing-card-hover" // Added transition here
                  : "bg-white border-2 border-gray-200 pricing-card-hover hover:shadow-xl" // hover-border handles transition via CSS
                }`}
            >
              {/* Most Popular Badge */}
              {tier.highlighted && (
                <div className="width-full absolute -top-8 left-1/2 -translate-x-1/2 px-4 py-2 bg-black text-white rounded-full text-sm font-bold shadow-lg flex items-center gap-2 scroll-animation1 scroll-fade-up-subtle">
                  <Sparkles className="w-4 h-4" />
                  Most Popular
                </div>
              )}

              {/* Plan Name */}
              <h3
                className={`text-2xl font-bold mb-2 ${tier.highlighted ? "text-white" : "text-gray-900"
                  }`}
              >
                {tier.name}
              </h3>

              {/* Price */}
              <div className="mb-6">
                <span
                  className={`text-5xl font-bold ${tier.highlighted ? "text-white" : "text-gray-900"
                    }`}
                >
                  {tier.price}
                </span>
                <span
                  className={`text-lg ${tier.highlighted ? "text-blue-100" : "text-gray-600"
                    }`}
                >
                  /{tier.interval}
                </span>
              </div>

              {/* Features */}
              <ul className="space-y-4 mb-8">
                {tier.features.map((feature, idx) => (
                  <li
                    key={idx}
                    className={`flex items-start gap-3 scroll-animation`}
                  >
                    <div
                      className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${tier.highlighted ? "bg-white/20" : "bg-green-100"
                        }`}
                    >
                      <Check
                        className={`w-3 h-3 ${tier.highlighted ? "text-white" : "text-primary"
                          }`}
                      />
                    </div>

                    <span className={tier.highlighted ? "text-white" : "text-gray-700"}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <SectionButton
                variant={tier.highlighted ? "outline" : "default"}
                className={`w-full py-6 text-lg font-semibold transition-all duration-300 ${tier.highlighted
                    ? "border-2 border-white text-white bg-transparent hover:bg-blue-soft"
                    : " text-white hover:from-blue-700 hover:to-indigo-700"
                  }`}
              >
                {tier.ctaText || "Get Started"}
              </SectionButton>
            </div>
          ))}
        </div>

        {/* Bottom Note */}
        <p className="text-center text-gray-600 mt-12 scroll-animation scroll-fade delay-600">
          All plans include 14-day free trial. No credit card required.
        </p>

      </div>
    </section>
  );
}
