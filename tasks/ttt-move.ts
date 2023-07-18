

import { task } from "hardhat/config";
import { TaskArguments } from "hardhat/types";
import { getPayFeesIn, getPrivateKey, getProviderRpcUrl, getRouterConfig } from "./utils";
import { Wallet, providers } from "ethers";
import { TTTDemo } from "../typechain-types/artifacts/contracts";
import { TTTDemo__factory } from "../typechain-types/factories/artifacts/contracts";
import { Spinner } from "../utils/spinner";

task(`ttt-move`, `one player makes a move`)
    .addParam(`x`, `x coordinate`)
    .addParam(`y`, `y coordinate`)
    .addParam(`player`, `player number(1 or 2)`)
    .addParam(`sessionId`, `id of the session`)
    .addParam(`sourceBlockchain`, `The name of the source blockchain (for example ethereumSepolia)`)
    .addParam(`sender`, `The address of the TTTDemo.sol on the source blockchain`)
    .addParam(`destinationBlockchain`, `The name of the destination blockchain (for example polygonMumbai)`)
    .addParam(`receiver`, `The address of the receiver BasicMessageReceiver.sol on the destination blockchain`)
    // .addParam(`payFeesIn`, `Choose between 'Native' and 'LINK'`)
    .setAction(async (taskArguments: TaskArguments) => {
        const { x, y, player, sessionId, sourceBlockchain, sender, destinationBlockchain, receiver } = taskArguments;

        const privateKey = getPrivateKey();
        const sourceRpcProviderUrl = getProviderRpcUrl(sourceBlockchain);

        const sourceProvider = new providers.JsonRpcProvider(sourceRpcProviderUrl);
        const wallet = new Wallet(privateKey);
        const signer = wallet.connect(sourceProvider);

        const spinner: Spinner = new Spinner();

        const tttDemo: TTTDemo = TTTDemo__factory.connect(sender, signer)

        const destinationChainSelector = getRouterConfig(destinationBlockchain).chainSelector;

        console.log(`ℹ️  Attempting to send the message from the TTTDemo smart contract (${sender}) on the ${sourceBlockchain} blockchain to the TTTDemo smart contract (${receiver} on the ${destinationBlockchain} blockchain)`);
        spinner.start();

        const tx = await tttDemo.move(
            x,
            y,
            player,
            sessionId,
            destinationChainSelector,
            receiver
        )

        await tx.wait();

        spinner.stop();
        console.log(`✅ Message sent, you make a move! transaction hash: ${tx.hash}`);
    })