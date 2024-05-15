import { SessionData } from "@/interface";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export const GET = async (request: Request) => {
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
  try {
    const { data, error } = await supabase.from("Session").select("shop");
    if (error) {
      throw error;
    }
    const storeData = data as SessionData[];
    return Response.json(storeData);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Unable to get profile." });
  }
};
