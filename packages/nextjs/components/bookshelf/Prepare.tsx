import { useState } from "react";
import { bytesToString, toBytes } from "viem";
import { AddressInput, BytesInputArea, EtherInput } from "~~/components/scaffold-eth";

export const Prepare = () => {
  const [transferToAddress, setTransferToAddress] = useState("");
  const [script, setScript] = useState("");
  const [wei, setWei] = useState("0");

  return (
    <>
      <div data-theme="retro" className="flex items-center flex-col flex-grow pt-10">
        <div className="flex flex-col w-96 my-2 space-y-1">
          <span className="text-lg font-semibold mb-1">transfer to: </span>
          <AddressInput
            value={transferToAddress}
            placeholder="receiver address"
            onChange={newValue => setTransferToAddress(newValue)}
          />
        </div>

        <div className="flex flex-col w-96 h-96 my-2 space-y-1">
          <span className="text-lg font-semibold mb-1">spell: </span>
          <BytesInputArea value={script} placeholder="script " onChange={newValue => setScript(newValue)} />
        </div>

        <div className="flex flex-col w-96 my-10 space-y-1">
          <span className="text-lg font-semibold mb-1">wei: </span>
          <EtherInput value={wei} placeholder="wei" onChange={newValue => setWei(newValue)} />
        </div>

        <div className="card w-96 bg-base-100 shadow-xl">
          <figure>
            <img src={bytesToString(toBytes(script!))} alt={bytesToString(toBytes(script!))} />
          </figure>
        </div>
      </div>
    </>
  );
};
