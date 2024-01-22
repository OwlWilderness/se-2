import { Address, parseEther } from "viem";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

export const Cast = ({ wei, to, script }: { wei: string; to: Address; script: any }) => {
  const { writeAsync } = useScaffoldContractWrite({
    contractName: "ScribeCast",
    functionName: "cast",
    args: [to, script],
    value: parseEther(wei),
    blockConfirmations: 1,
    onBlockConfirmation: txnReceipt => {
      console.log("Transaction blockHash", txnReceipt.blockHash);
    },
  });

  return (
    <>
      <div>
        <div>
          <button className="btn btn-secondary btn-lg px-2 rounded-none" onClick={() => writeAsync()}>
            casT
          </button>
        </div>
      </div>
    </>
  );
};
export default Cast;
