export interface SectionProps {
  className?: string;
  id?: string;
}
export interface Service {
  icon?: string;
  title: string;
  description: string;
  price?: string;
}

export interface ServicesProps extends SectionProps {
  label?: string;
  title: string;
  description?: string;
  services: Service[];
}