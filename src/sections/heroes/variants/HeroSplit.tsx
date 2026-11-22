import { SectionButton } from "../../../components/ui/index";
import type { HeroProps } from "../types";
import { ArrowRight, Play } from "lucide-react";
import { ImageWithFallback } from "../../../helper/ImageWithFallback";
import { getRandomImage } from "../../../helper/function";
import { heroImages } from "../../../helper/data";

export  function HeroSplit({
  title,
  badge,
  description,
actions,
  image,
  className = ""
}: HeroProps) {
  return (
  <section className={`relative overflow-hidden bg-white section-spacing ${className}`}>
  <div className="container mx-auto px-4 hero-inner-spacing">
    <div className="grid md:grid-cols-2 gap-12 items-center">

      {/* Left Content */}
      <div className="scroll-animation scroll-slide-left">
        {badge && (
          <div className="inline-block mb-4 px-4 py-2 bg-gradient-primary text-white rounded-full text-sm font-semibold scroll-animation scroll-fade-up-subtle delay-200">
            {badge}
          </div>
        )}

        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight scroll-animation scroll-fade-up delay-300">
          {title}
        </h1>

        <p className="text-lg text-gray-600 mb-8 leading-relaxed scroll-animation scroll-fade-up delay-500">
          {description}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 scroll-animation scroll-fade-up delay-700">
          {actions?.primary && (
            <SectionButton
              href={`${actions?.primary?.href}`}
              className="bg-gradient-primary hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-6 text-lg group"
            >
              {actions?.primary.text}
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </SectionButton>
          )}
          {actions?.secondary && (
            <SectionButton
              href={`${actions?.secondary?.href}`}
              variant="outline"
              className="px-8 py-6 text-lg border-2 group"
            >
              <Play className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform" />
              {actions?.secondary?.text}
            </SectionButton>
          )}
        </div>

        {/* Trust indicators */}
        <div className="mt-12 flex items-center gap-8 scroll-animation scroll-fade-up delay-900">
          <div className="flex -space-x-2">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="w-10 h-10 rounded-full bg-gradient-primary border-2 border-white"
              />
            ))}
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900">10,000+ Users</p>
            <p className="text-xs text-gray-500">Trusted by teams worldwide</p>
          </div>
        </div>
      </div>

      {/* Right Image */}
      <div className="relative scroll-animation scroll-slide-right delay-400 h-full">
        <div className="relative rounded-2xl overflow-hidden shadow-2xl scroll-animation scroll-float h-full">
          {image ? (
            <ImageWithFallback
              src={image}
              alt={title}
              className="w-full h-full object-cover"
               srcSet={getRandomImage(heroImages)}
            />
          ) : (
            <div className="aspect-[4/3] bg-gradient-primary flex items-center justify-center h-full">
              <div className="text-white text-center p-8">
                <div className="w-32 h-32 mx-auto bg-white/20 rounded-full flex items-center justify-center mb-4">
                  <Play className="w-16 h-16" />
                </div>
                <p className="text-xl font-semibold">Product Preview</p>
              </div>
            </div>
          )}
        </div>

        {/* Floating card */}
        <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-xl p-4 border border-gray-100 scroll-animation scroll-scale delay-1000">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-2xl">✓</span>
            </div>
            <div>
              <p className="font-semibold text-gray-900">100% Verified</p>
              <p className="text-xs text-gray-500">Trusted Platform</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</section>

  );
}
