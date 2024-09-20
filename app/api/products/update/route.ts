import { fetchStoreProduct } from "@/lib";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export const GET = async (request: NextRequest) => {
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
  const shop = request.nextUrl.searchParams.get("shop") ?? "";
  try {
    const { data: session } = await supabase
      .from("Session")
      .select("shop, accessToken")
      .eq("shop", shop);
    const { data, error } = await supabase
      .from("PreMadeMoodboard")
      .select("id, product_items")
      .eq("shop", shop);
    if (data && session) {
      for (const product of data) {
        const product_items = JSON.parse(product.product_items) as any[];
        // return Response.json({ product_items });
        const new_items = [];
        for (const item of product_items) {
          const prodetails = await getProductDetails(
            item.id,
            shop,
            session[0].accessToken,
          );
          new_items.push(prodetails);
        }
        // return Response.json({ new_items });
        console.log("Details", product.id);
        const { data: update } = await supabase
          .from("PreMadeMoodboard")
          .update({ product_items: new_items })
          .match({ id: product.id });
      }
    }

    return Response.json({ data, session });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Unable to get profile." });
  }
};

const getProductDetails = async (
  id: string,
  store: string,
  accessToken: string,
) => {
  const query = {
    query: `
      query getProductById($id: ID!) {
        product(id: $id) {
          id
          title
          description
          totalInventory
          onlineStoreUrl
          priceRange {
            maxVariantPrice {
              amount
            }
          }
          featuredImage {
            url
          }
          productType
          handle
          vendor
          tags
          variants(first: 10) {
            edges {
              node {
                id
                price
                title
                inventoryQuantity
                image {
                  url
                }
                selectedOptions {
                  name
                  value
                }
              }
            }
          }
        }
      }
    `,
    variables: {
      id: id,
    },
  };

  const response = await fetchStoreProduct(store, query, accessToken);
  const data = response.data;
  const fetchedProducts = data?.product;
  const newProducts = {
    id: fetchedProducts.id,
    title: fetchedProducts.title,
    description: fetchedProducts.description,
    quantity: fetchedProducts.totalInventory,
    image: fetchedProducts.featuredImage?.url,
    handle: fetchedProducts.handle,
    tags: fetchedProducts.tags,
    url:
      "https://lewk-bellisima.myshopify.com/products/" + fetchedProducts.handle,
    storeUrl: "https://lewk-bellisima.myshopify.com",
    onlineStoreUrl: fetchedProducts.onlineStoreUrl,
    productType: fetchedProducts.productType,
    variants: fetchedProducts.variants.edges.map((variant: any) => ({
      id: variant.node.id,
      price: variant.node.price,
      title: variant.node.title,
      inventoryQuantity: variant.node.inventoryQuantity,
      image: variant.node.image?.url,
      selectedOptions: variant.node.selectedOptions,
    })),
  };
  return newProducts;
};
