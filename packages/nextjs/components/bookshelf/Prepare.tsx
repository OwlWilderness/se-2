import { useState } from "react";
import { Address } from "viem";
import { AddressInput, EtherInput } from "~~/components/scaffold-eth";

export const Prepare = ({
  weiToParent,
  toToParent,
  clearToParent,
}: {
  weiToParent: any;
  toToParent: any;
  clearToParent: any;
}) => {
  const [transferToAddress, setTransferToAddress] = useState("");
  const [wei, setWei] = useState("0");

  const setWeiToParent = (wei: string) => {
    setWei(wei);
    weiToParent(wei);
  };

  const setToToParent = (to: Address) => {
    setTransferToAddress(to);
    toToParent(to);
  };
  const clear = () => {
    setToToParent("");
    setWeiToParent("0");
    clearToParent();
  };
  return (
    <>
      <div>
        <button className="btn btn-secondary" onClick={() => clear()}>
          {" "}
          Clear{" "}
        </button>
        <div className="flex flex-col w-96 my-10 space-y-1">
          <span className="text-lg font-semibold mb-1">transfer to: </span>
          <AddressInput
            value={transferToAddress}
            placeholder="receiver address"
            onChange={newValue => setToToParent(newValue)}
          />
        </div>

        <div className="flex flex-col w-96 my-10 space-y-1">
          <span className="text-lg font-semibold mb-1">wei: </span>
          <EtherInput value={wei} placeholder="wei" onChange={newValue => setWeiToParent(newValue)} />
        </div>
      </div>
    </>
  );
};
