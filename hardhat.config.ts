import 'dotenv/config';
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
	defaultNetwork: "alfajores",
	networks: {
		localhost: {
			url: "http://127.0.0.1:7545",
		},
		alfajores: {
			url: "https://alfajores-forno.celo-testnet.org",
			accounts: [process.env.PRIVATE_KEY ?? ""],
			chainId: 44787,
		},
	},
	solidity: {
		version: "0.8.17",
	},
};

export default config;
