const hre = require("hardhat");

async function main() {
    // Get signers from Hardhat
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);

     // Deploy the Teleporter contract
     const Teleporter = await ethers.getContractFactory("Teleporter");
     const teleporter = await Teleporter.waitForDeployment();
     console.log("Teleporter contract deployed to:", await teleporter.getAddress());

    // Step 1: Deploy RWA contract
    const RWA = await ethers.getContractFactory("RWA");
    const rwa = await RWA.waitForDeployment();
    console.log("RWA contract deployed to:", await rwa.getAddress());

    // Step 2: Deploy SecurityLayer contract
    const SecurityLayer = await ethers.getContractFactory("SecurityLayer");
    const securityLayer = await SecurityLayer.waitForDeployment();
    console.log("SecurityLayer contract deployed to:", await securityLayer.getAddress());

    // Step 3: Deploy FeeCollector contract with SecurityLayer as a dependency
    const FeeCollector = await ethers.getContractFactory("FeeCollector");
    const feeCollector = await FeeCollector.waitForDeployment();
    console.log("FeeCollector contract deployed to:", await feeCollector.getAddress());

    // Step 4: Deploy TransferManager contract with RWA and Teleporter addresses
    const TeleporterAddress = "0xYourTeleporterAddress"; // Replace with actual Teleporter address
    const TransferManager = await ethers.getContractFactory("TransferManager");
    const transferManager = await TransferManager.waitForDeployment(rwa.address, TeleporterAddress);
    console.log("TransferManager contract deployed to:", await transferManager.getAddress());

    // Step 5: Deploy AvalancheAssetLink contract with Teleporter address
    const AvalancheAssetLink = await ethers.getContractFactory("AvalancheAssetLink");
    const avalancheAssetLink = await AvalancheAssetLink.waitForDeployment(TeleporterAddress);
    console.log("AvalancheAssetLink contract deployed to:", await avalancheAssetLink.getAddress());

    // Optionally: Configure or set any other parameters (like adding gas sponsors or roles)
    // Example: feeCollector.addGasSponsor("0xYourSponsorAddress");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
