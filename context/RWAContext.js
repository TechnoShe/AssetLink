import React, { createContext, useContext, useState, useEffect } from "react";
import { CONTRACT_ADDRESSES } from "../constants/addresses";
import { ABIS } from "../constants/abis";
import { ethers } from "ethers";
import { useAccount } from "wagmi";

const RWAContext = createContext();

export const RWAProvider = ({ children }) => {
  const [rwaContract, setRwaContract] = useState(null);
  const [isClient, setIsClient] = useState(false);
  const { address } = useAccount();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsClient(true);
    }
  }, []);

  useEffect(() => {
    const initializeContract = async () => {
      if (typeof isClient && window.ethereum) {
        try {
          const provider = new ethers.BrowserProvider(window.ethereum);
          console.log("provider:", provider);
          const signer = await provider.getSigner();
          console.log("signer:", signer);
          const rwa = new ethers.Contract(
            CONTRACT_ADDRESSES.RWA,
            ABIS.RWA,
            signer
          );
          setRwaContract(rwa);
          console.log("RWA Contract initialized:", rwa);
        } catch (error) {
          console.error("Error initializing RWA contract:", error);
        }
      } else {
        alert("MetaMask is not installed. Please install MetaMask!");
      }
    };

    initializeContract();
  }, [isClient]);
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
    if (!rwaContract) {
      console.error("RWA Contract is not initialized.");
      return;
    }
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
    if (!rwaContract) {
      console.error("RWA Contract is not initialized.");
      return;
    }
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

  const grantMinterRole = async (account) => {
    if (!rwaContract) {
      console.error("RWA Contract is not initialized.");
      return;
    }
    try {
      const tx = await rwaContract.grantMinterRole(account);
      await tx.wait();
      console.log(`Minter role granted to ${account}`);
    } catch (error) {
      console.error("Error granting minter role:", error);
    }
  };

  const revokeMinterRole = async (account) => {
    if (!rwaContract) {
      console.error("RWA Contract is not initialized.");
      return;
    }
    try {
      const tx = await rwaContract.revokeMinterRole(account);
      await tx.wait();
      console.log(`Minter role revoked from ${account}`);
    } catch (error) {
      console.error("Error revoking minter role:", error);
    }
  };



  return (
    <RWAContext.Provider
      value={{ mintRWA, updateMetadata, setFractionalOwnership, grantMinterRole, revokeMinterRole }}
    >
      {children}
    </RWAContext.Provider>
  );
};

export const useRWA = () => {
  const context = useContext(RWAContext);
  if (!context) {
    throw new Error("useRWA must be used within a RWAProvider");
  }
  return context;
};
