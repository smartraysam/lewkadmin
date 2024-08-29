import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export const GET = async (request: NextRequest) => {
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
  const shop = request.nextUrl.searchParams.get("shop");
  if (!shop) {
    try {
      const { data, error } = await supabase
        .from("PreMadeMoodboard")
        .select("id, name, product_items, tags, shop");
      if (error) {
        throw error;
      }
      return Response.json(data);
    } catch (error) {
      console.error(error);
      return Response.json({ error: "Unable to get profile." });
    }
  } else {
    try {
      const { data, error } = await supabase
        .from("PreMadeMoodboard")
        .select("id, name, product_items, tags, shop")
        .eq("shop", shop);
      if (error) {
        throw error;
      }
      return Response.json(data);
    } catch (error) {
      console.error(error);
      return Response.json({ error: "Unable to get profile." });
    }
  }
};
