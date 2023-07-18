import { task } from "hardhat/config";
import { TaskArguments } from "hardhat/types";
import { getPrivateKey, getProviderRpcUrl } from "./utils";
import { Wallet, providers } from "ethers";
import { TTTDemo } from "../typechain-types/artifacts/contracts";
import { TTTDemo__factory } from "../typechain-types/factories/artifacts/contracts";
import { Spinner } from "../utils/spinner";

task(`ttt-update-router`, `update router address of Tic Tac Toe`)
    .addParam(`blockchain`, `The name of the blockchain (for example ethereumSepolia)`)
    .addParam(`contract`, `The address of the TTTDemo.sol`)
    .addParam(`router`, `router address at the blockchain`)
    .setAction(async (taskArguments: TaskArguments) => {
        const { blockchain, contract, router } = taskArguments;

        const privateKey = getPrivateKey();
        const rpcProviderUrl = getProviderRpcUrl(blockchain);

        const provider = new providers.JsonRpcProvider(rpcProviderUrl);
        const wallet = new Wallet(privateKey);
        const signer = wallet.connect(provider);

        const tttDemo: TTTDemo = TTTDemo__factory.connect(contract, signer);

        const spinner: Spinner = new Spinner();

        console.log(`ℹ️  Attempting to update contract ${contract} router with addr ${router}`);
        spinner.start();

        const updateTx = await tttDemo.updateRouter(router);
        await updateTx.wait();

        spinner.stop();
        console.log(`✅ Update successful, transaction hash: ${updateTx.hash}`);

    })