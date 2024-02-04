import { useScaffoldContractWrite } from "../../hooks/scaffold-eth/";
import { Address, parseEther } from "viem";

export const Scribe = ({ to, script }: { to: Address; script: any }) => {
  const { writeAsync } = useScaffoldContractWrite({
    contractName: "ScribeCast",
    functionName: "scribe",
    args: [to, script],
    value: parseEther("0"),
    blockConfirmations: 1,
    onBlockConfirmation: txnReceipt => {
      console.log("Transaction blockHash", txnReceipt.blockHash);
    },
  });

  return (
    <>
      <div>
        <div>
          <button className="btn btn-primary " onClick={() => writeAsync()}>
            scibeß
          </button>
        </div>
      </div>
    </>
  );
};
export default Scribe;
