import React, { useState } from "react";
import { ethers } from "ethers";
import { useAccount } from "wagmi";

const CrossChainTransfer = ({ contractAddress, providerUrl, onClose }) => {
  const [tokenId, setTokenId] = useState("");
  const [selectedChain, setSelectedChain] = useState("");
  const [transactionStatus, setTransactionStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadError, setUploadError] = useState("");

  const account = useAccount();
  const address = account.address;

  // Mapping of chain names to their respective addresses
  const chainAddresses = {
    "Avalanche C-Chain": "0xAvalancheCChainAddressHere",
    "Avalanche X-Chain": "0xAvalancheXChainAddressHere",
    // Add more chains as needed
  };

  const initiateTransfer = async () => {
    if (!selectedChain) {
      setTransactionStatus("Please select a valid destination chain.");
      return;
    }

    if (!tokenId) {
      setTransactionStatus("Please enter a valid token ID.");
      return;
    }

    try {
      setIsSubmitting(true);
      setTransactionStatus("Initiating transfer...");

      // Connect to Ethereum provider
      const provider = new ethers.JsonRpcProvider(providerUrl);
      const signer = provider.getSigner();

      // Contract ABI
      const transferManagerAbi = [
        "function initiateTransfer(uint256 tokenId, address destinationL1, bytes32 destinationBlockchainID) external",
      ];

      // Create contract instance
      const transferManager = new ethers.Contract(
        contractAddress,
        transferManagerAbi,
        signer
      );

      // Get the destination chain address from the mapping
      const destinationL1 = chainAddresses[selectedChain];
      const destinationBlockchainID =
        ethers.utils.formatBytes32String(selectedChain);

      // Call the contract function
      const tx = await transferManager.initiateTransfer(
        tokenId,
        destinationL1,
        destinationBlockchainID
      );

      // Wait for the transaction to be mined
      await tx.wait();
      setIsSubmitting(false);
      setTransactionStatus(
        `Transfer initiated successfully! Transaction Hash: ${tx.hash}`
      );
    } catch (error) {
      setIsSubmitting(false);
      setUploadError("An error occurred while initiating the transfer.");
      console.error("Error initiating transfer:", error);
    }
  };

  return (
    <div className="fixed inset-0 text-black bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="relative max-w-md w-full p-6 bg-white rounded-lg shadow-md">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          ✖
        </button>

        <h2 className="text-2xl font-bold mb-6 text-center">
          Cross-Chain Transfer
        </h2>

        <div className="mb-4">
          <label className="block text-left text-gray-700 mb-2">Token ID</label>
          <input
            type="number"
            value={tokenId}
            onChange={(e) => setTokenId(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
            placeholder="Enter token ID"
            min="0"
          />
        </div>

        <div className="mb-4">
          <label className="block text-left text-gray-700 mb-2">
            Select Destination Chain
          </label>
          <select
            value={selectedChain}
            onChange={(e) => setSelectedChain(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
          >
            <option value="">--Select a Chain--</option>
            {Object.keys(chainAddresses).map((chainName) => (
              <option key={chainName} value={chainName}>
                {chainName}
              </option>
            ))}
          </select>
        </div>

        {uploadError && (
          <div className="mb-4 text-red-600 text-center">{uploadError}</div>
        )}

        <button
          onClick={initiateTransfer}
          disabled={isSubmitting}
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
        >
          {isSubmitting ? "Processing..." : "Initiate Transfer"}
        </button>

        {transactionStatus && (
          <div className="mt-4 text-center text-gray-800">
            {transactionStatus}
          </div>
        )}
      </div>
    </div>
  );
};

export default CrossChainTransfer;
