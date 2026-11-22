import {
  GraduationCap,
  BookOpen,
  Star,
  Award,
} from "lucide-react";
import { SectionButton } from "../../../components/ui/index";
import { EducationPlatformHeroDefaults, splitTitle, type HeroProps } from "../types";
import DynamicIcon from "../../../components/ui/icon";

export function EducationPlatformHero({
  badge,
  title,
  description,
  actions,
  stats,
  features
}: HeroProps) {
  const titleParts = splitTitle(String(title || "Learn Anything Anytime"));

  const courseCard = EducationPlatformHeroDefaults?.courseCard
  const progressWidget = EducationPlatformHeroDefaults?.progressWidget
  return (
    <div className="relative bg-primary-background-light section-spacing overflow-hidden">

      {/* Animated book pages floating */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-primary-background-light rounded-lg shadow-lg animate-book-pages"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 30 + 20}px`,
              height: `${Math.random() * 40 + 30}px`,
              animationDuration: `${10 + i * 2}s`,
              animationDelay: `${i * 0.5}s`,
              "--randX": `${Math.random() * 50 - 25}px`,
            } as React.CSSProperties
          }
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 flex items-center hero-inner-spacing">
        <div className="grid lg:grid-cols-2 gap-12 items-center w-full">

          {/* Left Column */}
          <div className="animate-left-column">

            {/* Badge */}
            {badge && <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-primary rounded-full text-white text-sm mb-6 shadow-lg animate-badge">
              <Award className="w-4 h-4" />
              <span>{badge}</span>
            </div>}

            {/* Title */}
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight animate-title">
              {titleParts?.prefix}
              <span className="block bg-gradient-primary-heading bg-clip-text text-transparent">
                {titleParts?.highlight}
              </span>
              {titleParts?.suffix}
            </h1>

            {/* Description */}
            <p className="text-xl text-gray-600 mb-8 leading-relaxed animate-desc">
              {description}
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4 mb-12 animate-buttons">
              {actions?.primary && <SectionButton
                size="lg"
                href={`${actions.primary.href}`}
                variant={"web"}
              >
                <GraduationCap className="mr-2 w-5 h-5" />
                {actions.primary.text}
              </SectionButton>}

              {actions?.secondary && <SectionButton
                size="lg"
                variant={"primaryoutline"}
                href={`${actions.secondary.href}`}
                className="border-primary text-primary"
              >
                {actions.secondary.text}
              </SectionButton>}
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats?.map((stat: any, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-4 shadow-lg border border-gray-100 text-center animate-stats"
                  style={{
                    animationDelay: `${0.6 + index * 0.1}s`,
                  }}
                >
                  <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center mx-auto mb-2">
                    <DynamicIcon name={stat.icon} className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-xl font-bold text-gray-900">
                    {stat.value}
                  </div>
                  <div className="text-xs text-gray-600">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column (Visuals) */}
          <div className="hidden lg:block relative animate-right-column">

            {/* Course cards display */}
            <div className="relative">

              {/* Main course card */}
              <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200 animate-main-card">
                <div className="relative h-48 bg-gradient-primary flex items-center justify-center">
                  <BookOpen className="w-24 h-24 text-white/80" />
                  <div className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-bold">
                    {courseCard.tag}
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">
                      ({courseCard.reviewCount})
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {courseCard.title}
                  </h3>

                  <p className="text-gray-600 mb-4">
                    {courseCard.description}
                  </p>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-primary rounded-full" />
                      <div>
                        <div className="text-sm font-semibold text-gray-900">
                          {courseCard.instructor.name}
                        </div>
                        <div className="text-xs text-gray-600">
                          {courseCard.instructor.role}
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-sm text-gray-500 line-through">
                        {courseCard.pricing.original}
                      </div>
                      <div className="text-2xl font-bold text-primary">
                        {courseCard.pricing.discounted}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    {features?.map((item: any, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 text-sm text-gray-600 animate-feature"
                        style={{
                          animationDelay: `${1 + index * 0.1}s`,
                        }}
                      >
                        <DynamicIcon name={item.icon} className="w-4 h-4 text-primary" />
                        {item.label}
                      </div>
                    ))}
                  </div>

                  <SectionButton variant={"web"} className="w-full">
                    {courseCard.buttonText}
                  </SectionButton>
                </div>
              </div>

              {/* Floating mini course cards */}
              {[
                { x: -10, y: 110, color: "from-purple-500 to-pink-500", delay: 0 },
                { x: 200, y: 0, color: "from-green-500 to-emerald-500", delay: 0.3 },
                { x: -10, y: -40, color: "from-orange-500 to-red-500", delay: 0.6 },
              ].map((card, index) => (
                <div
                  key={index}
                  className="absolute bg-white rounded-xl shadow-xl p-4 border border-gray-200 animate-mini-card"
                  style={{
                    left: `calc(50% + ${card.x}px)`,
                    top: `calc(50% + ${card.y}px)`,
                    transform: "translate(-50%, -50%)",
                    animationDelay: `${1.2 + card.delay}s`,
                  }}
                >
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${card.color} rounded-lg mb-2 flex items-center justify-center`}
                  >
                    <GraduationCap className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-xs font-semibold text-gray-900">
                    New Course
                  </div>
                </div>
              ))}

              {/* Progress indicator */}
              <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-white rounded-2xl shadow-2xl p-4 border-2 border-primary-light min-w-[250px] animate-progress">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-gray-900">
                    {progressWidget.label}
                  </span>
                  <span className="text-sm font-bold text-primary">
                    {progressWidget.value}
                  </span>
                </div>

                <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-green-500 to-emerald-500 animate-progress-bar"
                    style={
                      {
                        "--progressWidth": `${progressWidget.percentage}%`,
                      } as React.CSSProperties
                    }
                  />
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}