const hre = require("hardhat");

async function main() {
  const teleporterAddress = "0x253b2784c75e510dD0fF1da844684a1aC0aa5fcf";

    // Get signers from Hardhat
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);

    // Step 1: Deploy RWA contract
    const RWA = await ethers.getContractFactory("RWA");
    const rwa = await RWA.deploy();
    console.log("RWA contract deployed to:", await rwa.getAddress());

    // Step 2: Deploy SecurityLayer contract
    const SecurityLayer = await ethers.getContractFactory("SecurityLayer");
    const securityLayer = await SecurityLayer.deploy();
    console.log("SecurityLayer contract deployed to:", await securityLayer.getAddress());

    // Step 3: Deploy FeeCollector contract with SecurityLayer as a dependency
    const FeeCollector = await ethers.getContractFactory("FeeCollector");
    const feeCollector = await FeeCollector.deploy();
    console.log("FeeCollector contract deployed to:", await feeCollector.getAddress());

    // Step 4: Deploy TransferManager contract with RWA and Teleporter addresses
    const TeleporterAddress = "0xYourTeleporterAddress"; // Replace with actual Teleporter address
    const TransferManager = await ethers.getContractFactory("TransferManager");
    const transferManager = await TransferManager.deploy(rwa.address, TeleporterAddress);
    console.log("TransferManager contract deployed to:", await transferManager.getAddress());

    // Step 5: Deploy AvalancheAssetLink contract with Teleporter address
    const AvalancheAssetLink = await ethers.getContractFactory("AvalancheAssetLink");
    const avalancheAssetLink = await AvalancheAssetLink.deploy(TeleporterAddress);
    console.log("AvalancheAssetLink contract deployed to:", await avalancheAssetLink.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
