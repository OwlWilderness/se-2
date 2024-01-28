import { useState } from "react";
import { bytesToString, toBytes } from "viem";

//reference
//https://www.kindacode.com/article/react-show-image-preview-before-uploading/

export const Transform = ({ parentToChild }: { parentToChild: any }) => {
  const [selectedImage, setSelectedImage] = useState();

  // This function will be triggered when the file field change
  const imageChange = (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };

  return (
    <>
      <div>
        <div>
          <input accept="image/*" type="file" onChange={imageChange} />

          {selectedImage && (
            <div>
              <img src={URL.createObjectURL(selectedImage)} alt="Thumb" />
            </div>
          )}
        </div>
      </div>
      <div className="card w-96 bg-base-100 shadow-xl">
        <figure>
          <img src={bytesToString(toBytes(parentToChild!))} alt={bytesToString(toBytes(parentToChild!))} />
        </figure>
      </div>
    </>
  );
};
export default Transform;
