import { bytesToString, toBytes } from "viem";

export const View = ({ parentToChild }: { parentToChild: any }) => {
  return (
    <>
      <div className="card w-96 bg-base-100 shadow-xl">
        <figure>
          <img src={bytesToString(toBytes(parentToChild!))} alt={bytesToString(toBytes(parentToChild!))} />
        </figure>
      </div>
    </>
  );
};
export default View;
