import { SectionButton } from "../../../components/ui/index";
import type { HeroProps } from "../types";
import { ArrowDownRight, MoveRight, Globe, Circle, Star } from "lucide-react";
import { ImageWithFallback } from "../../../helper/ImageWithFallback";
import { getIndaxImage } from "../../../helper/function";
import { heroImages } from "../../../helper/data";
export function HeroMinimal({
  title,
  description,
  actions,
  className = "",
  image
}: HeroProps) {

  return (
    <section className={`bg-primary relative min-h-screen w-full mx-auto flex flex-col justify-between bg-white text-stone-900 overflow-hidden ${className}`}>

  {/* Top Bar */}
  <div className="w-full border-b border-stone-200 py-4 px-6 md:px-12 flex justify-between items-center text-xs font-mono uppercase tracking-widest text-stone-500 z-30 gradient-primary-full">
    <div className="flex items-center gap-2 text-white">
      <Globe className="w-3 h-3" />
      <span>Global Edition</span>
    </div>
    <div className="flex items-center gap-2 text-white">
      <div className="w-2 h-2 bg-primary rounded-full " />
      <span>System Online</span>
    </div>
  </div>

  {/* Main Content */}
  <div className="flex-1 flex flex-col justify-center relative z-20 gradient-secondary">
    <div className="absolute left-6 md:left-12 top-0 bottom-0 w-px bg-stone-300 hidden md:block" />
    <div className="absolute right-6 md:right-12 top-0 bottom-0 w-px bg-stone-500 hidden md:block" />

    <div className="container mx-auto px-6 md:px-16 section-spacing">
      <div className="max-w-7xl mx-auto ">

        {/* Title and Right Image */}
        <div className="grid lg:grid-cols-12 gap-8 items-end mb-8 relative">

          <div className="lg:col-span-8 relative z-30 ">
            <h1 className="text-6xl md:text-8xl lg:text-[7rem] font-black leading-[0.9] tracking-tighter text-stone-900 block">
              {title}
            </h1>
          </div>

          <div className="lg:col-span-4 hidden lg:block pb-2 relative z-10 ">
            <div className="relative w-full aspect-square">
              <div className="absolute inset-0 overflow-hidden border border-stone-900 bg-gradient-primary">
                <ImageWithFallback
                  src={image}
                  alt={title}
                  className="w-full h-full object-cover mix-blend-multiply "
                  srcSet={getIndaxImage(heroImages,3)}
                />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,transparent_98%,var(--color-grid-dark)_98%),linear-gradient(to_bottom,transparent_98%,var(--color-grid-dark)_98%)] bg-[size:2rem_2rem] opacity-20" />
              </div>

              {/* Rotating text & star */}
              <div className="absolute -top-10 -right-10 w-32 h-32 z-20 animate-[spin_20s_linear_infinite]">
                <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
                  <path id="curve" d="M 50 50 m -37 0 a 37 37 0 1 1 74 0 a 37 37 0 1 1 -74 0" fill="transparent" />
                  <text className="text-[10px] font-bold uppercase fill-stone-900 tracking-widest">
                    <textPath href="#">
                      • Premium Collection • Official Design
                    </textPath>
                  </text>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Star className="w-6 h-6 fill-stone-900 text-stone-900" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-stone-900 my-8 origin-left  " />

        {/* Scroll instruction + Description + CTA */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start relative z-20">

          <div className="md:col-span-4 flex flex-col gap-4 ">
            <div className="flex items-start gap-4 text-stone-600">
              <ArrowDownRight className="w-6 h-6 md:w-10 md:h-10" />
              <p className="text-sm  max-w-[150px]">
                SCROLL DOWN TO EXPLORE THE FUTURE
              </p>
            </div>
          </div>

          <div className="md:col-span-8 md:pl-10 flex flex-col items-start scroll-animation scroll-fade-up delay-600">
            <p className="text-xl md:text-3xl font-light text-stone-600 mb-10 leading-snug max-w-2xl">
              {description}
            </p>

            {actions?.primary && (
              <div className="group relative scroll-animation scroll-fade-up delay-700">
                <SectionButton
                  href={`${actions?.primary?.href}`}
                  className="py-8 text-xl transition-all duration-300 flex items-center gap-4"
                >
                  {actions?.primary?.text}
                  <MoveRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                </SectionButton>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  </div>

  {/* Bottom Scrolling Ticker */}
  <div className="border-t border-stone-200 py-4 overflow-hidden bg-black/90 backdrop-blur-sm z-30 relative ">
    <div className="flex whitespace-nowrap gap-16 text-stone-400 text-sm font-bold uppercase tracking-widest marquee">
      {[...Array(6)].map((_, i) => (
        <span key={i} className="flex items-center gap-4 text-white">
          <Circle className="w-2 h-2 fill-current" />
          Minimal Design
          <Circle className="w-2 h-2 fill-current" />
          Maximum Impact
          <Circle className="w-2 h-2 fill-current" />
          Pure Function
        </span>
      ))}
    </div>
  </div>
</section>

  );
}