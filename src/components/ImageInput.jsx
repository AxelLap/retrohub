import { useState } from "react";
import { Input } from "./ui/input";

export const ImageInput = ({ currentImage, onChange }) => {
  const [imagePreview, setImagePreview] = useState(currentImage);
  const onImageChange = (e) => {
    const newImage = e.target.files[0]; //Récupère l'image de l'iput
    setImagePreview(URL.createObjectURL(newImage)); //Création d'une URL temporaire
    onChange(newImage); //newImage passée au parent
  };

  return (
    <div className="flex gap-2 h-fit items-center">
      <Input type="file" onChange={onImageChange} />
      {imagePreview ? (
        <img className="aspect-square rounded-md w-12" src={imagePreview} />
      ) : null}
    </div>
  );
};
