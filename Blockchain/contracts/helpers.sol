// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

contract Helpers {
    function _generateID(
        string memory _placeholder
    ) internal pure returns (uint) {
        return uint(keccak256(abi.encodePacked(_placeholder)));
    }

    function _valuationTick(
        uint _value,
        uint _ratio
    ) public pure returns (uint) {
        return uint(_value * (1 + (1 / _ratio)));
    }
}
