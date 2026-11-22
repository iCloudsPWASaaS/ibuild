export interface SectionProps {
  className?: string;
  id?: string;
}

export interface PricingTier {
  name: string;
  price: string;
  interval: string;
  features: string[];
  highlighted?: boolean;
  ctaText?: string;
}

export interface PricingProps extends SectionProps {
  lebel?: string;
  title: string;
  description?: string;
  tiers: PricingTier[];
}
