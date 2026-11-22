export interface SectionProps {
  className?: string;
  id?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQProps extends SectionProps {
  title: string;
  description?: string;
  items: FAQItem[];
}
