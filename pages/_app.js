import dotenv from "dotenv";
dotenv.config();
import { http, createConfig } from "wagmi";
import { mainnet, avalancheFuji } from "wagmi/chains";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  getDefaultConfig,
  RainbowKitProvider,
  midnightTheme,
} from "@rainbow-me/rainbowkit";
import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import {
  rainbowWallet,
  walletConnectWallet,
} from "@rainbow-me/rainbowkit/wallets";

import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "@rainbow-me/rainbowkit/styles.css";
import { RWAProvider } from "@/context/RWAContext";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }) {
  const connectors = connectorsForWallets(
    [
      {
        groupName: "Recommended",
        wallets: [rainbowWallet, walletConnectWallet],
      },
    ],
    {
      appName: "My RainbowKit App",
      projectId: "5dd76d2344c604785d2f2ce1ba4b98f6",
    }
  );
  const config = createConfig({
    connectors,
    chains: [mainnet, avalancheFuji],
    transports: {
      [mainnet.id]: http(
        "https://eth-mainnet.g.alchemy.com/v2/FJ2bntQOlBZ-CxnqVSPaD-RlU_h7VQ-d"
      ),
      [avalancheFuji.id]: http("https://api.avax-test.network/ext/bc/C/rpc"),
    },
  });

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={midnightTheme()}>
          <RWAProvider>
            <Component {...pageProps} />
          </RWAProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
