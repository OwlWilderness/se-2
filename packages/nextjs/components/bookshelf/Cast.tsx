import { Address, parseEther } from "viem";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

export const Cast = ({ wei, to, script, refresh }: { wei: string; to: Address; script: any; refresh: any }) => {
  const { writeAsync } = useScaffoldContractWrite({
    contractName: "ScribeCast",
    functionName: "cast",
    args: [to, script],
    value: parseEther(wei),
    blockConfirmations: 1,
    onBlockConfirmation: txnReceipt => {
      console.log("Transaction blockHash", txnReceipt.blockHash);
      refresh();
    },
  });

  return (
    <>
      <div>
        <div>
          <button className="btn btn-accent" onClick={() => writeAsync()}>
            {"CAST (call;)"}
          </button>
        </div>
      </div>
    </>
  );
};
export default Cast;
