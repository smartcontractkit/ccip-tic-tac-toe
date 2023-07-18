//ETH contract variables
export const abi = [
	{
		"inputs": [],
		"name": "acceptOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"components": [
					{
						"internalType": "bytes32",
						"name": "messageId",
						"type": "bytes32"
					},
					{
						"internalType": "uint64",
						"name": "sourceChainSelector",
						"type": "uint64"
					},
					{
						"internalType": "bytes",
						"name": "sender",
						"type": "bytes"
					},
					{
						"internalType": "bytes",
						"name": "data",
						"type": "bytes"
					},
					{
						"components": [
							{
								"internalType": "address",
								"name": "token",
								"type": "address"
							},
							{
								"internalType": "uint256",
								"name": "amount",
								"type": "uint256"
							}
						],
						"internalType": "struct Client.EVMTokenAmount[]",
						"name": "destTokenAmounts",
						"type": "tuple[]"
					}
				],
				"internalType": "struct Client.Any2EVMMessage",
				"name": "message",
				"type": "tuple"
			}
		],
		"name": "ccipReceive",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "router",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "target",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "FailedToWithdrawEth",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "providedIndex",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "maxIndex",
				"type": "uint256"
			}
		],
		"name": "IndexOutOfBound",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "router",
				"type": "address"
			}
		],
		"name": "InvalidRouter",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "messageId",
				"type": "bytes32"
			}
		],
		"name": "MessageIdNotExist",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "x",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "y",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "player",
				"type": "uint256"
			},
			{
				"internalType": "bytes32",
				"name": "sessionId",
				"type": "bytes32"
			},
			{
				"internalType": "uint64",
				"name": "destinationChainSelector",
				"type": "uint64"
			},
			{
				"internalType": "address",
				"name": "receiver",
				"type": "address"
			}
		],
		"name": "move",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "NoMessageReceived",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "NothingToWithdraw",
		"type": "error"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "messageId",
				"type": "bytes32"
			},
			{
				"indexed": true,
				"internalType": "uint64",
				"name": "sourceChainSelector",
				"type": "uint64"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "sender",
				"type": "address"
			},
			{
				"components": [
					{
						"internalType": "bytes32",
						"name": "sessionId",
						"type": "bytes32"
					},
					{
						"internalType": "address",
						"name": "player_1",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "player_2",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "winner",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "turn",
						"type": "address"
					},
					{
						"internalType": "uint8[9]",
						"name": "player1Status",
						"type": "uint8[9]"
					},
					{
						"internalType": "uint8[9]",
						"name": "player2Status",
						"type": "uint8[9]"
					}
				],
				"indexed": false,
				"internalType": "struct TTTDemo.GameSession",
				"name": "message",
				"type": "tuple"
			}
		],
		"name": "MessageReceived",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "messageId",
				"type": "bytes32"
			},
			{
				"indexed": true,
				"internalType": "uint64",
				"name": "destinationChainSelector",
				"type": "uint64"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "receiver",
				"type": "address"
			},
			{
				"components": [
					{
						"internalType": "bytes32",
						"name": "sessionId",
						"type": "bytes32"
					},
					{
						"internalType": "address",
						"name": "player_1",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "player_2",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "winner",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "turn",
						"type": "address"
					},
					{
						"internalType": "uint8[9]",
						"name": "player1Status",
						"type": "uint8[9]"
					},
					{
						"internalType": "uint8[9]",
						"name": "player2Status",
						"type": "uint8[9]"
					}
				],
				"indexed": false,
				"internalType": "struct TTTDemo.GameSession",
				"name": "message",
				"type": "tuple"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "fees",
				"type": "uint256"
			}
		],
		"name": "MessageSent",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			}
		],
		"name": "OwnershipTransferRequested",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint64",
				"name": "destinationChainSelector",
				"type": "uint64"
			},
			{
				"internalType": "address",
				"name": "receiver",
				"type": "address"
			},
			{
				"components": [
					{
						"internalType": "bytes32",
						"name": "sessionId",
						"type": "bytes32"
					},
					{
						"internalType": "address",
						"name": "player_1",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "player_2",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "winner",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "turn",
						"type": "address"
					},
					{
						"internalType": "uint8[9]",
						"name": "player1Status",
						"type": "uint8[9]"
					},
					{
						"internalType": "uint8[9]",
						"name": "player2Status",
						"type": "uint8[9]"
					}
				],
				"internalType": "struct TTTDemo.GameSession",
				"name": "message",
				"type": "tuple"
			}
		],
		"name": "sendMessage",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "messageId",
				"type": "bytes32"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint64",
				"name": "destinationChainSelector",
				"type": "uint64"
			},
			{
				"internalType": "address",
				"name": "receiver",
				"type": "address"
			}
		],
		"name": "start",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "proxyAddr",
				"type": "address"
			}
		],
		"name": "updateProxy",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "beneficiary",
				"type": "address"
			}
		],
		"name": "withdraw",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"stateMutability": "payable",
		"type": "receive"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "combination",
				"type": "bytes32"
			}
		],
		"name": "checkWin",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"name": "gameSessions",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "sessionId",
				"type": "bytes32"
			},
			{
				"internalType": "address",
				"name": "player_1",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "player_2",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "winner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "turn",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getActiveSessions",
		"outputs": [
			{
				"internalType": "bytes32[]",
				"name": "",
				"type": "bytes32[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "_sessionId",
				"type": "bytes32"
			}
		],
		"name": "getBoardStatus",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getLastReceivedMessageDetails",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "messageId",
				"type": "bytes32"
			},
			{
				"internalType": "uint64",
				"name": "sourceChainSelector",
				"type": "uint64"
			},
			{
				"internalType": "address",
				"name": "sender",
				"type": "address"
			},
			{
				"components": [
					{
						"internalType": "bytes32",
						"name": "sessionId",
						"type": "bytes32"
					},
					{
						"internalType": "address",
						"name": "player_1",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "player_2",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "winner",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "turn",
						"type": "address"
					},
					{
						"internalType": "uint8[9]",
						"name": "player1Status",
						"type": "uint8[9]"
					},
					{
						"internalType": "uint8[9]",
						"name": "player2Status",
						"type": "uint8[9]"
					}
				],
				"internalType": "struct TTTDemo.GameSession",
				"name": "message",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getNumberOfReceivedMessages",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "number",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "_sessionId",
				"type": "bytes32"
			}
		],
		"name": "getPlayer1Status",
		"outputs": [
			{
				"internalType": "uint8[9]",
				"name": "",
				"type": "uint8[9]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "_sessionId",
				"type": "bytes32"
			}
		],
		"name": "getPlayer2Status",
		"outputs": [
			{
				"internalType": "uint8[9]",
				"name": "",
				"type": "uint8[9]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getRouter",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"name": "messageDetail",
		"outputs": [
			{
				"internalType": "uint64",
				"name": "sourceChainSelector",
				"type": "uint64"
			},
			{
				"internalType": "address",
				"name": "sender",
				"type": "address"
			},
			{
				"components": [
					{
						"internalType": "bytes32",
						"name": "sessionId",
						"type": "bytes32"
					},
					{
						"internalType": "address",
						"name": "player_1",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "player_2",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "winner",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "turn",
						"type": "address"
					},
					{
						"internalType": "uint8[9]",
						"name": "player1Status",
						"type": "uint8[9]"
					},
					{
						"internalType": "uint8[9]",
						"name": "player2Status",
						"type": "uint8[9]"
					}
				],
				"internalType": "struct TTTDemo.GameSession",
				"name": "message",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "proxy",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "receivedMessages",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "sessionIds",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes4",
				"name": "interfaceId",
				"type": "bytes4"
			}
		],
		"name": "supportsInterface",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "pure",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"name": "wcs",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

export const contractAddress = {
	'fuji':'0xa3EDD04a7fd1333B6F5Aba8b3259B97231097172',
	'mumbai':'0x6bC458B5bDAF6B8c0cBbaD8f03be4E742196E397',
	'sepolia':'0x2f59dd06728e287588fca641c7a10a854d8280a5'}

export const chainSelectorMap = {
    'sepolia': "16015286601757825753",
    'goerli': "2664363617261496610",
    'fuji': "14767482510784806043",
	'mumbai': "12532609583862916517"
}

const supportedChainsList = [
    { id: 11155111, name: 'sepolia' },
    { id: 43113, name: 'fuji' },
    { id: 80001, name: 'mumbai' },
];

export const chainidMap = supportedChainsList.reduce((map, chain) => {
    map[chain.id] = chain.name;
    return map;
}, {});


export const getDestinationChainList = (chainId) => {
    let options = [];
    for(let i=0; i<supportedChainsList.length; i++){
        if(chainId != supportedChainsList[i].id){
            options.push({
                'label': supportedChainsList[i].name,
                'value': supportedChainsList[i].id
            });
        }
    }
    return options;
}


