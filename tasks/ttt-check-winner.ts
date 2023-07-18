

import { task } from "hardhat/config";
import { TaskArguments } from "hardhat/types";
import { getPayFeesIn, getPrivateKey, getProviderRpcUrl, getRouterConfig } from "./utils";
import { Wallet, providers } from "ethers";
import { TTTDemo } from "../typechain-types/artifacts/contracts";
import { TTTDemo__factory } from "../typechain-types/factories/artifacts/contracts";
import { Spinner } from "../utils/spinner";

task(`ttt-check-winner`, `Check the winner of a game`)
    .addParam(`blockchain`, `The name of the source blockchain (for example ethereumSepolia)`)
    .addParam(`contract`, `The address of the TTTDemo.sol on the source blockchain`)
    .addParam(`sessionId`, `sessionId of the game`)
    .setAction(async (taskArguments: TaskArguments) => {
        const { blockchain, contract, sessionId } = taskArguments;

        const privateKey = getPrivateKey();
        const sourceRpcProviderUrl = getProviderRpcUrl(blockchain);

        const sourceProvider = new providers.JsonRpcProvider(sourceRpcProviderUrl);
        const wallet = new Wallet(privateKey);
        const signer = wallet.connect(sourceProvider);

        const spinner: Spinner = new Spinner();

        const tttDemo: TTTDemo = TTTDemo__factory.connect(contract, signer)

        console.log(`ℹ️  Attempting to get details of sessionId ${sessionId} from the TTTDemo smart contract (${contract}) on the ${blockchain}`);
        spinner.start();

        const sessionDetail = await tttDemo.gameSessions(sessionId);

        spinner.stop();
        console.log(`winner of sessionId ${sessionId} is: ${sessionDetail.winner}`)
    })