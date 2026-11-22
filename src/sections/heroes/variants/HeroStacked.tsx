import {
  Scissors,
  Sparkles,
  Clock
} from "lucide-react";
import { SectionButton } from "../../../components/ui/index";
import { SalonSpaHeroDefaults, splitTitle, type HeroProps } from "../types";
import DynamicIcon from "../../../components/ui/icon";

export function SalonSpaHero({
  badge,
  title,
  description,
  actions,
  stats
}: HeroProps) {
  const titleParts = splitTitle(String(title || "Relax & Rejuvenate Your Beauty"));

  const serviceCard = SalonSpaHeroDefaults?.serviceCard
  const floatingBadges = SalonSpaHeroDefaults?.floatingBadges;
  const promo = SalonSpaHeroDefaults?.promo
  const openingHours = SalonSpaHeroDefaults?.openingHours
  return (
    <div className="relative gradient-background-full-light section-spacing overflow-hidden">

      {/* Floating flower petals */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-petal-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: "100%",
              animationDuration: `${8 + i * 0.5}s`,
              animationDelay: `${i * 0.3}s`,
              "--petalX": `${Math.sin(i) * 50}px`,
              "--petalY": `-300px`,
            } as React.CSSProperties
          }
          >
            <div className="w-6 h-6 bg-gradient-primary-light rounded-full opacity-70 blur-sm" />
          </div>
        ))}
      </div>

      {/* Soft glow effects */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-rose-300 rounded-full blur-[120px] animate-glow-orb-1" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-primary rounded-full blur-[120px] animate-glow-orb-2" />

      {/* Content */}
      <div className="relative container mx-auto px-4 flex items-center ">
        <div className="grid lg:grid-cols-2 gap-12 items-center w-full">

          {/* Left Column */}
          <div className="animate-left-column">

            {/* Badge */}
         {badge &&   <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full text-primary text-sm mb-6 border border-primary-light shadow-lg animate-badge-pop">
              <Sparkles className="w-4 h-4 text-primary" />
              <span>{badge}</span>
            </div>}

            {/* Title */}
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              {titleParts?.prefix}{" "}
              <span className="block bg-gradient-primary-heading bg-clip-text text-transparent animate-gradient-text">
                {titleParts?.highlight}
              </span>
              {titleParts?.suffix}
            </h1>

            {/* Description */}
            <p className="text-xl text-gray-700 mb-8 leading-relaxed animate-desc-fade">
              {description}
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4 mb-12 animate-buttons-fade">
              {actions?.primary && <SectionButton
                size="lg"
                href={`${actions.primary.href}`}
                variant={"web"}
              >
                <Scissors className="mr-2 w-5 h-5" />
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
            <div className="grid grid-cols-3 gap-4">
              {stats?.map((stat:any, index) => (
                <div
                  key={index}
                  className="bg-white/60 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-primary-light text-center animate-stat-card stats-card-hover"
                  style={{
                    animationDelay: `${0.6 + index * 0.1}s`,
                  }}
                >
                  <div className="flex justify-center mb-2">
                    <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
                      <DynamicIcon name={stat.icon} className="w-5 h-5 text-white" />
                    </div>
                  </div>

                  <div className="text-2xl font-bold text-gray-900">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Right Column */}
          <div className="hidden lg:block relative animate-right-column">

            {/* Spa service cards */}
            <div className="relative">

              {/* Main service showcase */}
              <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-primary-light animate-main-card-rock">

                <div className="relative h-64 gradient-background-full-medium flex items-center justify-center">

                  <div className="animate-service-icon-spin">
                    <DynamicIcon name={serviceCard.icon}  className="w-32 h-32 text-primary" />
                  </div>

                  {/* Sparkle effects */}
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute animate-sparkle-pop"
                      style={{
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                        animationDelay: `${i * 0.25}s`,
                      }}
                    >
                      <Sparkles className="w-4 h-4 text-white" />
                    </div>
                  ))}
                </div>

                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {serviceCard.title}
                  </h3>

                  <p className="text-gray-600 mb-4">
                    {serviceCard.subtitle}
                  </p>

                  <div className="space-y-3 mb-4">
                    {serviceCard.items.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-primary-light rounded-lg animate-feature"
                        style={{
                          animationDelay: `${1 + index * 0.1}s`,
                        }}
                      >
                        <span className="text-gray-700">{item.service}</span>
                        <span className="font-bold text-primary">{item.price}</span>
                      </div>
                    ))}
                  </div>

                  <SectionButton variant={"web"} className="w-full">
                    {serviceCard.buttonText}
                  </SectionButton>
                </div>
              </div>

              {/* Floating service badges */}
              {floatingBadges.map((badge, index) => {
                const positions = [
                  { x: -100, y: -50 },
                  { x: 120, y: -80 },
                  { x: -120, y: 100 },
                  { x: 100, y: 120 },
                ];

                const pos = positions[index] || { x: 0, y: 0 };

                return (
                  <div
                    key={index}
                    className="absolute animate-mini-badge"
                    style={{
                      left: `calc(50% + ${pos.x}px)`,
                      top: `calc(50% + ${pos.y}px)`,
                      transform: "translate(-50%, -50%)",
                      animationDelay: `${1.2 + index * 0.1}s`,
                      "--floatDuration": `${3 + index * 0.5}s`,
                    } as React.CSSProperties
                  }
                  >
                    <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-4 border-2 border-primary-light">
                      <div className="text-center">
                        <div className="text-3xl mb-1">{badge.emoji}</div>
                        <div className="text-sm font-semibold text-gray-900">
                          {badge.label}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Special offer badge */}
              <div className="absolute -top-6 -right-6 bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-6 py-4 rounded-full font-bold shadow-2xl border-4 border-white text-center animate-promo-badge">
                <div className="text-2xl">{promo.value}</div>
                <div className="text-xs">{promo.label}</div>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Opening hours badge */}
      <div className="absolute bottom-8 left-1/2 bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl p-6 border border-primary-light flex items-center gap-4 animate-opening-badge">
        <Clock className="w-8 h-8 text-primary" />
        <div>
          <div className="text-sm text-gray-600">{openingHours.label}</div>
          <div className="text-lg font-bold text-gray-900">{openingHours.time}</div>
        </div>
      </div>

    </div>

  );
}