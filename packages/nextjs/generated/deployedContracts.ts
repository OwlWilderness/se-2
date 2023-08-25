const contracts = {
  31337: [
    {
      chainId: "31337",
      name: "localhost",
      contracts: {
        GnosticKey: {
          address: "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707",
          abi: [
            {
              inputs: [
                {
                  internalType: "address",
                  name: "Address",
                  type: "address",
                },
              ],
              stateMutability: "nonpayable",
              type: "constructor",
            },
            {
              inputs: [],
              name: "IgSVG",
              outputs: [
                {
                  internalType: "contract IGnosticSVG",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
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
                  internalType: "string",
                  name: "Key",
                  type: "string",
                },
                {
                  internalType: "string[]",
                  name: "SvgStrngs",
                  type: "string[]",
                },
              ],
              name: "xCreateKeyWithSVG",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "xName",
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
              name: "xRenderSizedSvgByAddrKey",
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
              name: "xSymbol",
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
          ],
        },
        GnosticSvg: {
          address: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
          abi: [
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "_address",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "string",
                  name: "_key",
                  type: "string",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "_arraylen",
                  type: "uint256",
                },
              ],
              name: "KeyCreated",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "_address",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "string",
                  name: "_key",
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
                  indexed: true,
                  internalType: "address",
                  name: "_address",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "string",
                  name: "_key",
                  type: "string",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "_slot",
                  type: "uint256",
                },
              ],
              name: "KeySlotUpdated",
              type: "event",
            },
            {
              inputs: [
                {
                  internalType: "string",
                  name: "Key",
                  type: "string",
                },
                {
                  internalType: "string[]",
                  name: "SvgStrngs",
                  type: "string[]",
                },
              ],
              name: "CreateKeyWithSVG",
              outputs: [],
              stateMutability: "nonpayable",
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
              name: "GetSvgInKeySlot",
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
                  internalType: "string",
                  name: "Key",
                  type: "string",
                },
              ],
              name: "LockKey",
              outputs: [],
              stateMutability: "nonpayable",
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
              name: "RenderSizedSvgByAddrKey",
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
              name: "RenderSvgByAddrKey",
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
                  internalType: "string",
                  name: "Key",
                  type: "string",
                },
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
          ],
        },
      },
    },
  ],
} as const;

export default contracts;
