export interface SectionProps {
  className?: string;
  id?: string;
}

export interface Stat {
  label: string;
  value: string;
  icon?: String;
  suffix?: string;
  prefix?: string;
}

export interface StatsProps extends SectionProps {
  title?: string;
  stats: Stat[];
}