const { expect } = require("chai");

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
        await securityLayer.deployed();

        const FeeCollector = await ethers.getContractFactory("FeeCollector");
        feeCollector = await FeeCollector.deploy();
        await feeCollector.deployed();

        const TransferManager = await ethers.getContractFactory("TransferManager");
        transferManager = await TransferManager.deploy(
            rwa.address,
            "0x0000000000000000000000000000000000000000"
        );
        await transferManager.deployed();

        const AvalancheAssetLink = await ethers.getContractFactory("AvalancheAssetLink");
        assetLink = await AvalancheAssetLink.deploy(owner.address);
        await assetLink.deployed();
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
            await rwa.updateMetadata(0, "newURI", ethers.utils.id("newURI"));
            expect(await rwa.metadataURIs(0)).to.equal("newURI");
        });
    });

    describe("SecurityLayer Contract Tests", function () {
        it("should validate a correct signature", async function () {
            const message = "Hello, Blockchain!";
            const messageHash = ethers.utils.id(message);
            const signature = await owner.signMessage(ethers.utils.arrayify(messageHash));

            const isValid = await securityLayer.validateSignature(
                messageHash,
                signature,
                owner.address
            );
            expect(isValid).to.be.true;
        });

        it("should reject an incorrect signature", async function () {
            const message = "Hello, Blockchain!";
            const messageHash = ethers.utils.id(message);
            const signature = await owner.signMessage(ethers.utils.arrayify(messageHash));

            const isValid = await securityLayer.validateSignature(
                messageHash,
                signature,
                addr1.address
            );
            expect(isValid).to.be.false;
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

    describe("TransferManager Contract Tests", function () {
        it("should initiate a transfer", async function () {
            await rwa.mintRWA(addr1.address, "metadataURI");
            await rwa.connect(addr1).approve(transferManager.address, 0);

            await transferManager.connect(addr1).initiateTransfer(
                0,
                addr1.address,
                ethers.utils.id("destChain")
            );
            // Additional assertions for emitted events can be added here
        });
    });

    describe("AvalancheAssetLink Contract Tests", function () {
        it("should send a cross-chain message", async function () {
            await assetLink.sendMessage(
                ethers.utils.id("destChain"),
                owner.address,
                100000,
                ethers.utils.toUtf8Bytes("payload")
            );
            // Additional assertions for emitted events can be added here
        });
    });
});
