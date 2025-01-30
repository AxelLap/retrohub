import { useState } from "react";
import { Input } from "./ui/input";

export const ImageInput = ({ image, onChange }) => {
  const [previewImage, SetPreviewImage] = useState(image);
  const onImageChange = (e) => {
    const image = e.target.files[0];
    SetPreviewImage(URL.createObjectURL(image));
    onChange(image);
  };
  return (
    <div className="flex gap-2 h-fit items-center">
      <Input type="file" onChange={onImageChange} />
      {previewImage ? (
        <img
          src={previewImage}
          className="aspect-square w-12 bg-accent rounded-md"
        />
      ) : null}
    </div>
  );
};
