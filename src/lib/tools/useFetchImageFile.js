import useSWR from "swr";

// 🆕 Fonction locale pour récupérer l'image sous forme de File
export const useFetchImageFile = (imageUrl, fileName) => {
  return useSWR(
    imageUrl,
    async () => {
      if (!imageUrl) return null;
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      return new File([blob], fileName, { type: blob.type });
    },
    { revalidateOnFocus: false }
  );
};
