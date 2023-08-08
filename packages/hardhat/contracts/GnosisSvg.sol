	// SPDX-License-Identifier: MIT
	pragma solidity >=0.8.0 <0.9.0;

    import 'base64-sol/base64.sol';
	/*
	///@title    build svgs
	///@author   quantumtekh.polygon
	///@repo:    https://github.com/OwlWilderness/se-2/tree/gnostic-svg
	///@notice   functionality per address
	///@notice   - create and update and lock a group of svg strings identified by a key
	///@notice   - an address can only update strings mapped by same address
	///@notice   - base64 render of the svg image
	/// Can I create a new key? -> CreateKeyWithSVG (string) key, (uint) number of strings, (string[]) svg strings
	/// Can I update an existing? -> CreateKeyWithSVG -to update the entire key call Crate Key With SVG with the same key; 
	///                           -> SetSvgInKeySlot (string) key, (uint) slot, (string) svg string 
	/// Can I delete a key? - no - can be reset (overwritten) / re-created
	/// Can I lock a key? - yes
	/// What Happens If I lock a Key - no more edits or soup for this key
	/// Can I update another senders Keys/Svgs? no - uses msg.sender..
	/// What is a Slot? -> the position of the svg string in the array/sequence of svg strings  
	///
	*/

	contract GnosticSvg {

	////////////VARIABLES
	///// 
	string public Name = "Gnostic SVG";
	string public Symbol = "xSVG";

	string defaultSize = "423";
	uint locked = 1073; 
	string KEY_LOCKED = "no mods for you - key locked";

	////////////MAPPINGS
	/////
	mapping(address => mapping(string => mapping(uint => string)))  akis; //adr-key-id-svg    //address => (key => (id => svg-string))
	mapping(address => uint)                                 		akc;  //adr-key-count     //address => key-count
	mapping(address => mapping(uint => string))             		akik; //adr-keyid-key     //address => key-id => key
	mapping(address => mapping(string => uint))             		akki; //adr-key-keyid     //address => key => key-id
	mapping(address => mapping(string => uint))            		 	aksc; //adr-key-svg-count //address => key => svg-count
	mapping(address => mapping(string => uint))             		aklk; //adr-key-lock      //address => key => locked (== 1073)

	///////////EVENTS
	////// key locked
	event KeyLocked(address indexed _address, string _key);

	////// key created (or updated)
	event KeyCreated(address indexed _address, string _key, uint _arraylen);
	
	////// key slot updated 
	event KeySlotUpdated(address indexed _address, string _key, uint _slot);

	///////////PUBLIC 
	////// - controllers

	///////////////////////////////////////CREATE KEY WITH SVG
	//initialize svg strings
	function CreateKeyWithSVG(string memory Key, string[] memory SvgStrngs) public {
		resetsvgs(Key, SvgStrngs.length, SvgStrngs);   
	} 

	////////////////////////////////////////SET SVG IN KEY SLOT
	//set an svg for a specific key and slot for this sender
	function SetSvgInKeySlot(string memory Key, uint Slot, string memory SvgStrng) public {
		setsvg(Key, Slot, SvgStrng);  
	}

	////////////////////////////////////////LOCK KEY (PUBLIC)
	//lock a key from future edits 
	function LockKey(string memory Key) public {
		lockkey(Key);  
	}

	////// - views
	////////////////////////////////////////GET SVG IN KEY SLOT
	//returns svg string in in a specific slot for address
	function GetSvgInKeySlot(address Address, string memory Key, uint Slot) public view returns (string memory) {
		return akis[Address][Key][Slot];
	}

	////////////////////////////////////////GET SVG BY ADDR KEY
	//returns the svg for specfied address and key
	function GetSvgByAddrKey(address Address, string memory Key) public view returns (string memory) {
		uint svgcount = aksc[Address][Key]; //adr-key-svg-count //address => key => svg-count  
		string memory svgstr;

		for(uint i=1; i <= svgcount; ++i){
			svgstr = string(abi.encodePacked(svgstr, akis[Address][Key][i]));  //adr-key-id-svg    //address => (key => (id => svg-string))
		}

		return svgstr;
	}

	////////////////////////////////////////RENDER SIZED SVG BY ADDR KEY
	//renders the base64 encoded image string for the svg of a specific address and key and allows the size to be set
	function RenderSizedSvgByAddrKey(address Address, string memory Key, string memory Width, string memory Height)  public view returns (string memory) {
        string memory svg = string(abi.encodePacked(
            '<svg width="',Width,'" Height="',Height,'" xmlns="http://www.w3.org/2000/svg">',
                GetSvgByAddrKey(Address, Key),
            '</svg>'
        ));	
		
		string memory image = Base64.encode(bytes(svg));
        return string(abi.encodePacked("data:image/svg+xml;base64,",image));
	}

	////////////////////////////////////////RENDER SVG BY ADDR KEY (default)
	//render the base64 encoded image of the svg string at a specfic address and key with the default height and width
    function RenderSvgByAddrKey(address Address, string memory Key)  public view returns (string memory) {
        return RenderSizedSvgByAddrKey(Address, Key, defaultSize, defaultSize); 
    }

	///////////INTERNAL 
	////// - controllers
	
	//////////////////////////////////////////SET SVG
	//set svg in key slot for this sender
	function setsvg(string memory key, uint slot, string memory svg) internal onlyUnlocked(key) keymaint(key) slotmaint(key, slot) {
		akis[msg.sender][key][slot] = svg;   //adr-key-id-svg    //address => (key => (id => svg-string))
		emit KeySlotUpdated(msg.sender, key, slot);
	}

	/////////////////////////////////////////RESET SVG
	//reset svg strings for key
	function resetsvgs(string memory key, uint svglen, string[] memory svgs) internal onlyUnlocked(key) keymaint(key) slotmaint(key, svglen) {
		for(uint i=1; i <= svglen; ++i){
			if(i <= svglen){
				akis[msg.sender][key][i] = svgs[i-1]; //adr-key-id-svg    //address => (key => (id => svg-string))
			} else {
				//clear any slots > Svgs length
				akis[msg.sender][key][i] = "";
			}
		}
		emit KeyCreated(msg.sender, key, svglen);  
	}

	//////////////////////////////////////////LOCK KEY
	//lock key from future edits
	function lockkey(string memory key) internal onlyUnlocked(key) keymaint(key){
		aklk[msg.sender][key] = locked; //address => key => locked (== 1073)
		emit KeyLocked(msg.sender, key);
	}

	///////MODIFIERS
	////

	///////////////////////////////////////ONLY UNLOCKED
	//revert if this key for this sender is locked 
	modifier onlyUnlocked(string memory key) {
		if(aklk[msg.sender][key] == locked){ //address => key => locked (== 1073)
			revert(KEY_LOCKED);              //revert if locked
		}
		_;
	}

	///////////////////////////////////////SLOT MAINT
	//manage slot mappings (number of svg strings)
	modifier slotmaint(string memory key, uint slot) {
		//set svg string count for this key
		uint count = aksc[msg.sender][key];
		if(slot > count){
			aksc[msg.sender][key] = slot;
		}
		_;
	}

	///////////////////////////////////////KEY MAINT
	//update key mappings if this is a new key or address 
	//**not sure if this can be done in a modifier
	modifier keymaint(string memory key) {

		//does this sender have any keys?
		uint kc = akc[msg.sender];        //adr-key-count     //address => key-count

		//does this key exist for this sender?
		uint kid = akki[msg.sender][key]; //adr-key-keyid     //address => key => key-id

		//if the key does not exist OR the sender does not have any keys (whould that ever be the case?)
		if(kid == 0 || kc == 0){
			//increment the key count for the sender and set to the next key id        
			kid = ++kc;
			akc[msg.sender] = kid; 

			//update mappings: (KeyId => Key) && (key = > KeyId)
			akik[msg.sender][kid] = key; //adr-keyid-key     //address => key-id => key
 			akki[msg.sender][key] = kid; 
		}
		_;
	}

}