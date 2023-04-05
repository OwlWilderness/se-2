// Setup
import { Network, Alchemy } from 'alchemy-sdk';

const settings = {
    apiKey: "",
    network: Network.MATIC_MAINNET,
};

const alchemy = new Alchemy(settings);

// Get the latest block
const latestBlock = alchemy.core.getBlockNumber();

// Get all outbound transfers for a provided address
alchemy.core
    .getTokenBalances('0x1A4c2B35c9B4CC9F9A833A43dBe3A78FDB80Bb54')
    .then(console.log);

// Get all the NFTs owned by an address
const nfts = alchemy.nft.getNftsForOwner("0x1A4c2B35c9B4CC9F9A833A43dBe3A78FDB80Bb54");

// Listen to all new pending transactions
alchemy.ws.on(
    { method: "alchemy_pendingTransactions",
    fromAddress: "0x1A4c2B35c9B4CC9F9A833A43dBe3A78FDB80Bb54" },
    (res) => console.log(res)
);

