// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

// Import the interface
import "./interfaces/ITeleporterMessenger.sol";

contract AvalancheAssetLink {
    address public teleporter; // Address of the TeleporterMessenger contract
    address public owner;

    // Events for cross-chain messaging
    event MessageSent(
        bytes32 destinationChainID,
        address indexed destinationAddress,
        bytes message
    );

    event MessageReceived(
        bytes32 sourceChainID,
        address indexed sender,
        bytes message
    );

    // Modifier for owner-only access
    modifier onlyOwner() {
        require(msg.sender == owner, "Not authorized");
        _;
    }

    // Constructor to initialize the teleporter contract
    constructor(address _teleporter) {
        require(_teleporter != address(0), "Teleporter address cannot be zero");
        teleporter = _teleporter;
        owner = msg.sender;
    }

    // Function to send cross-chain messages
    function sendMessage(
        bytes32 destinationChainID,
        address destinationAddress,
        uint256 gasLimit,
        bytes memory payload
    ) external payable onlyOwner {
        // Prepare fee information
        TeleporterFeeInfo memory feeInfo = TeleporterFeeInfo({
            feeTokenAddress: address(0), // Fee token address (use actual address if applicable)
            amount: msg.value           // Fee paid in native currency
        });

        // Prepare the message input
        TeleporterMessageInput memory messageInput = TeleporterMessageInput({
            destinationBlockchainID: destinationChainID,
            destinationAddress: destinationAddress,
            feeInfo: feeInfo,
            requiredGasLimit: gasLimit,
            allowedRelayerAddresses: new address[](0), // Correct initialization of empty array
            message: payload
        });

        // Call the TeleporterMessenger contract to send the message
        ITeleporterMessenger(teleporter).sendCrossChainMessage(messageInput);

        emit MessageSent(destinationChainID, destinationAddress, payload);
    }

    // Function to handle incoming messages (implements ITeleporterReceiver)
    function receiveTeleporterMessage(
        bytes32 sourceChainID,
        address sender,
        bytes calldata message
    ) external {
        require(msg.sender == teleporter, "Unauthorized sender");

        // Emit event for received messages
        emit MessageReceived(sourceChainID, sender, message);
    }

    // Function to update the TeleporterMessenger contract address
    function updateTeleporter(address _newTeleporter) external onlyOwner {
        require(_newTeleporter != address(0), "New teleporter address cannot be zero");
        teleporter = _newTeleporter;
    }
}