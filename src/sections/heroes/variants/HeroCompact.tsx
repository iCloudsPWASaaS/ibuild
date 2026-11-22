import {
  UtensilsCrossed,
  Star,
  ChefHat,
  Phone,
} from "lucide-react";
import { SectionButton } from "../../../components/ui/index";
import { RestaurantHeroDefaults, splitTitle } from "../types";
import type { HeroProps } from "../types";
import DynamicIcon from "../../../components/ui/icon";

export function RestaurantHero({
  badge,
  title,
  description,
  actions,
  stats
}: HeroProps) {
  const titleParts = splitTitle(String(title || "Taste The Authentic Flavors"));
  const contact = RestaurantHeroDefaults.contact
  const visuals = RestaurantHeroDefaults.visuals
  return (
    <div className="relative bg-gradient-extra-light overflow-hidden section-spacing">

      {/* Animated food elements background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float-food"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDuration: `${4 + i}s`,
              animationDelay: `${i * 0.5}s`,
            }}
          >
            <UtensilsCrossed className="w-12 h-12 text-primary" />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 flex items-center hero-inner-spacing">
        <div className="grid lg:grid-cols-2 gap-12 items-center w-full">

          {/* Left Column */}
          <div className="scroll-animation scroll-slide-left">

            {/* Badge */}
           {badge && <div
              style={{ animationDelay: "0.2s" }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-lg mb-6 border-2 border-primary animate-pop-in"
            >
              <ChefHat className="w-5 h-5 text-primary" />
              <span className="text-primary font-medium">{badge}</span>
            </div>}

            {/* Title */}
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              {titleParts.prefix}{" "}
              <span className="block bg-gradient-primary bg-[length:200%_auto] bg-clip-text text-transparent animate-gradient-text">
                {titleParts.highlight}
              </span>
              {titleParts.suffix}
            </h1>

            {/* Description */}
            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              {description}
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4 mb-12">
              <SectionButton
                size="lg"
                href={`${actions?.primary.href}`}
                variant={'web'}
              >
                <UtensilsCrossed className="mr-2 w-5 h-5" />
                {actions?.primary.text}
              </SectionButton>
              <SectionButton
                size="lg"
                variant="outline"
                href={`${actions?.secondary.href}`}
                className="border-primary text-primary"
              >
                {actions?.secondary.text}
              </SectionButton>
            </div>

            {/* Info Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {stats?.map((info:any, index) => (
                <div
                  key={index}
                  style={{ animationDelay: `${0.6 + index * 0.1}s` }}
                  className="scroll-animation scroll-fade-up flex items-center gap-3 p-4 bg-white rounded-xl shadow-md border border-primary-light"
                >
                  <div className="bg-gradient-primary to-red-500 p-2 rounded-lg">
                    <DynamicIcon name={info.icon} className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">{info.label}</div>
                    <div className="font-semibold text-gray-900">{info.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column (Visuals) */}
          <div
            style={{ animationDelay: "0.3s" }}
            className="hidden lg:block relative scroll-animation scroll-fade-scale"
          >
            {/* Main food plate */}
            <div className="relative">
              {/* Rotating Glow */}
              <div className="absolute inset-0 bg-gradient-extra-light rounded-full blur-3xl opacity-50 animate-spin-slow-linear" />

              {/* Plate Container */}
              <div className="relative bg-white rounded-full shadow-2xl p-12 border-8 border-primary-light animate-plate-float">
                <div className="absolute inset-0 bg-primary-background-light rounded-full" />

                <div className="relative flex items-center justify-center">
                  <UtensilsCrossed className="w-64 h-64 text-primary" />
                </div>

                {/* Floating ingredients (Visual Only) */}
                {[
                  { delay: 0, angle: 0 },
                  { delay: 0.5, angle: 120 },
                  { delay: 1, angle: 240 },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="absolute bg-white rounded-full shadow-xl p-4 border-4 border-primary-light animate-ingredient-float"
                    style={{
                      top: `${50 + Math.sin((item.angle * Math.PI) / 180) * 40}%`,
                      left: `${50 + Math.cos((item.angle * Math.PI) / 180) * 40}%`,
                      animationDelay: `${item.delay}s`,
                      /* transform handled by animation keyframes */
                    }}
                  >
                    <div className="w-12 h-12 bg-gradient-primary rounded-full" />
                  </div>
                ))}
              </div>

              {/* Special offers badges */}
              <div className="absolute -top-6 -right-6 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-full font-bold shadow-xl border-4 border-white animate-badge-top">
                <div className="text-center">
                  <div className="text-2xl">{visuals?.discountBadge.value}</div>
                  <div className="text-xs">{visuals?.discountBadge.label}</div>
                </div>
              </div>

              <div className="absolute -bottom-6 -left-6 bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-3 rounded-full font-bold shadow-xl border-4 border-white animate-badge-bottom">
                {visuals?.bottomBadge}
              </div>
            </div>

            {/* Star ratings floating */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="absolute animate-star-rise"
                  style={{
                    left: `${20 + i * 15}%`,
                    top: '20%',
                    animationDelay: `${i * 0.6}s`,
                  }}
                >
                  <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Reservation call-to-action footer */}
      <div
        style={{ animationDelay: "1s" }}
        className="absolute bottom-8 left-1/2 bg-white rounded-2xl shadow-2xl p-6 border-2 border-primary-light flex items-center gap-6 animate-footer-slide"
      >
        <Phone className="w-8 h-8 text-primary" />
        <div>
          <div className="text-sm text-gray-600">{contact?.label}</div>
          <div className="text-2xl font-bold text-gray-900">{contact?.phone}</div>
        </div>
      </div>
    </div>
  );
}