export const abi = [
    {
        stateMutability: "view",
        type: "function",
        name: "get_length",
        inputs: [],
        outputs: [
            {
                name: "",
                type: "uint256",
            },
        ],
    },
    {
        stateMutability: "nonpayable",
        type: "function",
        name: "set_name",
        inputs: [
            {
                name: "name",
                type: "string",
            },
        ],
        outputs: [],
    },
    {
        stateMutability: "view",
        type: "function",
        name: "get_funders",
        inputs: [],
        outputs: [
            {
                name: "",
                type: "tuple[]",
                components: [
                    {
                        name: "addy",
                        type: "address",
                    },
                    {
                        name: "amount",
                        type: "uint256",
                    },
                ],
            },
        ],
    },
    {
        stateMutability: "payable",
        type: "function",
        name: "fund",
        inputs: [],
        outputs: [],
    },
    {
        stateMutability: "payable",
        type: "fallback",
    },
    {
        stateMutability: "view",
        type: "function",
        name: "funders",
        inputs: [
            {
                name: "arg0",
                type: "uint256",
            },
        ],
        outputs: [
            {
                name: "",
                type: "tuple",
                components: [
                    {
                        name: "addy",
                        type: "address",
                    },
                    {
                        name: "amount",
                        type: "uint256",
                    },
                ],
            },
        ],
    },
    {
        stateMutability: "view",
        type: "function",
        name: "names",
        inputs: [
            {
                name: "arg0",
                type: "address",
            },
        ],
        outputs: [
            {
                name: "",
                type: "string",
            },
        ],
    },
    {
        stateMutability: "nonpayable",
        type: "constructor",
        inputs: [],
        outputs: [],
    },
];

export const contracts = {
    ethereumSepolia: "0xE29BEFE24Be6374b8Bb6b1fCEF6993ABB1cFAf4A",
    optimismSepolia: "0x01125C536Ab4004EcCB3388137544adcAAba63f9",
    polygonAmoy: "0xE29BEFE24Be6374b8Bb6b1fCEF6993ABB1cFAf4A",
    arbitrumSepolia: "0xAC9ED7B0C8cEB775d06F906831d873ffdD03408c",
    baseSepolia: "0x65E7A85f9af73142b1C52e397ded363633EBf677",
    avalancheFuji: "0xca5C1Da12af310fDC1cFDcd3d4E16Db378028070",
};
