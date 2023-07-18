import { network, ethers } from "hardhat";
import { getRouterConfig } from "../tasks/utils";

async function main() {
    const routerAddress = process.env.ROUTER ? process.env.ROUTER : getRouterConfig(network.name).address;

    const TTTDemoFactory = await ethers.getContractFactory('TTTDemo');
    const TTTDemo = await TTTDemoFactory.deploy(routerAddress);
    await TTTDemo.deployed();

    console.log(`✅ Tic Tac Toe Demo deployed at address ${TTTDemo.address} on ${network.name} blockchain`)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});