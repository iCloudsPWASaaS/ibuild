import {
  Sparkles,
  Award,
} from "lucide-react";
import { SectionButton } from "../../../components/ui/index";
import DynamicIcon from "../../../components/ui/icon";
import { splitTitle, type HeroProps } from "../types";
export function DigitalAgencyHero({
  badge,
  title,
  description,
  actions,
  stats
}: HeroProps) {
  const titleParts = splitTitle(String(title || "Creative Solutions That Convert"));

  const visuals = {
    centerIcon: "Lightbulb",
    orbitingElements: [
      { icon: "Sparkles", gradient: "from-blue-500 to-cyan-500" },
      { icon: "Target", gradient: "from-purple-500 to-pink-500" },
      { icon: "Award", gradient: "from-orange-500 to-red-500" },
    ],
  };
  return (
    <div className="relative gradient-primary-full section-spacing overflow-hidden">
      {/* Animated mesh gradient background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,var(--color-gradient-violet-subtle),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,var(--color-gradient-pink-subtle),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,var(--color-gradient-blue-subtle),transparent_50%)]" />
      </div>

      {/* Floating geometric shapes */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(8)].map((_, i) => {
          const size = 8 + i * 4;

          return (
            <div
              key={i}
              className="absolute animate-geo-float"
              style={{
                left: `${(i * 13) % 100}%`,
                top: `${(i * 17) % 100}%`,
                animationDuration: `${8 + i * 2}s`,
                animationDelay: `${i * 0.5}s`,
                "--geoRotate": i % 2 === 0 ? "0deg" : "45deg",
              } as React.CSSProperties 
            }
            >
              <div
                className="border-2 border-blue-500"
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  transform: `rotate(var(--geoRotate))`,
                }}
              />
            </div>
          );
        })}
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 flex items-center hero-inner-spacing">
        <div className="w-full">
          <div className="mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">

              {/* Left Column */}
              <div className="animate-left-column">
                {/* Badge */}
             {badge &&   <div className="animate-badge inline-flex items-center gap-2 px-4 py-2 bg-gradient-primary-light backdrop-blur-sm rounded-full text-sm mb-6 border border-primary-light">
                  <Award className="w-4 h-4" />
                  <span>{badge}</span>
                </div>}

                {/* Title */}
                <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight animate-title">
                  {titleParts?.prefix}

                  <span className="block bg-gradient-primary-heading bg-[length:200%_auto] bg-clip-text text-transparent animate-gradient-text">
                    {titleParts?.highlight}
                  </span>

                  {titleParts?.suffix}
                </h1>

                {/* Description */}
                <p className="text-xl text-gray-300 mb-8 leading-relaxed animate-desc">
                  {description}
                </p>

                {/* Buttons */}
                <div className="flex flex-wrap gap-4 mb-12 animate-buttons">
                  {actions?.primary && <SectionButton size="lg" href={`${actions.primary.href}`} variant={"web"}>
                    <Sparkles className="mr-2 w-5 h-5 group-hover:rotate-12 transition-transform" />
                    {actions.primary.text}
                  </SectionButton>}
                  {actions?.secondary &&
                    <SectionButton
                      size="lg"
                      variant="primaryoutline"
                      href={`${actions.secondary.href}`}
                    >
                      {actions.secondary.text}
                    </SectionButton>}
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-6">
                  {stats?.map((stat:any, index) => (
                    <div
                      key={index}
                      className={`text-center md:text-left scroll-animation scroll-fade-up delay-${600 + index * 100}`}
                    >
                      <div className="flex justify-center md:justify-start mb-2">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl flex items-center justify-center border border-purple-400/30">
                          <DynamicIcon name={stat.icon} className="w-6 h-6 text-primary-light" />
                        </div>
                      </div>

                      <div className="text-2xl font-bold text-white">{stat.value}</div>
                      <div className="text-sm text-gray-400">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column (Visuals) */}
              <div className="hidden lg:block relative animate-right-column">
                <div className="relative">

                  {/* rotating blur bg */}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-spin-slow-linear" />

                  {/* Center circle */}
                  <div className="relative">
                    <div className="w-96 h-96 mx-auto relative animate-center-pulse">
                      <div className="absolute inset-0 gradient-primary-full-dark rounded-full flex items-center justify-center">
                        <DynamicIcon name={visuals.centerIcon} className="w-32 h-32 text-white" />
                      </div>

                      {/* Orbiting elements (FIXED) */}
                      {visuals.orbitingElements.map((item, index) => (
                        <div
                          key={index}
                          className="absolute inset-0 animate-orbit"
                          style={{
                            animationDuration: "20s",
                            animationDelay: `${index * 0.3}s`,
                          }}
                        >
                          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">

                            {/* cancel rotate wrapper */}
                            <div
                              className="animate-orbit-cancel animate-orbit-scale"
                              style={{
                                animationDuration: "20s",
                                animationDelay: `${index * 0.3}s`,
                              }}
                            >
                              <div
                                className={`w-20 h-20 bg-gradient-to-br ${item.gradient} rounded-2xl flex items-center justify-center shadow-2xl border-4 border-white/20`}
                              >
                                <DynamicIcon name={item.icon} className="w-10 h-10 text-white" />
                              </div>
                            </div>

                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Floating cards */}
                  {[
                    { x: -100, y: -50, color: "from-blue-00 to-cyan-500", delay: 0 },
                    { x: 120, y: -80, color: "from-purple-500 to-pink-500", delay: 0.5 },
                    { x: -80, y: 100, color: "from-orange-500 to-red-500", delay: 1 },
                    { x: 100, y: 80, color: "from-green-500 to-emerald-500", delay: 1.5 },
                  ].map((card, index) => (
                    <div
                      key={index}
                      className="absolute animate-float-card"
                      style={{
                        left: `calc(50% + ${card.x}px)`,
                        top: `calc(50% + ${card.y}px)`,
                        animationDelay: `${card.delay}s`,
                      }}
                    >
                      <div
                        className={`w-16 h-16 bg-gradient-to-br ${card.color} rounded-xl shadow-xl border-2 border-white/20`}
                      />
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>

  );
}