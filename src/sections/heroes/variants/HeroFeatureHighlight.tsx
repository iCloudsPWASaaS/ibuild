import {
  Heart,
  Shield,
  Phone,
  Stethoscope,
  Activity,
} from "lucide-react";
import { SectionButton } from "../../../components/ui/index";
import { ClinicHospitalHeroDefaults, getRandomGradient, splitTitle, type HeroProps } from "../types";
import DynamicIcon from "../../../components/ui/icon";


export function ClinicHospitalHero({
  badge,
  title,
  description,
  actions,
  stats,
  features
}: HeroProps) {
  const titleParts = splitTitle(String(title || "Your Health Our Priority Always"));

  const healthMonitor = ClinicHospitalHeroDefaults?.healthMonitor

  const doctorCard = ClinicHospitalHeroDefaults?.doctorCard
  const emergencyBadge = ClinicHospitalHeroDefaults?.emergencyBadge
  return (
    <div className="relative bg-gradient-extra-light section-spacing overflow-hidden">

      {/* Medical cross pattern */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute text-primary animate-cross-float"
            style={{
              left: `${(i % 4) * 25}%`,
              top: `${Math.floor(i / 4) * 33}%`,
              fontSize: "60px",
              animationDelay: `${i * 0.5}s`,
            }}
          >
            +
          </div>
        ))}
      </div>

      {/* Heartbeat line */}
      <div className="absolute top-1/4 left-0 right-0 h-px bg-gradient-primary-light to-transparent opacity-30" />

      {/* Content */}
      <div className="relative container mx-auto px-4 flex items-center">
        <div className="grid lg:grid-cols-2 gap-12 items-center w-full">

          {/* Left Column */}
          <div className="scroll-animation scroll-slide-left">

            {/* Badge */}
           {badge && <div className="scroll-animation scroll-fade-scale delay-200 inline-flex items-center gap-2 px-4 py-2 bg-primary-background-light rounded-full text-primary text-sm mb-6 border border-primary-light">
              <Shield className="w-4 h-4" />
              <span>{badge}</span>
            </div>
}
            {/* Title */}
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              {titleParts?.prefix}{" "}
              <span className="block bg-gradient-primary-heading bg-clip-text text-transparent">
                {titleParts?.highlight}
              </span>
              {titleParts?.suffix}
            </h1>

            {/* Description */}
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              {description}
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4 mb-12">
              {actions?.primary && <SectionButton size="lg" href={`${actions.primary.href}`} variant={"web"}>
                <Heart className="mr-2 w-5 h-5" />
                {actions.primary.text}
              </SectionButton>}

              {actions?.secondary && <SectionButton
                size="lg"
                variant="primaryoutline"
                href={`${actions.secondary.href}`}
              >
                <Phone className="mr-2 w-5 h-5" />
                {actions.secondary.text}
              </SectionButton>}
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {stats && stats?.map((stat:any, index) => (
                <div
                  key={index}
                  className={`scroll-animation scroll-fade-up delay-${600 + index * 100} bg-white rounded-xl p-4 shadow-lg border border-primary-light`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                      <DynamicIcon name={stat.icon} className="w-6 h-6 text-white" />
                    </div>

                    <div>
                      <div className="text-sm text-gray-600">{stat?.label}</div>
                      <div className="text-lg font-bold text-gray-900">{stat?.value}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column (Dashboard) */}
          <div className="hidden lg:block relative scroll-animation scroll-scale delay-300">

            <div className="relative">

              {/* Main health monitor card */}
              <div className="relative bg-white rounded-3xl shadow-2xl p-8 border border-gray-200 scroll-float">

                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                      <Heart className="w-6 h-6 text-white" />
                    </div>

                    <div>
                      <div className="font-semibold text-gray-900">{healthMonitor?.title}</div>
                      <div className="text-sm text-gray-600">{healthMonitor?.subtitle}</div>
                    </div>
                  </div>

                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse-grid" />
                </div>

                {/* Heart rate monitor */}
                <div className="bg-primary-background-light rounded-2xl p-6 mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-semibold text-gray-700">Heart Rate</span>
                    <Activity className="w-5 h-5 text-primary" />
                  </div>

                  {/* Heartbeat wave */}
                  <div className="flex items-end justify-center h-32 gap-1 mb-2">
                    {ClinicHospitalHeroDefaults && ClinicHospitalHeroDefaults?.chart.map(
                      (height, index) => (
                        <div
                          key={index}
                          className="flex-1 rounded-t-sm animate-hb-bar"
                          style={{
                            height: `${height * 4}px`,
                            animationDelay: `${0.8 + index * 0.05}s`,
                          }}
                        />
                      )
                    )}
                  </div>

                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary animate-scale-pulse">
                      {healthMonitor.heartRate.value}
                    </div>
                    <div className="text-sm text-gray-600">{healthMonitor.heartRate.label}</div>
                  </div>
                </div>

                {/* Vital signs grid */}
                <div className="grid grid-cols-2 gap-4">
                  {features && features?.map((vital, index) => (
                    <div
                      key={index}
                      className={`scroll-animation scroll-fade-scale delay-${1200 + index * 100} bg-gray-50 rounded-xl p-4 border border-gray-200`}
                    >
                      <div
                        className={`w-8 h-8 bg-gradient-to-br ${getRandomGradient(index)} rounded-lg mb-2`}
                      />
                      <div className="text-xs text-gray-600 mb-1">{vital.label}</div>
                      <div className="flex items-baseline gap-1">
                        <div className="text-2xl font-bold text-gray-900">{vital.value}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating appointment card */}
              <div className="absolute -right-6 top-1/4 bg-white rounded-2xl shadow-2xl p-4 border-2 border-primary-light min-w-[200px] scroll-animation scroll-slide-right delay-1600 scroll-float">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                    <Stethoscope className="w-6 h-6 text-white" />
                  </div>

                  <div>
                    <div className="font-semibold text-sm text-gray-900">{doctorCard.name}</div>
                    <div className="text-xs text-gray-600 mb-2">{doctorCard.specialty}</div>

                    <div className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                      {doctorCard.status}
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating emergency badge */}
              <div className="absolute -left-6 bottom-1/4 bg-red-500 rounded-2xl shadow-2xl p-4 border-4 border-white scroll-animation scroll-slide-left delay-1800 scroll-float">
                <Phone className="w-8 h-8 text-white mb-2" />
                <div className="text-white font-bold text-sm">{emergencyBadge?.label}</div>
                <div className="text-white text-xs">{emergencyBadge?.phone}</div>
              </div>

              {/* Success checkmark */}
              <div className="absolute -top-6 -left-6 w-16 h-16 bg-green-500 rounded-full flex items-center justify-center shadow-2xl border-4 border-white animate-pop-rotate delay-2000">
                <Heart className="w-8 h-8 text-white fill-white" />
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>

  );
}