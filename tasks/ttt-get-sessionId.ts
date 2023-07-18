

import { task } from "hardhat/config";
import { TaskArguments } from "hardhat/types";
import { getPayFeesIn, getPrivateKey, getProviderRpcUrl, getRouterConfig } from "./utils";
import { Wallet, providers } from "ethers";
import { TTTDemo } from "../typechain-types/artifacts/contracts";
import { TTTDemo__factory } from "../typechain-types/factories/artifacts/contracts";
import { Spinner } from "../utils/spinner";

task(`ttt-get-sessionId`, `get the session ID of a game`)
    .addParam(`blockchain`, `The name of the source blockchain (for example ethereumSepolia)`)
    .addParam(`contract`, `The address of the TTTDemo.sol on the source blockchain`)
    .addParam(`index`, `index of the sessionId`)
    .setAction(async (taskArguments: TaskArguments) => {
        const { blockchain, contract, index } = taskArguments;

        const privateKey = getPrivateKey();
        const sourceRpcProviderUrl = getProviderRpcUrl(blockchain);

        const sourceProvider = new providers.JsonRpcProvider(sourceRpcProviderUrl);
        const wallet = new Wallet(privateKey);
        const signer = wallet.connect(sourceProvider);

        const spinner: Spinner = new Spinner();

        const tttDemo: TTTDemo = TTTDemo__factory.connect(contract, signer)

        console.log(`ℹ️  Attempting to get sessionId at index ${index} from the TTTDemo smart contract (${contract}) on the ${blockchain}`);
        spinner.start();

        const sessionId = await tttDemo.sessionIds(index);

        spinner.stop();
        console.log(`sessionId at index ${index} is: ${sessionId}`)
    })