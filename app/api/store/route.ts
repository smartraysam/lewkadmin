import { SessionData } from "@/interface";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Shopify from "shopify-api-node";
import { StoreInfo } from "@/interface";

export const GET = async (request: Request) => {
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

  try {
    const { data, error } = await supabase
      .from("Session")
      .select("shop, accessToken");

    if (error) {
      throw error;
    }

    const storeData = data as SessionData[];
    const storePromises = storeData.map(async (stor) => {
      const shopify = new Shopify({
        shopName: stor.shop,
        accessToken: stor.accessToken,
      });

      const query = `{
          shop {
            domains {
              id
              host
              url
            }
          }
      }`;

      try {
        const res = await shopify.graphql(query);
        const domains = res.shop.domains;
        let host = "";

        if (domains.length > 1) {
          host = domains[1].host;
        } else {
          host = domains[0].host;
        }

        return {
          shop: stor.shop,
          name: host,
          accessToken: stor.accessToken,
        } as StoreInfo;
      } catch (err) {
        console.error(err);
        throw err;
      }
    });

    const stores = await Promise.all(storePromises);
    return Response.json(stores);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Unable to get profile." });
  }
};
