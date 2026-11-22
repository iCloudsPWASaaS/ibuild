export interface SectionProps {
  className?: string;
  id?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  description: string;
  image?: string;
  author: string;
  date: string;
  category?: string;
  readTime?: string;
}

export interface BlogProps extends SectionProps {
  title: string;
  description?: string;
  posts: BlogPost[];
}