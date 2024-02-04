//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

/**
 * Cast into call and event data or Scribe into event data.
 * @author quantumtekh.eth
 * source: https://github.com/OwlWilderness/se-2/tree/spellbook
 * forked from: scaffold https://github.com/OwlWilderness/se-2
 * uri: https://spellbook-psi.vercel.app 
 */

contract ScribeCast {
 	string public Name = "ScribeCast";
	string public Symbol = "SCRAISBTE";
	string private COULD_NOT_CAST = "failed to cast. verify payable _to.";
	string private CAST = "cast";
	string private SCRIBE = "scribe";

	//result of action (cast or scribe)
	event result(
		string action, 
		address indexed to,
		address indexed from,
		bytes spell,
		bool success
	);
	
	//cast a spell: project in call and event data
	function cast(address payable _to, bytes memory _spell) public payable{
		(bool success, ) = address(_to).call{ value: msg.value }(_spell);
		if(success == false){
			emit result(CAST, _to, msg.sender, _spell, false);
			revert(COULD_NOT_CAST);
		}
		emit result(CAST, _to, msg.sender, _spell, true);
	}
	
	//scribe a spell:  into event data
	function scribe(address _to, bytes memory _spell) public {
		emit result(SCRIBE, _to, msg.sender, _spell, true);
	}
}
