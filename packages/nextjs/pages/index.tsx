import { useState } from "react";
import type { NextPage } from "next";
import { parseEther } from "viem";
import { useAccount } from "wagmi";
import { MetaHeader } from "~~/components/MetaHeader";
import { Address, AddressInput, Balance, EtherInput, InputBase } from "~~/components/scaffold-eth";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
import { useScaffoldContract, useScaffoldContractRead } from "~~/hooks/scaffold-eth";

//import Image from "next/image";

const Home: NextPage = () => {
  const [address, setAddress] = useState("");
  const [ethAmount, setEthAmount] = useState("");
  const [svgidx, setSvgIdx] = useState(BigInt(0));

  const { address: msgSender } = useAccount();
  const { data: yourContract } = useScaffoldContract({ contractName: "YourContract" });

  const { writeAsync: sendMana, isLoading } = useScaffoldContractWrite({
    contractName: "YourContract",
    functionName: "SendMana",
    args: [address],
    value: parseEther(ethAmount),
    onBlockConfirmation: txnReceipt => {
      console.log("📦 Transaction blockHash", txnReceipt.blockHash);
    },
  });

  const { data: activeKeyIndex } = useScaffoldContractRead({
    contractName: "YourContract",
    functionName: "ActiveKeyIndex",
    args: [msgSender],
  });

  const { data: key } = useScaffoldContractRead({
    contractName: "YourContract",
    functionName: "GetKey",
    args: [msgSender, svgidx],
  });

  const { data: svg64string } = useScaffoldContractRead({
    contractName: "YourContract",
    functionName: "RenderDefaultSvgByAddrKey",
    args: [yourContract?.address, key],
  });

  const { data: svgstring } = useScaffoldContractRead({
    contractName: "YourContract",
    functionName: "GetSvgByAddrKey",
    args: [yourContract?.address, key],
  });

  return (
    <>
      <MetaHeader />

      <div>SEND MANA: - payable call to send mana to an address and create a gnostic-svg entry</div>

      <div>
        <AddressInput onChange={setAddress} value={address} placeholder="Input your address" />
        <Balance address={address} />
        <EtherInput value={ethAmount} onChange={amount => setEthAmount(amount)} />
        <button
          className="btn btn-primary rounded-full capitalize font-normal font-white w-42 flex items-center gap-1 hover:gap-2 transition-all tracking-widest"
          onClick={() => sendMana()}
          disabled={isLoading}
        >
          full send
        </button>{" "}
      </div>

      <div>
        CONTRACT ADDRESS (YourContract): <Address address={yourContract?.address} format="long" />
      </div>

      <div>
        <div>
          MSG SENDER: <Address address={msgSender} format="long" />
        </div>
      </div>
      <div>
        <p></p>
        NOTES:
        <div>KEY = Hash(Msg.Sender + Index)</div>
        <div>
          Index is a sequencial number and incremented when a Key is Locked. Current Unlocked Index:{" "}
          {activeKeyIndex?.toString() || "0"}
        </div>
        <div>Locked Keys cannot be edited</div>
        <div>Keys have multiple slots that can contain a &apos;string&apos;</div>
      </div>

      <div>
        <div>
          <p></p>
          SEARCH INDEX FOR MSG SENDER:
          <InputBase value={svgidx} name="a" placeholder="0" onChange={v => setSvgIdx(v)}></InputBase>
          hash at index {svgidx.toString()}: {key}
        </div>
        <div>
          {" "}
          Image:
          <img src={svg64string} alt={svgstring} />
        </div>
        <div> Base 64 Encoded: {svg64string}</div>
        <div> SVG Content Text: {svgstring}</div>
      </div>
    </>
  );
};

export default Home;
