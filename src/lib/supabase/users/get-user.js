import { supabase } from "../supabase";
export const getUser = async (userName) => {
  let query = supabase.from("users").select("*");

  query = query.eq("userName", userName);

  const { data: user, error } = await query;

  if (error) {
    console.log("erreur lors de selection du user");
  }
  return { user };
};
