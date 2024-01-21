import React from "react";

export default function DataChild({ parentToChild, childToParent }: { parentToChild: any; childToParent: any }) {
  const data = "This is data from Child Component to the Parent Component.";

  return (
    <>
      <div>parentToChild: {parentToChild}</div>

      <div>
        <button className="btn btn-primary" onClick={() => childToParent(data)}>
          Click Child
        </button>
      </div>
    </>
  );
}
