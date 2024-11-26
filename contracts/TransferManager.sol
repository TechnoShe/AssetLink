// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

import "./RWA.sol";
import "./interfaces/ITeleporterMessenger.sol";
// import "./interfaces/ITeleporterReceiver.sol";

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
        address originChain,
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
        address destinationL1
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

        // Send cross-chain message via Teleporter
        bytes32 messageId = teleporter.sendCrossChainMessage(
            destinationL1,
            address(this),
            payload,
            address(0), // No gas sponsor
            0           // No fee for simplicity
        );

        emit TransferInitiated(
            tokenId,
            destinationL1,
            block.chainid, // Current chain ID
            messageId
        );
    }

    /**
     * @notice Handles incoming cross-chain messages.
     */
    function receiveTeleporterMessage(
        address originSender,
        address originChain,
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

        // Update token ownership
        rwaContract.transferOwnership(tokenId, owner);

        emit TransferCompleted(tokenId, originChain, owner);
        emit MessageProcessed(messageId);
    }
}
