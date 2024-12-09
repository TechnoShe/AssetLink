import { AvaCloudSDK } from "@avalabs/avacloud-sdk";

export const avaCloudSDK = new AvaCloudSDK({
  apiKey: "YOUR_API_KEY", // Replace with your actual AvaCloud API Key
  chainId: "43113", // Fuji Testnet Chain ID
  network: "testnet", // Network type
});
