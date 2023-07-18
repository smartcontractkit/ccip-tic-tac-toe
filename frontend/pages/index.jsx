// Home.js
// This component renders the Home page of the application.

// Import dependencies
import React, { useState , createContext, useEffect } from 'react';
import { Contract } from "alchemy-sdk";
import { useSigner, useNetwork } from "wagmi";

// Import styles and components
import styles from "../styles/Home.module.css";
import Board from '../components/Board'
import NewGame from '../components/NewGame'
import Header from '../components/Header'
import button from '@chainlink/design-system/button.module.css'
import '@chainlink/design-system/global-styles.css'

// Import constants
import {abi, contractAddress, chainSelectorMap, chainidMap} from "../components/constants";

// Create a Context for sharing state between components
export const AppContext = createContext();

// Home component
export default function Home() {

  // Define initial states using the useState hook
  // Provide functionality to handle viewport width changes
  // Include game state management and interaction with alchemy-sdk

  const emptyGame = [["", "", ""], ["", "", ""], ["", "", ""]] // empty board
  const [viewportWidth, setViewportWidth] = useState(0);


  useEffect(() => {
    // Set width on initial load
    setViewportWidth(window.innerWidth);

    // Listen for window resize and update width
    const handleResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);

    // Cleanup the listener on unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  // Constants for game characters
  const X = "X";
  const O = "O";

  // Game state variables
  const [cells, setCells] = useState(emptyGame); // Stores the current state of the game board
  const [currentChar, setCurrentChar] = useState(X); // Stores the current player's character (X starts first)
  const [winner, setWinner] = useState(""); // Stores the winner of the game
  const [gameOver, setGameOver] = useState(false); // Boolean to signify if the game is over
  const [disabledCell, setDisabledCell] = useState(true); // Boolean to disable cells when game is over

  // Network state variables
  const { chain, chains } = useNetwork(); // Network information from wagmi
  const { data: signer } = useSigner(); // Signer data from wagmi
  const [destinationChain, setDestinationChain] = useState(); // Stores the selected destination chain

  // Player state variables
  const [playerChar, setPlayerChar] = useState(); // Stores the character assigned to the player
  const [playerNumber, setPlayerNumber] = useState(); // Stores the number assigned to the player

  // Session state variables
  const [sessionId, setSessionId] = useState(); // Stores the current game session ID

  // UI state variables
  let [text, setText] = useState(""); // Stores text to display to user
  const [disabledButton, setDisabledButton] = useState(true); // Boolean to disable button
  const [intervalId, setIntervalId] = useState(); // Stores the interval ID for setting and clearing intervals

  // move function
  const move = async(row, column) => {
    // Interacts with the smart contract deployed on the chain to record a move
    if(sessionId){
      const TicTacToeContract = new Contract(contractAddress[chainidMap[chain.id]], abi, signer)
      try {
        const move = await TicTacToeContract.move(row, column, playerNumber, sessionId, chainSelectorMap[destinationChain.label], contractAddress[destinationChain.label])
        setDisabledButton(true)
        setText("Communicating your move cross chain")
        await move.wait();
        setText("Move Communicated, waiting for other player to make a move")
    } catch (e) {
        console.log(e);
        return;
      }  
    }
  }

  // checkWin function
  function checkWin(boardStatus) {
    // Checks if a winning combination has been achieved
    // Convert the string into a 2D array
        const board = [
            [boardStatus[0], boardStatus[1], boardStatus[2]],
            [boardStatus[3], boardStatus[4], boardStatus[5]],
            [boardStatus[6], boardStatus[7], boardStatus[8]],
        ];

        // Define the winning combinations
        const winCombinations = [
            // Horizontal
            [[0, 0], [0, 1], [0, 2]],
            [[1, 0], [1, 1], [1, 2]],
            [[2, 0], [2, 1], [2, 2]],
            // Vertical
            [[0, 0], [1, 0], [2, 0]],
            [[0, 1], [1, 1], [2, 1]],
            [[0, 2], [1, 2], [2, 2]],
            // Diagonal
            [[0, 0], [1, 1], [2, 2]],
            [[0, 2], [1, 1], [2, 0]],
        ];

        for (let win of winCombinations) {
            const [a, b, c] = win;
            if (board[a[0]][a[1]] !== '-' && board[a[0]][a[1]] === board[b[0]][b[1]] && board[a[0]][a[1]] === board[c[0]][c[1]]) {
                return board[a[0]][a[1]];
            }
        }

        // If no winning combination is found, return null
        return null;
    }


  // cellClick function
  function cellClick(row, column) {
    // Handles cell click event in the tic-tac-toe game
    if (playerChar && currentChar==playerChar) {
      if (gameOver || winner) { // do nothing if the game is over or there's a winner
        return;
      }
      
      if (cells[row][column] != "") { // cell isn't empty? Do nothing!
        return;
      }
      
      
      move(row, column)
       // if it reaches here means that the click is valid
      const newBoard = {...cells} // javascript way to copy an array
      newBoard[row][column] = currentChar // Do you remember the 0-1, 1-1 structure?
      setCells(newBoard) // set the cells with the new value
      
      
       // Change the current player
      
       if (currentChar == X) {
        setCurrentChar(O)
      } else {
        setCurrentChar(X)
      }  
    }
  }
  
  // refreshBoard function
  function refreshBoard(boardStatus) {
      // Refreshes the state of the game board
       // if it reaches here means that the click is valid
      const newBoard = {...cells} // javascript way to copy an array

      let win = checkWin(boardStatus)
      if (win) {
        if (playerChar == win) {
          setText("You Win")
        }
        else {
          setText("You Lose. Better luck next time!!")
        }
      }
      for(let i = 0; i < boardStatus.length; i++) {
        let row = Math.floor(i / 3);
        let column = i % 3;
        let cellValue = boardStatus[i];
        if(newBoard[row][column]=='') {
          switch(cellValue) {
            case 'X':
                newBoard[row][column] = 'X'; // Player 1's move
                break;
            case 'O':
                newBoard[row][column] = 'O'; // Player 2's move
                break;
            default:
                newBoard[row][column] = ''; // Empty cell
                break;
           }
        }
    }

    setCells(newBoard); // Update the UI with the new state
    let char = getNextPlayer(boardStatus)
    logUpdaterOnRefresh(char, win)
  }

  // logUpdaterOnRefresh function
  const logUpdaterOnRefresh = (nextPlayer, win) => {
    // Updates the log message displayed to the players depending on the game state
    if(!win) {
        if (playerChar && playerChar === nextPlayer){
          setText("It's your turn, Make a move");
      } else if(playerChar) {
          setText("Waiting for the other player to make a move");
      }
    }
}

  // getNextPlayer function
  function getNextPlayer(boardStatus) {
      // Determines which player's turn is next based on the current board state
      let xCount = 0;
      let oCount = 0;

      for(let i = 0; i < boardStatus.length; i++) {
          if (boardStatus[i] === 'X') {
              xCount++;
          } else if (boardStatus[i] === 'O') {
              oCount++;
          }
      }

      if (xCount > oCount) {
        setCurrentChar('O')
        return 'O'
      } else {
        setCurrentChar('X')
        return 'X'
      }
  }
  
  // resetBoard function
  const resetBoard = () => {
    // Resets the game board to its initial state
    setCells(emptyGame)
    clearInterval(intervalId)
    setCurrentChar('X')
  }

  // Render Home component
  return (
    <div>
      <main className={styles.main} style={{marginLeft: viewportWidth < 768 ? 10 : 0, width: viewportWidth > 768 ? "auto" : 440 }}>
      <AppContext.Provider value={{cells, setCells, cellClick, currentChar, winner, gameOver, disabledCell, setDisabledCell, playerChar, setPlayerChar, setCurrentChar,
                                  playerNumber, setPlayerNumber, sessionId, setSessionId, destinationChain, setDestinationChain, text, setText, refreshBoard,
                                  intervalId, setIntervalId, resetBoard, disabledButton, setDisabledButton}}>
          <Header/>
          <NewGame />
              <Board />
              
        </AppContext.Provider>
        <br/>

        <button  className={button.secondary} onClick={() => resetBoard()} style={{width:"380px"}}>
          Reset
        </button>
      </main>
    </div>
  );
}

