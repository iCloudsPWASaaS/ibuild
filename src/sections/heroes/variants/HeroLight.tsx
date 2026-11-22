import { ShoppingBag, Star, Zap } from "lucide-react";
import { SectionButton } from "../../../components/ui/index";
import { ecommerceHeroDefaults, splitTitle } from "../types";
import type { HeroProps } from "../types";
import DynamicIcon from "../../../components/ui/icon";

export function EcommerceStoreHero({
  badge,
  title,
  description,
  actions,
  features
}: HeroProps) {

  var productCard = ecommerceHeroDefaults
    const titleParts = splitTitle(String(title || "Shop The Best Deals Online"));
  
  const floatingProducts = [
    { delay: 0, x: 100, y: 50 },
    { delay: 0.2, x: -100, y: -50 },
    { delay: 0.4, x: 150, y: -80 },
  ];

  return (
<div className="relative bg-gradient-extra-light overflow-hidden section-spacing">
  <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-grid-subtle)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-grid-subtle)_1px,transparent_1px)] bg-[size:64px_64px]" />

 
  <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
    {floatingProducts?.map((item, index) => (
      <div
        key={index}
        style={{
          '--x': `${item.x}px`,
          '--y': `${item.y}px`,
          animationDelay: `${item.delay}s` 
        } as React.CSSProperties
      }
        className="absolute top-1/4 left-1/2 w-48 h-64 bg-white rounded-2xl shadow-xl p-4 border-2 border-primary-light animate-float-custom"
      >
        <div className="w-full h-32 bg-primary-background-light rounded-xl mb-3" />
        <div className="h-3 bg-gray-200 rounded mb-2" />
        <div className="h-3 bg-gray-200 rounded w-2/3" />
      </div>
    ))}
  </div>

  {/* Content */}
  {/* z-10 ensures content is clickable and above shapes */}
  <div className="relative container mx-auto px-4 flex items-center z-10 hero-inner-spacing">
    <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
      
      {/* Left Column */}
      <div className="scroll-animation scroll-fade-up">
        {/* Top Badge */}
     {badge &&   <div
          style={{ animationDelay: "0.3s" }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-primary rounded-full text-white text-sm mb-6 shadow-lg animate-pop-in"
        >
          <Zap className="w-4 h-4" />
          <span>{badge}</span>
        </div>
}
        {/* Title */}
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          {titleParts?.prefix}
          <span className="block bg-gradient-primary-heading bg-clip-text text-transparent">
            {titleParts?.highlight}
          </span>
          {titleParts?.suffix}
        </h1>

        {/* Description */}
        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
          {description ?? ""}
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap gap-4 mb-12">
          <SectionButton
            size="lg"
            variant={"web"}
            href={`${actions?.primary?.href}`}
          >
            <ShoppingBag className="mr-2 w-5 h-5" />
            {actions?.primary?.text}
          </SectionButton>
          <SectionButton
            size="lg"
            variant="primaryoutline"
            href={`${actions?.secondary?.href}`}
          >
            {actions?.secondary?.text}
          </SectionButton>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-3 gap-4">
          {features?.map((feature:any, index) => (
            <div
              key={index}
              style={{ animationDelay: `${0.6 + index * 0.1}s` }}
              className="scroll-animation scroll-fade-up-subtle flex flex-col items-center p-4 bg-white rounded-xl shadow-md border border-primary-light"
            >
              <DynamicIcon name={feature.icon} className="w-6 h-6 text-primary mb-2" />
              <span className="text-sm text-primary2 text-center">
                {feature?.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Right Column (Product Visual) */}
      <div 
        style={{ animationDelay: "0.2s" }}
        className="hidden lg:block relative scroll-animation scroll-fade-scale"
      >
        <div className="relative">
          {/* Main product showcase */}
          <div className="relative bg-white rounded-3xl shadow-2xl p-8 border-4 border-primary-light animate-rocking">
            <div className="absolute -top-4 -right-4 bg-gradient-primary text-white px-6 py-3 rounded-full font-bold shadow-lg">
              <Star className="inline w-4 h-4 mr-1" />
              {productCard?.discountBadge}
            </div>

            <div className="w-full h-96 bg-primary-background-light rounded-2xl mb-6 flex items-center justify-center">
              <ShoppingBag className="w-32 h-32 text-primary" />
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star, i) => (
                  <div
                    key={star}
                    style={{ animationDelay: `${1 + i * 0.1}s` }}
                    className="scroll-animation scroll-fade-scale"
                  >
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  </div>
                ))}
                <span className="text-sm text-gray-600">
                  ({productCard?.reviewCount})
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-gray-500 line-through">
                    {productCard?.originalPrice}
                  </div>
                  <div className="text-3xl font-bold text-primary">
                    {productCard?.currentPrice}
                  </div>
                </div>
                <SectionButton variant={'web'}>
                  Add to Cart
                </SectionButton>
              </div>
            </div>
          </div>

          {/* Floating discount badges */}
          <div className="absolute -top-8 -left-8 bg-gradient-to-r from-pink-500 to-rose-500 text-white px-6 py-3 rounded-full font-bold shadow-xl animate-badge-top">
            {productCard?.floatingBadges?.top}
          </div>

          <div className="absolute -bottom-8 -right-8 bg-gradient-primary-warm text-white px-6 py-3 rounded-full font-bold shadow-xl animate-badge-bottom">
            {productCard?.floatingBadges?.bottom}
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
  );
}