import { useState } from "react";
import { BytesInputArea } from "../scaffold-eth";

//reference
//https://www.kindacode.com/article/react-show-image-preview-before-uploading/

export const Transform = ({ scriptToParent }: { scriptToParent: any }) => {
  const [selectedImage, setSelectedImage] = useState();
  const [script, setScript] = useState("");

  // This function will be triggered when the file field change
  const imageChange = async (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };

  //https://medium.com/nerd-for-tech/how-to-store-an-image-to-a-database-with-react-using-base-64-9d53147f6c4f
  const transformIt = async () => {
    if (selectedImage) {
      const b64: any = await convertToBase64(selectedImage);

      //base64ToParent(b64);
      setScript(b64);
    }
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

  const setScriptToParent = (data: any) => {
    setScript(data);
    scriptToParent(data);
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
          <button className="btn btn-primary" onClick={() => transformIt()}>
            transform to base 64
          </button>
        </div>
      </div>
      <div className="flex flex-col w-96 h-96 my-2 space-y-1">
        <span className="text-lg font-semibold mb-1">spell: </span>
        <BytesInputArea value={script} placeholder={script} onChange={newValue => setScriptToParent(newValue)} />
      </div>
    </>
  );
};
export default Transform;
