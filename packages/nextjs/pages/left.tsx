import { NextPage } from "next";
import Nook from "~~/components/bookshelf/Nook";

const Left: NextPage = () => {
  return (
    <>
      <div>
        <Nook clsname={"grid items-left grid-cols-1"} />
      </div>
    </>
  );
};

export default Left;
