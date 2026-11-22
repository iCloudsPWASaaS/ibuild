export interface SectionProps {
  className?: string;
  id?: string;
}

export interface GalleryItem {
  id: string;
  image: string;
  title?: string;
  category?: string;
}

export interface GalleryProps extends SectionProps {
  title: string;
  description?: string;
  items: GalleryItem[];
}