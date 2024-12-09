export const fetchMetadata = async (uri) => {
  try {
    // Replace "ipfs://" with a public IPFS gateway
    const url = uri.replace("ipfs://", "https://gateway.pinata.cloud/ipfs/");
    const response = await fetch(url);
    const metadata = await response.json();
    return metadata;
  } catch (error) {
    console.error("Error fetching metadata:", error);
    return null;
  }
};
