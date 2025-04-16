import { getS3Client } from "../auth.js";
import { supabase } from "../supabase";

export const deleteImage = async (imageURL) => {
  // Obtenir le client S3 avec l'authentification correcte
  let s3Client;
  try {
    s3Client = await getS3Client();
  } catch (error) {
    console.error("Erreur lors de l'initialisation du client S3:", error);
    return;
  }

  console.log("Utilisateur authentifié avec S3Client");

  const imageToRemove = imageURL.split("/").pop();

  const { error } = await supabase.storage
    .from("items")
    .remove([imageToRemove]);

  if (error) {
    console.error("Erreur lors de la suppression de l'image:", error.message);
  } else {
    console.log("Image supprimée avec succès.");
  }
};
