import { useState } from "react";
import DataChild from "./DataChild";

//reference: https://www.freecodecamp.org/news/pass-data-between-components-in-react/
export default function DataParent() {
  const [data, setData] = useState("");

  const parentToChild = () => {
    setData("This is data from Parent Component to the Child Component.");
  };

  const childToParent = (childdata: any) => {
    setData(childdata);
  };

  const clear = () => {
    setData("");
  };

  return (
    <div data-theme="cyberpunk">
      <div data-theme="retro">
        <DataChild parentToChild={data} childToParent={childToParent} />
      </div>

      <div>
        <button className="btn btn-primary" onClick={() => parentToChild()}>
          Click Parent
        </button>
      </div>
      <div>
        <button className="btn btn-secondary" onClick={() => clear()}>
          Clear
        </button>
      </div>
    </div>
  );
}
