import { useRWA } from "@/context/RWAContext";
import { useAccount } from "wagmi";

export const useRWAFunctions = () => {
  const { rwaContract } = useRWA();
  const { address } = useAccount();

  const checkRoleAndExecute = async (role, action, params) => {
    if (!rwaContract) {
      console.error("RWA Contract is not initialized.");
      return;
    }
    const hasRole = await contract.hasRole(role, userAddress);
    if (!hasRole) {
      console.error(
        "You do not have the required role to perform this action."
      );
      return;
    }
    try {
      if (action === "mint") {
        const tx = await contract.mintRWA(params.to, params.metadataURI);
        await tx.wait();
        console.log("Minting successful!");
      } else if (action === "update") {
        const tx = await contract.updateMetadata(
          params.tokenId,
          params.metadataURI,
          params.metadataHash
        );
        await tx.wait();
        console.log("Metadata update successful!");
      }
    } catch (error) {
      console.error(`Error executing ${action}:`, error);
    }
  };

  document.getElementById("mintButton").addEventListener("click", async () => {
    if (rwaContract && address) {
      const params = {
        to: "0xRecipientAddress",
        metadataURI: "https://example.com/metadata",
      };
      await checkRoleAndExecute(
        ethers.utils.id("MINTER_ROLE"),
        "mint",
        params
      );
    }
  });

  document
    .getElementById("updateMetadataButton")
    .addEventListener("click", async () => {
      const signer = await connectWallet();
      if (signer) {
        const params = {
          tokenId: 1,
          metadataURI: "https://example.com/new-metadata",
          metadataHash: ethers.utils.keccak256(
            ethers.utils.toUtf8Bytes("new metadata hash")
          ),
        };
        await checkRoleAndExecute(
          signer,
          ethers.utils.id("UPDATER_ROLE"),
          "update",
          params
        );
      }
    });

  const mintRWA = async (metadataURI) => {
    if (!rwaContract) {
      console.error("RWA Contract is not initialized.");
      return;
    }
    try {
      const tx = await rwaContract.mintRWA(address, metadataURI);
      await tx.wait();
      console.log("RWA minted successfully!");
    } catch (error) {
      console.error("Error minting RWA:", error);
    }
  };

  const updateMetadata = async (tokenId, metadataURI, metadataHash) => {
    try {
      const tx = await rwaContract.updateMetadata(
        tokenId,
        metadataURI,
        metadataHash
      );
      await tx.wait();
      console.log("Metadata updated successfully!");
    } catch (error) {
      console.error("Error updating metadata:", error);
    }
  };

  const setFractionalOwnership = async (tokenId, owners, shares) => {
    try {
      const tx = await rwaContract.setFractionalOwnership(
        tokenId,
        owners,
        shares
      );
      await tx.wait();
      console.log("Fractional ownership set successfully!");
    } catch (error) {
      console.error("Error setting fractional ownership:", error);
    }
  };

  return {
    mintRWA,
    updateMetadata,
    setFractionalOwnership,
  };
};
