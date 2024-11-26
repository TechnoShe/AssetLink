// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

contract SecurityLayer {
    using ECDSA for bytes32; // Import and use the ECDSA library for signature recovery

    bool private locked;

    // Modifier to prevent reentrancy attacks
    modifier preventReentrancy() {
        require(!locked, "Reentrant call");
        locked = true;
        _;
        locked = false;
    }

    // Function to validate a signature using the ECDSA library
    function validateSignature(
        bytes32 hash, 
        bytes memory signature, 
        address user
    ) public pure returns (bool) {
        // Recover signer from the signature and compare it with the provided user address
        return hash.toEthSignedMessageHash().recover(signature) == user;
    }

    // Function to validate data integrity (example logic)
    function validateData(bytes memory data) external pure returns (bool) {
        // Placeholder: Basic data validation logic
        return data.length > 0;
    }
}
