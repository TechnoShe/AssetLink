// components/TransferForm.js
import React, { useState } from 'react';
import { ethers } from 'ethers';

const TransferForm = ({ contract, userAddress }) => {
  const [tokenId, setTokenId] = useState('');
  const [destinationAddress, setDestinationAddress] = useState('');
  const [destinationBlockchainID, setDestinationBlockchainID] = useState('');
  const [status, setStatus] = useState('');

  const handleTransfer = async () => {
    try {
      if (!window.ethereum) {
        alert('Please install MetaMask!');
        return;
      }
      
      // Connect to the wallet
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contractWithSigner = contract.connect(signer);

      // Call the initiateTransfer function
      const tx = await contractWithSigner.initiateTransfer(
        ethers.BigNumber.from(tokenId),
        destinationAddress,
        destinationBlockchainID
      );

      setStatus('Transaction sent. Waiting for confirmation...');
      await tx.wait();
      setStatus('Transaction confirmed!');
    } catch (error) {
      console.error('Error initiating transfer:', error);
      setStatus('Transaction failed. Check console for details.');
    }
  };

  return (
    <div>
      <h2>Transfer NFT</h2>
      <div>
        <label>Token ID:</label>
        <input type="number" value={tokenId} onChange={(e) => setTokenId(e.target.value)} />
      </div>
      <div>
        <label>Destination Address:</label>
        <input type="text" value={destinationAddress} onChange={(e) => setDestinationAddress(e.target.value)} />
      </div>
      <div>
        <label>Destination Blockchain ID:</label>
        <input type="text" value={destinationBlockchainID} onChange={(e) => setDestinationBlockchainID(e.target.value)} />
      </div>
      <button onClick={handleTransfer}>Initiate Transfer</button>
      {status && <p>{status}</p>}
    </div>
  );
};

export default TransferForm;
