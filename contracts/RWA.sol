// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract RWA is ERC721, AccessControl {
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant UPDATER_ROLE = keccak256("UPDATER_ROLE");

    // Override supportsInterface to resolve the multiple inheritance conflict
    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC721, AccessControl) returns (bool) {
        return ERC721.supportsInterface(interfaceId) || AccessControl.supportsInterface(interfaceId);
    }

    uint256 public tokenIdCounter;
    mapping(uint256 => string) public metadataURIs;
    mapping(uint256 => address[]) public fractionalOwners;
    mapping(uint256 => mapping(address => uint16)) public ownershipShares; // Optimized to uint16

    event RWA_Minted(uint256 tokenId, address owner, string metadataURI);
    event Metadata_Updated(uint256 tokenId, string newMetadataURI, bytes32 metadataHash);
    event Fractional_Ownership_Set(uint256 tokenId, address[] owners, uint16[] shares);

    constructor() ERC721("RealWorldAsset", "RWA") {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _setupRole(MINTER_ROLE, msg.sender);
        _setupRole(UPDATER_ROLE, msg.sender);
    }

    function mintRWA(address to, string memory metadataURI) external onlyRole(MINTER_ROLE) {
        uint256 newTokenId = tokenIdCounter++;
        _safeMint(to, newTokenId);
        metadataURIs[newTokenId] = metadataURI;

        emit RWA_Minted(newTokenId, to, metadataURI);
    }

    function updateMetadata(uint256 tokenId, string memory metadataURI, bytes32 metadataHash) 
        external 
        onlyRole(UPDATER_ROLE) 
    {
        require(_exists(tokenId), "Token does not exist");
        metadataURIs[tokenId] = metadataURI;

        emit Metadata_Updated(tokenId, metadataURI, metadataHash);
    }

    function grantMinterRole(address account) external onlyRole(DEFAULT_ADMIN_ROLE) {
    grantRole(MINTER_ROLE, account);
}

function revokeMinterRole(address account) external onlyRole(DEFAULT_ADMIN_ROLE) {
    revokeRole(MINTER_ROLE, account);
}

function grantUpdaterRole(address account) external onlyRole(DEFAULT_ADMIN_ROLE) {
    grantRole(UPDATER_ROLE, account);
}

function revokeUpdaterRole(address account) external onlyRole(DEFAULT_ADMIN_ROLE) {
    revokeRole(UPDATER_ROLE, account);
}


    function setFractionalOwnership(uint256 tokenId, address[] memory owners, uint16[] memory shares) 
        external 
        onlyRole(MINTER_ROLE) 
    {
        require(owners.length == shares.length, "Mismatched inputs");
        uint256 totalShares = 0;
        for (uint256 i = 0; i < shares.length; i++) {
            totalShares += shares[i];
        }
        require(totalShares == 100, "Shares must sum to 100");

        fractionalOwners[tokenId] = owners;
        for (uint256 i = 0; i < owners.length; i++) {
            ownershipShares[tokenId][owners[i]] = shares[i];
        }

        emit Fractional_Ownership_Set(tokenId, owners, shares);
    }
}
