import { useState } from "react";
import { Address } from "viem";
import { AddressInput, BytesInputArea, EtherInput } from "~~/components/scaffold-eth";

export const Prepare = ({
  weiToParent,
  scriptToParent,
  toToParent,
}: {
  weiToParent: any;
  scriptToParent: any;
  toToParent: any;
}) => {
  const [transferToAddress, setTransferToAddress] = useState("");
  const [script, setScript] = useState("");
  const [wei, setWei] = useState("0");

  const setScriptToParent = (data: any) => {
    setScript(data);
    scriptToParent(data);
  };

  const setWeiToParent = (wei: string) => {
    setWei(wei);
    weiToParent(wei);
  };

  const setToToParent = (to: Address) => {
    setTransferToAddress(to);
    toToParent(to);
  };

  const clear = () => {
    setScriptToParent("");
    setWei("0");
    setTransferToAddress("");
  };

  return (
    <>
      <div data-theme="retro" className="flex items-center flex-col flex-grow pt-10">
        <div>
          <button className="btn btn-secondary" onClick={() => clear()}>
            Clear
          </button>
        </div>

        <div className="flex flex-col w-96 my-2 space-y-1">
          <span className="text-lg font-semibold mb-1">transfer to: </span>
          <AddressInput
            value={transferToAddress}
            placeholder="receiver address"
            onChange={newValue => setToToParent(newValue)}
          />
        </div>

        <div className="flex flex-col w-96 h-96 my-2 space-y-1">
          <span className="text-lg font-semibold mb-1">spell: </span>
          <BytesInputArea value={script} placeholder="script " onChange={newValue => setScriptToParent(newValue)} />
        </div>

        <div className="flex flex-col w-96 my-10 space-y-1">
          <span className="text-lg font-semibold mb-1">wei: </span>
          <EtherInput value={wei} placeholder="wei" onChange={newValue => setWeiToParent(newValue)} />
        </div>
      </div>
    </>
  );
};
