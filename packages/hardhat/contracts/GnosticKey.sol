//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

// Useful for debugging. Remove when deploying to a live network.
//import "hardhat/console.sol";

// Use openzeppelin to inherit battle-tested implementations (ERC20, ERC721, etc)
//import "@openzeppelin/contracts/access/Ownable.sol";

/// @title Gnostic Key 
/// @author QuantumTekh.eth
/// @notice 2023Aug24-

 
 interface IGnosticSVG {
	function Name() external view returns(string memory);
	function Symbol() external view returns(string memory);

	function RenderSizedSvgByAddrKey(address Address, string memory Key, string memory Width, string memory Height) external view returns (string memory);
	function CreateKeyWithSVG(string memory Key, string[] memory SvgStrngs) external; 
 }

contract GnosticKey{

	////////////VARIABLES
	///// 
	string public Name = "Gnostic KEY";
	string public Symbol = "xKEY";

	address xSVG = 0x69a1582EFf9507f7b4FE2796EfD98C4eB67aB2ac; //gnosis chain 100
	address cSVG = 0x3DF124687fEae0d833249cF9A50aB9aE52055520; //chiado chain 10200

	IGnosticSVG public IgSVG;

	string CHIAN_NOT_SUPPORTED = "Chain not supported. Supported Chains: Gnosis, Chiado";
	string CREATE_SVG_FAILED = "Failed to create SVG KEY";
	
	constructor(address Address){
			
		address addr = Address;
		
		if (block.chainid == 100) {
			addr = xSVG; //gnosis chain
		} else if (block.chainid == 10200) {
			addr = cSVG; //chiado
		} else if (block.chainid == 31337) {
			//hardhat supported
			//uses Address 
		} else {
			revert(CHIAN_NOT_SUPPORTED);
		}

		IgSVG = IGnosticSVG(addr);
	}


	function xName() external view returns(string memory){
		return IgSVG.Name();
	}
	
	function xSymbol() external view returns(string memory){
		return IgSVG.Symbol();
	}

	function xRenderSizedSvgByAddrKey(address Address, string memory Key, string memory Width, string memory Height) public view returns (string memory) {
	 	return IgSVG.RenderSizedSvgByAddrKey(Address, Key, Width, Height) ;
	
	}
	
	function xCreateKeyWithSVG(string memory Key, string[] memory SvgStrngs) public {
        IgSVG.CreateKeyWithSVG(Key, SvgStrngs); // msg.sender = GnosticKey address
	}

}
