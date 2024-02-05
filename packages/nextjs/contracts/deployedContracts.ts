/**
 * This file is autogenerated by Scaffold-ETH.
 * You should not edit it manually or your changes might be overwritten.
 */
import { GenericContractsDeclaration } from "~~/utils/scaffold-eth/contract";

const deployedContracts = {
  1: {
    ScribeCast: {
      address: "0x0B4cbCfDb14D4D162fb34850E65413E9C5fB530F",
      abi: [
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: "string",
              name: "action",
              type: "string",
            },
            {
              indexed: true,
              internalType: "address",
              name: "to",
              type: "address",
            },
            {
              indexed: true,
              internalType: "address",
              name: "from",
              type: "address",
            },
            {
              indexed: false,
              internalType: "bytes",
              name: "spell",
              type: "bytes",
            },
            {
              indexed: false,
              internalType: "bool",
              name: "success",
              type: "bool",
            },
          ],
          name: "result",
          type: "event",
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
              internalType: "address payable",
              name: "_to",
              type: "address",
            },
            {
              internalType: "bytes",
              name: "_spell",
              type: "bytes",
            },
          ],
          name: "cast",
          outputs: [],
          stateMutability: "payable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "_to",
              type: "address",
            },
            {
              internalType: "bytes",
              name: "_spell",
              type: "bytes",
            },
          ],
          name: "scribe",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
      ],
      inheritedFunctions: {},
    },
  },
  100: {
    ScribeCast: {
      address: "0x23Ad6acb5ceFdf05DA4240843943C5b359F2AB0E",
      abi: [
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: "string",
              name: "action",
              type: "string",
            },
            {
              indexed: true,
              internalType: "address",
              name: "to",
              type: "address",
            },
            {
              indexed: true,
              internalType: "address",
              name: "from",
              type: "address",
            },
            {
              indexed: false,
              internalType: "bytes",
              name: "spell",
              type: "bytes",
            },
            {
              indexed: false,
              internalType: "bool",
              name: "success",
              type: "bool",
            },
          ],
          name: "result",
          type: "event",
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
              internalType: "address payable",
              name: "_to",
              type: "address",
            },
            {
              internalType: "bytes",
              name: "_spell",
              type: "bytes",
            },
          ],
          name: "cast",
          outputs: [],
          stateMutability: "payable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "_to",
              type: "address",
            },
            {
              internalType: "bytes",
              name: "_spell",
              type: "bytes",
            },
          ],
          name: "scribe",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
      ],
      inheritedFunctions: {},
    },
  },
  10200: {
    ScribeCast: {
      address: "0xD53e01c57d6E34e3a1C24f58B4CC307D1265f0E9",
      abi: [
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: "string",
              name: "action",
              type: "string",
            },
            {
              indexed: true,
              internalType: "address",
              name: "to",
              type: "address",
            },
            {
              indexed: true,
              internalType: "address",
              name: "from",
              type: "address",
            },
            {
              indexed: false,
              internalType: "bytes",
              name: "spell",
              type: "bytes",
            },
            {
              indexed: false,
              internalType: "bool",
              name: "success",
              type: "bool",
            },
          ],
          name: "result",
          type: "event",
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
              internalType: "address payable",
              name: "_to",
              type: "address",
            },
            {
              internalType: "bytes",
              name: "_spell",
              type: "bytes",
            },
          ],
          name: "cast",
          outputs: [],
          stateMutability: "payable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "_to",
              type: "address",
            },
            {
              internalType: "bytes",
              name: "_spell",
              type: "bytes",
            },
          ],
          name: "scribe",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
      ],
      inheritedFunctions: {},
    },
  },
  31337: {
    ScribeCast: {
      address: "0x959922bE3CAee4b8Cd9a407cc3ac1C251C2007B1",
      abi: [
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: "string",
              name: "action",
              type: "string",
            },
            {
              indexed: true,
              internalType: "address",
              name: "to",
              type: "address",
            },
            {
              indexed: true,
              internalType: "address",
              name: "from",
              type: "address",
            },
            {
              indexed: false,
              internalType: "bytes",
              name: "spell",
              type: "bytes",
            },
            {
              indexed: false,
              internalType: "bool",
              name: "success",
              type: "bool",
            },
          ],
          name: "result",
          type: "event",
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
              internalType: "address payable",
              name: "_to",
              type: "address",
            },
            {
              internalType: "bytes",
              name: "_spell",
              type: "bytes",
            },
          ],
          name: "cast",
          outputs: [],
          stateMutability: "payable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "_to",
              type: "address",
            },
            {
              internalType: "bytes",
              name: "_spell",
              type: "bytes",
            },
          ],
          name: "scribe",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
      ],
      inheritedFunctions: {},
    },
  },
} as const;

export default deployedContracts satisfies GenericContractsDeclaration;
