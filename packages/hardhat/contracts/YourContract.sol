//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

// Useful for debugging. Remove when deploying to a live network.
import "hardhat/console.sol";

// Use openzeppelin to inherit battle-tested implementations (ERC20, ERC721, etc)
// import "@openzeppelin/contracts/access/Ownable.sol";

 interface IGnosticSVG {
	
	function Name() external view returns(string memory);
	function Symbol() external view returns(string memory);

	function RenderSizedSvgByAddrKey(address Address, string memory Key, string memory Width, string memory Height) external view returns (string memory);
	
	function CreateKeyWithSVG(string memory Key, string[] memory SvgStrngs) external; 
	
	function SetSvgInKeySlot(string memory Key, uint Slot, string memory SvgStrng) external;

	function LockKey(string memory Key) external;
	
	function GetSvgInKeySlot(address Address, string memory Key, uint Slot) external view returns (string memory);
	
	function GetSvgByAddrKey(address Address, string memory Key) external view returns (string memory);

 }
 
/**
 * A smart contract that allows changing a state variable of the contract and tracking the changes
 * It also allows the owner to withdraw the Ether in the contract
 * @author BuidlGuidl
 */
contract YourContract {
	string public Name = "SE-2 YourContract";
	string public Symbol = "SE2YC";

	address xSVG = 0x2FAE0D57A1bf86aA3112d33e059ca203a15ECc51; //gnosis chain 100
	address cSVG = 0x3DF124687fEae0d833249cF9A50aB9aE52055520; //chiado chain 10200

	// State Variables
	address public immutable owner;
	string public greeting = "Hello Universe";
	bool public premium = false;
	uint256 public totalCounter = 0;
	uint public manalock = .00236979 ether;

	string public defaultWidth  = "400"; 
	string public defaultHeight  = "400"; 

	mapping(address => uint) public userGreetingCounter;
	mapping(address => uint) public ActiveKeyIndex;
	address gSVG;
	IGnosticSVG IgSVG;
	string CHIAN_NOT_SUPPORTED = "Chain not supported. Supported Chains: Gnosis, Chiado";
	string MANALOCK_NOT_MET = "Please send manalock amout to lock key.";
	//string CREATE_SVG_FAILED = "Failed to create SVG KEY";

	// Events: a way to emit log statements from smart contract that can be listened to by external parties
	event GreetingChange(
		address indexed greetingSetter,
		string newGreeting,
		bool premium,
		uint256 value
	);

	event ManaSent(
		address indexed manaSender,
		address manaReceiver,
		uint256 value
	);

	event SetSvgContract(uint chainId, address svgContract);
	event SetSvgInSlot(string key, uint slot, string svgString);
	event KeyLocked(address sender, string lockedKey, string newCurrentKey);
	event ManaLockUpdated(uint lastManaLock, uint newManalock);
	event OwnerSet(address lastOwner, address newOwner);
	event SizeSet(string lastHeight, string newHeight, string lastWidth, string newWidth);

	// Constructor: Called once on contract deployment
	// Check packages/hardhat/deploy/00_deploy_your_contract.ts
	constructor(address _owner) {
		owner = _owner;
		initSVG();
		emit OwnerSet(address(0), owner);
	}

	// Modifier: used to define a set of rules that must be met before or after a function is executed
	// Check the withdraw() function
	modifier isOwner() {
		// msg.sender: predefined variable that represents address of the account that called the current function
		require(msg.sender == owner, "Not the Owner");
		_;
	}

	function initSVG() private {
		if (block.chainid == 100) {
			gSVG = xSVG; //gnosis chain
		} else if (block.chainid == 10200) {
			gSVG = cSVG; //chiado
		} else {
			revert(CHIAN_NOT_SUPPORTED);
		}
		IgSVG = IGnosticSVG(gSVG);

		emit SetSvgContract(block.chainid, gSVG);
	}


	function GetCurSvgInSlot(address Address, uint Slot) public view returns (string memory){
		return IgSVG.GetSvgInKeySlot(Address, GetCurrentKey(Address), Slot);
	}
	
	function GetCurSvgByAddr(address Address) public view returns (string memory){
		return IgSVG.GetSvgByAddrKey(Address, GetCurrentKey(Address));
	}
	
	function GetSvgByAddrKey(address Address, string memory Key) public view returns (string memory){
		return IgSVG.GetSvgByAddrKey(Address, Key);
	}

	function GetSvgByKeySlot(address Address, string memory Key, uint Slot) public view returns (string memory){
		return IgSVG.GetSvgInKeySlot(Address, Key, Slot);
	}

	function RenderCurSizedSvgByAddr(address Address, string memory Width, string memory Height) public view returns (string memory)	{
		return RenderSvg(Address, GetCurrentKey(Address), Width, Height);
	}

	function RenderCurDefaultSvgByAddr(address Address) public view returns (string memory)	{
		return RenderSvg(Address, GetCurrentKey(Address), defaultWidth, defaultHeight);
	}

	function RenderSvg(address Address, string memory Key, string memory Width, string memory Height) public view returns (string memory) {
		return IgSVG.RenderSizedSvgByAddrKey(Address, Key, Width, Height);
	}

	function RenderDefaultSvgByAddrKey(address Address, string memory Key) public view returns (string memory) {
		return RenderSvg(Address, Key, defaultWidth, defaultHeight);
	}

	function GetCurrentKey(address _address) public view returns (string memory) {
		uint idx = ActiveKeyIndex[_address];
		bytes32 kek = keccak256(abi.encodePacked(_address, idx));
		return toString(kek);
	}
	
	function GetKey(address _address, uint index) public pure returns (string memory) {
		bytes32 kek = keccak256(abi.encodePacked(_address, index));
		return toString(kek);
	}

	function SetSvgInKeySlot(uint Slot, string memory SvgStrng) public {
		string memory kek = GetCurrentKey(msg.sender);
		IgSVG.SetSvgInKeySlot(kek, Slot, SvgStrng);
		emit SetSvgInSlot(kek, Slot, SvgStrng);
	}

	function _lockKey() internal {
		string memory kek = GetCurrentKey(msg.sender);
		IgSVG.LockKey(kek);
		ActiveKeyIndex[msg.sender] += 1;
		string memory kek2 = GetCurrentKey(msg.sender);
		emit KeyLocked(msg.sender, kek, kek2);
	}

	function LockCurrentKey() public payable {
		if(msg.value < manalock){
			revert(MANALOCK_NOT_MET);	
		}
		_lockKey();
	}


	function SendMana(address _address) public payable {
		(bool success, ) = _address.call{ value: msg.value }("");

		if(!success){
			revert("Failed to send Ether");
		}

		SetSvgInKeySlot(0,string(abi.encodePacked('<text x="20" y="20">',toString(msg.value),'</text>')));
		SetSvgInKeySlot(1,string(abi.encodePacked('<text x="20" y="40">',toString(_address),'</text>')));
		_lockKey();

		emit ManaSent(msg.sender, _address, msg.value);
	}

	function setManaLock(uint newManalock) public isOwner {
		uint last = manalock;
		manalock = newManalock;
		emit ManaLockUpdated(last, manalock);
	}

	function SetDefaultSize(string memory newHeight, string memory newWidth) public isOwner{
    	string memory lastH = defaultHeight;
		string memory lastW = defaultWidth;
		defaultHeight = newHeight;
		defaultWidth = newWidth;
    	emit SizeSet(lastH, newHeight, lastW,newWidth);
	}

	function UpdateSVGContract(address NewContractAddr) public isOwner {
		IgSVG = IGnosticSVG(NewContractAddr);
		emit SetSvgContract(block.chainid, NewContractAddr);
	}

	function UpdateOwner(address NewOwnerAddr) public isOwner {
		address last = gSVG;
		gSVG = NewOwnerAddr; 
		IgSVG = IGnosticSVG(gSVG);
		emit OwnerSet(last, gSVG);
	}
	/**
	 * Function that allows anyone to change the state variable "greeting" of the contract and increase the counters
	 *
	 * @param _newGreeting (string memory) - new greeting to save on the contract
	 */
	function setGreeting(string memory _newGreeting) public payable {
		// Print data to the hardhat chain console. Remove when deploying to a live network.
		console.log(
			"Setting new greeting '%s' from %s",
			_newGreeting,
			msg.sender
		);

		// Change state variables
		greeting = _newGreeting;
		totalCounter += 1;
		userGreetingCounter[msg.sender] += 1;

		// msg.value: built-in global variable that represents the amount of ether sent with the transaction
		if (msg.value > 0) {
			premium = true;
		} else {
			premium = false;
		}

		// emit: keyword used to trigger an event
		emit GreetingChange(msg.sender, _newGreeting, msg.value > 0, 0);
	}

	/**
	 * Function that allows the owner to withdraw all the Ether in the contract
	 * The function can only be called by the owner of the contract as defined by the isOwner modifier
	 */
	function withdraw() public isOwner {
		(bool success, ) = owner.call{ value: address(this).balance }("");
		require(success, "Failed to send Ether");
	}

	/**
	 * Function that allows the contract to receive ETH
	 */
	receive() external payable {}

	function toString(address account) internal pure returns(string memory) {
		return toString(abi.encodePacked(account));
	}

	function toString(uint256 value) internal pure returns(string memory) {
		return toString(abi.encodePacked(value));
	}

	function toString(bytes32 value) internal pure returns(string memory) {
		return toString(abi.encodePacked(value));
	}

	function toString(bytes memory data) internal pure returns(string memory) {
		bytes memory alphabet = "0123456789abcdef";

		bytes memory str = new bytes(2 + data.length * 2);
		str[0] = "0";
		str[1] = "x";
		for (uint i = 0; i < data.length; i++) {
			str[2+i*2] = alphabet[uint(uint8(data[i] >> 4))];
			str[3+i*2] = alphabet[uint(uint8(data[i] & 0x0f))];
		}
    	return string(str);
	}
}
