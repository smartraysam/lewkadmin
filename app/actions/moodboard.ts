"use server";
import { Moodboard } from "@/interface";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { v4 as uuidv4 } from "uuid";

export async function saveMoodBoard(formData: Moodboard) {
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
  formData.id = uuidv4();
  try {
    const { data, error } = await supabase
      .from("PreMadeMoodboard")
      .insert(formData);
    if (error) {
      return { response: "error" };
    }
    return { response: "success" };
  } catch (error) {
    console.error(error);
    return { response: "Unable to save moodboard." };
  }
}
