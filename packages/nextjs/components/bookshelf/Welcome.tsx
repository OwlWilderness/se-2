export const Welcome = () => {
  return (
    <>
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
            (scribe, 0xTo, 0xFrom, spell64, true)
          </code>
        </p>
        <p className="text-center text-lg">
          Cast :{" "}
          <code className="bg-base-300 text-base font-bold max-w-full break-words break-all inline-block">
            emit result{" "}
          </code>{" "}
          <code className="italic bg-base-300 text-base font-bold max-w-full break-words break-all inline-block">
            (cast, 0xTo, 0xFrom, spell64, success)
          </code>
          calldata: spell64
        </p>
      </div>
    </>
  );
};
export default Welcome;
