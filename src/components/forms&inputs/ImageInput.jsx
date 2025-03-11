import { useEffect, useRef, useState } from "react";
import { Input } from "../ui/input";

export const ImageInput = ({ currentImage, onChange }) => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);

  // Si on reçoit une image par défaut (un `File`), on la met en place
  useEffect(() => {
    if (currentImage instanceof File) {
      setFile(currentImage);
      const previewUrl = URL.createObjectURL(currentImage);
      setPreview(previewUrl);
      return () => URL.revokeObjectURL(previewUrl);
    }
  }, [currentImage]);

  const onImageChange = (e) => {
    const newFile = e.target.files[0];
    if (newFile) {
      setFile(newFile);
      setPreview(URL.createObjectURL(newFile));
      onChange(newFile);
    }
  };

  // Pour forcer l'affichage du fichier dans l'input file
  useEffect(() => {
    if (file && fileInputRef.current) {
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);
      fileInputRef.current.files = dataTransfer.files;
    }
  }, [file]);

  return (
    <div className="flex gap-2 h-fit items-center">
      <Input type="file" ref={fileInputRef} onChange={onImageChange} />
      {preview && (
        <img className="aspect-square rounded-md w-12" src={preview} />
      )}
    </div>
  );
};
