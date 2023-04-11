import Image from 'next/image'

export const NFTCard = ({nft}) => {

    return (
        <div className="w-1/4 flex flex-col">
            <div className="rounded-md">
                <img className="object-cover h-128 w-full rounded-t-md" src={nft.media[0].gateway}/>
            </div>
            <div className="flex flex-col y-gap-2 px-2 py-3 bg-slate-100 rounded-b-md h-110">
                <div className="">
                    <h2 className="text-xl text-grey-800" >{nft.title}</h2>
                    <p className="text-grey-600">{nft.id.tokenId.substr(nft.id.tokenId.length - 4)}</p>
                    <p className="text-grey-600">{`${nft.contract.address.substr(0, 4)}...${nft.contract.address.substr(nft.contract.address.length - 4)}`}
                    <button className="ml-2" onClick={() =>  navigator.clipboard.writeText(nft.contract.address)}><Image
                        src={require('./icons8-copy-24.png')}          
                    /></button>
                    </p>
                    
                </div>

                <div className="flex-grow mt-2">
                    <p className="text-grey-600">{nft.description?.substr(0, 155)}</p>
                </div>

                <div className="flex justify-center mb-1">
                    <a target={"_blank"} href={`https://etherscan.io/token/${nft.contract.address}`} className="py-2 px-4 bg-blue-500 w-1/2 text-center rounded-m text-white cursor-pointer"> View on Etherscan</a>
                </div>
</div>
        </div>
    )
}