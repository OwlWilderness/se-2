pragma solidity >=0.8.0 <0.9.0;
// SPDX-License-Identifier: MIT

/*
///@title    Chaotic Staker app for ERC 1155 Tokens
///@author   quantumtekh.eth
///@repo:    https://github.com/OwlWilderness/se-2/tree/tog-dex
///@notice   dex to support 1155 cryptog tokens
///@notice   some code from: https://github.com/OwlWilderness/scaffold-eth-challenges/tree/challenge-5-dex         
*/

///imports...
///
    //Debug
import "hardhat/console.sol";

    //Access
import "@openzeppelin/contracts/access/Ownable.sol";

    ///ERC1155 
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/token/ERC1155/utils/ERC1155Holder.sol"; //do I need this if I am adding the on receive events?
 
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract CryptoGenDEX is Ownable, ERC1155Holder {

  string public name = "Crypto Gen DEX";
  string public symbol = "CGDX";

//external contracts...
//
  ERC1155 public togs; //cogs in the machine - pieces of the machine #gotf
  IERC20 public genx;
  //ERC1155 togs;

  uint256 public countOf1155Tokens = 0;
  uint256 public totalLiquidity = 0;


  constructor(address token_addr, address togs_addr) {
    genx = IERC20(token_addr);
    togs = ERC1155(togs_addr);

  }

  // write your functions here...
  mapping (address =>  uint256) public maxTokenIds; //token address => (token id => token amount)

  //a single address can have the following token allocations
  //-- 1 - chain token (erc20 - amount)  .balance 
  //-- 2 - genx token (erc20 - amount) .transfer
  //-- 3 - tog token (erc1155 - various amounts of multiple ids) .withdraw;
  ///    - - setting approval for erc1155 requires an approval of the entire collection

  struct share{
    address operartor;  //address using the dex (could be this contract address)
    uint256 balchain;  //balance of chain token
    uint256 balgendx;  //balance of gendex token
    mapping(address => ooff) bal1155; //address of 1155 token => ooff:{1155 token id => Amount of Id}
    mapping(address => uint256) bal20; 
  }
  
  struct ooff{
    mapping(uint256 => uint256) ofId;
  }


  mapping(address => share) public Shares;

//called from on recieve 1155 token
  function add1155Share(address operator, address addr1155, uint256[] memory ids, uint256[] memory vals) internal {
    share storage _share = Shares[operator];
    ooff storage _ooff = _share.bal1155[addr1155];
    

    dAddShare = true;
    dOp = operator;
    dFrom = addr1155;
    dMS = msg.sender;
    //d_MS = _msgSender();

    //update 1155 token balances for this operator
    _share.operartor = operator;
    countOf1155Tokens = countOf1155Tokens + ids.length;

    for(uint i = 0; i < ids.length; ++i) {

      uint256 id = ids[i];

      uint256 amt = _ooff.ofId[id] + vals[i];
      _ooff.ofId[id] = amt;

       uint256 curmax = maxTokenIds[addr1155];
       if(id > curmax){
          maxTokenIds[addr1155] = id;
       }
      

    }
   // _share.bal1155[addr1155] = _ooff;


    //Shares[operator] = _share;
  }

  function init(uint256 tokenAmt) public payable returns (uint256) {
    require(totalLiquidity==0,"DEX:init - already has liquidity");
    totalLiquidity = address(this).balance;
    //liquidity[msg.sender] = totalLiquidity;
    require(genx.transferFrom(msg.sender, address(this), tokenAmt));

    share storage _share = Shares[address(this)];
    _share.operartor = address(this);
    _share.balchain = address(this).balance;
    _share.balgendx = genx.balanceOf(address(this));
    //Shares[address(this)] = _share;

    return Shares[address(this)].balchain;
  }

    ///@notice to support receiving ETH by default
    receive() external payable {}
    fallback() external payable {}

//ERC1155 receiver implementation...
// do not need if importing ERC1155Holder

bool public dOnRcv= false;
bool public dOnBatchRcv = false;
bool public dAddShare = false;
address public dOp;
address public dFrom;
address public dMS;
address public d_MS;
    /**
     * @dev Handles the receipt of a single ERC1155 token type. This function is
     * called at the end of a `safeTransferFrom` after the balance has been updated.
     *
     * NOTE: To accept the transfer, this must return
     * `bytes4(keccak256("onERC1155Received(address,address,uint256,uint256,bytes)"))`
     * (i.e. 0xf23a6e61, or its own function selector).
     *
     * @param operator The address which initiated the transfer (i.e. msg.sender)
     * @param from The address which previously owned the token (token contract address??)
     * @param id The ID of the token being transferred
     * @param value The amount of tokens being transferred
     * @param data Additional data with no specified format
     * @return `bytes4(keccak256("onERC1155Received(address,address,uint256,uint256,bytes)"))` if transfer is allowed
     */
    function onERC1155Received(address operator, address from, uint256 id, uint256 value, bytes memory data) public override returns (bytes4) {
        dOnRcv = true;
        uint256[] memory ids = new uint256[](1);
        uint256[] memory vals = new uint256[](1);

        ids[0] = id;
        vals[0] = value;

        add1155Share(operator, from, ids, vals);
        return this.onERC1155Received.selector;
    }

    /**
     * @dev Handles the receipt of a multiple ERC1155 token types. This function
     * is called at the end of a `safeBatchTransferFrom` after the balances have
     * been updated.
     *
     * NOTE: To accept the transfer(s), this must return
     * `bytes4(keccak256("onERC1155BatchReceived(address,address,uint256[],uint256[],bytes)"))`
     * (i.e. 0xbc197c81, or its own function selector).
     *
     * @param operator The address which initiated the batch transfer (i.e. msg.sender)
     * @param from The address which previously owned the token
     * @param ids An array containing ids of each token being transferred (order and length must match values array)
     * @param values An array containing amounts of each token being transferred (order and length must match ids array)
     * @param data Additional data with no specified format
     * @return `bytes4(keccak256("onERC1155BatchReceived(address,address,uint256[],uint256[],bytes)"))` if transfer is allowed
     */
    function onERC1155BatchReceived(address operator, address from, uint256[] memory ids, uint256[] memory values, bytes memory data) public override returns (bytes4) {
        //TODO - call add share
        //empty = false;
        //for(uint i = 0; i < ids.length; ++i) {
        //    //increase max token if we see a bigger token
        //    if(i > Erc1155MaxTokenId){
        //        Erc1155MaxTokenId = i;
        //    }
       // }
       dOnBatchRcv = true;
        add1155Share(operator, from, ids, values);
        return this.onERC1155BatchReceived.selector;
    }

}