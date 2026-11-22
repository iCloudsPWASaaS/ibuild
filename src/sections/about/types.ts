export interface SectionProps {
  className?: string;
  id?: string;
}

export interface AboutStat {
  label: string;
  value: string;
}

export interface AboutTimelineItem {
  year: string;
  title: string;
  description: string;
}

export interface AboutFeature {
  icon?: string;
  title: string;
  description?: string;
}

export interface AboutProps extends SectionProps {
  label?: string;
  title: string;
  description: string;
  image?: string;
  stats?: AboutStat[];
  timeline?: AboutTimelineItem[];
  features?: AboutFeature[];
  quote?: string;
  missionDescription?: string;
  visionDescription?: string;
}
