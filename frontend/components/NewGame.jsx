/**
 * NewGame React Component
 * This component allows a user to start or join a game of tic-tac-toe, by selecting 
 * the destination chain for the game, and the game session to join.
 * 
 * It makes use of the `useContext` hook to access the global app context,
 * and custom hooks `useAccount`, `useSigner`, and `useNetwork` for blockchain interaction.
 * 
 * State variables:
 * txHash - keeps track of the transaction hash
 * sessionIds - keeps track of the session ids
 *
 * Functions:
 * childToParent - receives value from child component and updates destination chain
 * setSession - sets the session id
 * getBoardStatus - retrieves the current status of the board
 * updateAvailableGameSessions - updates available game sessions
 * setBoardInterval - sets an interval to keep updating board status
 * start - starts a new game
 * setPlayerDetails - sets the details for the player
 * join - allows a player to join a game
 * 
 * This component renders a section for chain and session selection, 
 * two buttons for starting and joining a game, and a section for displaying messages.
 */

import React, { useContext } from "react";
import { AppContext } from "../pages";
import button from '@chainlink/design-system/button.module.css'
import { useAccount, useSigner, useNetwork } from "wagmi";
import { useState } from "react";
import {abi, contractAddress, chainSelectorMap, getDestinationChainList, chainidMap} from "./constants";
import { Contract } from "alchemy-sdk";
import {List} from './List'

function NewGame() {
    const { 
        setDisabledCell, playerChar, setPlayerChar, setPlayerNumber, setSessionId,
        destinationChain, setDestinationChain, text, setText, refreshBoard, 
        sessionId, intervalId, setIntervalId, resetBoard, disabledButton, setDisabledButton 
    } = useContext(AppContext);

    const { address, isDisconnected } = useAccount();
    const { data: signer } = useSigner();
    const [txHash, setTxHash] = useState();
    const { chain, chains } = useNetwork();
    const [sessionIds, setSessionIds] = useState();

    const childToParent = (value) => {
        setDestinationChain(value[0])
        updateAvailableGameSessions()
    }

    const setSession = (value) => {
        setSessionId(value[0].value)
    }

    React.useEffect(() => {
        setBoardInterval()
    }, [playerChar]);


    async function getBoardStatus() {
        try {
            if(sessionId){
                const TicTacToeContract = new Contract(contractAddress[chainidMap[chain.id]], abi, signer)
                const boardStatus = await TicTacToeContract.getBoardStatus(sessionId);
                refreshBoard(boardStatus)
                return boardStatus      
            } else {
                return
            }
        } catch (error) {
          console.error(`Error: ${error}`);
        }
      }
            

    const updateAvailableGameSessions = async() => {
        try{
            const destinationChainContract = new Contract(contractAddress[chainidMap[chain.id]], abi, signer)
            let sessionIds = await destinationChainContract.getActiveSessions();
            sessionIds = [...new Set(sessionIds)];
            let options = [];
            for(let i=0;i<sessionIds.length; i++){
                    options.push({
                        'label': sessionIds[i].slice(0,8),
                        'value': sessionIds[i]
                    })	
            }
            setSessionIds(options)
            setDisabledButton(false)    
        } catch (e) {
            console.log(e)
            return;
        }
    }

    const setBoardInterval = ()=>{
        if(intervalId) {
            clearInterval(intervalId)
        }
        let newGameInterval = setInterval(function() {
            getBoardStatus()
        }, 10000)
        setIntervalId(newGameInterval)
    }

    const start = async()=> {
        setDisabledButton(true)
        const TicTacToeContract = new Contract(contractAddress[chainidMap[chain.id]], abi, signer)
        setText("Starting the Game")
        try {
            const startGame = await TicTacToeContract.start(chainSelectorMap[destinationChain.label], contractAddress[destinationChain.label])
            setTxHash(startGame.hash);
            await startGame.wait();
            setText("Game Started, Waiting for the other player on " + destinationChain.label + " to join.")
            setSessionId("")
            setTxHash(null);      
            setDisabledButton(false)
            setPlayerChar('O')
            setPlayerNumber(1)
            setBoardInterval()
            resetBoard()
        } catch (e) {
            console.log(e);
            return;
          }
    }

    const setPlayerDetails = async() => {
        const TicTacToeContract = new Contract(contractAddress[chainidMap[chain.id]], abi, signer)
        let gameSession = await TicTacToeContract.gameSessions(sessionId)
        let zero_address='0x0000000000000000000000000000000000000000'

        if(address == gameSession['player_1']) {
            setPlayerNumber(1)
            setPlayerChar('O')
            if(gameSession['player_2'] == zero_address){
                setText("Rejoined as Player 1")
            }
        }
        else if(address == gameSession['player_2'] || gameSession['player_2']  == zero_address) {
            setPlayerNumber(2)
            setPlayerChar('X')
        } 
    }

    const join = async()=> {
        setText("Joining")
        setDisabledCell(false)
        setPlayerDetails()
        setText("Joined the game. Refreshing the board!")
    }

    return (
        <div className="card" style={{marginBottom:"10px",paddingBottom:"0px"}}>
            
            {chain? <List text="Select Destination chain to play with" options={getDestinationChainList(chain.id)} childToParent={childToParent}/>:  
                    <List options={getDestinationChainList(0)} childToParent={childToParent} />}
            {destinationChain? <List text="Select a session" options={sessionIds} childToParent={setSession}/>:""}
        <section style={{marginTop:"10px"}}>
            <button  className={button.primary} onClick={() =>  start()} disabled={disabledButton}>
                Start a New Game
            </button>
            <button  className={button.primary} onClick={() =>  join()} style={{marginLeft:"20px"}} disabled={disabledButton}>
                Join a Game
            </button>
        </section>
        <h3 style={{textAlign:"center",fontSize:"10px"}}>
          {text?text:""}
        </h3>
    </div>
    )
}

export default NewGame