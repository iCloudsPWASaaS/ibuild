// Common types for all global sections

export interface SectionProps {
  className?: string;
  id?: string;
}
export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company?: string;
  image?: string;
  content: string;
  rating?: number;
}

export interface TestimonialsProps extends SectionProps {
  label?: string;
  title: string;
  description?: string;
  testimonials: Testimonial[];
}