import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import Shopify from "shopify-api-node";

let params = { limit: 250, page_info: "" };

export async function GET(request: NextRequest) {
  try {
    const shop = request.nextUrl.searchParams.get("shop");
    if (!shop) {
      return NextResponse.json({ error: `shop is required.` }, { status: 400 });
    }

    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
    const { data, error } = await supabase
      .from("Session")
      .select("accessToken")
      .eq("shop", shop);
    if (error) {
      throw error;
    }
    const accesstoken = data[0].accessToken;
    const shopify = new Shopify({
      shopName: shop,
      accessToken: accesstoken,
    });
    const pageinfo = request.nextUrl.searchParams.get("pageinfo") ?? "";
    params.page_info = pageinfo;
    const results = await shopify.product.list(params);
    console.log(results);
    const products = results.map((product) => {
      const variants = product.variants.map((variant) => {
        const hasOutOfStockVariants = {
          hasOutOfStockVariants: variant.inventory_quantity === 0,
        };

        return {
          id: variant.id,
          title: variant.title,
          price: variant.price,
          option1: variant.option1,
          option2: variant.option2,
          option3: variant.option3,
          product: hasOutOfStockVariants,
          inventory_quantity: variant.inventory_quantity,
          old_inventory_quantity: variant.old_inventory_quantity,
          image_id: variant.image_id,
        };
      });
      const images = product.images.map((image) => {
        return {
          src: image ? image.src : "",
          variant_ids: image.variant_ids,
        };
      });
      const featureImage =
        product.image && product.image.src ? product.image.src : "";
      return {
        id: product.id,
        name: product.title,
        image: featureImage,
        url: `https://${shop}/products/` + product.handle,
        price: product.variants[0].price,
        storeUrl: `https://${shop}`,
        variants: variants,
        description: product.body_html,
        quantity: product.variants[0].inventory_quantity,
        category: product.product_type,
        tags: product.tags,
        images: images,
      };
    });
    const nextPage = results.nextPageParameters;
    return NextResponse.json({ nextPage, products }, { status: 200 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { error: `Unable to perform search` },
      { status: 400 },
    );
  }
}
