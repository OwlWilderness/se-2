import { useState } from "react";
import { Cast, Prepare, Scribe, SpellTable, Transform, View, What } from ".";
import Howl from "./Howl";
import { Address } from "viem";

//nook inspired by zo3
export const Nook = ({ clsname }: { clsname: any }) => {
  const [wei, setWei] = useState("0");
  const [script, setScript] = useState("");
  const [to, setTo] = useState("");

  //transform:
  //  upload file
  //  display uploaded image
  //  transform to base 64
  //  display base 64

  //prepare:
  //  address
  //  wei
  //  convert to bytes
  //view
  //  display
  //transact
  //  address
  //  wei
  //  scribe - event
  //  cast - calldata, event
  //  token - 20,721,1155
  //  abstract

  const weiToParent = (childWei: string) => {
    setWei(childWei);
  };

  const scriptToParent = (childScipt: any) => {
    setScript(childScipt);
  };

  const toToParent = (childTo: Address) => {
    setTo(childTo);
  };

  const clearToParent = () => {
    setScript("");
    setWei("");
  };

  const [seed, setSeed] = useState(1);
  const refresh = () => {
    setSeed(Math.random());
  };
  //https://stackoverflow.com/questions/56649094/how-to-reload-a-component-part-of-page-in-reactjs

  return (
    <>
      <div data-theme="cyberpunk" items-center className="grid grid-rows-1">
        <div className={clsname}>
          <div>
            <What />
            <Howl />
          </div>
          <div>
            <Transform scriptToParent={scriptToParent} />
          </div>
          <div>
            <View parentToChild={script} />
            <Prepare weiToParent={weiToParent} toToParent={toToParent} clearToParent={clearToParent} />
            <Scribe script={script} to={to} refresh={refresh} />
            <Cast wei={wei} script={script} to={to} refresh={refresh} />
          </div>
        </div>
        <div>
          <SpellTable key={seed} />
        </div>
      </div>
    </>
  );
};
export default Nook;
