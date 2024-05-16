export interface SessionData {
  shop: string;
}

export interface Product {
  id: string;
  product: string;
  description: string;
  quantity: string;
  category: string;
  featureImage: string;
}

export interface FormInterface {
  id?: string;
  product_items: Product[];
  tags: string[];
  name: string;
  shop: string;
}
