export interface SectionProps {
  className?: string;
  id?: string;
}

export interface Feature {
  icon: string;
  title: string;
  description: string;
}

export interface FeaturesProps extends SectionProps {
  title: string;
  description?: string;
  features: Feature[];
}
