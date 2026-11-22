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

export interface FooterProps extends SectionProps {
  description?: string;
  links: {
    title: string;
    items: NavLink[];
  }[];
  socialLinks?: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
  };
  copyright?: string;
}
