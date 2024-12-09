import { avaCloudSDK } from "@/utils/avaCloud";
import { fetchMetadata } from "@/utils/fetchMetadata";

export default async function handler(req, res) {
  const { contractAddress, pageSize = 50 } = req.query;

  if (!contractAddress) {
    return res.status(400).json({ error: "Contract address is required." });
  }

  try {
    // Fetch NFTs from the AvaCloud SDK
    const result = await avaCloudSDK.data.evm.nfts.listNftTokens({
      address: contractAddress,
      pageSize: parseInt(pageSize, 10),
    });

    const nfts = [];

    // Iterate through all pages and aggregate tokens
    for await (const page of result) {
      for (const token of page.tokens) {
        // Fetch metadata for each token
        const metadata = await fetchMetadata(token.tokenUri);
        nfts.push({
          tokenId: token.tokenId,
          owner: token.owner,
          metadata,
        });
      }
    }

    res.status(200).json({ nfts });
  } catch (error) {
    console.error("Error fetching NFTs:", error);
    res.status(500).json({ error: "Failed to fetch NFTs." });
  }
}
