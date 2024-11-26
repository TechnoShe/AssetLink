// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

import "./RWA.sol";
import "./interfaces/ITeleporterMessenger.sol";

contract TransferManager is ITeleporterReceiver {
    RWA private rwaContract;
    ITeleporterMessenger private teleporter;

    mapping(bytes32 => bool) public processedMessages;

    event TransferInitiated(
        uint256 tokenId,
        address destinationL1,
        address originChain,
        bytes32 messageId
    );
    event TransferCompleted(
        uint256 tokenId,
        bytes32 originChain,  // Changed to bytes32
        address newOwner
    );
    event MessageProcessed(bytes32 messageId);

    constructor(address rwaAddress, address teleporterAddress) {
        rwaContract = RWA(rwaAddress);
        teleporter = ITeleporterMessenger(teleporterAddress);
    }

    /**
     * @notice Initiates the cross-chain transfer of an RWA token.
     */
    function initiateTransfer(
        uint256 tokenId,
        address destinationL1,
        bytes32 destinationBlockchainID  // Added parameter to specify destination blockchain
    ) external {
        require(
            rwaContract.ownerOf(tokenId) == msg.sender,
            "Only token owner can transfer"
        );

        // Prepare cross-chain payload
        bytes memory payload = abi.encode(
            tokenId,
            msg.sender,
            destinationL1
        );

        // Prepare fee info (assuming no fee for simplicity)
        TeleporterFeeInfo memory feeInfo = TeleporterFeeInfo({
            feeTokenAddress: address(0),
            amount: 0
        });

        // Prepare message input
        TeleporterMessageInput memory messageInput = TeleporterMessageInput({
            destinationBlockchainID: destinationBlockchainID,  // Use provided blockchain ID
            destinationAddress: destinationL1,
            feeInfo: feeInfo,
            requiredGasLimit: 100000, // Specify an appropriate gas limit
            allowedRelayerAddresses: new address[](0),
            message: payload
        });

        // Send cross-chain message
        bytes32 messageId = teleporter.sendCrossChainMessage(messageInput);

        emit TransferInitiated(
            tokenId,
            destinationL1,
            address(this),
            messageId
        );
    }

    /**
     * @notice Handles incoming cross-chain messages.
     */
    function receiveTeleporterMessage(
        bytes32 sourceChainID,
        address originSender,
        bytes calldata payload
    ) external override {
        require(
            msg.sender == address(teleporter),
            "Unauthorized sender"
        );

        // Decode the payload
        (uint256 tokenId, address owner, address destinationL1) = abi.decode(
            payload,
            (uint256, address, address)
        );

        // Verify message uniqueness
        bytes32 messageId = keccak256(payload);
        require(
            !processedMessages[messageId],
            "Message already processed"
        );
        processedMessages[messageId] = true;

        // Transfer token
        // Note: Ensure RWA contract has a method to transfer tokens across chains
        // This might require a custom method in the RWA contract
        rwaContract.safeTransferFrom(rwaContract.ownerOf(tokenId), owner, tokenId);

        emit TransferCompleted(tokenId, sourceChainID, owner);
        emit MessageProcessed(messageId);
    }
}