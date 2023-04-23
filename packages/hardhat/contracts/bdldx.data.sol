//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

/*
///@title    BdldX_data 
///@author   quantumtekh.polygon
///@repo:    https://github.com/OwlWilderness/se-2/tree/bdld
*/

///imports...
///
    //Token
import "@openzeppelin/contracts/token/ERC1155/utils/ERC1155Holder.sol";
    //Access
import "@openzeppelin/contracts/access/Ownable.sol";

contract BdldX_data is Ownable, ERC1155Holder {

    ///enum
    enum ok {
        NOK,  // not ok
        OK  // ok
    }

    ///struct
    struct data {
        uint256 id;
        uint256 amt;
        address link;
    }

///public variables
//
    string public name = "BdldX Data";
    string public symbol = "BDLXD";

    uint256 public id;
    uint256 public amt;

    address public link;

    mapping(address => ok) public okAddress;
    mapping(uint256 => ok) public okId;
    mapping(uint256 => data) public BLD;

//CONSTRUCTOR
//
  constructor(address owner) {
    transferOwnership(owner);
  }

///CONTROLLERS
// 
    function SetAddrWL(address _address, ok _wl) public onlyOwner {
        (_address > address(0), "address shouldnt be nullish");
        okAddress[_address] = _wl;
    }

    function SetIdWL(uint256 _id, ok _wl) public onlyOwner {
        okId[_id] = _wl;
    }

    function SetBuidl(uint256 _id, uint256 _token, uint256 _amt, address _address) public onlyOwner {
        // todo validate againt WL
        BLD[_id] = data(_token, _amt, _address);
    }

    /**
     * Function that allows the contract to receive ETH
     */
    receive() external payable {}
}
