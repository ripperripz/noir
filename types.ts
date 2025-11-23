export enum Category {
  APPAREL = 'Apparel',
  ACCESSORIES = 'Accessories',
  FOOTWEAR = 'Footwear',
  EDITORIAL = 'Editorial'
}

export interface Product {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  price: number;
  images: string[];
  category: Category;
  sizes?: string[];
  featured?: boolean;
  story?: string; // Editorial snippet
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize?: string;
}

export interface User {
  name: string;
  email: string;
}