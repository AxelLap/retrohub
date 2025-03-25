import { supabase } from "../supabase";
export const getItem = async (itemId) => {
  let { data: item, error } = await supabase
    .from("items")
    .select("*")
    .eq("id", itemId);

  if (error) {
    console.log("erreur lors de selection de l'item");
  }
  return { item };
};
