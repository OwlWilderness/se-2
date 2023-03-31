pragma solidity >=0.8.0 <0.9.0;
// SPDX-License-Identifier: MIT
//https://github.com/OwlWilderness/scaffold-eth-challenges/tree/challenge-5-dex/packages/hardhat/contracts
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

import "@openzeppelin/contracts/access/Ownable.sol";

contract CryptoGenX is Ownable, ERC20 {
  constructor() ERC20("CryptoGenX", "CGX") {
      // **You can update the msg.sender address with your 
      // front-end address to mint yourself tokens.
      _mint(0xA4dffeC47a729fcAC4cFB237640293DFD112F123, 1000 ether);
      _mint(0x1A4c2B35c9B4CC9F9A833A43dBe3A78FDB80Bb54, 1000 ether);
      // This mints to the deployer
      _mint(msg.sender, 1000 ether);
  }

  function Mint() public onlyOwner {
    _mint(msg.sender, 1000 ether);
  }
}

//REBORN POLYGON TOKEN (RPT)