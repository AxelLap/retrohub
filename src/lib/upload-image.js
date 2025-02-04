import { supabase } from "./supabase";

export const uploadImage = async (id, item) => {
  console.log("uploadImage is called");

  // Vérification du type de l'image
  if (!(item.image instanceof File)) {
    console.error("L'image n'est pas un objet File");
    return;
  }

  console.log("item.image", item.image);
  const fileExt = item.image.name.split(".").pop(); // Récupère l'extension

  const fileName = `${id}.${fileExt}`; // Génère un nom correct
  console.log("File Name:", fileName);

  // Upload de l'image sur Supabase Storage
  const { data, error } = await supabase.storage
    .from("items")
    .upload(fileName, item.image);

  if (error) {
    console.error("Upload failed:", error);
    return;
  }

  // Vérification de l'URL publique
  const publicUrl = supabase.storage.from("items").getPublicUrl(fileName);
  console.log("Generated Public URL:", publicUrl.data.publicUrl);

  return publicUrl.data.publicUrl;
};
