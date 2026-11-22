import { Rocket, Zap } from "lucide-react";
import { SectionButton } from "../../../components/ui/index";
import { getRandomGradient, splitTitle, type HeroProps } from "../types";
import DynamicIcon from "../../../components/ui/icon";

export function StartupLandingPageHero({
  badge,
  title,
  description,
  actions,
  features,
  stats
}: HeroProps) {
  const titleParts = splitTitle(String(title || "Unforgettable Events Every Time"));

  return (
    <div className="relative bg-black overflow-hidden section-spacing">
      {/* Animated grid background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-grid-white)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-grid-white)_1px,transparent_1px)] bg-[size:4rem_4rem]" />

        {/* Moving grid effect */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-grid-indigo)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-grid-indigo)_1px,transparent_1px)] bg-[size:8rem_8rem] animate-grid-move" />
      </div>

      {/* Gradient orbs */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gradient-primary-shadow rounded-full blur-[150px] animate-orb-1" />

      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-gradient-primary-shadow rounded-full blur-[150px] animate-orb-2" />

      {/* Content */}
      <div className="relative container mx-auto px-4 flex items-center">
        <div className="w-full">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">

              {/* Wrapper (motion initial animate) */}
              <div className="animate-fade-up">

                {/* Badge */}
              {badge &&  <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-primary-light  backdrop-blur-sm rounded-full text-indigo-300 text-sm mb-6 border border-indigo-500/30 animate-pop-in">
                  <Zap className="w-4 h-4" />
                  <span>{badge}</span>
                </div>}

                {/* Title */}
                <h1 className="text-5xl md:text-8xl font-bold text-white mb-6 leading-tight">
                  {titleParts?.prefix}{" "}

                  {/* Highlight Gradient Animation */}
                  <span className="block bg-gradient-primary-top-bottom bg-[length:200%_auto] bg-clip-text text-transparent animate-gradient-text">
                    {titleParts?.highlight}
                  </span>

                  {titleParts?.suffix}
                </h1>

                {/* Description */}
                <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed animate-desc-in">
                  {description}
                </p>

                {/* Buttons */}
                <div className="flex flex-wrap items-center justify-center gap-4 mb-12 animate-buttons-in">
                  {actions?.primary && <SectionButton
                    size="lg"
                    variant={"web"}
                    href={`${actions.primary.href}`}
                    className=""
                  >
                    <Rocket className="mr-2 w-6 h-6 group-hover:translate-y-[-4px] transition-transform" />
                    {actions.primary.text}
                  </SectionButton>}
                  {actions?.secondary &&
                    <SectionButton
                      size="lg"
                      variant="common"
                      href={`${actions.secondary.href}`}
                      className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm text-lg px-8 py-5"
                    >
                      {actions.secondary.text}
                    </SectionButton>}
                </div>

                {/* Trust Indicators */}
                <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-gray-500 animate-socials-in">
                  {features?.slice(3).map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-primary" />
                      <span>{item?.label}</span>
                    </div>
                  ))}
                </div>

              </div>
            </div>

            {/* Stats section */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto animate-stats">
              {stats?.map((stat:any, index) => (
                <div
                  key={index}
                  className="relative group animate-stat-card stats-card-hover"
                  style={{ animationDelay: `${1.2 + index * 0.1}s` }}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${getRandomGradient(index)} rounded-2xl blur-xl opacity-0 group-hover:opacity-75 transition-opacity`}
                  />

                  <div className="relative bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 group-hover:border-white/30 transition-colors">
                    <div
                      className={`w-12 h-12 bg-gradient-to-r ${getRandomGradient(index)} rounded-xl flex items-center justify-center mb-4 mx-auto`}
                    >
                      <DynamicIcon name={stat.icon} className="w-6 h-6 text-white" />
                    </div>

                    <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Floating elements (Dynamic based on Stats) */}
            <div className="absolute inset-0 pointer-events-none">
              {stats?.slice(0, 4).map((item:any, index) => {
                const positions = [
                  { x: "10%", y: "20%" },
                  { x: "85%", y: "25%" },
                  { x: "15%", y: "70%" },
                  { x: "90%", y: "75%" },
                ];
                const pos = positions[index] || { x: "50%", y: "50%" };

                return (
                  <div
                    key={index}
                    className="absolute animate-float-pulse"
                    style={{
                      left: pos.x,
                      top: pos.y,
                      animationDelay: `${index * 0.3}s`,
                    }}
                  >
                    <div className="w-16 h-16 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/10">
                      <DynamicIcon name={item.icon} className="w-8 h-8 text-primary" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 bg-[length:200%_auto] animate-gradient-line" />
    </div>

  );
}