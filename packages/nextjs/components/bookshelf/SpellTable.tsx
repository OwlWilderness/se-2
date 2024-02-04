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
                <th className="bg-primary">Address</th>
                <th className="bg-primary">Spell</th>
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
                        <Address address={event.args.to} />
                      </td>
                      <td>
                        <img
                          src={bytesToString(toBytes(event.args.spell!))}
                          alt={bytesToString(toBytes(event.args.spell!))}
                        />
                      </td>
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
