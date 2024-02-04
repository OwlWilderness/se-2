import { useScaffoldContractWrite } from "../../hooks/scaffold-eth/";
import { Address, parseEther } from "viem";

export const Scribe = ({ to, script, refresh }: { to: Address; script: any; refresh: any }) => {
  const { writeAsync } = useScaffoldContractWrite({
    contractName: "ScribeCast",
    functionName: "scribe",
    args: [to, script],
    value: parseEther("0"),
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
          <button className="btn btn-info " onClick={() => writeAsync()}>
            {"SCRIBE (emit;)"}
          </button>
        </div>
      </div>
    </>
  );
};
export default Scribe;
