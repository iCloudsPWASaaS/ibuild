export interface SectionProps {
  className?: string;
  id?: string;
  exportMode?:boolean;
}
export interface CTAProps extends SectionProps {
  label?: string;
  title: string;
  description?: string;
  primaryCta: {
    text: string;
    href: string;
  };
  secondaryCta?: {
    text: string;
    href: string;
  };
  benefits?:String[];
}