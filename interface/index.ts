export interface SessionData {
  shop: string;
  accessToken: string;
}

export interface StoreInfo extends SessionData {
  name: string;
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
  inventory_quantity: number;
  old_inventory_quantity: number;
  image_id: string | null;
}

export interface image {
  src: string;
  variant_ids: string[];
}

export interface Moodboard {
  id?: string;
  product_items: Product[];
  tags: string[];
  name: string;
  shop: string;
}
