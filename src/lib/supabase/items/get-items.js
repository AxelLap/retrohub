import { supabase } from "../supabase";
export const getItems = async (catFilter, constrFilter, userFilter) => {
  let query = supabase.from("items").select("*");

  if (catFilter) {
    query = query.eq("category", catFilter);
  }
  if (constrFilter) {
    query = query.eq("constr", constrFilter);
  }

  if (userFilter) {
    query = query.eq("userId", userFilter);
  }

  const { data: items, error } = await query;

  if (error) {
    console.log("erreur lors de selection des items");
  }
  return { items };
};
