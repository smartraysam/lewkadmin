import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import Shopify from "shopify-api-node";

let params = { limit: 100, page_info: "" };

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
      const featureImage =
        product.image && product.image.src ? product.image.src : "";
      return {
        id: product.id,
        product: product.title,
        description: product.body_html,
        quantity: product.variants[0].inventory_quantity,
        category: product.product_type,
        featureImage: featureImage,
      };
    });
    const nextPage = results.nextPageParameters;
    console.log(nextPage);
    return NextResponse.json({ nextPage, products }, { status: 200 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { error: `Unable to perform search` },
      { status: 400 },
    );
  }
}
