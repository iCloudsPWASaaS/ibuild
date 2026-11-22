import type { CTAProps } from "../types";
import { SectionButton } from "../../../components/ui/index";
import { Sparkles } from "lucide-react";

export function CTACentered({ title, description, primaryCta, secondaryCta, className = "",label="" }: CTAProps) {
  return (
<section className={`py-20 bg-gradient-primary text-white section-spacing ${className}`}>
  <div className="container mx-auto px-4">
    <div className="max-w-4xl mx-auto text-center">

      {/* Badge: Fade + Scale (like motion.div) */}
     {label != "" && <div className="inline-flex items-center gap-2 mb-6 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20
                      scroll-animation scroll-fade-scale">
        <Sparkles className="w-5 h-5" />
        <span className="font-semibold">{label}</span>
      </div>}

      {/* Title: Fade + Slide Up, delay 0.1s (like motion.h2) */}
      <h2 className="text-4xl md:text-6xl font-bold mb-6
                     scroll-animation scroll-fade-up-subtle delay-100">
        {title}
      </h2>

      {/* Description: Fade + Slide Up, delay 0.2s (like motion.p) */}
      {description && (
        <p className="text-xl text-white mb-10 leading-relaxed
                      scroll-animation scroll-fade-up-subtle delay-200">
          {description}
        </p>
      )}

      {/* CTA Buttons: Fade + Slide Up, delay 0.3s (like motion.div) */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4
                      scroll-animation scroll-fade-up-subtle delay-300">
        <SectionButton href={`${primaryCta.href}`} variant={'common'} className="px-8 py-6 text-lg">
          {primaryCta.text}
        </SectionButton>

        {secondaryCta && (
          <SectionButton href={`${secondaryCta.href}`} className="border-2 border-white text-white px-8 py-6 text-lg">
            {secondaryCta.text}
          </SectionButton>
        )}
      </div>

    </div>
  </div>
</section>



  );
}
