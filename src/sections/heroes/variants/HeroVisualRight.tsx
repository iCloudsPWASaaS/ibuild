import {
  LineChart,
  Award,
  CheckCircle,
} from "lucide-react";
import { SectionButton } from "../../../components/ui/index";
import React from "react";
import { ConsultingHeroDefaults, getRandomGradient, splitTitle, type HeroProps } from "../types";
import DynamicIcon from "../../../components/ui/icon";

export function ConsultingFirmHero({
  badge,
  title,
  description,
  actions,
  features,
  stats
}: HeroProps) {

  const titleParts = splitTitle(String(title || "Strategic Consulting For Growth"));
  const visuals = ConsultingHeroDefaults;

  return (
    <div className="relative bg-white section-spacing overflow-hidden">
      {/* Professional grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-grid-light)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-grid-light)_1px,transparent_1px)] bg-[size:6rem_6rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,var(--color-mask-black)_70%,transparent_100%)]" />

      {/* Subtle gradient accent */}
      <div className="absolute inset-0 bg-gradient-extra-light opacity-60" />

      {/* Content */}
      <div className="relative container mx-auto px-4 flex items-center">
        <div className="grid lg:grid-cols-2 gap-12 items-center w-full">

          {/* Left Column */}
          <div className="animate-left-column-professional">

            {/* Badge */}
          {badge &&  <div className="animate-badge-professional inline-flex items-center gap-2 px-4 py-2 bg-primary-light rounded-full text-primary text-sm mb-6 border border-primary-light">
              <Award className="w-4 h-4" />
              <span>{badge}</span>
            </div>}

            {/* Title */}
            <h1 className="animate-title-professional text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              {titleParts?.prefix}
              <span className="block text-transparent bg-clip-text bg-gradient-primary-heading">
                {titleParts?.highlight}
              </span>
              {titleParts?.suffix}
            </h1>

            {/* Description */}
            <p className="animate-desc-professional text-xl text-gray-600 mb-8 leading-relaxed">
              {description}
            </p>

            {/* Buttons */}
            <div className="animate-buttons-professional flex flex-wrap gap-4 mb-12">
              {actions?.primary && <SectionButton size="lg" href={`${actions.primary.href}`} variant={"web"}>
                {actions.primary.text}
              </SectionButton>
              }
              {actions?.secondary && <SectionButton
                size="lg"
                variant="outline"
                href={`${actions.secondary.href}`}
                className="border-gray-300 text-gray-900 hover:bg-gray-50"
              >
                {actions.secondary.text}
              </SectionButton>}
            </div>

            {/* Services List */}
            <div className="space-y-4 mb-12">
              {features?.map((service, index) => (
                <div
                  key={index}
                  className={`animate-service-professional delay-${600 + index * 100} scroll-animation scroll-fade-up flex items-center gap-3`}
                >
                  <div className="w-6 h-6 bg-gradient-primary rounded-full flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-gray-700 font-medium">{service?.label}</span>
                </div>
              ))}
            </div>

            {/* Bottom Stats */}
            <div className="animate-bottom-stats-professional 
                grid grid-cols-2 
                md:flex md:items-center md:justify-between 
                gap-6 md:gap-8 
                pt-8 border-t border-gray-200">
              {stats?.map((stat, index) => (
                <React.Fragment key={index}>
                  <div className={`scroll-animation scroll-fade-up delay-${900 + index * 100}`}>
                    <div className="text-4xl font-bold text-gray-900">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>

                  {index < stats.length - 1 && (
                    <div className="hidden md:block w-px h-12 bg-gray-300 animate-divider-professional" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Right Column */}
          <div className="hidden lg:block relative animate-right-column-professional">
            <div className="relative">

              {/* Main Infographic Card */}
              <div className="animate-main-card-professional relative bg-primary-background-light rounded-3xl shadow-2xl p-8 border border-primary-light">
                <div className="space-y-6">

                  {/* Growth chart */}
                  <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-sm font-semibold text-gray-900">
                        Business Growth
                      </div>
                      <LineChart className="w-5 h-5 text-primary" />
                    </div>

                    <div className="flex items-end justify-around h-32 gap-2">
                      {visuals.chartData.map((height, index) => (
                        <div
                          key={index}
                          className="flex-1 bg-gradient-primary-top-bottom rounded-t-lg relative group animate-bar-grow-professional"
                          style={{
                            "--barHeight": `${height}%`,
                            animationDelay: `${0.8 + index * 0.1}s`,
                          } as React.CSSProperties
                        }
                        >
                          <div
                            className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-2 py-1 rounded text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap animate-tooltip-professional"
                            style={{
                              animationDelay: `${1.3 + index * 0.1}s`,
                            }}
                          >
                            {height}%
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-between mt-2 text-xs text-gray-500">
                      <span>Q1</span>
                      <span>Q2</span>
                      <span>Q3</span>
                      <span>Q4</span>
                    </div>
                  </div>

                  {/* Metrics grid */}
                  <div className="grid grid-cols-2 gap-4">
                    {visuals.metrics.map((metric, index) => (
                      <div
                        key={index}
                        className={`bg-white rounded-xl p-4 shadow-lg border border-gray-100 metric-hover-professional animate-metric-professional`}
                        style={{
                          animationDelay: `${1 + index * 0.1}s`,
                        }}
                      >
                        <div className={`w-10 h-10 bg-gradient-to-r ${getRandomGradient(index)} rounded-lg flex items-center justify-center mb-3`}>
                          <DynamicIcon name={metric.icon} className="w-5 h-5 text-white" />
                        </div>

                        <div className="text-2xl font-bold text-gray-900">
                          {metric.value}
                        </div>
                        <div className="text-sm text-gray-600">
                          {metric.label}
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
              </div>

              {/* Floating badges */}
              <div className="animate-floating-badge-top-professional absolute -top-6 -right-6 bg-white rounded-2xl shadow-2xl p-4 border-2 border-primary-light">
                <div className="flex items-center gap-2">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">
                      {visuals.trustBadge.title}
                    </div>
                    <div className="text-xs text-gray-600">
                      {visuals.trustBadge.subtitle}
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-6 -left-6">
                <div className="animate-floating-badge-bottom-professional bg-white rounded-2xl shadow-2xl p-4 border-2 border-primary-light">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary">
                      {visuals.ratingBadge.value}
                    </div>
                    <div className="text-xs text-gray-600">
                      {visuals.ratingBadge.label}
                    </div>
                  </div>
                </div>
              </div>


            </div>
          </div>

        </div>
      </div>
    </div>

  );
}