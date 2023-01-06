export type TProductItem = {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
};

export type TFilter = {
  brands: string[];
  categories: string[];
  priceMin: number;
  priceMax: number;
};

export type CartItem = {
  id: number,
  count: number,
  title: string,
  description: string,
  price: number,
  discountPercentage: number,
  rating: number,
  thumbnail: string,
};