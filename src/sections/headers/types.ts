export interface SectionProps {
  className?: string;
  id?: string;
  preferences?:any;
  exportMode?:boolean;
}

export interface NavLink {
  label: string;
  href: string;
  subMenu?: NavLink[];
}

export interface HeaderProps extends SectionProps {
   links: NavLink[];
  ctaText?: string;
  ctaHref?: string;
}