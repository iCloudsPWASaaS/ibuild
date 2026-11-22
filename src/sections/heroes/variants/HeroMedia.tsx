import { useState } from "react";
import { SectionButton } from "../../../components/ui/index";
import type { HeroProps } from "../types";
import { Volume2, VolumeX, ArrowRight } from "lucide-react";
import { ImageWithFallback } from "../../../helper/ImageWithFallback";
import { getRandomImage } from "../../../helper/function";
import { heroImages } from "../../../helper/data";

export function HeroMedia({
  title,
  badge,
  description,
actions,
  image,
  video,
  className = ""
}: HeroProps) {
  const [isMuted, setIsMuted] = useState(true);

  const displayImage = image || "https://images.unsplash.com/photo-1661956602116-aa6865609028?q=80&w=2664&auto=format&fit=crop";

  return (
    <section className={`relative min-h-screen flex items-center overflow-hidden bg-gray-900 dark:bg-black section-spacing ${className}`}>

  {/* Background Video or Gradient */}
  <div className="absolute inset-0 z-0">
    {video ? (
      <div className="relative w-full h-full">
        <video
          autoPlay
          loop
          muted={isMuted}
          playsInline
          className="w-full h-full object-cover opacity-60"
        >
          <source src={video} type="video/mp4" />
        </video>
        <button
          onClick={() => setIsMuted(!isMuted)}
          className="absolute bottom-8 right-8 z-30 p-2 bg-black/50 backdrop-blur-md text-white/70 hover:text-white rounded-full border border-white/10"
        >
          {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
        </button>
      </div>
    ) : (
      <div
        className="w-full h-full gradient-primary-full dark:from-black dark:via-gray-900 dark:to-blue-950 bg-[length:400%_400%]"
        style={{
          animation: "gradientShift 15s ease-in-out infinite",
        }}
      />
    )}

    <div className="absolute inset-0 bg-linear-to-r from-black/90 via-black/70 to-black/30 dark:from-black dark:via-black/80 dark:to-transparent z-10" />
  </div>

  {/* Content */}
  <div className="container mx-auto px-4 relative z-20 w-full py-20">
    <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

      {/* Left Text */}
      <div className="max-w-2xl">

        {badge && (
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-gradient-primary-light backdrop-blur-sm rounded-full text-sm border border-white/10 scroll-animation scroll-fade-up-subtle delay-200">
            <span className="w-2 h-2 rounded-full bg-primary" />
            {badge}
          </div>
        )}

        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight tracking-tight scroll-animation scroll-fade-up delay-200">
          {title}
        </h1>

        <p className="text-lg md:text-xl text-gray-300 dark:text-gray-400 mb-10 leading-relaxed font-light max-w-lg scroll-animation scroll-fade-up delay-200">
          {description}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 scroll-animation scroll-fade-up delay-200">
          {actions?.primary && (
            <SectionButton
              href={`${actions?.primary?.href}`}
              className="bg-primary hover:bg-blue-700 text-white px-8 py-6 text-lg rounded-xl shadow-lg shadow-blue-900/50 transition-all border border-transparent"
            >
              {actions?.primary?.text}
              <ArrowRight className="ml-2 w-5 h-5" />
            </SectionButton>
          )}
          {actions?.secondary && (
            <SectionButton
              href={`${actions?.secondary?.href}`}
              variant="outline"
              className="px-8 py-6 text-lg border border-white/20 text-white bg-white/5 backdrop-blur-sm hover:bg-white/10 rounded-xl"
            >
              {actions?.secondary?.text}
            </SectionButton>
          )}
        </div>

      </div>

      {/* Right Image */}
      <div className="hidden lg:block relative h-full flex items-center justify-center">

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-primary/20 blur-[80px] rounded-full pointer-events-none scroll-animation scroll-float" />

        <div className="relative w-full aspect-4/3 rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-gray-900/50 backdrop-blur-sm scroll-animation scroll-fade-scale">
          <ImageWithFallback
            src={displayImage}
            alt={title}
            className="w-full h-full object-cover"
            srcSet={getRandomImage(heroImages)}
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent pointer-events-none" />
        </div>

      </div>

    </div>
  </div>

</section>

  );
}