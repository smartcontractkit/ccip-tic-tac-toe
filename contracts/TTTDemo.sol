// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import {IRouterClient} from "cross-not-official/contracts/interfaces/IRouterClient.sol";
import {OwnerIsCreator} from "cross-not-official/contracts/OwnerIsCreator.sol";
import {Client} from "cross-not-official/contracts/libraries/Client.sol";
import {CCIPReceiver} from "cross-not-official/contracts/applications/CCIPReceiver.sol";
import {IERC20} from "cross-not-official/vendor/openzeppelin-solidity/v4.8.0/token/ERC20/IERC20.sol";

/**
 * THIS IS AN EXAMPLE CONTRACT THAT USES HARDCODED VALUES FOR CLARITY.
 * THIS IS AN EXAMPLE CONTRACT THAT USES UN-AUDITED CODE.
 * DO NOT USE THIS CODE IN PRODUCTION.
 */

/// @title - A simple messenger contract for sending/receiving string messages across chains.
/// Pay using native tokens (e.g, ETH in Ethereum)
contract TTTDemo is CCIPReceiver, OwnerIsCreator {
    // Custom errors to provide more descriptive revert messages.
    error NoMessageReceived(); // Used when trying to access a message but no messages have been received.
    error IndexOutOfBound(uint256 providedIndex, uint256 maxIndex); // Used when the provided index is out of bounds.
    error MessageIdNotExist(bytes32 messageId); // Used when the provided message ID does not exist.
    error NothingToWithdraw(); // Used when trying to withdraw Ether but there's nothing to withdraw.
    error FailedToWithdrawEth(address owner, address target, uint256 value); // Used when the withdrawal of Ether fails.

    struct GameSession {
        bytes32 sessionId;
        address player_1; // player who starts the game
        address player_2; // the other player in the game
        address winner; // winner of game
        address turn; // check who takes action in next step
        uint8[9] player1Status; // current status for player 1
        uint8[9] player2Status; // current status for player 2
    }
    mapping(bytes32 => GameSession) public gameSessions;
    bytes32[] public sessionIds;

    uint8[9] initialCombination = [0, 0, 0, 0, 0, 0, 0, 0, 0];

    function getPlayer1Status(bytes32 _sessionId) external view returns (uint8[9] memory){
        return gameSessions[_sessionId].player1Status;
    }
    function getPlayer2Status(bytes32 _sessionId) external view returns (uint8[9] memory){
        return gameSessions[_sessionId].player2Status;
    }

    // Event emitted when a message is sent to another chain.
    event MessageSent(
        bytes32 indexed messageId, // The unique ID of the message.
        uint64 indexed destinationChainSelector, // The chain selector of the destination chain.
        address receiver, // The address of the receiver on the destination chain.
        GameSession message, // The message being sent.
        uint256 fees // The fees paid for sending the message.
    );

    // Event emitted when a message is received from another chain.
    event MessageReceived(
        bytes32 indexed messageId, // The unique ID of the message.
        uint64 indexed sourceChainSelector, // The chain selector of the source chain.
        address sender, // The address of the sender from the source chain.
        GameSession message // The message that was received.
    );

    // Struct to hold details of a message.
    struct Message {
        uint64 sourceChainSelector; // The chain selector of the source chain.
        address sender; // The address of the sender.
        GameSession message; // The content of the message.
    }

    // Storage variables.
    bytes32[] public receivedMessages; // Array to keep track of the IDs of received messages.
    mapping(bytes32 => Message) public messageDetail; // Mapping from message ID to Message struct, storing details of each received message.
    address public _router;

    /// @notice Constructor initializes the contract with the router address.
    /// @param router The address of the router contract.
    constructor(address router) CCIPReceiver(router) {
    }

    function updateRouter(address routerAddr) external {
        _router = routerAddr;
    }

    function start(uint64 destinationChainSelector, address receiver) external {
        bytes32 uniqueId = keccak256(abi.encodePacked(block.timestamp, msg.sender));
        sessionIds.push(uniqueId);
        gameSessions[uniqueId]= GameSession(
            uniqueId,
            msg.sender,
            address(0),
            address(0),
            msg.sender,
            initialCombination,
            initialCombination
            );

        sendMessage(destinationChainSelector, receiver, gameSessions[uniqueId]);
    }

    function checkWin(uint8[9] memory playerStatus) public pure returns(bool _return){
        if(horizontalCheck(playerStatus) || verticalCheck(playerStatus) || diagonalCheck(playerStatus)) {
            return true;
        }

        return false;
    }

    /// @notice Sends data to receiver on the destination chain.
    /// @dev Assumes your contract has sufficient native asset (e.g, ETH on Ethereum, MATIC on Polygon...).
    /// @param destinationChainSelector The identifier (aka selector) for the destination blockchain.
    /// @param receiver The address of the recipient on the destination blockchain.
    /// @param message The string message to be sent.
    /// @return messageId The ID of the message that was sent.
    function sendMessage(
        uint64 destinationChainSelector,
        address receiver,
        GameSession memory message
    ) public returns (bytes32 messageId) {
        // Create an EVM2AnyMessage struct in memory with necessary information for sending a cross-chain message
        Client.EVM2AnyMessage memory evm2AnyMessage = Client.EVM2AnyMessage({
            receiver: abi.encode(receiver), // ABI-encoded receiver address
            data: abi.encode(message), // ABI-encoded string message
            tokenAmounts: new Client.EVMTokenAmount[](0), // Empty array indicating no tokens are being sent
            extraArgs: Client._argsToBytes(
                Client.EVMExtraArgsV1({gasLimit: 400_000, strict: false}) // Additional arguments, setting gas limit and non-strict sequency mode
            ),
            feeToken: address(0) // Setting feeToken to zero address, indicating native asset will be used for fees
        });

        // Initialize a router client instance to interact with cross-chain router
        IRouterClient router = IRouterClient(_router);

        // Get the fee required to send the message
        uint256 fees = router.getFee(destinationChainSelector, evm2AnyMessage);

        // Send the message through the router and store the returned message ID
        messageId = router.ccipSend{value: fees}(
            destinationChainSelector,
            evm2AnyMessage
        );

        // Emit an event with message details
        emit MessageSent(
            messageId,
            destinationChainSelector,
            receiver,
            message,
            fees
        );

        // Return the message ID
        return messageId;
    }

        // check if the position is taken then move
    function move(
        uint256 x, 
        uint256 y, 
        uint256 player, 
        bytes32 sessionId, 
        uint64 destinationChainSelector,
        address receiver) 
        public  
    {
        GameSession memory gs = gameSessions[sessionId];
        // make sure the game session setup and not over.
        require(gs.player_1 != address(0), "the session is not setup, please start game first!");
        require(gs.winner == address(0), "the game is over");
        
        // make sure the player is in the game session
        require(player == 1 || player == 2, "you must be player1 or player2"); //this is used to when player has the same address
        
        if(player == 1) {
            // make sure it is player1's turn to move
            require(gs.player_1 == msg.sender && gs.turn == msg.sender, "it is not your turn");
            
            // 1. if the position is not taken by the oppenent, then take the position
            if(gs.player1Status[x * 3 + y] == 0 && gs.player2Status[x * 3 + y] == 0) {
               gameSessions[sessionId].player1Status[x * 3 + y] = 1;
               
               // 2. check if player1 wins or make the turn to the opponent, send the message
               if(checkWin(gameSessions[sessionId].player1Status)) {
                   gameSessions[sessionId].winner = gameSessions[sessionId].player_1;
               } else {
                   gameSessions[sessionId].turn = gameSessions[sessionId].player_2;
               }
               sendMessage(destinationChainSelector, receiver, gameSessions[sessionId]);
            } else {
                revert("the position is occupied");
            }
        } else if(player == 2) {
            // make sure it is player2's turn to move, this is the first step for player2
            require((gs.player_2 == msg.sender && gs.turn == msg.sender) || gs.player_2 == address(0), "it is not your turn");

            if(gs.player_2 == address(0)) {
                gameSessions[sessionId].player_2 = msg.sender;
            }

            // 1. if the position is not taken by the oppenent, then take the position
            if(gs.player1Status[x * 3 + y] == 0 && gs.player2Status[x * 3 + y] == 0) {
               gameSessions[sessionId].player2Status[x * 3 + y] = 1; 

               // 2. check if player1 wins or make the turn to the oppenent, send the message
               if(checkWin(gameSessions[sessionId].player2Status)) {
                   gameSessions[sessionId].winner = gameSessions[sessionId].player_2;
               } else {
                   gameSessions[sessionId].turn = gameSessions[sessionId].player_1;
               }
               sendMessage(destinationChainSelector, receiver, gameSessions[sessionId]);
            } else {
                revert("the position is occupied");
            }
        }
    } 

    

    /// handle a received message
    function _ccipReceive(
        Client.Any2EVMMessage memory any2EvmMessage
    ) internal override {
        bytes32 messageId = any2EvmMessage.messageId; // fetch the messageId
        uint64 sourceChainSelector = any2EvmMessage.sourceChainSelector; // fetch the source chain identifier (aka selector)
        address sender = abi.decode(any2EvmMessage.sender, (address)); // abi-decoding of the sender address
        GameSession memory message = abi.decode(any2EvmMessage.data, (GameSession)); // abi-decoding of the sent string message
        receivedMessages.push(messageId);
        Message memory detail = Message(sourceChainSelector, sender, message);
        messageDetail[messageId] = detail;
        gameSessions[message.sessionId] = message;
        sessionIds.push(message.sessionId);

        emit MessageReceived(messageId, sourceChainSelector, sender, message);
    }

    /// @notice Get the total number of received messages.
    /// @return number The total number of received messages.
    function getNumberOfReceivedMessages()
        external
        view
        returns (uint256 number)
    {
        return receivedMessages.length;
    }

    /// @notice Fetches the details of the last received message.
    /// @dev Reverts if no messages have been received yet.
    /// @return messageId The ID of the last received message.
    /// @return sourceChainSelector The source chain identifier (aka selector) of the last received message.
    /// @return sender The address of the sender of the last received message.
    /// @return message The last received message.
    function getLastReceivedMessageDetails()
        external
        view
        returns (
            bytes32 messageId,
            uint64 sourceChainSelector,
            address sender,
            GameSession memory message
        )
    {
        // Revert if no messages have been received
        if (receivedMessages.length == 0) revert NoMessageReceived();

        // Fetch the last received message ID
        messageId = receivedMessages[receivedMessages.length - 1];

        // Fetch the details of the last received message
        Message memory detail = messageDetail[messageId];

        return (
            messageId,
            detail.sourceChainSelector,
            detail.sender,
            detail.message
        );
    }


    function horizontalCheck(uint8[9] memory playerStatus) private pure returns(bool horizontalValidation){
        if(playerStatus[0] == 1 && playerStatus[1] == 1 && playerStatus[2] == 1) {
            return true;
        }

        if(playerStatus[3] == 1 && playerStatus[4] == 1 && playerStatus[5] == 1) {
            return true;
        }

        if(playerStatus[6] == 1 && playerStatus[7] == 1 && playerStatus[8] == 1) {
            return true;
        }

        return false;
    }

    function verticalCheck(uint8[9] memory playerStatus) private pure returns(bool verticalValidation){
        if(playerStatus[0] == 1 && playerStatus[3] == 1 && playerStatus[6] == 1) {
            return true;
        }

        if(playerStatus[1] == 1 && playerStatus[4] == 1 && playerStatus[7] == 1) {
            return true;
        }

        if(playerStatus[2] == 1 && playerStatus[5] == 1 && playerStatus[8] == 1) {
            return true;
        }

        return false;
    }

    function diagonalCheck(uint8[9] memory playerStatus) private pure returns(bool diagonalValidation){
        if(playerStatus[0] == 1 && playerStatus[4] == 1 && playerStatus[8] == 1) {
            return true;
        }

        if(playerStatus[2] == 1 && playerStatus[4] == 1 && playerStatus[6] == 1) {
            return true;
        }

        return false;
    }

    /// @notice Fallback function to allow the contract to receive Ether.
    /// @dev This function has no function body, making it a default function for receiving Ether.
    /// It is automatically called when Ether is sent to the contract without any data.
    receive() external payable {}

    /// @notice Allows the contract owner to withdraw the entire balance of Ether from the contract.
    /// @dev This function reverts if there are no funds to withdraw or if the transfer fails.
    /// It should only be callable by the owner of the contract.
    /// @param beneficiary The address to which the Ether should be sent.
    function withdraw(address beneficiary) public onlyOwner {
        // Retrieve the balance of this contract
        uint256 amount = address(this).balance;

        // Revert if there is nothing to withdraw
        if (amount == 0) revert NothingToWithdraw();

        // Attempt to send the funds, capturing the success status and discarding any return data
        (bool sent, ) = beneficiary.call{value: amount}("");

        // Revert if the send failed, with information about the attempted transfer
        if (!sent) revert FailedToWithdrawEth(msg.sender, beneficiary, amount);
    }
}