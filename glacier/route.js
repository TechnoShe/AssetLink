// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import axios from "axios";

const apiKey = "your_api_key";
const chainId = "43114"; // Avalanche C-Chain
const address = "0x..."; // The address you're querying

axios
  .get(
    `https://glacier-api.avax.network/v1/chains/${chainId}/addresses/${address}/balances:listCollectibles`,
    {
      headers: {
        "x-glacier-api-key": process.env.NEXT_GLACIER_API_KEY,
      },
    }
  )
  .then((response) => {
    const tokens = response.data.tokens;
    tokens.forEach((token) => {
      console.log(token.metadata.tokenUri); // This is your metadataURI
    });
  })
  .catch((error) => console.error("Error:", error));
