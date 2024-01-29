import { useState } from "react";
import { bytesToString, toBytes } from "viem";

//reference
//https://www.kindacode.com/article/react-show-image-preview-before-uploading/

export const Transform = ({ parentToChild, base64ToParent }: { parentToChild: any; base64ToParent: any }) => {
  const [selectedImage, setSelectedImage] = useState();

  // This function will be triggered when the file field change
  const imageChange = async (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };

  //https://medium.com/nerd-for-tech/how-to-store-an-image-to-a-database-with-react-using-base-64-9d53147f6c4f
  const transformIt = async () => {
    const b64: any = await convertToBase64(selectedImage);
    base64ToParent(b64);
  };

  const convertToBase64 = (file: any) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = error => {
        reject(error);
      };
    });
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
        <div>
          <button className="btn" onClick={() => transformIt()}>
            base 64
          </button>
        </div>
      </div>
      <div>
        <figure>
          <img src={bytesToString(toBytes(parentToChild!))} alt={bytesToString(toBytes(parentToChild!))} />
        </figure>
      </div>
    </>
  );
};
export default Transform;
