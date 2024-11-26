require("@nomicfoundation/hardhat-ethers");
require('@nomicfoundation/hardhat-toolbox');
require("dotenv").config();

const { RPC_URL, PRIVATE_KEY } = process.env

module.exports = {
  solidity: "0.8.1",
  networks: {
    AvalancheFujiTestnet: {
      url: process.env.RPC_URL,
      chainId: 43113,
      accounts: [process.env.PRIVATE_KEY],
    },
  },

  // sourcify: {
  //   enabled: false
  // },

  //   etherscan: {
  //     apiKey: {
  //       cronosTestnet: process.env.ETHERSCAN_API_KEY, // <-- replace with your api key
  //     },
  //     customChains: [
  //       {
  //         network: "cronosTestnet",
  //         chainId: 338,
  //         urls: {
  //           apiURL: "https://explorer-api.cronos.org/testnet/api/v1/hardhat/contract?apikey=process.env.API_KEY",// <-- replace the API service url and API key
  //           browserURL: "http://explorer.cronos.org/testnet" // <-- replace the Cronos explorer url
  //         }
  //       }
  //     ]
  //   }  
};
