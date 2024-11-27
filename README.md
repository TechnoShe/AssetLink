# Avalanche AssetLink
A decentralized platform for tokenizing, tracking, and transferring Real World Assets (RWAs) across Avalanche Layer 1 chains.

# Table of Contents
1. Overview
2. Features
3. Technology Stack
4. Smart Contracts
5. Project Architecture
6. Getting Started
7. Deployment
8. Testing
9. Future Enhancements
10. Contributing
11. License

# 1. Overview
Avalanche AssetLink is designed to bridge the gap between traditional and decentralized finance by enabling secure tokenization, tracking, and cross-chain transfer of Real World Assets (RWAs). Built on the Avalanche ecosystem, the platform leverages Avalanche's native tools like ICTT, Teleporter, and HyperSDK to provide scalable and efficient solutions for RWA management.

# 2. Features
- Tokenization: Represent real-world assets as digital tokens with metadata and ownership.
- Cross-Chain Transfers: Secure and seamless transfer of RWAs across Avalanche L1s.
- Fee Management: Transparent fee collection and gas sponsorship mechanisms.
- Security Layer: Validation of transactions and signatures for enhanced security.
- Custom VM Integration: HyperSDK-powered VM for optimized cross-chain operations.

# 3. Technology Stack
- Blockchain: Avalanche
- Smart Contracts: Solidity
- Tools:
   - Hardhat for development and testing
   - Ethers.js for blockchain interaction
   - Avalanche ICTT and Teleporter for cross-chain messaging
   - IPFS for decentralized metadata storage
   - Languages: JavaScript, Solidity

# 4. Smart Contracts
1. RWA.sol: Handles tokenization and metadata management for RWAs.
2. SecurityLayer.sol: Provides signature validation and secure transaction handling.
3. FeeCollector.sol: Manages fee collection, including support for gas sponsorships.
4. TransferManager.sol: Facilitates cross-chain transfer of assets.
5. AvalancheAssetLink.sol: Main contract managing cross-chain communication and platform logic.

# Interfaces Used

This project leverages several interfaces to ensure modularity and integration with cross-chain communication protocols. Below are the key interfaces and their purposes:

1. **ITeleporterMessenger.sol**:
   - Facilitates sending messages across chains using the Teleporter protocol.
   - Key Functions:
     - `sendMessage(bytes32 destChain, address receiver, uint256 fee, bytes memory payload)`: Sends a cross-chain message.

2. **ITeleporterReceiver.sol**:
   - Defines the standard for contracts that can receive cross-chain messages.
   - Key Functions:
     - `onMessage(bytes32 srcChain, address sender, bytes memory payload)`: Handles incoming messages.


# 5. Project Architecture
- Frontend:
A React-based interface for asset management, transfers, and dashboard visualization.

- Backend:
Off-chain integration for monitoring and storing cross-chain events.

- Smart Contracts:
Decentralized logic for tokenization, security, and fee collection.

- Decentralized Storage:
IPFS for storing RWA metadata.

# 6. Getting Started
**Prerequisites**
- Node.js (v16 or higher)
- NPM or Yarn
- Hardhat installed globally

**Installation**
- Clone the repository:

   - git clone https://github.com/TechnoShe/AssetLink.git
   - cd AssetLink

- Install dependencies:

   - npm install

- Configure environment variables:

Create a .env file and add the required details:

PRIVATE_KEY=your_private_key

AVALANCHE_RPC_URL=your_rpc_url

# 7. Deployment
npx hardhat run ignition/modules/deploy.js --network AvalancheFujiTestnet

Here are the deployed addresses:
- RWA contract deployed to: 0xe34c86A03F17E29F77beeE7c898Adae4dD578006
- SecurityLayer contract deployed to: 0x7516abedc7e8ca01143ad636a6963B9887FC7Cf6
- FeeCollector contract deployed to: 0xA0BF7F60ec762cc7b88dEc415D46F12cFF130a55
- TransferManager contract deployed to: 0x41CD3d7753eeAD4c2d384a6C0074eA4c27dE36F1
- AvalancheAssetLink contract deployed to: 0x1d8c981FD95060A45b3Cea346DbF7b5b48f5CD36

Here are the verified links to the deployed addresses:

run npx hardhat verify --network snowtrace "contract address" "argument"

- Successfully verified contract RWA on the block explorer.

https://avalanche.testnet.localhost:8080/address/0xe34c86A03F17E29F77beeE7c898Adae4dD578006#code

- Successfully verified contract SecurityLayer on the block explorer.

https://avalanche.testnet.localhost:8080/address/0x7516abedc7e8ca01143ad636a6963B9887FC7Cf6#code

- Successfully verified contract FeeCollector on the block explorer.

https://avalanche.testnet.localhost:8080/address/0xA0BF7F60ec762cc7b88dEc415D46F12cFF130a55#code

- Successfully verified contract TransferManager on the block explorer.
https://avalanche.testnet.localhost:8080/address/0x41CD3d7753eeAD4c2d384a6C0074eA4c27dE36F1#code

- Successfully verified contract AvalancheAssetLink on the block explorer.
https://avalanche.testnet.localhost:8080/address/0x1d8c981FD95060A45b3Cea346DbF7b5b48f5CD36#code


# 8. Testing
Run the test suite:

npx hardhat test

View coverage reports:

 Smart Contracts Test Suite

    RWA Contract Tests

      ✔ should mint a token successfully (58ms)

      ✔ should update metadata with correct role (43ms)

    FeeCollector Contract Tests

      ✔ should collect fees successfully

      ✔ should add and remove gas sponsors

    SecurityLayer Contract Tests

      ✔ should validate a correct signature

      ✔ should reject an incorrect signature

    TransferManager Contract Tests

      ✔ should initiate a transfer

    AvalancheAssetLink Contract Tests

      ✔ should send a cross-chain message


  8 passing (3s)


# 9. Future Enhancements
- Governance Mechanisms: Allow community-driven governance for the platform.
- Support for Multiple Chains: Expand beyond Avalanche to other blockchain ecosystems.
- Enhanced Metadata: Support for richer asset details and compliance verification.
- AI Integration: Predictive analytics for RWA valuations and market trends.

# 10. Contributing
We welcome contributions! Follow these steps:

- Fork the repository.
- Create a feature branch.
- Submit a pull request with a detailed explanation of your changes.

# 11. License
This project is licensed under the MIT License.

**Notes**
If you encounter issues or need assistance, please raise an issue in the repository or contact us at futhmah456@gmail.com.
