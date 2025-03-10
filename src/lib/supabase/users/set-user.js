import { supabase } from "../supabase";
import { uploadImage } from "../upload-image";

export const setUser = async (id, user) => {
  const imageUrl = await uploadImage(id, user);
  const newUser = {
    id: id,
    userName: user.userName,
    image: imageUrl,
    userId: user.userId,
  };

  console.log("🛠 Données envoyées à Supabase:", newUser);
  const { data, error } = await supabase.from("users").insert([newUser]);
  if (error) {
    console.log("insert error");
  }
  return newUser;
};
