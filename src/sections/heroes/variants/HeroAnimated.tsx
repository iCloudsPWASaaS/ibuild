import {
  Calendar,
  PartyPopper,
  Users,
  Sparkles,
  Music,
  Camera
} from "lucide-react";
import { SectionButton } from "../../../components/ui/index";
import { EventManagementHeroDefaults, splitTitle, type HeroProps } from "../types";
import DynamicIcon from "../../../components/ui/icon";

export function EventManagementHero({
  badge,
  title,
  description,
  actions,
  stats,
  features
}: HeroProps) {
  const titleParts = splitTitle(String(title || "Unforgettable Events Every Time"));

  const heroCard = EventManagementHeroDefaults
  return (
    <div className="relative gradient-primary-full overflow-hidden section-spacing">
      {/* Confetti animation */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute particlesFall"
            style={{
              left: `${Math.random() * 100}%`,
              top: '-100px',
              animationDuration: `${5 + Math.random() * 3}s`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          >
            <div
              className="w-3 h-3 rounded-full"
              style={{
                backgroundColor: ['#fbbf24', '#ef4444', '#8b5cf6', '#ec4899', '#10b981'][Math.floor(Math.random() * 5)],
              }}
            />
          </div>
        ))}
      </div>


      {/* Content */}
      <div className="relative container mx-auto px-4 flex items-center">
        <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
          <div className="scroll-animation scroll-slide-left">
          {badge &&  <div
              className="scroll-animation animate-pop-in inline-flex items-center gap-2 px-4 py-2 bg-gradient-primary-light backdrop-blur-sm rounded-full text-white text-sm mb-6 border border-primary-light"
            >
              <PartyPopper className="w-4 h-4" />
              <span>{badge}</span>
            </div>}

            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              {titleParts?.prefix}{" "}
              <span
                className="block gradient-background-full-medium bg-[length:200%_auto] bg-clip-text text-transparent animate-gradient-text"
              >
                {titleParts?.highlight}
              </span>
              {titleParts?.suffix}
            </h1>

            <p className="text-xl text-gray-200 mb-8 leading-relaxed">{description}</p>

            <div className="flex flex-wrap gap-4 mb-12">
              {actions?.primary && <SectionButton
                size="lg"
                variant={'default'}
                href={`${actions.primary.href}`}>
                <Calendar className="mr-2 w-5 h-5" />
                {actions.primary.text}
              </SectionButton>}
              {actions?.secondary && <SectionButton
                href={`${actions.secondary.href}`}
                size="lg"
                variant="primaryoutline"
              >
                {actions.secondary.text}
              </SectionButton>}
            </div>

            <div className="grid grid-cols-3 gap-4">
              {stats?.map((stat:any, index) => (
                <div
                  key={index}
                  style={{ animationDelay: `${1.2 + index * 0.1}s` }}

                  className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 text-center scroll-animation scroll-fade-scale"
                >
                  <div className="flex justify-center mb-2">
                    <DynamicIcon name={stat.icon} className="w-6 h-6 text-yellow-300" />
                  </div>
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-gray-300">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div
            className="hidden lg:block relative animate-right-column"
            style={{
              animationDelay: `${0.3}s`,
              animationDuration: `${0.8}s`,
            }}
          >
            {/* Event showcase */}
            <div className="relative">
              {/* Main event card */}
              <div
                className="relative bg-white/10 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/20 shadow-2xl animate-float-3d"
                style={{
                  animationDuration: `${6}s`,
                }}
              >
                {/* Event image mockup */}
                <div className="relative h-80 bg-gradient-to-br gradient-primary-full-dark-to-light flex items-center justify-center overflow-hidden">
                  <div
                    className="absolute inset-0 opacity-20 animate-spin-slow"
                    style={{
                      animationDuration: `${20}s`,
                    }}
                  >
                    {[...Array(6)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-32 h-32 bg-white rounded-full scroll-animation animate-scale-pulse"
                        style={{
                          left: `${(i % 3) * 33}%`,
                          top: `${Math.floor(i / 3) * 50}%`,
                          animationDelay: `${i * 0.5}s`,
                          animationDuration: `${3}s`,
                        }}
                      />
                    ))}
                  </div>

                  <div className="relative z-10 text-center">
                    <div
                      className="animate-wiggle-scale"
                      style={{
                        animationDuration: `${4}s`,
                      }}
                    >
                      <PartyPopper className="w-40 h-40 text-white mx-auto" />
                    </div>
                  </div>

                  {/* Floating event icons */}
                  {[
                    { icon: Music, x: 20, y: 20 },
                    { icon: Camera, x: 80, y: 30 },
                    { icon: Sparkles, x: 10, y: 70 },
                    { icon: Users, x: 85, y: 75 },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="animate-ingredient-float absolute w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-xl"
                      style={{
                        left: `${item.x}%`,
                        top: `${item.y}%`,
                        animationDuration: `${3}s`,
                        animationDelay: `${index * 0.3}s`,
                      }}
                    >
                      <item.icon className="w-6 h-6 text-purple-600" />
                    </div>
                  ))}
                </div>

                <div className="p-6">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {heroCard?.title}
                  </h3>
                  <p className="text-gray-300 mb-4">
                    {heroCard?.subtitle}
                  </p>

                  <div className="space-y-2 mb-4">
                    {features?.map((service, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 text-sm text-white animate-feature"
                        style={{
                          animationDelay: `${1 + index * 0.1}s`,
                        }}
                      >
                        <Sparkles className="w-4 h-4 text-yellow-300" />
                        {service?.label}
                      </div>
                    ))}
                  </div>

                  <SectionButton
                    size="lg"
                    variant={'web'}
                    href={`${actions?.primary.href}`}
                    className="w-full">
                    {heroCard?.buttonText}
                  </SectionButton>
                </div>
              </div>

              {/* Floating event type badges */}
              {heroCard?.floatingBadges?.map((badge, index) => {
                const positions = [
                  { x: -120, y: -50, delay: 0 },
                  { x: 120, y: -80, delay: 0.3 },
                  { x: -100, y: 120, delay: 0.6 },
                  { x: 100, y: -120, delay: 0.3 },
                ];

                const pos = positions[index] || { x: 0, y: 0 };
                return (
                  <div
                    key={index}
                    className="absolute bg-white rounded-2xl shadow-2xl p-4 border-2 border-purple-200 animate-mini-card"
                    style={{
                      left: `calc(50% + ${pos.x}px)`,
                      top: `calc(50% + ${pos.y}px)`,
                      transform: 'translate(-50%, -50%)',
                      animationDelay: `${1.2 + pos.delay}s`,

                    }}
                  >
                    <div className="text-center">
                      <div className="text-4xl mb-1">{badge.emoji}</div>
                      <div className="text-sm font-semibold text-gray-900">{badge.label}</div>
                    </div>
                  </div>
                )
              })}

              {/* Success rate badge */}
              <div
                className="animate-wiggle-scale absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-full font-bold shadow-2xl border-4 border-white"
                style={{
                  animationDuration: `${3}s`,
                }}
              >
                <div className="text-center">
                  <div className="text-sm">Success Rate</div>
                  <div className="text-2xl">100%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
