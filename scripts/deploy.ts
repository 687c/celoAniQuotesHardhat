import { ethers } from "hardhat";

async function main() {
	const greeterContract = await ethers.getContractFactory("AniQuotes");

	let addr = await greeterContract.deploy();
	console.log("greeter deployed at ", addr.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
