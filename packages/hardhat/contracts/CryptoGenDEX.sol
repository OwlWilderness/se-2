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
  uint256 public total1155Types = 0;
  uint256 public total20Types = 0;

  ///*
  //debug
  address public LastOperator;
  address public LastFrom;
  string  public LastAction = "Contract Created";
  address public LastMsgSender; //will be the erc1155 token address in the on recieve
  //address public LastMsgSender_; //
  //*/

  //events
  event AddShareEvent(address operator, address token, uint256[] ids, uint256[] vals);

  constructor(address token_addr, address togs_addr) {
    genx = IERC20(token_addr);
    togs = ERC1155(togs_addr);

  }

 //token info
  mapping (address => uint256) public maxTokenIds; //token address => (token id => token amount)
  mapping (address => uint256) public countForAddr; //token address => total count of tokens 

  //shares for an address 
  //a single address can have the following token allocations
  //-- 1 - chain token (erc20 - amount)  .balance 
  //-- 2 - genx token (erc20 - amount) .transfer
  //-- 3 - tog token (erc1155 - various amounts of multiple ids) .withdraw;
  ///    - - setting approval for erc1155 requires an approval of the entire collection

  struct share{
    address operator;  //address using the dex (could be this contract address)
    uint256 balchain;  //balance of chain token
    uint256 balgendx;  //balance of gendex token
    mapping(address => mapping(uint256 => uint256)) bal1155; //address of 1155 token => ooff:{1155 token id => Amount of Id}
    mapping(address => uint256) bal20; 
  }
  
  mapping(address => share) public Shares;

 function getShare(address adr) public view returns (share) {

  return Shares[adr];

 }

//called from on recieve 1155 token
  function add1155Share(address operator, address addr1155, uint256[] memory ids, uint256[] memory vals) internal {
   
    //ok to ovrewrite.  would evaluating then overwriting make a dif in gass?
    Shares[operator].operator = operator;

    //update 1155 token balances for this operator
    countOf1155Tokens = countOf1155Tokens + ids.length;

    //update 1155 token amounts
    for(uint i = 0; i < ids.length; ++i) {

      uint256 id = ids[i];

      //add ammount to shares
      uint256 amt = Shares[operator].bal1155[addr1155][id];
      Shares[operator].bal1155[addr1155][id] = amt + vals[i];

       //is this the max id for this token address?
       uint256 curmax = maxTokenIds[addr1155];
       if(id > curmax){
          maxTokenIds[addr1155] = id;
       }

      //count of this 1155 token
       uint256 cnt = countForAddr[addr1155];
      countForAddr[addr1155] = cnt + vals[i];

       //total count of 1155 tokens
      countOf1155Tokens = countOf1155Tokens + vals[i];

    }

    emit AddShareEvent(operator,addr1155,ids,vals);
  }

  function init(uint256 tokenAmt) public payable returns (uint256) {
    require(totalLiquidity==0,"DEX:init - already has liquidity");
    totalLiquidity = address(this).balance;

    require(genx.transferFrom(msg.sender, address(this), tokenAmt));

    Shares[address(this)].operator = address(this);
    Shares[address(this)].balchain = address(this).balance;
    Shares[address(this)].balgendx = genx.balanceOf(address(this));

    return Shares[address(this)].balchain;
  }

    ///@notice to support receiving ETH by default
    receive() external payable {}
    fallback() external payable {}

//ERC1155 receiver implementation...



    /**
     * @dev Handles the receipt of a single ERC1155 token type. This function is
     * called at the end of a `safeTransferFrom` after the balance has been updated.
     *
     * NOTE: To accept the transfer, this must return
     * `bytes4(keccak256("onERC1155Received(address,address,uint256,uint256,bytes)"))`
     * (i.e. 0xf23a6e61, or its own function selector).
     *
     * NOTE: items minted to this contract will increment the null address share 
     *
     * @param operator The address which initiated the transfer (i.e. msg.sender)
     * @param from The address which previously owned the token (token contract address??)
     * @param id The ID of the token being transferred
     * @param value The amount of tokens being transferred
     * @param data Additional data with no specified format
     * @return `bytes4(keccak256("onERC1155Received(address,address,uint256,uint256,bytes)"))` if transfer is allowed
     */
    function onERC1155Received(address operator, address from, uint256 id, uint256 value, bytes memory data) public override returns (bytes4) {

        ///*
          // debug
          LastOperator = operator;
          LastFrom = from;
          LastAction = "onERC1155Received";
          LastMsgSender = msg.sender;
          //      LastMsgSender_ = _msgSender();
        //*/
        uint256[] memory ids = new uint256[](1);
        uint256[] memory vals = new uint256[](1);

        ids[0] = id;
        vals[0] = value;

        add1155Share(operator, msg.sender, ids, vals);

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
     * NOTE: items minted to this contract will increment the null address share 
     *
     * @param operator The address which initiated the batch transfer (i.e. msg.sender)
     * @param from The address which previously owned the token
     * @param ids An array containing ids of each token being transferred (order and length must match values array)
     * @param values An array containing amounts of each token being transferred (order and length must match ids array)
     * @param data Additional data with no specified format
     * @return `bytes4(keccak256("onERC1155BatchReceived(address,address,uint256[],uint256[],bytes)"))` if transfer is allowed
     */
    function onERC1155BatchReceived(address operator, address from, uint256[] memory ids, uint256[] memory values, bytes memory data) public override returns (bytes4) {

        LastOperator = operator;
        LastFrom = from;
        LastAction = "onERC1155BatchReceived";
        LastMsgSender = msg.sender;

        add1155Share(operator, msg.sender, ids, values);
        return this.onERC1155BatchReceived.selector;
    }

}