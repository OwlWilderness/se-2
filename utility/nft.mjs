// Setup
import { Network, Alchemy } from 'alchemy-sdk';

const settings = {
    apiKey: "Wfm6xSZjabmbT3Cu18-_yMZFgtnjiNC2",
    network: Network.MATIC_MAINNET,
};

const alchemy = new Alchemy(settings);

// Get the latest block
const latestBlock = alchemy.core.getBlockNumber();

// Get all outbound transfers for a provided address
//alchemy.core
//    .getTokenBalances('0x1A4c2B35c9B4CC9F9A833A43dBe3A78FDB80Bb54')
//    .then(console.log);

const address = "0x1A4c2B35c9B4CC9F9A833A43dBe3A78FDB80Bb54";
// Get all the NFTs owned by an address
const nfts = await alchemy.nft.getNftsForOwner(address);
console.log(nfts)
// Listen to all new pending transactions
//alchemy.ws.on(
//    { method: "alchemy_pendingTransactions",
//    fromAddress: "0x1A4c2B35c9B4CC9F9A833A43dBe3A78FDB80Bb54" },
//    (res) => console.log(res)
//);

  // Parse output
  const numNfts = nfts["totalCount"];
  const nftList = nfts["ownedNfts"];
  const pagekey = nfts["pageKey"]

  console.log(`Total NFTs owned by ${address}: ${numNfts} Page: ${pagekey} \n`);

  let i = 1;

  for (let nft of nftList) {
    if(nft.metadataError == undefined && nft.rawMetadata != undefined){
        console.log(`${i}. ${nft.tokenType} ${nft.title} ${nft.tokenId}`);
    }
    i++;
  }
