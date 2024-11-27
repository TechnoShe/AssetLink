const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Smart Contracts Test Suite", function () {
    let rwa, securityLayer, feeCollector, transferManager, assetLink;
    let owner, addr1, addr2;

    before(async function () {
        [owner, addr1, addr2] = await ethers.getSigners();

        const RWA = await ethers.getContractFactory("RWA");
        rwa = await RWA.deploy();
        await rwa.waitForDeployment();

        const SecurityLayer = await ethers.getContractFactory("SecurityLayer");
        securityLayer = await SecurityLayer.deploy();
        await securityLayer.waitForDeployment();

        const FeeCollector = await ethers.getContractFactory("FeeCollector");
        feeCollector = await FeeCollector.deploy();
        await feeCollector.waitForDeployment();

        const TransferManager = await ethers.getContractFactory("TransferManager");
        transferManager = await TransferManager.deploy(
            rwa.target,
            feeCollector.target // Use deployed addresses
        );
        await transferManager.waitForDeployment();

        const AvalancheAssetLink = await ethers.getContractFactory("AvalancheAssetLink");
        assetLink = await AvalancheAssetLink.deploy(owner.address);
        await assetLink.waitForDeployment();
    });

    describe("RWA Contract Tests", function () {
        it("should mint a token successfully", async function () {
            await rwa.mintRWA(addr1.address, "metadataURI");
            expect(await rwa.ownerOf(0)).to.equal(addr1.address);
            expect(await rwa.metadataURIs(0)).to.equal("metadataURI");
        });

        it("should update metadata with correct role", async function () {
            await rwa.mintRWA(addr1.address, "oldURI");
            await rwa.grantRole(await rwa.UPDATER_ROLE(), owner.address);
            await rwa.updateMetadata(0, "newURI", ethers.id("newURI"));
            expect(await rwa.metadataURIs(0)).to.equal("newURI");
        });
    });

    describe("FeeCollector Contract Tests", function () {
        it("should collect fees successfully", async function () {
            await feeCollector.collectFees(1, 100);
            expect(await feeCollector.feesCollected(1)).to.equal(100);
        });

        it("should add and remove gas sponsors", async function () {
            await feeCollector.addGasSponsor(addr1.address);
            expect(await feeCollector.gasSponsors(addr1.address)).to.be.true;

            await feeCollector.removeGasSponsor(addr1.address);
            expect(await feeCollector.gasSponsors(addr1.address)).to.be.false;
        });
    });

    describe("SecurityLayer Contract Tests", function () {
        it("should validate a correct signature", async function () {
            const message = "Hello, Blockchain!";
            const messageHash = ethers.id(message);
            const signature = await owner.signMessage(ethers.getBytes(messageHash));
    
            const isValid = await securityLayer.validateSignature(
                messageHash,
                signature,
                owner.address
            );
            expect(isValid).to.be.true;
        });
    
        it("should reject an incorrect signature", async function () {
            const message = "Hello, Blockchain!";
            const messageHash = ethers.id(message);
            const signature = await owner.signMessage(ethers.getBytes(messageHash));
    
            const isValid = await securityLayer.validateSignature(
                messageHash,
                signature,
                addr1.address
            );
            expect(isValid).to.be.false;
        });
    });
    
    describe("TransferManager Contract Tests", function () {
        it("should initiate a transfer", async function () {
            // Approve the transfer
            await rwa.connect(addr1).approve(transferManager.target, 0);

            // Initiate transfer
            const tx = await transferManager.connect(addr1).initiateTransfer(
                0,  // Token ID
                addr1.address,
                ethers.id("destChain")
            );

            // Wait for the transaction
            await tx.wait();

            // You can add more specific assertions if needed
        });
    });

    describe("AvalancheAssetLink Contract Tests", function () {
        it("should send a cross-chain message", async function () {
            const destChain = ethers.id("Avalanche-TestNet");
            
            // Send message with some ETH to cover potential fees
            const tx = await assetLink.connect(owner).sendMessage(
                destChain,
                owner.address,
                100000,
                ethers.toUtf8Bytes("payload"),
                { value: ethers.parseEther("0.1") }  // Add some ETH for fees
            );

            // Wait for the transaction
            await tx.wait();
        });
    });
});   