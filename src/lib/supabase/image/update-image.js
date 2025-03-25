import { getId } from "../../tools/get-id.js";
import { getS3Client } from "../auth.js";
import { supabase } from "../supabase.js";

export const updateImage = async (item, oldImageUrl) => {
  console.log("uploadImage is called");

  if (!(item.image instanceof File)) {
    console.error("L'image n'est pas un objet File");
    return;
  }

  // Obtenir le client S3 avec l'authentification correcte
  let s3Client;
  try {
    s3Client = await getS3Client();
  } catch (error) {
    console.error("Erreur lors de l'initialisation du client S3:", error);
    return;
  }

  console.log("Utilisateur authentifié avec S3Client");

  const imageToRemove = oldImageUrl.split("/").pop();

  const id = getId();

  const fileExt = item.image.name.split(".").pop();
  const fileName = `${id}.${fileExt}`;
  console.log("File Name:", fileName);

  await supabase.storage.from("items").remove([imageToRemove]);

  // Upload de l'image avec le client S3 correctement configuré
  const { data, error } = await supabase.storage
    .from("items")
    .upload(fileName, item.image, {
      contentType: item.image.type, // Ajoute le bon type MIME
    });

  if (error) {
    console.error("Échec de l'upload :", error);
    return;
  }

  if (error) {
    console.error("Upload échoué:", error);
    return;
  }

  // Obtenir l'URL publique
  const { data: publicData } = supabase.storage
    .from("items")
    .getPublicUrl(fileName);
  console.log("Generated Public URL:", publicData.publicUrl);

  return publicData.publicUrl;
};
