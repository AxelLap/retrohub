import { supabase } from "../supabase";

export const updateItems = async (newUser, currentUserName) => {
  const { data, error } = await supabase
    .from("items")
    .update({
      userId: newUser.userName,
      userImage: newUser.image,
    })
    .eq("userId", currentUserName);
  if (error) {
    console.log("update error");
  }
};
