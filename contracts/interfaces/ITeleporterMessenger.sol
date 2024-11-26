// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

// Struct for message receipt with validation checks
struct TeleporterMessageReceipt {
    uint256 receivedMessageNonce;
    address relayerRewardAddress;
}

struct TeleporterFeeInfo {
    address feeTokenAddress;
    uint256 amount;
}

struct TeleporterMessageInput {
    bytes32 destinationBlockchainID;
    address destinationAddress;
    TeleporterFeeInfo feeInfo;
    uint256 requiredGasLimit;
    address[] allowedRelayerAddresses;
    bytes message;
}

// Struct for the actual message with required checks
struct TeleporterMessage {
    uint256 messageNonce;
    address originSenderAddress;
    bytes32 destinationBlockchainID;
    address destinationAddress;
    uint256 requiredGasLimit;
    address[] allowedRelayerAddresses;
    TeleporterMessageReceipt[] receipts;
    bytes message;
}

// Interface for sending cross-chain messages
interface ITeleporterMessenger {
    // Events
    event BlockchainIDInitialized(bytes32 indexed blockchainID);
    event SendCrossChainMessage(
        bytes32 indexed messageID,
        bytes32 indexed destinationBlockchainID,
        TeleporterMessage message,
        TeleporterFeeInfo feeInfo
    );
    event AddFeeAmount(bytes32 indexed messageID, TeleporterFeeInfo updatedFeeInfo);
    event MessageExecutionFailed(
        bytes32 indexed messageID,
        bytes32 indexed sourceBlockchainID,
        TeleporterMessage message
    );
    event MessageExecuted(bytes32 indexed messageID, bytes32 indexed sourceBlockchainID);
    event ReceiveCrossChainMessage(
        bytes32 indexed messageID,
        bytes32 indexed sourceBlockchainID,
        address indexed deliverer,
        address rewardRedeemer,
        TeleporterMessage message
    );
    event ReceiptReceived(
        bytes32 indexed messageID,
        bytes32 indexed destinationBlockchainID,
        address indexed relayerRewardAddress,
        TeleporterFeeInfo feeInfo
    );
    event RelayerRewardsRedeemed(address indexed redeemer, address indexed asset, uint256 amount);

    // Functions
    function sendCrossChainMessage(TeleporterMessageInput calldata messageInput) external returns (bytes32);

    function retrySendCrossChainMessage(TeleporterMessage calldata message) external;

    function addFeeAmount(
        bytes32 messageID,
        address feeTokenAddress,
        uint256 additionalFeeAmount
    ) external;

    function receiveCrossChainMessage(
        uint32 messageIndex,
        address relayerRewardAddress
    ) external;

    function retryMessageExecution(
        bytes32 sourceBlockchainID,
        TeleporterMessage calldata message
    ) external;

    function redeemRelayerRewards(address feeTokenAddress) external;

    function getMessageHash(bytes32 messageID) external view returns (bytes32);

    function messageReceived(bytes32 messageID) external view returns (bool);
}

// Interface for receiving messages (TeleporterReceiver)
interface ITeleporterReceiver {
    function receiveTeleporterMessage(
        bytes32 sourceBlockchainID,
        address originSenderAddress,
        bytes calldata message
    ) external;
}
