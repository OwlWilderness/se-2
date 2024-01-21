import { useState } from "react";
import DataChild from "./DataChild";

export default function DataParent() {
  const [data, setData] = useState("");

  const parentToChild = () => {
    setData("This is data from Parent Component to the Child Component.");
  };

  const clear = () => {
    setData("");
  };

  return (
    <div data-theme="cyberpunk">
      <div>
        {" "}
        <DataChild parentToChild={data} />
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
