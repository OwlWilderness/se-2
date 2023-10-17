const contracts = {
  10200: [
    {
      chainId: "10200",
      name: "chiado",
      contracts: {
        YourContract: {
          address: "0xa3Cc628e53d58CAf8AeA23f798686e240A27EE7a",
          abi: [
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_owner",
                  type: "address",
                },
              ],
              stateMutability: "nonpayable",
              type: "constructor",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "greetingSetter",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "string",
                  name: "newGreeting",
                  type: "string",
                },
                {
                  indexed: false,
                  internalType: "bool",
                  name: "premium",
                  type: "bool",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "value",
                  type: "uint256",
                },
              ],
              name: "GreetingChange",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "address",
                  name: "sender",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "string",
                  name: "lockedKey",
                  type: "string",
                },
                {
                  indexed: false,
                  internalType: "string",
                  name: "newCurrentKey",
                  type: "string",
                },
              ],
              name: "KeyLocked",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "lastManaLock",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "newManalock",
                  type: "uint256",
                },
              ],
              name: "ManaLockUpdated",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "manaSender",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "address",
                  name: "manaReceiver",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "value",
                  type: "uint256",
                },
              ],
              name: "ManaSent",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "address",
                  name: "lastOwner",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "address",
                  name: "newOwner",
                  type: "address",
                },
              ],
              name: "OwnerSet",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "chainId",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "address",
                  name: "svgContract",
                  type: "address",
                },
              ],
              name: "SetSvgContract",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "string",
                  name: "key",
                  type: "string",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "slot",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "string",
                  name: "svgString",
                  type: "string",
                },
              ],
              name: "SetSvgInSlot",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "string",
                  name: "lastHeight",
                  type: "string",
                },
                {
                  indexed: false,
                  internalType: "string",
                  name: "newHeight",
                  type: "string",
                },
                {
                  indexed: false,
                  internalType: "string",
                  name: "lastWidth",
                  type: "string",
                },
                {
                  indexed: false,
                  internalType: "string",
                  name: "newWidth",
                  type: "string",
                },
              ],
              name: "SizeSet",
              type: "event",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              name: "ActiveKeyIndex",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "Address",
                  type: "address",
                },
              ],
              name: "GetCurSvgByAddr",
              outputs: [
                {
                  internalType: "string",
                  name: "",
                  type: "string",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "Address",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "Slot",
                  type: "uint256",
                },
              ],
              name: "GetCurSvgInSlot",
              outputs: [
                {
                  internalType: "string",
                  name: "",
                  type: "string",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_address",
                  type: "address",
                },
              ],
              name: "GetCurrentKey",
              outputs: [
                {
                  internalType: "string",
                  name: "",
                  type: "string",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_address",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "index",
                  type: "uint256",
                },
              ],
              name: "GetKey",
              outputs: [
                {
                  internalType: "string",
                  name: "",
                  type: "string",
                },
              ],
              stateMutability: "pure",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "Address",
                  type: "address",
                },
                {
                  internalType: "string",
                  name: "Key",
                  type: "string",
                },
              ],
              name: "GetSvgByAddrKey",
              outputs: [
                {
                  internalType: "string",
                  name: "",
                  type: "string",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "Address",
                  type: "address",
                },
                {
                  internalType: "string",
                  name: "Key",
                  type: "string",
                },
                {
                  internalType: "uint256",
                  name: "Slot",
                  type: "uint256",
                },
              ],
              name: "GetSvgByKeySlot",
              outputs: [
                {
                  internalType: "string",
                  name: "",
                  type: "string",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "LockCurrentKey",
              outputs: [],
              stateMutability: "payable",
              type: "function",
            },
            {
              inputs: [],
              name: "Name",
              outputs: [
                {
                  internalType: "string",
                  name: "",
                  type: "string",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "Address",
                  type: "address",
                },
              ],
              name: "RenderCurDefaultSvgByAddr",
              outputs: [
                {
                  internalType: "string",
                  name: "",
                  type: "string",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "Address",
                  type: "address",
                },
                {
                  internalType: "string",
                  name: "Width",
                  type: "string",
                },
                {
                  internalType: "string",
                  name: "Height",
                  type: "string",
                },
              ],
              name: "RenderCurSizedSvgByAddr",
              outputs: [
                {
                  internalType: "string",
                  name: "",
                  type: "string",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "Address",
                  type: "address",
                },
                {
                  internalType: "string",
                  name: "Key",
                  type: "string",
                },
              ],
              name: "RenderDefaultSvgByAddrKey",
              outputs: [
                {
                  internalType: "string",
                  name: "",
                  type: "string",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "Address",
                  type: "address",
                },
                {
                  internalType: "string",
                  name: "Key",
                  type: "string",
                },
                {
                  internalType: "string",
                  name: "Width",
                  type: "string",
                },
                {
                  internalType: "string",
                  name: "Height",
                  type: "string",
                },
              ],
              name: "RenderSvg",
              outputs: [
                {
                  internalType: "string",
                  name: "",
                  type: "string",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_address",
                  type: "address",
                },
              ],
              name: "SendMana",
              outputs: [],
              stateMutability: "payable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "string",
                  name: "newHeight",
                  type: "string",
                },
                {
                  internalType: "string",
                  name: "newWidth",
                  type: "string",
                },
              ],
              name: "SetDefaultSize",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "Slot",
                  type: "uint256",
                },
                {
                  internalType: "string",
                  name: "SvgStrng",
                  type: "string",
                },
              ],
              name: "SetSvgInKeySlot",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "Symbol",
              outputs: [
                {
                  internalType: "string",
                  name: "",
                  type: "string",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "NewOwnerAddr",
                  type: "address",
                },
              ],
              name: "UpdateOwner",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "NewContractAddr",
                  type: "address",
                },
              ],
              name: "UpdateSVGContract",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "defaultHeight",
              outputs: [
                {
                  internalType: "string",
                  name: "",
                  type: "string",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "defaultWidth",
              outputs: [
                {
                  internalType: "string",
                  name: "",
                  type: "string",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "greeting",
              outputs: [
                {
                  internalType: "string",
                  name: "",
                  type: "string",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "manalock",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "owner",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "premium",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "string",
                  name: "_newGreeting",
                  type: "string",
                },
              ],
              name: "setGreeting",
              outputs: [],
              stateMutability: "payable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "newManalock",
                  type: "uint256",
                },
              ],
              name: "setManaLock",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "totalCounter",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              name: "userGreetingCounter",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "withdraw",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              stateMutability: "payable",
              type: "receive",
            },
          ],
        },
      },
    },
  ],
} as const;

export default contracts;
