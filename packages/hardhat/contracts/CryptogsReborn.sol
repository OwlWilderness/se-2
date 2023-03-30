// SPDX-License-Identifier: MIT
//https://polygonscan.com/address/0xa3b9f81828f0e552648cd82eb1b217ccf38c7339#codegit 
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/access/AccessControlEnumerable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
//import "@chainlink/contracts/src/v0.8/VRFConsumerBase.sol";

contract CryptogsRebornGenesis is
    ERC1155,
    /*VRFConsumerBase,*/
    Ownable,
    AccessControlEnumerable,
    Pausable
{
    bytes32 public constant DEV = keccak256("DEV");

    uint256 public constant numPogTypes = 71;
    uint256 public constant pogsPerPack = 10;
    uint256 public constant maxTokenSupply = pogsPerPack * 2000;
    uint256 public numMinted;
    uint256 public packsAllowedPerAddress = 1;
    mapping(address => uint256) private packsMintedByAddress;

    bool public whitelistOnly = true;
    mapping(address => bool) whitelist;

    // Chainlink VRF
    bytes32 internal keyHash;
    uint256 internal fee;

    struct MintRequest {
        address to;
        uint256 amount;
    }

    mapping(bytes32 => MintRequest) private _vrfRequestIdToMintRequest;

    event PogsMinted(address indexed _to, bytes32 indexed _vrfRequestId, uint256 _amount);

    string public name = "Cryptogs Reborn Genesis";
    string public symbol = "TOGS";

    constructor(
        address[] memory _devs /*,
        address _vrfCoordinator,
        address _linkToken */
    )
        //VRFConsumerBase(_vrfCoordinator, _linkToken)
        ERC1155("https://cryptogs-genesis-metadata.vercel.app/api/{id}")
    {
        keyHash = 0xf86195cf7690c55907b2b611ebb7343a6f649bff128701cc542f0569e2c549da;
        fee = 0.0001 * 10**18; // 0.0001 LINK

        _grantRole(DEFAULT_ADMIN_ROLE, _devs[0] /* _msgSender()*/ );

        for (uint256 i = 0; i < _devs.length; i++) {
            _grantRole(DEV, _devs[i]);
        }

       
    }

    function whitelistMintPack() public whenNotPaused {
        require(whitelist[_msgSender()], "Address not whitelisted");
        require(
            packsMintedByAddress[_msgSender()] < packsAllowedPerAddress,
            "One pack per address"
        );
        _mintPogs(_msgSender(), pogsPerPack);
    }

    function publicMintPack() public whenNotPaused {
        require(!whitelistOnly, "Whitelist only");
        require(
            packsMintedByAddress[_msgSender()] < packsAllowedPerAddress,
            "One pack per address"
        );
        _mintPogs(_msgSender(), pogsPerPack);
    }

    function giftPacks(address _to, uint256 _numPacks) public onlyRole(DEV) {
        _mintPogs(_to, _numPacks * pogsPerPack);
    }

    function _mintPogs(address _to, uint256 _amount) internal {
        require(numMinted + _amount <= maxTokenSupply, "Sold out");

        //bytes32 requestId = _getRandomNumber();
        bytes32 prevHash = blockhash(block.number - 1);
        bytes32 hash = keccak256(abi.encodePacked(prevHash, address(this), numMinted));
        _vrfRequestIdToMintRequest[hash] = MintRequest(_to, _amount);

        numMinted += pogsPerPack;
        packsMintedByAddress[_msgSender()] += 1;

        fulfillRandomness(hash,uint256(hash));
    }

    function fulfillRandomness(bytes32 requestId, uint256 randomness)
        internal
        /*override*/
    {
        MintRequest memory request = _vrfRequestIdToMintRequest[requestId];

        uint256[] memory pogIds = new uint256[](request.amount);
        uint256[] memory amounts = new uint256[](request.amount);

        for (uint256 i = 0; i < request.amount; i++) {
            pogIds[i] = (uint256(keccak256(abi.encode(randomness, i))) % numPogTypes) + 1;
            amounts[i] = 1;
        }

        _mintBatch(request.to, pogIds, amounts, "");

        emit PogsMinted(request.to, requestId, request.amount);
    }

    function toggleWhitelist() external onlyRole(DEV) {
        whitelistOnly = !whitelistOnly;
    }

    function addToWhitelist(address[] calldata _addresses)
        external
        onlyRole(DEV)
    {
        for (uint256 i = 0; i < _addresses.length; i++) {
            whitelist[_addresses[i]] = true;
        }
    }

    function removeFromWhitelist(address[] calldata _addresses)
        external
        onlyRole(DEV)
    {
        for (uint256 i = 0; i < _addresses.length; i++) {
            whitelist[_addresses[i]] = false;
        }
    }

    function isWhitelisted(address _addr) external view returns (bool) {
        return whitelist[_addr];
    }

    function mintedMaxPacks(address _addr) external view returns (bool) {
        return packsMintedByAddress[_addr] >= packsAllowedPerAddress;
    }

    function setPacksAllowedPerAddress(uint256 _packsAllowedPerAddress)
        external
        onlyRole(DEV)
    {
        packsAllowedPerAddress = _packsAllowedPerAddress;
    }

    function setPaused(bool _state) external onlyRole(DEV) {
        _state ? _pause() : _unpause();
    }

    function setURI(string memory _newuri) external onlyRole(DEV) {
        _setURI(_newuri);
    }

   // function _getRandomNumber() private returns (bytes32 requestId) {
   //     require(LINK.balanceOf(address(this)) >= fee, "Not enough LINK");
   //     return requestRandomness(keyHash, fee);
   // }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override(ERC1155, AccessControlEnumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}