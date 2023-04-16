// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

//quantumtekh.eth #quantumtekh.polygon #buidlguild
//code taken from this repo: https://github.com/OwlWilderness/scaffold-eth/blob/chaotic-1155-staker/packages/hardhat/contracts/Chaotic1155.sol
//updated to include demo app, and commit
//
// this implementation will allow users to stake a collection of 1155 tokens
// withdrawn token ids will be random ids with a range based on how long you stake

//imports
//
    import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
    import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Burnable.sol";
    import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";
   // import "@openzeppelin/contracts/token/ERC1155/utils/ERC1155Holder.sol";
    
    import "@openzeppelin/contracts/access/Ownable.sol";
    import "@openzeppelin/contracts/utils/Strings.sol";    
    import 'base64-sol/base64.sol';
    import "@openzeppelin/contracts/utils/Counters.sol";

contract Chaotic1155 is ERC1155, Ownable, ERC1155Burnable, ERC1155Supply {

//Usings...
//
    using Counters for Counters.Counter;
    using ToColor for bytes3;
//Mappings...
//
    //buidl info
    mapping (uint => string) public repo;
    mapping (uint => string) public commit;

    //svg  
    mapping (uint => string) public AttributesString4Token; //tokenId => Attributes '[{}]'   
    mapping (uint => mapping(uint => string)) public SvgStringNum4Token; // tokenId => (string # => string) 
    mapping (uint => uint) public SvgStringCount4Token; //tokenid => svg string count

//Public Variables...
//
    uint public MaxTokenId = 32;
    uint public MaxForTokenIds = 10240;
    uint public LastMintedTokenId = 0;
    uint public Price = 1;
    uint public TotalSupply = 0;


    
    string public name = "Buidl";
    string public symbol = "BDL";

// private Variables...
//
    Counters.Counter private _tokenIds;

//Constructor...
//
    constructor() ERC1155("") {}

//helpers..
//
    //function GetTotalSupply() public view returns (uint) {
    //    uint allsupply = 0
    //    for(uint i = 1; i <= LastMintedTokenId; ++i){
    //        allsupply = allsupply + totalSupply(i);
    //    }
    //    return allsupply;
    //}
    function SetPrice(uint256 _price) public onlyOwner {
        Price = _price;
    }
    
//Collection Controllers...
//
    function SetMaxTokenId(uint newMax) public onlyOwner{
        MaxTokenId = newMax;
    } 

    function SetMaxForTokenId(uint newMax) public onlyOwner{
        MaxForTokenIds = newMax;
    }

//views
    function getRepo(uint id) public view returns(string){
        return repo[id];
    }
    function getCommit(uint id) public view returns(string){
        return commit[id];
    }

//Token Controllers...
//

    function SetSvgStrings(uint id, uint strCount, string[] memory svgStrings) public onlyOwnerOfId(id) {
        require(strCount > 0, "svg string count must be greater than zero");
        require(svgStrings.length >= strCount, "svg strings less than svg string count");
        
        SvgStringCount4Token[id] = strCount + 1;
        for(uint i=1; i <= strCount; ++i){
            SvgStringNum4Token[id][i] = svgStrings[i-1];
        }
        SvgStringNum4Token[id][strCount + 1] = string(abi.encodePacked('<text x="40" y="55" fill="yellow">',uint2str(id),'</text>'));
    }

    function SetAttributes(uint id, string memory newAttributes, bool append) public onlyOwnerOfId(id) {
        if(append){
            AttributesString4Token[id] = string(abi.encodePacked(AttributesString4Token[id], newAttributes));
        } else {
            AttributesString4Token[id] = newAttributes;
        }
    }

//modifiers...
//
    modifier onlyOwnerOfId(uint id) {
        require(exists(id), "token does not exists");
        require(balanceOf(msg.sender,id) > 0, "token not in inventory");
        _;
    }

//Minting ...
//
    function mintItem(uint amount, string repo, string commit) public payable {
        //require sent amout meets price requirement
        require(amount > 0, "mint amount must be > 0");
        require(msg.value >= (Price * amount), "not enough funds");

        //require max tokens have not been minted
        require(_tokenIds.current() < MaxTokenId, "all token ids have been claimed");
        require(amount <= MaxForTokenIds,"reduce ammount too many");

        
        
        //get next id to mint
        _tokenIds.increment();
        uint id = _tokenIds.current();

        _mint(msg.sender, id, amount, "");
        TotalSupply = TotalSupply + amount;
        repo[id] = repo;
        commit[id] = commit;

        Initialize(id);
        LastMintedTokenId = id;
    }

    function mint(address account, uint id, uint amount)
        public payable onlyOwnerOfId(id)
    {   
        require(exists(id), "token does not exist");
        require(amount > 0, "mint amount must be > 0");
        require(msg.value >= (Price * amount), "not enough funds");

        uint newTotal = totalSupply(id) + amount;
        require(newTotal < MaxForTokenIds, "max for token id has been reached");

        bytes memory data;
        _mint(account, id, amount, data);
        TotalSupply = TotalSupply + amount;
    }

    function Initialize(uint id) internal {
        SvgStringCount4Token[id] = 2;
        bytes32 predictableRandom = keccak256(abi.encodePacked( blockhash(block.number-1), msg.sender, address(this), id ));
        bytes3 colorBytes = bytes2(predictableRandom[0]) | ( bytes2(predictableRandom[1]) >> 8 ) | ( bytes3(predictableRandom[2]) >> 16 );
        
        SvgStringNum4Token[id][1] = string(abi.encodePacked('<circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="#',colorBytes.toColor(),'" />'));
        SvgStringNum4Token[id][2] = string(abi.encodePacked('<text x="40" y="55" fill="yellow">',commit[id],'</text>'));
    }

    //https://ethereum.stackexchange.com/questions/15641/how-does-a-contract-find-out-if-another-address-is-a-contract
    //function isContract(address _addr) private returns (bool isContract){
    //uint32 size;
    //assembly {
    //    size := extcodesize(_addr)
    // }
    //return (size > 0);
    //}
    //function mintBatch(address to, uint[] memory ids, uint[] memory amounts, bytes memory data)
    //    public
    //    onlyOwner
    //{
    //    require(id < MaxTokenId, "max token id limit reached");
    //
    //    bytes memory data;
    //    _mintBatch(to, ids, amounts, data);
    //}

//Overrides
//
    //uri ...
    //
    //https://eips.ethereum.org/EIPS/eip-1155#metadata
    function uri(uint256 id) public view override returns (string memory) {
        require(exists(id), "token does not exist");
        
        
        string memory supply = uint2str(totalSupply(id));

        //string memory regen4id = uint2str(GetRegenForId(id));
        string memory nftname = string(abi.encodePacked('Chaotic 1155 - ',uint2str(id)));
        string memory description = string(abi.encodePacked('Chaotic 1155 #',uint2str(id), ' Supply: ',supply));
        string memory image = Base64.encode(bytes(GenerateSVGofTokenById(id)));

        return
            string(
                abi.encodePacked(
                'data:application/json;base64,',
                Base64.encode(
                    bytes(
                            abi.encodePacked(
                                '{"name":"',
                                nftname,
                                '", "description":"',
                                description,
                                '", "attributes": [{"trait_type": "supply", "value": "',
                                uint2str(totalSupply(id)),
                                '"}',
                                AttributesString4Token[id],
                                '], "image": "',
                                'data:image/svg+xml;base64,',
                                image,
                                '"}'
                            )
                        )
                    )
                )
            );
    }

//SVG
//
    //convert integer to string
    function uint2str(uint _i) internal pure returns (string memory _uintAsString) {
        if (_i == 0) {
            return "0";
        }
        uint j = _i;
        uint len;
        while (j != 0) {
            len++;
            j /= 10;
        }
        bytes memory bstr = new bytes(len);
        uint k = len;
        while (_i != 0) {
            k = k-1;
            uint8 temp = (48 + uint8(_i - _i / 10 * 10));
            bytes1 b1 = bytes1(temp);
            bstr[k] = b1;
            _i /= 10;
        }
        return string(bstr);
    }

    function GenerateSVGofTokenById(uint id) public view returns (string memory) {

        string memory svg = string(abi.encodePacked(
            '<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">',
                RenderTokenById(id),
            '</svg>'
        ));

        return svg;
    }

    function RenderTokenById(uint id) public view returns (string memory) {
        require(exists(id), "token does not exist");

        uint str4Id = SvgStringCount4Token[id];
        string memory strSvg;

        for(uint i=1; i <= str4Id; ++i){
            strSvg = string(abi.encodePacked(strSvg, SvgStringNum4Token[id][i] ));
        }

        return strSvg;
    }


///common 
//
    //Add withdraw function to transfer ether from the rigged contract to an address
    function withdraw(address _addr, uint256 _amount) public onlyOwner{
        require(address(this).balance >= _amount, "amount exceeds funds");
        (bool sent, ) = _addr.call{value: _amount}("");
        require(sent, "Failed to send ");
    }

    // to support receiving ETH by default
    receive() external payable {}
    fallback() external payable {}

    // The following functions are overrides required by Solidity.

    function _beforeTokenTransfer(address operator, address from, address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data)
        internal
        override(ERC1155, ERC1155Supply)
    {
        super._beforeTokenTransfer(operator, from, to, ids, amounts, data);
    }
    
    //// do not need if importing ERC1155Holder
    //function onERC1155Received(address, address, uint256, uint256, bytes memory) public virtual returns (bytes4) {
    //    return this.onERC1155Received.selector;
    //}

    //function onERC1155BatchReceived(address, address, uint256[] memory, uint256[] memory, bytes memory) public virtual returns (bytes4) {
    //    return this.onERC1155BatchReceived.selector;
    //}
}
//library
//
    library ToColor {
        bytes16 internal constant ALPHABET = '0123456789abcdef';

        function toColor(bytes3 value) internal pure returns (string memory) {
            bytes memory buffer = new bytes(6);
            for (uint256 i = 0; i < 3; i++) {
                buffer[i*2+1] = ALPHABET[uint8(value[i]) & 0xf];
                buffer[i*2] = ALPHABET[uint8(value[i]>>4) & 0xf];
            }
            return string(buffer);
        }
    }