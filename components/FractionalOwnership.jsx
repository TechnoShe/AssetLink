import React, { useState, useRef, useEffect } from "react";
import { useRWA } from "@/context/RWAContext";
import { Close, DeleteBin } from "./SVG"; 

const FractionalOwnership = ({ onClose }) => {
  const { setFractionalOwnership } = useRWA();
  const [tokenId, setTokenId] = useState("");
  const [ownerships, setOwnerships] = useState([{ owner: "", share: "" }]);
  const [error, setError] = useState("");
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

  const handleChange = (index, field, value) => {
    const newOwnerships = [...ownerships];
    newOwnerships[index][field] = value;
    setOwnerships(newOwnerships);
  };

  const handleAddOwner = () => {
    setOwnerships([...ownerships, { owner: "", share: "" }]);
  };

  const handleRemoveOwner = (index) => {
    const newOwnerships = ownerships.filter((_, i) => i !== index);
    setOwnerships(newOwnerships);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate inputs
    if (!tokenId) {
      setError("Token ID is required.");
      return;
    }

    const ownerArray = [];
    const shareArray = [];
    let isValid = true;

    for (const ownership of ownerships) {
      const { owner, share } = ownership;
      if (!owner || !share) {
        setError("All owner and share fields must be filled.");
        isValid = false;
        break;
      }

      if (isNaN(share) || parseFloat(share) <= 0) {
        setError("Shares must be valid positive numbers.");
        isValid = false;
        break;
      }

      ownerArray.push(owner);
      shareArray.push(parseFloat(share));
    }

    if (!isValid) {
      return;
    }

    try {
      await setFractionalOwnership(tokenId, ownerArray, shareArray);
      setError(""); // Clear any previous errors
      alert("Fractional ownership set successfully!");
      setTokenId("");
      setOwnerships([{ owner: "", share: "" }]);
    } catch (error) {
      setError("An error occurred while setting fractional ownership.");
      console.error("Error setting fractional ownership:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
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

        <h2 className="text-2xl font-bold mb-6 text-center">
          Add Fractional Ownership
        </h2>

        {error && <p className="mb-4 text-red-600 text-center">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Token ID</label>
            <input
              type="text"
              value={tokenId}
              onChange={(e) => setTokenId(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Enter token ID"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">
              Owners and Percentages
            </label>
            {ownerships.map((ownership, index) => (
              <div key={index} className="mb-4 flex items-start">
                <div className="flex-1 mr-2">
                  
                  <input
                    type="text"
                    value={ownership.owner}
                    onChange={(e) =>
                      handleChange(index, "owner", e.target.value)
                    }
                    className="w-full px-3 py-2 border rounded-lg"
                    placeholder="Owner's address"
                    required
                  />
                </div>

                <div className="flex-1 mr-2">
                  <input
                    type="number"
                    value={ownership.share}
                    onChange={(e) =>
                      handleChange(index, "share", e.target.value)
                    }
                    className="w-full px-3 py-2 border rounded-lg"
                    placeholder="shares %"
                    min="0"
                    required
                  />
                </div>

                
                  <button
                    type="button"
                    onClick={() => handleRemoveOwner(index)}
                    className="bg-red-500 text-white py-2 px-2 rounded-lg hover:bg-red-600 transition"
                  >
                    <DeleteBin />
                  </button>
                
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={handleAddOwner}
            className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition mb-4"
          >
            Add Owner
          </button>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default FractionalOwnership;
