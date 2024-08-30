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

interface ProductNode {
  id: string;
  title: string;
  description: string;
  tags: string[];
  totalInventory: number;
  priceRange: {
    maxVariantPrice: {
      amount: string;
    };
  };
  featuredImage: {
    url: string;
  } | null;
  productType: string;
  vendor: string;
  variants: {
    edges: {
      node: {
        id: string;
        price: string;
        title: string;
        inventoryQuantity: number;
        image: {
          url: string;
        } | null;
        selectedOptions: {
          name: string;
          value: string;
        }[];
      };
    }[];
  };
}

interface ProductEdge {
  cursor: string;
  node: ProductNode;
}

interface ProductsResponse {
  data: {
    products: {
      edges: ProductEdge[];
      pageInfo: {
        hasNextPage: boolean;
      };
    };
  };
}
