import { SectionButton } from "../../../components/ui/index";
import type { HeroProps } from "../types";
import { ArrowRight, Sparkles } from "lucide-react";

export function HeroCentered({
  title,
  badge,
  description,
actions,
  className = ""
}: HeroProps) {
  return (
        <section className={`relative overflow-hidden bg-white section-spacing ${className}`}>

  {/* 1. TEXTURE: Dot Grid Background */}
  <div className="absolute inset-0 h-full w-full bg-[radial-gradient(var(--color-grid-light)_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_at_center,black_60%,transparent_100%)] z-0 opacity-60" />

  {/* 2. ATMOSPHERE: Moving Gradient Orbs */}
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute -top-[10%] left-[20%] w-[500px] h-[500px] gradient-background-full-medium rounded-full blur-[100px] mix-blend-multiply scroll-float" />
    <div className="absolute top-[10%] right-[20%] w-[400px] h-[400px] gradient-background-full-medium rounded-full blur-[100px] mix-blend-multiply scroll-float" />
  </div>

  <div className="container mx-auto px-4 hero-inner-spacing relative z-10">
    <div className="max-w-4xl mx-auto text-center">

      {/* Subtitle - Glass Effect & Glow */}
      {badge && (
        <div className="inline-flex justify-center scroll-animation scroll-fade-up-subtle">
          <div className="flex items-center gap-2 mb-8 px-4 py-1.5 bg-gradient-primary border border-white/60 shadow-[0_4px_20px_-2px_var(--color-overlay-dark-subtle)] rounded-full ring-1 ring-gray-100">
            <Sparkles className="w-4 h-4 text-white fill-primary/20" />
            <span className="text-sm font-semibold text-white">
              {badge}
            </span>
          </div>
        </div>
      )}

      {/* Title - Bigger, Bolder with Gradient */}
      <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-gray-900 mb-8 tracking-tight leading-[1.1] scroll-animation  scroll-fade-up delay-100">
        <span className="bg-clip-text text-transparent bg-gradient-to-br from-gray-900 via-gray-700 to-gray-500">
          {title}
        </span>
      </h1>

      {/* Description */}
      <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed font-light scroll-animation scroll-fade-up delay-200">
        {description}
      </p>

      {/* CTAs - Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-5 scroll-animation scroll-fade-up delay-300">
        {actions?.primary && (
          <SectionButton
            href={`${actions?.primary?.href}`}
            className="relative overflow-hidden bg-gray-900 hover:bg-black text-white px-8 py-7 text-lg rounded-2xl shadow-xl shadow-gray-200/50 hover:shadow-2xl hover:shadow-gray-300/50 transition-all duration-300 hover:-translate-y-1 group"
          >
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
            <span className="flex items-center gap-2">
              {actions?.primary?.text}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </SectionButton>
        )}
        {actions?.secondary && (
          <SectionButton
            href={`${actions?.secondary?.href}`}
            variant="outline"
            className="px-8 py-7 text-lg border border-gray-200 bg-white/50 backdrop-blur-sm hover:bg-white text-gray-700 rounded-2xl hover:border-gray-300 transition-all duration-300"
          >
            {actions?.secondary?.text}
          </SectionButton>
        )}
      </div>

      {/* 3. VISUAL DECORATION */}
      <div className="absolute top-1/2 -left-12 w-24 h-24 md:w-32 md:h-32 bg-gradient-primary rounded-2xl rotate-12 opacity-10 blur-xl animate-pulse" />
      <div className="absolute bottom-0 -right-12 w-32 h-32 md:w-48 md:h-48 gradient-secondary rounded-full opacity-10 blur-2xl animate-pulse" />
    </div>
  </div>
</section>
  );
}