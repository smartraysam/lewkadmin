"use server";
export const fetchStoreProduct = async (
  storeUrl: string,
  query: any,
  accessToken: string,
) => {
  const body = JSON.stringify(query);
  const apiUrl = `https://${storeUrl}/admin/api/${process.env.NEXT_PUBLIC_SHOPIFY_API_VERSION}/graphql.json`;

  const response = await fetch(apiUrl, {
    method: "POST",
    headers: new Headers({
      "Content-Type": "application/json",
      "X-Shopify-Access-Token": `${accessToken}`,
    }),
    body: body,
  });
  if (!response.ok) {
    return { error: true, status: 404 };
  }
  return await response.json();
};

interface Product {
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
  };
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
        };
        selectedOptions: {
          name: string;
          value: string;
        }[];
      };
    }[];
  };
}

interface PageInfo {
  hasNextPage: boolean;
}

interface ProductsData {
  products: {
    edges: {
      cursor: string;
      node: Product;
    }[];
    pageInfo: PageInfo;
  };
}
