import { supabase } from "./supabase";
export const getItems = async () => {
  let { data: items, error } = await supabase.from("items").select("*");
  if (error) {
    console.log("erreur lors de selection des items");
  }
  console.log({ items });
  return { items };
};
