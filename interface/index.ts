export interface SessionData {
  shop: string;
}

export interface Product {
  id: string;
  name: string;
  image: string;
  url: string;
  price: string;
  storeUrl: string;
  variants?: variant[];
  description: string;
  quantity: string;
  category: string;
  tags: string;
  images?: image[];
}

export interface variant {
  id: string;
  title: string;
  price: string;
  option1: string;
  option2: string | null;
  option3: string | null;
  inventory_quantity: number;
  old_inventory_quantity: number;
  image_id: string | null;
}

export interface image {
  src: string;
  variant_ids: string[];
}

export interface FormInterface {
  id?: string;
  product_items: Product[];
  tags: string[];
  name: string;
  shop: string;
}
