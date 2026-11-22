import {
  Home,
  MapPin,
  Search,
  Building2
} from "lucide-react";
import { SectionButton } from "../../../components/ui/index";
import { RealEstateHeroDefaults, splitTitle, type HeroProps } from "../types";
import DynamicIcon from "../../../components/ui/icon";

export function RealEstateHero({
  badge,
  title,
  description,
  stats,
  exportMode
}: HeroProps) {
  const titleParts = splitTitle(String(title || "Taste The Authentic Flavors"));

  const search = RealEstateHeroDefaults?.search
  const propertyCards = RealEstateHeroDefaults?.propertyCards
  return (
    <div className="relative gradient-primary-full overflow-hidden section-spacing">

      {/* Animated cityscape silhouette (Visual Background) */}
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-black/50 to-transparent">
        <div className="absolute bottom-0 left-0 right-0 flex items-end justify-around">

          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="bg-gradient-primary-light opacity-80 animate-building-grow"
              style={{
                width: `${Math.random() * 60 + 40}px`,
                height: `${Math.random() * 150 + 100}px`,
                animationDelay: `${i * 0.1}s`,
              }}
            >
              {/* Windows */}
              <div className="h-full flex flex-col justify-around p-1">
                {[...Array(Math.floor(Math.random() * 5) + 3)].map((_, j) => (
                  <div
                    key={j}
                    className="h-2 bg-yellow-300/80 rounded-sm animate-window-blink"
                    style={{
                      animationDelay: `${Math.random() * 2}s`,
                    }}
                  />
                ))}
              </div>
            </div>
          ))}

        </div>
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 flex items-center">
        <div className="grid lg:grid-cols-2 gap-12 items-center w-full">

          {/* Left Column */}
          <div className="animate-left-column">

            {/* Badge */}
          {badge &&  <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-primary-light backdrop-blur-sm rounded-full text-sm mb-6 border border-primary-light animate-badge">
              <Building2 className="w-4 h-4" />
              <span>{badge}</span>
            </div>}

            {/* Title */}
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight animate-title">
              {titleParts.prefix}{" "}
              <span className="block bg-gradient-primary-heading bg-clip-text text-transparent">
                {titleParts.highlight}
              </span>
              {titleParts.suffix}
            </h1>

            {/* Description */}
            <p className="text-xl text-gray-300 mb-8 leading-relaxed animate-desc">
              {description}
            </p>

            {/* Search bar */}
            <div className="bg-white rounded-2xl p-2 shadow-2xl mb-8 flex flex-wrap md:flex-nowrap items-center gap-2 animate-searchbar">
              <div className="flex-1 flex items-center gap-2 px-4 py-2">
                <MapPin className="w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder={search.placeholder}
                  className="flex-1 outline-none text-gray-900 placeholder:text-gray-500"
                />
              </div>

              <div className="flex-1 flex items-center gap-2 px-4 py-2 border-l border-gray-200">
                <Home className="w-5 h-5 text-gray-400" />
                <select className="flex-1 outline-none text-gray-900 bg-transparent cursor-pointer">
                  {search.propertyTypes.map((type, index) => (
                    <option key={index} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <SectionButton
                size="lg"
                href={exportMode ? search.onSearch : "#"}
                className="bg-gradient-primary hover:from-blue-700 hover:to-indigo-700"
              >
                <Search className="w-5 h-5" />
              </SectionButton>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-4">
              {stats?.map((stat:any, index) => (
                <div
                  key={index}
                  className={`bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 animate-stat-card delay-${600 + index * 100}`}
                >
                  <DynamicIcon name={stat.icon} className="w-6 h-6 text-secondary mb-2" />
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-gray-300">{stat.label}</div>
                </div>
              ))}
            </div>

          </div>

          {/* Right Column (Visuals) */}
          <div className="hidden lg:block relative animate-right-column h-full">

            {/* Property cards stack */}
            <div className="relative h-full">

              {propertyCards.map((card, index) => (
                <div
                  key={index}
                  className="absolute bottom-0 left-0 right-0 bg-white rounded-3xl shadow-2xl overflow-hidden animate-property-card property-hover"
                  style={{
                    transform: `translateY(${index * 20}px) rotate(${index * 3}deg)`,
                    zIndex: propertyCards.length - index,
                    animationDelay: `${0.5 + index * 0.2}s`,
                  }}
                >
                  <div className="relative h-64 bg-primary-background-light">
                    <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {card.tag}
                    </div>

                    <div className="absolute inset-0 flex items-center justify-center">
                      <Home className="w-32 h-32 text-primary" />
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="text-2xl font-bold text-gray-900">{card.price}</div>
                        <div className="text-sm text-gray-600">{card.title}</div>
                      </div>

                      <div className="w-10 h-10 bg-primary-background-light rounded-full flex items-center justify-center cursor-pointer heart-hover">
                        ❤️
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span>🛏️ {card.specs.beds} Beds</span>
                      <span>🚿 {card.specs.baths} Baths</span>
                      <span>📏 {card.specs.sqft}</span>
                    </div>
                  </div>
                </div>
              ))}

            </div>

            {/* Floating location pins */}
            {[
              { top: "10%", left: "10%", delay: 0 },
              { top: "20%", right: "10%", delay: 0.3 },
              { bottom: "30%", left: "15%", delay: 0.6 },
            ].map((pin, index) => (
              <div
                key={index}
                className="absolute animate-pin-pop"
                style={{
                  ...pin,
                  animationDelay: `${pin.delay}s`,
                }}
              >
                <div className="relative">

                  <div className="absolute inset-0 bg-primary rounded-full blur-xl opacity-50 animate-pin-glow" />

                  <div className="relative w-12 h-12 bg-primary rounded-full flex items-center justify-center shadow-xl border-4 border-white animate-pin-pulse">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>

                </div>
              </div>
            ))}

          </div>
        </div>
      </div>
    </div>

  );
}