import type { CTAProps } from "../types";
import { SectionButton } from "../../../components/ui/index";
import { Check } from "lucide-react";

export function CTASplit({ title, description, primaryCta, secondaryCta, className = "", benefits }: CTAProps) {
  return (

<section className={`py-20 bg-white section-spacing ${className}`}>
  <div className="container mx-auto px-4">
    <div className="max-w-6xl mx-auto bg-gradient-primary rounded-3xl overflow-hidden shadow-2xl">
      <div className="grid md:grid-cols-2 gap-8 items-center">

        {/* Left Content */}
        <div className="p-8 md:p-12 text-white scroll-animation scroll-slide-left delay-100">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 scroll-animation scroll-slide-left delay-150">
            {title}
          </h2>

          {description && (
            <p className="text-xl text-white mb-8 leading-relaxed scroll-animation scroll-slide-left delay-200">
              {description}
            </p>
          )}

          <div className="space-y-3 mb-8">
            {benefits?.map((benefit, index) => {
              // Faster stagger: 0.05s per item
              const delayClass = `delay-${100 + index * 50}`;
              return (
                <div key={index} className={`flex items-center gap-3 scroll-animation scroll-slide-left ${delayClass}`}>
                  <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <span>{benefit}</span>
                </div>
              );
            })}
          </div>

          <div className="flex flex-col lg:flex-row gap-4 scroll-animation scroll-slide-left delay-300 flex-wrap">
           {primaryCta.text && <SectionButton href={`${primaryCta.href}`} variant={'common'} className="px-8 py-6 text-lg">
              {primaryCta.text}
            </SectionButton>}
            {secondaryCta && (
              <SectionButton href={`${secondaryCta.href}`} variant="outline" className="border-2 border-white hover:bg-white hover:text-primary px-8 py-6 text-lg">
                {secondaryCta.text}
              </SectionButton>
            )}
          </div>
        </div>

        {/* Right Content / Image */}
        <div className="relative h-full min-h-[400px] bg-gradient-primary flex items-center justify-center p-8 scroll-animation scroll-slide-right delay-100">
          <div className="text-center text-white">
            <div className="text-8xl mb-4">🚀</div>
            <p className="text-2xl font-bold">Start Today!</p>
          </div>
        </div>

      </div>
    </div>
  </div>
</section>


  );
}
