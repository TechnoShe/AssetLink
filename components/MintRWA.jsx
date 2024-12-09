import React, { useRef, useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { uploadToIPFS } from "@/utils/uploadToIPFS";
import { useRWA } from "@/context/RWAContext";
import { Close } from "./SVG";
import { ethers } from "ethers";

const MintRWA = ({ onClose }) => {
  const [tokenId, setTokenId] = useState(0);
  const [assetName, setAssetName] = useState("");
  const [assetType, setAssetType] = useState("");
  const [ownershipPercentage, setOwnershipPercentage] = useState("");
  const [assetValue, setAssetValue] = useState("");
  const [assetImage, setAssetImage] = useState("");
  const [uploadError, setUploadError] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadingimage, setUploadingImage] = useState(false);
  const [metadataURI, setMetadataURI] = useState("");

  const account = useAccount();
  const address = account.address;
  const { mintRWA, grantMinterRole, revokeMinterRole } = useRWA();

  // Create a reference to the modal container
  const modalRef = useRef(null);

  // Close the modal when clicking outside of it
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [onClose]);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        setUploadingImage(true);
        const ipfsURL = await uploadToIPFS(file);
        setAssetImage(ipfsURL);
      } catch (error) {
        console.error("Error uploading to IPFS:", error);
        setUploadError("Failed to upload image to IPFS. Please try again.");
      } finally {
        setUploadingImage(false);
      }
    }
  };

  const mintNFT = async () => {
    if (
      !assetName ||
      !assetType ||
      !ownershipPercentage ||
      !assetValue ||
      !assetImage ||
      !address
    ) {
      setUploadError("Please fill out all required fields.");
      return;
    }

    setIsUploading(true);

    try {
      const grantResult = await grantMinterRole(address);

      const metadata = {
        tokenId: tokenId + 1,
        name: assetName,
        description: `An NFT representing a ${assetType} asset.`,
        type: assetType,
        ownership: ownershipPercentage + "%",
        value: `$${assetValue}`,
        image: assetImage ? assetImage : "",
        createdAt: new Date().toISOString(),
      };
      setTokenId(tokenId + 1);

      const metadatauri = await uploadToIPFS(metadata, false);
      setMetadataURI(metadatauri);

      const mintResult = await mintRWA(metadataURI);

      await revokeMinterRole(address);
    } catch (err) {
      console.error("Error minting NFT:", err);
      setUploadError(
        "An error occurred while minting the NFT. Please try again later."
      );
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="fixed text-black inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
      <div
        ref={modalRef}
        className="relative max-w-md w-full p-6 bg-white rounded-lg shadow-md"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          <Close />
        </button>

        <h2 className="text-2xl font-bold mb-6 text-center">Mint RWA NFT</h2>

        <div className="mb-4">
          <label className="block text-left text-gray-700 mb-2">Asset Name</label>
          <input
            type="text"
            value={assetName}
            onChange={(e) => setAssetName(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
            placeholder="Enter asset name"
          />
        </div>

        <div className="mb-4">
          <label className="block text-left text-gray-700 mb-2">Asset Type</label>
          <select
            value={assetType}
            onChange={(e) => setAssetType(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
          >
            <option value="">Select Asset Type</option>
            <option value="Real Estate">Real Estate</option>
            <option value="Vehicle">Vehicle</option>
            <option value="Art">Art</option>
            <option value="Collectible">Collectible</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-left text-gray-700 mb-2">
            Ownership Percentage
          </label>
          <input
            type="number"
            value={ownershipPercentage}
            onChange={(e) => setOwnershipPercentage(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
            placeholder="Enter ownership percentage"
            min="0"
            max="100"
          />
        </div>

        <div className="mb-4">
          <label className="block text-left text-gray-700 mb-2">Asset Value ($)</label>
          <input
            type="number"
            value={assetValue}
            onChange={(e) => setAssetValue(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
            placeholder="Enter asset value"
            min="0"
          />
        </div>

        <div className="mb-4">
          <label className="block text-left text-gray-700 mb-2">Asset Image</label>
          <input
            type="file"
            onChange={handleImageChange}
            accept="image/*"
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>

        {uploadingimage && (
          <div className="flex justify-center items-center mb-4">
            <div className="w-6 h-6 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
            <p className="ml-2 text-gray-700">Uploading image...</p>
          </div>
        )}

        {/* {uploadError && (
          <div className="mb-4 text-red-600 text-center">{uploadError}</div>
        )} */}

        <button
          // onClick={mintNFT}
          disabled={isUploading}
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
        >
          {isUploading ? "Minting..." : "Mint NFT"}
        </button>
      </div>
    </div>
  );
};

export default MintRWA;
