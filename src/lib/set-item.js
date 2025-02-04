import { supabase } from "./supabase";
import { uploadImage } from "./upload-image";

export const setItem = async (id, item) => {
  const imageUrl = await uploadImage(id, item);
  const newItem = {
    id: id,
    name: item.name,
    category: item.category,
    constr: item.constr,
    price: item.price * 100,
    image: imageUrl,
  };

  console.log("🛠 Données envoyées à Supabase:", newItem);
  const { data, error } = await supabase.from("items").insert([newItem]);
  if (error) {
    console.log("insert error");
  }
};
