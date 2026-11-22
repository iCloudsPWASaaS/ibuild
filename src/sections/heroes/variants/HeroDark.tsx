import DynamicIcon from "../../../components/ui/icon";
import { SectionButton } from "../../../components/ui/index";
import { splitTitle } from "../types";
import type { HeroProps } from "../types";

export function BusinessWebsiteHero({
  badge,
  title,
  description,
  actions,
  stats
}: HeroProps) {
  const titleParts = splitTitle(String(title || "Transform Your Business Vision Into Reality"));
  return (

 <div className="relative gradient-primary-full overflow-hidden section-spacing">

  {/* Animated background shapes */}
  <div className="absolute inset-0 overflow-hidden">
    <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl bg-animate-rotate-scale" />
    <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl bg-animate-rotate-scale-reverse" />
  </div>

  {/* Content */}
  <div className="relative container mx-auto px-4 flex items-center hero-inner-spacing">
    <div className="grid lg:grid-cols-2 gap-12 items-center w-full">

      {/* Left Content */}
      <div className="">
        {/* Badge */}
       {badge && <div className="inline-block px-4 py-2 bg-gradient-primary-light backdrop-blur-sm rounded-full text-blue-300 text-sm mb-6 scroll-animation scroll-slide-left border border-primary-light" style={{ animationDelay: "0.2s" }}>
          {badge}
        </div>}

        {/* Title */}
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight scroll-animation scroll-slide-left" style={{ animationDelay: "0.3s" }}>
          {titleParts.prefix}{" "}
          <span className="block bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            {titleParts.highlight}
          </span>
          {titleParts.suffix}
        </h1>

        {/* Description */}
        <p className="text-xl text-gray-300 mb-8 leading-relaxed scroll-animation scroll-slide-left" style={{ animationDelay: "0.4s" }}>
          {description}
        </p>

        {/* Buttons */}
        <div className={`flex flex-wrap gap-4 ${(stats && stats?.length != 0) ? 'mb-12' : ''} scroll-animation scroll-slide-left`} style={{ animationDelay: "0.5s" }}>
          <SectionButton
            size="lg"
            href={`${actions?.primary.href}`}
            className="bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white group"
          >
            {actions?.primary.text}
          <span className="ml-2 text-2xl ">→</span>
          </SectionButton>
          <SectionButton
            size="lg"
            variant="outline"
            href={`${actions?.secondary.href}`}
          >
            {actions?.secondary.text}
          </SectionButton>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6">
          {stats?.map((stat:any, index) => (
            <div
              key={index}
              className="text-center scroll-animation scroll-fade-up delay-500 "
              style={{ animationDelay: `${0.4 + index * 0.1}s` }}
            >
              <div className="flex justify-center mb-2">
                <DynamicIcon name={stat.icon} className={"w-6 h-6 text-secondary"}  />
              </div>
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Side Visuals */}
      <div className="hidden lg:block scroll-animation scroll-slide-right" style={{ animationDelay: "0.2s" }}>
        <div className="relative">
          <div className="relative z-10 bg-linear-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-xl rounded-3xl p-8 border border-white/20 scroll-animation scroll-float">
            <div className="space-y-4">
              {[1, 2, 3].map((_, index) => (
                <div
                  key={index}
                  className="h-4 bg-linear-to-r from-blue-400 to-purple-400 rounded-full scroll-animation scroll-grow-width"
                  style={{ width: `${100 - index * 20}%`, animationDelay: `${0.8 + index * 0.2}s` }}
                />
              ))}
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4 scroll-animation scroll-fade-scale">
              {[1, 2, 3, 4].map((num) => (
                <div
                  key={num}
                  className="h-24 bg-white/10 rounded-xl backdrop-blur-sm border border-white/20"
                />
              ))}
            </div>
          </div>

          {/* Floating elements */}
          <div className="absolute -top-6 -right-6 w-32 h-32 bg-primary/30 rounded-2xl backdrop-blur-sm border border-blue-400/30 scroll-animation scroll-float" />
          <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-primary/30 rounded-2xl backdrop-blur-sm border border-purple-400/30 scroll-animation scroll-float" />
        </div>
      </div>

    </div>
  </div>
</div>

  );
}