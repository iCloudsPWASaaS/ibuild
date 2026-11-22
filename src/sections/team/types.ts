export interface SectionProps {
  className?: string;
  id?: string;
  exportMode?:boolean;
}
export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image?: string;
  bio?: string;
  social?: {
    linkedin?: string;
    twitter?: string;
    email?: string;
  };
}

export interface TeamProps extends SectionProps {
  label?: string;
  title: string;
  description?: string;
  members: TeamMember[];
}