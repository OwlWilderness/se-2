import React from "react";

export default function DataChild({ parentToChild }: { parentToChild: any }) {
  return <div data-theme="retro">parentToChild: {parentToChild}</div>;
}
