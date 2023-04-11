pragma solidity >=0.8.0 <0.9.0;
// SPDX-License-Identifier: GPL-3.0-or-later
//https://github.com/OwlWilderness/scaffold-eth-challenges/tree/challenge-5-dex/packages/hardhat/contracts
//https://aaronbloomfield.github.io/ccc/hws/dex/IERC20Receiver.sol.html

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

import "@openzeppelin/contracts/access/Ownable.sol";

contract dGenX is Ownable, ERC20 {


  address dgdx;

  constructor() ERC20("dGenX", "dGX") {
      // **You can update the msg.sender address with your 
      // front-end address to mint yourself tokens.
      //_mint(0xA4dffeC47a729fcAC4cFB237640293DFD112F123, 1000 ether);
      //_mint(0x1A4c2B35c9B4CC9F9A833A43dBe3A78FDB80Bb54, 1000 ether);
      // This mints to the deployer
      //_mint(msg.sender, 1000 ether);
  }

  function init(address _dgdx) public onlyOwner {
    require(dgdx == address(0));
    require(_dgdx > address(0));
    dgdx = _dgdx;
    _mint(dgdx, 1000 ether);
  }

  function MintToDGDX() public payable {
    require(dgdx > address(0),"please initialize with reciever contract");
    require(msg.value > 0, "payable value must be > 0");
    (bool success, bytes memory result) = dgdx.call{value: msg.value}("");
    if(!success) revert("transfer to dgdx failed");
    //mint dgdx tokens to dgdx
    _mint(msg.sender, msg.value);
  }

  function _afterTokenTransfer(address from, address to, uint256 amount) internal override {
    if ( to.code.length > 0  && from != address(0) && to != address(0) ) {
        // token recipient is a contract, notify them
        try IERC20Receiver(to).onERC20Received(from, amount, address(this)) returns (bool success) {
            require(success,"ERC-20 receipt rejected by destination of transfer");
        } catch {
            // the notification failed (maybe they don't implement the `IERC20Receiver` interface?)
            // we choose to ignore this case
        }
    }
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
    function onERC20Received(address from, uint amount, address erc20) external returns (bool);
}

/* to use this code, put the following in your ERC-20 implementation:

    function _afterTokenTransfer(address from, address to, uint256 amount) internal override {
        if ( to.code.length > 0  && from != address(0) && to != address(0) ) {
            // token recipient is a contract, notify them
            try IERC20Receiver(to).onERC20Received(from, amount, address(this)) returns (bool success) {
                require(success,"ERC-20 receipt rejected by destination of transfer");
            } catch {
                // the notification failed (maybe they don't implement the `IERC20Receiver` interface?)
                // we choose to ignore this case
            }
        }
    }

*/