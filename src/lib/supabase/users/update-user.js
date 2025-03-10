import { supabase } from "../supabase";
import { updateImage } from "../update-image";

export const updateUser = async (id, user, oldImageUrl) => {
  const imageUrl = await updateImage(user, oldImageUrl);
  const newUser = {
    userName: user.userName,
    image: imageUrl,
  };

  console.log("🛠 Données envoyées à Supabase:", newUser);
  const { data, error } = await supabase
    .from("users")
    .update({ userName: newUser.userName, image: newUser.image })
    .eq("id", id);
  if (error) {
    console.log("insert error");
  }
  return newUser;
};
