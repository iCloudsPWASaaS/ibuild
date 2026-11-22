import {
  Dumbbell,
  Zap,
  Trophy
} from "lucide-react";
import { splitTitle, type HeroProps } from "../types";
import DynamicIcon from "../../../components/ui/icon";

export function GymFitnessHero({
  badge,
  title,
  description,
  actions,
  stats,
  features
}: HeroProps) {
  const titleParts = splitTitle(String(title || "Strategic Consulting For Growth"));
const icons = ["Heart", "Zap", "Trophy", "TrendingUp"];

const shuffledIcons = [...icons].sort(() => Math.random() - 0.5);
  const visuals = {
    orbitingIcons: shuffledIcons
  }
  const promo = {
    label: "💪 Limited Time Offer",
    offer: "50% OFF First Month",
  }
  return (
    <div className="relative gradient-primary-full-dark-to-light section-spacing overflow-hidden">
      {/* Energy waves */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute top-1/2 left-1/2 animate-energy-wave border-4 border-white/20 rounded-full w-[800px] h-[800px]"
            style={{
              animationDelay: `${i * 0.8}s`,
            }}
          />
        ))}
      </div>

      {/* Diagonal stripes pattern */}
      <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,var(--color-overlay-dark-subtle)_10px,var(--color-overlay-dark-subtle)_20px)]" />

      {/* Content */}
      <div className="relative container mx-auto px-4 flex items-center hero-inner-spacing">
        <div className="grid lg:grid-cols-2 gap-12 items-center w-full">

          {/* Left Column */}
          <div className="animate-left-column">

            {/* Badge */}
        {badge &&  <div
              className="inline-flex items-center gap-2 px-4 py-2 bg-black/30 backdrop-blur-sm rounded-full text-white text-sm mb-6 border border-white/30 animate-badge-pop"
            >
              <Zap className="w-4 h-4" />
              <span>{badge}</span>
            </div>}

            {/* Title */}
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              <span className="block animate-title-pulse">
                {titleParts?.prefix}
              </span>
              <span className="block text-secondary">
                {titleParts?.highlight}
              </span>
              {titleParts?.suffix}
            </h1>

            {/* Description */}
            <p className="text-xl text-white/90 mb-8 leading-relaxed animate-desc-fade">
              {description}
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4 mb-12 animate-buttons-fade">
              {actions?.primary && <a
                href={`${actions.primary.href}`}
                className="btn-web flex items-center px-8 py-4 bg-black text-white font-bold rounded-lg hover:scale-105 transition-transform"
              >
                <Trophy className="mr-2 w-5 h-5" />
                {actions.primary.text}
              </a>}
              {actions?.secondary && <a
                href={`${actions.secondary.href}`}
                className="px-8 py-4 border border-white/30 text-white font-bold rounded-lg hover:bg-white/10 transition-colors"
              >
                {actions.secondary.text}
              </a>}
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-4">
              {stats?.map((stat:any, index) => (
                <div
                  key={index}
                  className="bg-black/30 backdrop-blur-sm rounded-xl p-4 border border-white/20 text-center animate-stat-card stats-card-hover"
                  style={{ animationDelay: `${0.6 + index * 0.1}s` }}
                >
                  <DynamicIcon name={stat.icon} className="w-6 h-6 text-secondary mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-white/80">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column (Visuals) */}
          <div className="hidden lg:block relative animate-right-column">
            <div className="relative flex items-center justify-center">

              {/* Center circle with pulse effect */}
              <div className="absolute w-96 h-96 bg-yellow-300 rounded-full blur-3xl animate-glow-pulse" />

              {/* Rotating outer ring */}
              <div className="relative w-80 h-80 border-8 border-white/30 rounded-full flex items-center justify-center animate-circle-rotate">
                <div className="absolute inset-4 border-4 border-white/50 rounded-full" />
                <div className="absolute inset-8 border-2 border-white/70 rounded-full" />

                {/* Main Center Icon - Counter-rotated to stay upright */}
                <div className="animate-orbit-cancel flex flex-col items-center">
                  <div className="animate-orbit">
                    <Dumbbell className="w-32 h-32 text-white" />
                  </div>
                  <div className="text-2xl text-white font-semibold">GET FIT</div>
                </div>

                {/* Orbiting workout icons */}
                {visuals.orbitingIcons.map((Icon, index) => {
                  return (
                    <div
                      key={index}
                      className="absolute inset-0 animate-orbit"
                      style={{ animationDelay: `-${index * 15}s` }}
                    >
                      <div
                        className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-2xl animate-orbit-scale"
                        style={{
                          transformOrigin: 'center 160px',
                          animationDelay: `${index * 0.25}s`
                        }}
                      >
                        <div className="animate-orbit-cancel">
                          <DynamicIcon name={Icon} className="w-8 h-8 text-orange-600" />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Floating stat cards */}
              {features?.map((stat:any, index) => {
                const positions = [
                  { x: -150, y: -120 },
                  { x: 150, y: -120 },
                  { x: -150, y: 120 },
                  { x: 150, y: 120 }
                ];
                const pos = positions[index] || { x: 0, y: 0 };

                return (
                  <div
                    key={index}
                    className="absolute bg-white rounded-2xl shadow-2xl p-4 min-w-[120px] animate-float-card"
                    style={{
                      left: `calc(50% + ${pos.x}px)`,
                      top: `calc(50% + ${pos.y}px)`,
                      transform: 'translate(-50%, -50%)',
                      animationDelay: `${0.8 + index * 0.1}s`,
                    }}
                  >
                    <div className="text-3xl mb-1">
                      <DynamicIcon name={stat?.icon} /></div>
                    <div className="text-2xl font-bold text-gray-900">{stat?.value}</div>
                    <div className="text-xs text-gray-600">{stat?.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Motivational badge */}
      <div className="absolute bottom-8 left-1/2 animate-bottom-badge bg-black/50 backdrop-blur-sm rounded-2xl p-6 border border-white/30 text-center min-w-[300px]">
        <div className="text-white text-lg font-semibold mb-2">{promo.label}</div>
        <div className="text-secondary text-3xl font-bold">{promo.offer}</div>
      </div>
    </div>
  );
}