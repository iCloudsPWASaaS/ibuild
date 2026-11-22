export interface SectionProps {
  className?: string;
  id?: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category?: string;
  rating?: number;
  reviews?: number;
  features?: String[]
}

export interface ProductsProps extends SectionProps {
  label?: string;
  title: string;
  description?: string;
  products: Product[];
}
