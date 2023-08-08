const contracts = {
  100: [
    {
      chainId: "100",
      name: "gnosis",
      contracts: {
        GnosticSvg: {
          address: "0x2FAE0D57A1bf86aA3112d33e059ca203a15ECc51",
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
  31337: [
    {
      chainId: "31337",
      name: "localhost",
      contracts: {
        GnosticSvg: {
          address: "0x610178dA211FEF7D417bC0e6FeD39F05609AD788",
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
