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

const owner = "0x1A4c2B35c9B4CC9F9A833A43dBe3A78FDB80Bb54";
// Get all the NFTs owned by an address//
//const nfts = await alchemy.nft.getNftsForOwner(owner);
//console.log(nfts)
// Listen to all new pending transactions
//alchemy.ws.on(
//    { method: "alchemy_pendingTransactions",
//    fromAddress: "0x1A4c2B35c9B4CC9F9A833A43dBe3A78FDB80Bb54" },
//    (res) => console.log(res)
//);
async function getNftsForOwner() {
  try {
    //const ownerAddress = '0xABC';
    const pageKey = 'page-key0';
    const contractAddresses = ['0xa3B9F81828F0e552648Cd82EB1B217CCF38c7339'];
    const excludeFilters = ['SPAM'];
    //const expectedFilters = ['SPAM'];
    const getNftsParams = {
      pageKey,
      contractAddresses,
      excludeFilters,
      pageSize: 3,
      tokenUriTimeoutInMs: 50
    };
 
    let nfts = [];
      // Get the async iterable for the owner's NFTs.
      const nftsIterable = alchemy.nft.getNftsForOwnerIterator(owner, getNftsParams);

      // Iterate over the NFTs and add them to the nfts array.
      for await (const nft of nftsIterable) {
          nfts.push(nft);
      }

  // Parse output
  //const numNfts = nfts["totalCount"];
  //const nftList = nfts["ownedNfts"];
  //const pagekey = nfts["pageKey"]

  console.log(`Total NFTs owned by ${owner}: ${nfts.length}  \n`);

  let i = 1;

  for (let nft of nfts) {
    if(nft.metadataError == undefined && nft.rawMetadata != undefined){
        const id = nft.tokenId < 500000 ? nft.tokenId : 999999
        console.log(`${i}. ${nft.tokenType} ${ id} ${nft.balance} `);
    }
    i++;
  }

 


      // Log the NFTs.
      //console.log(nfts);
  } catch (error) {
      console.log(error);
  }
}

const nfo = await getNftsForOwner();