# Tic-Tac-Toe Game Frontend

This project is a frontend implementation of a decentralized, multiplayer Tic-Tac-Toe game built with React, Wagmi, and Alchemy SDK. It leverages blockchain technology to handle game state and ensure fair play.

## Features

- Game state is stored in the blockchain, enabling transparent and trustless gameplay.
- Real-time interaction between two players from different blockchain networks.
- Responsive design for a comfortable gaming experience on various devices.
- An integrated game log to inform users about the game progress.

## Installation and Setup

1. Clone the repository:

git clone https://github.com/<your-github-username>/ccip-tic-tac-toe.git

2. Change the directory:

cd ccip-tic-tac-toe/frontend

3. Install the dependencies:

npm install

4. Start the local server:

npm run dev

5. Sample Screenshot
<img width="1728" alt="Screenshot 2023-07-12 at 1 47 30 PM" src="https://github.com/QingyangKong/ccip-tic-tac-toe/assets/66191235/25d78723-84d5-409f-b2c5-ae8df066be34">

You can now access the application from `http://localhost:3000` in your browser.

## Components

- `Board`: This component displays the game board and updates it as players make their moves.
- `NewGame`: This component allows users to start a new game and join existing games.
- `Header`: This component displays the game header including the current status and the game log.

The `constants` module contains necessary constants and configurations for the application.

## State Management

State management is primarily handled via React's built-in `useState` and `useEffect` hooks. Here's a brief explanation of some of the key state variables:

- `cells`: Stores the current state of the game board.
- `currentChar`: Stores the character ('X' or 'O') of the current player.
- `winner`: Stores the character of the player who won the game. It remains empty if there's no winner yet.
- `gameOver`: A boolean to signify whether the game is over or not.
- `disabledCell`: Used to disable the cell once it has been clicked.
- `playerChar`: Stores the character ('X' or 'O') assigned to the player.
- `playerNumber`: Stores the number (1 or 2) assigned to the player.
- `sessionId`: Stores the session ID for the current game.
- `destinationChain`: Stores the destination chain for cross-chain functionality.

The `move`, `cellClick`, `refreshBoard`, and `resetBoard` functions are some key functions managing game actions.


