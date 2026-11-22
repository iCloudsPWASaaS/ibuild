export interface SectionProps {
  className?: string;
  id?: string;
  exportMode?:boolean;
}

export interface ContactProps extends SectionProps {
  title: string;
  description?: string;
  contactInfo?: {
    email?: string;
    phone?: string;
    address?: string;
  };
  socialLinks?: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
  };
}
