import Link from "next/link";
import type { NextPage } from "next";
import { BugAntIcon, MagnifyingGlassIcon, SparklesIcon } from "@heroicons/react/24/outline";
import { MetaHeader } from "~~/components/MetaHeader";

const Home: NextPage = () => {
  return (
    <>
      <MetaHeader />
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="px-5">
          <h1 className="text-center mb-8">
            <span className="block text-2xl mb-2">Welcome to</span>
            <span className="block text-4xl font-bold">Gnostic SVG</span>
            <span className="block text-2xl mb-2">on Scaffold-ETH 2</span>
          </h1>
          <p className="text-center text-lg">
            Store and Render SVG Strings on Gnosis
          </p>
          <p className="text-left text-lg">
            Use Write: CreateKeyWithSVG(string key, string[] svgStrings) passing in any string value as a key an array of svg strings.
          </p>
          <p className="text-left text-lg">
            Use Read: GetSvgByAddrKey(Address = quantumtekh.eth, Key = owl01) to see an example of SVG string array. 
          </p>
          <p className="text-left text-lg">
            Use Read: RenderSvgByAddrKey(Address, Key) to get base64 encoded SVG image string. (paste result in browser uri field)
          </p>
          <p className="text-left text-lg">
            Use Write: LockLey(string key) passing in any string value as the key to lock that key from every being updated again. 
          </p>
        </div>

        <div className="flex-grow bg-base-300 w-full mt-16 px-8 py-12">
          <div className="flex justify-center items-center gap-12 flex-col sm:flex-row">
            <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
              <BugAntIcon className="h-8 w-8 fill-secondary" />
              <p>
                Create Gnostic SVGs using the{" "}
                <Link href="/debug" passHref className="link">
                  Gnostic SVG Contract
                </Link>{" "}
                tab.
              </p>
            </div>
            {/*
              <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
                <SparklesIcon className="h-8 w-8 fill-secondary" />
                <p>
                  Experiment with{" "}
                  <Link href="/example-ui" passHref className="link">
                    Example UI
                  </Link>{" "}
                  to build your own UI.
                </p>
              </div>
            */}
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
      </div>
    </>
  );
};

export default Home;
