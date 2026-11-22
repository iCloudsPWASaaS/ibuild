import React from "react"
import {
  Rocket,
  Users,
  Zap,
  Check,
  Play
} from "lucide-react";
import { SectionButton } from "../../../components/ui/index";
import { getRandomGradient, SaaSProductHeroDefaults, splitTitle, type HeroProps } from "../types";
import DynamicIcon from "../../../components/ui/icon";

export function SaaSProductHero({
  badge,
  title,
  description,
  actions,
  features,
  stats
}: HeroProps) {
  const titleParts = splitTitle(String(title || "Find Your Dream Home Today"));

const dashboard=SaaSProductHeroDefaults

  return (
<div className="relative gradient-background-full-light section-spacing overflow-hidden">
  {/* Floating grid pattern */}
  <div className="absolute inset-0">
    <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-grid-violet)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-grid-violet)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
  </div>

  {/* Animated gradient orbs */}
  <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-primary rounded-full blur-[120px] opacity-30 animate-orb-1" />
  <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full blur-[120px] opacity-30 animate-orb-2" />

  {/* Content */}
  <div className="relative container mx-auto px-4 flex items-center">
    <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
      
      {/* Left Column - Main Fade Up Animation */}
      <div className="animate-fade-up" style={{ animationDelay: "0s" }}>
        
        {/* Badge */}
       {badge && <div
          className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-primary rounded-full text-white text-sm mb-6 shadow-lg animate-scale-up"
          style={{ animationDelay: "0.2s" }}
        >
          <Zap className="w-4 h-4" />
          <span>{badge}</span>
        </div>}

        {/* Title */}
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          {titleParts?.prefix}{" "}
          <span className="block bg-gradient-primary-heading bg-clip-text text-transparent animate-gradient-text">
            {titleParts?.highlight}
          </span>
          {titleParts?.suffix}
        </h1>

        {/* Description */}
        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
          {description}
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap gap-4 mb-8">
          <SectionButton size="lg" href={`${actions?.primary.href}`} variant={'web'}>
            {actions?.primary.text}
            <Rocket className="ml-2 w-5 h-5" />
          </SectionButton>
          <SectionButton
            size="lg"
            variant="primaryoutline"
            href={`${actions?.secondary.href}`}
            className="border-primary text-primary hover:bg-blue-soft group"
          >
            <Play className="mr-2 w-5 h-5" />
            {actions?.secondary.text}
          </SectionButton>
        </div>

        {/* Features List */}
        <div className="space-y-3 mb-8">
          {features?.map((feature, index) => (
            <div
              key={index}
              className="flex items-center gap-2 animate-slide-right"
              style={{ animationDelay: `${0.4 + index * 0.1}s` }}
            >
              <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                <Check className="w-3 h-3 text-white" />
              </div>
              <span className="text-gray-700">{feature?.label}</span>
            </div>
          ))}
        </div>

        {/* Social Proof Stats */}
        <div className="flex items-center gap-8">
          {stats?.map((stat, index) => (
            <React.Fragment key={index}>
              <div>
                <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
              {index < stats?.length - 1 && (
                <div className="w-px h-12 bg-gray-300" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Right Column (Dashboard Visual) */}
      <div className="hidden lg:block relative">
        {/* Wrapper for Entrance Scale Animation */}
        <div className="animate-scale-up" style={{ animationDelay: "0.3s" }}>
            
            {/* Wrapper for Continuous Float Animation */}
            <div className="relative animate-float-y">
                
              {/* Main Dashboard Card */}
              <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200">
                {/* Browser header */}
                <div className="bg-gray-100 px-4 py-3 flex items-center gap-2 border-b">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 bg-primary rounded-full" />
                    <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                    <div className="w-3 h-3 bg-primary rounded-full" />
                  </div>
                  <div className="flex-1 bg-white rounded px-3 py-1 text-xs text-gray-500">
                    {dashboard.url}
                  </div>
                </div>

                {/* Dashboard content */}
                <div className="p-6 space-y-4">
                  {/* Stats row */}
                  <div className="grid grid-cols-3 gap-3">
                    {stats?.map((stat:any, index) => (
                      <div
                        key={index}
                        className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-4 border border-gray-200 animate-fade-up"
                        style={{ animationDelay: `${0.8 + index * 0.1}s` }}
                      >
                        <div className={`w-8 h-8 bg-gradient-to-r ${getRandomGradient(index)} rounded-lg flex items-center justify-center mb-2`}>
                          <DynamicIcon name={stat.icon} className="w-4 h-4 text-white" />
                        </div>
                        <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                        <div className="text-xs text-gray-500">{stat.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Chart */}
                  <div className="bg-gradient-primary-light rounded-xl p-4 border bg-primary-background-light animate-fade-up" style={{ animationDelay: "1.2s" }}>
                    <div className="flex items-end justify-around h-32 gap-2">
                      {[40, 60, 45, 80, 65, 90, 75].map((height, index) => (
                        <div
                          key={index}
                          className="flex-1 bg-gradient-primary-top-bottom rounded-t-lg animate-bar-grow"
                          style={{
                            height: `${height}%`,
                            animationDelay: `${1.4 + index * 0.1}s`
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Activity list */}
                  <div className="space-y-2">
                    {[1, 2, 3].map((_, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg animate-slide-right"
                        style={{ animationDelay: `${1.8 + index * 0.1}s` }}
                      >
                        <div className="w-8 h-8 bg-gradient-primary rounded-full" />
                        <div className="flex-1">
                          <div className="h-2 bg-gray-300 rounded w-3/4 mb-1" />
                          <div className="h-2 bg-gray-200 rounded w-1/2" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating notification cards */}
              
              {/* Notification 1: Float Wrapper -> Entrance Animation */}
              <div className="absolute -right-6 top-20 max-w-[200px] animate-float-y" style={{ animationDuration: '3s' }}>
                  <div className="bg-white rounded-2xl shadow-xl p-4 border border-primary-light animate-in-right" style={{ animationDelay: "1.5s" }}>
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                        <Check className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="font-semibold text-sm text-gray-900">{dashboard.notifications.top.title}</div>
                        <div className="text-xs text-gray-600">{dashboard.notifications.top.subtitle}</div>
                      </div>
                    </div>
                  </div>
              </div>

              {/* Notification 2: Float Wrapper -> Entrance Animation */}
              <div className="absolute -left-6 bottom-20 max-w-[200px] animate-float-y" style={{ animationDuration: '4s', animationDirection: 'reverse' }}>
                  <div className="bg-white rounded-2xl shadow-xl p-4 border border-primary-light animate-in-left" style={{ animationDelay: "1.7s" }}>
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                        <Users className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="font-semibold text-sm text-gray-900">{dashboard.notifications.bottom.title}</div>
                        <div className="text-xs text-gray-600">{dashboard.notifications.bottom.subtitle}</div>
                      </div>
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