pragma solidity >=0.8.0 <0.9.0;
// SPDX-License-Identifier: MIT

/*
///@title    dgenx token for use with togdex
///@author   quantumtekh.eth #buidlguidl
///          quantumtekh.polygon
///@repo:    https://github.com/OwlWilderness/se-2/tree/se2h
///@notice   token 
///@notice   source repos
///          https://github.com/scaffold-eth/scaffold-eth-examples/blob/signature-recover/packages/hardhat/contracts/YourContract.sol
*/

//some references
//https://github.com/OwlWilderness/scaffold-eth-challenges/tree/challenge-5-dex/packages/hardhat/contracts
//https://aaronbloomfield.github.io/ccc/hws/dex/IERC20Receiver.sol.html
///
///#001 - attempt at a commit-a-day or contract-a-day (may end up being commit-a-day contact-a-weel???) - anyway this is the first one
/// so much improvement (I didnt really test this in localhost except that it compiled and ran a bit)
/// figured I would smap mumbai :/
///
/// 713

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract dGenX is Ownable, ERC20 {

  address public fund; //address to fund during minting
  address dex; //address of the dex this token is associated with

  mapping(address => bytes32) private nkey;

  uint256 private nonce = 1;

  constructor() ERC20("dGenX", "dGX") {
    fund = address(this);
    dex = fund;

  }
  function changeFund(address _newFund) public onlyOwner {
    require(_newFund > address(0),"fund cannot be null");
    fund = _newFund;
  }
  function MintToFund() public payable {
    require(fund > address(0),"please initialize address to fund");
    require(msg.value > 0, "payable value must be > 0");
    (bool success, bytes memory result) = fund.call{value: msg.value}("");
    if(!success) revert("transfer to fund failed");
    nonce = nonce + 1;
    nkey[msg.sender] = getHash(msg.sender,nonce);
    
    _mint(msg.sender, msg.value);
  }

  function validate(address from, bytes32 hash) public view returns(bool){
    return nkey[from] == hash;
  }

  function _afterTokenTransfer(address from, address to, uint256 amount) internal override {
    if ( to.code.length > 0  && from != address(0) && to == dex ) {
        // token recipient is a contract, notify them
        try IERC20Receiver(to).onERC20Received(from, amount, address(this), nkey[from]) returns (bool success) {
            require(success,"ERC-20 receipt rejected by destination of transfer");
        } catch {
            // the notification failed (maybe they don't implement the `IERC20Receiver` interface?)
            // we choose to ignore this case
        }
    }
  }
      ///@notice to support receiving ETH by default
    receive() external payable {}
    fallback() external payable {}

    function getHash(address sender, uint256 _nonce) public view returns (bytes32) {
        bytes memory inputBytes = abi.encodePacked(sender, _nonce, block.timestamp);
        bytes32 hash = keccak256(inputBytes);
        return hash;
    }

    function withdraw(uint256 amount) external onlyOwner {
        address payable recipient = payable(owner());
        (bool success, ) = recipient.call{value: amount}("");
        require(success, "Withdrawal failed");
    }
}



//REBORN POLYGON TOKEN (RPT)


/**
 * @title ERC20 token receiver interface
 * @dev Interface for any contract that wants to support safeTransfers
 * from ERC20 asset contracts.  Based on the IERC721Receiver code.
 */
interface IERC20Receiver {
    /**
     * @dev Whenever an {IERC20} amount is transferred to this contract from `from`, this function is called.
     *
     * It must return true to confirm the token transfer.
     * If false is returned the transfer will be reverted.
     *
     * The selector can be obtained in Solidity with `IERC20Receiver.onERC20Received.selector`.
     */
    function onERC20Received(address from, uint amount, address erc20, bytes32 data) external returns (bool);
}