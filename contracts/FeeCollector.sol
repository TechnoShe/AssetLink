// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

import "./SecurityLayer.sol";

contract FeeCollector {
    address public owner;
    mapping(uint256 => uint256) public feesCollected;
    mapping(address => bool) public gasSponsors;
    SecurityLayer public securityLayer;

    event Fees_Collected(uint256 tokenId, uint256 amount);
    event Sponsor_Added(address sponsor);
    event Sponsor_Removed(address sponsor);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the owner");
        _;
    }

    constructor() {
        owner = msg.sender;
        securityLayer = new SecurityLayer();  // Create an instance of SecurityLayer
    }

    function collectFees(uint256 tokenId, uint256 amount) external onlyOwner {
        require(securityLayer.validateData(abi.encodePacked(tokenId, amount)), "Invalid data");
        feesCollected[tokenId] += amount;

        emit Fees_Collected(tokenId, amount);
    }

    function addGasSponsor(address sponsor) external onlyOwner {
        gasSponsors[sponsor] = true;

        emit Sponsor_Added(sponsor);
    }

    function removeGasSponsor(address sponsor) external onlyOwner {
        gasSponsors[sponsor] = false;

        emit Sponsor_Removed(sponsor);
    }
}