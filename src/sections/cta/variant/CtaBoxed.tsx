import type { CTAProps } from "../types";
import { SectionButton } from "../../../components/ui/index";

export function CTABoxed({ title, description, primaryCta, className = ""}: CTAProps) {
  return (
<section className={`py-20 bg-gray-50 section-spacing ${className}`}>
  <div className="container mx-auto px-4">
    <div
      className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl border-2 border-gray-200 p-12 text-center
                 scroll-animation scroll-fade-scale"
    >
      <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">{title}</h2>
      {description && (
        <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
          {description}
        </p>
      )}
      <SectionButton href={`${primaryCta.href}`} className="px-10 py-6 text-lg" variant={'web'}>
        {primaryCta.text}
      </SectionButton>
    </div>
  </div>
</section>
  );
}
