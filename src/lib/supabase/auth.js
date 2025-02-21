import { S3Client } from "@aws-sdk/client-s3";
import { supabase } from "./supabase";

export const getS3Client = async () => {
  const { data: session, error: sessionError } =
    await supabase.auth.getSession();
  if (sessionError || !session) {
    console.error("Utilisateur non authentifié:", sessionError);
    return;
  }
  console.log("Session active:", session);
  console.log("Token JWT utilisé:", session.session.access_token);

  return new S3Client({
    forcePathStyle: true,
    region: "eu-west-3",
    endpoint: process.env.NEXT_PUBLIC_SUPABASE_STORAGE_ENDPOINT, // Vérifie que l'URL est correcte
    credentials: {
      accessKeyId: process.env.NEXT_PUBLIC_ACCESS_KEY_ID,
      secretAccessKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      sessionToken: session.session.access_token, // Ajoute le token utilisateur
    },
  });
};
