import { deleteImage } from "../image/delete-image";
import { supabase } from "../supabase";

export const deleteItem = async (id, image) => {
  deleteImage(image);
  const { error } = await supabase.from("items").delete().eq("id", id);
};
