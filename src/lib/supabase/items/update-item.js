import { updateImage } from "../image/update-image";
import { supabase } from "../supabase";

export const updateItem = async (id, item, oldImageUrl) => {
  const imageUrl = await updateImage(item, oldImageUrl);
  const newItem = {
    name: item.name,
    description: item.description,
    category: item.category,
    constr: item.constr,
    condition: item.condition,
    price: item.price * 100,
    image: imageUrl,
    userId: item.userId,
    userImage: item.userImage,
  };

  console.log("🛠 Données envoyées à Supabase:", newItem);
  const { data, error } = await supabase
    .from("items")
    .update({
      name: newItem.name,
      description: newItem.description,
      category: newItem.category,
      constr: newItem.constr,
      condition: newItem.condition,
      price: newItem.price,
      image: newItem.image,
      userId: newItem.userId,
      userImage: newItem.userImage,
    })
    .eq("id", id);
  if (error) {
    console.log("update error");
  }
  return newItem;
};
