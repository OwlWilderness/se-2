import { bytesToString, toBytes } from "viem";
import { Address } from "~~/components/scaffold-eth";
import { useScaffoldEventHistory } from "~~/hooks/scaffold-eth";

export const SpellTable = () => {
  const { data: scribeCastEvents, isLoading } = useScaffoldEventHistory({
    contractName: "ScribeCast",
    eventName: "result",
    // Specify the starting block number from which to read events, this is a bigint.
    fromBlock: 0n,
  });

  return (
    <div data-theme="cyberpunk" className="flex items-center flex-col flex-grow pt-10">
      <div className="px-5">
        <h1 className="text-center mb-8">
          <span className="block text-2xl mb-2">Welcome to</span>
          <span className="block text-4xl font-bold">Scribe Cast</span>
        </h1>
        <p className="text-center text-lg">
          Scribe :{" "}
          <code className="bg-base-300 text-base font-bold max-w-full break-words break-all inline-block">
            emit result{" "}
          </code>{" "}
          <code className="italic bg-base-300 text-base font-bold max-w-full break-words break-all inline-block">
            (scribe, 0xTo, 0xFrom, spell script, true)
          </code>
        </p>
        Cast :{" "}
        <code className="bg-base-300 text-base font-bold max-w-full break-words break-all inline-block">
          emit result{" "}
        </code>{" "}
        <code className="italic bg-base-300 text-base font-bold max-w-full break-words break-all inline-block">
          (cast, 0xTo, 0xFrom, spell script, success)
        </code>
      </div>
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="px-5">
          <h1 className="text-center mb-8">
            <span className="block text-4xl font-bold">spellbook</span>
          </h1>
        </div>
        <div className="overflow-x-auto shadow-lg">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th className="bg-primary">Action</th>
                <th className="bg-primary">From</th>
                <th className="bg-primary">To</th>
                <th className="bg-primary">Spell</th>
                <th className="bg-primary">Success</th>
              </tr>
            </thead>
            <tbody>
              {!scribeCastEvents || scribeCastEvents.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center">
                    No events found. {isLoading}
                  </td>
                </tr>
              ) : (
                scribeCastEvents?.map((event, index) => {
                  return (
                    <tr key={index}>
                      <th className="text-center">{event.args.action}</th>
                      <td>
                        <Address address={event.args.from} />
                      </td>
                      <td>
                        <Address address={event.args.to} />
                      </td>
                      <td>
                        <img src={bytesToString(toBytes(event.args.spell!))} />
                      </td>
                      <th className="text-center">{event.args.success?.toString()}</th>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
