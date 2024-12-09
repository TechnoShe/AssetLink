import { defineChain } from "viem";

export const avalancheFuji = defineChain({
  id: 43113,
  name: "Avalanche Fuji",
  nativeCurrency: { 
    name: "Avalanche", 
    symbol: "AVAX", 
    decimals: 18 
  },
  rpcUrls: {
    default: { http: ["https://api.avax-test.network/ext/bc/C/rpc"] },
  },
  blockExplorers: {
    default: { 
      name: "SnowTrace", 
      url: "https://testnet.snowtrace.io" 
    },
  },
}) 
