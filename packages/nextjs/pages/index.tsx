import { useState } from "react";
import Link from "next/link";
import type { NextPage } from "next";
import { Address } from "viem";
import { BugAntIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { MetaHeader } from "~~/components/MetaHeader";
import { SpellTable } from "~~/components/SpellTable";
import { Cast, Prepare, Scribe, Transform, View } from "~~/components/bookshelf";

const Home: NextPage = () => {
  const [wei, setWei] = useState("0");
  const [script, setScript] = useState("");
  const [to, setTo] = useState("");

  const weiToParent = (childWei: string) => {
    setWei(childWei);
  };

  const scriptToParent = (childScipt: any) => {
    setScript(childScipt);
  };

  const toToParent = (childTo: Address) => {
    setTo(childTo);
  };

  return (
    <>
      <div>
        <MetaHeader />
        <div className="grid grid-cols-3">
          <div>
            <Transform parentToChild={script} />
          </div>
          <div>
            <Prepare weiToParent={weiToParent} scriptToParent={scriptToParent} toToParent={toToParent} />
          </div>
          <div>
            <div>
              <View parentToChild={script} />
            </div>
            <div className="grid grid-cols-2">
              <div>
                <Scribe script={script} to={to} />
              </div>
              <div>
                <Cast wei={wei} script={script} to={to} />
              </div>
            </div>
          </div>
        </div>

        <SpellTable />
      </div>
      <div className="flex-grow bg-base-300 w-full mt-16 px-8 py-12">
        <div className="flex justify-center items-center gap-12 flex-col sm:flex-row">
          <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
            <BugAntIcon className="h-8 w-8 fill-secondary" />
            <p>
              Tinker with your smart contract using the{" "}
              <Link href="/debug" passHref className="link">
                Debug Contract
              </Link>{" "}
              tab.
            </p>
          </div>
          <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
            <MagnifyingGlassIcon className="h-8 w-8 fill-secondary" />
            <p>
              Explore your local transactions with the{" "}
              <Link href="/blockexplorer" passHref className="link">
                Block Explorer
              </Link>{" "}
              tab.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
