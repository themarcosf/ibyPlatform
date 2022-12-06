// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

/**
 * CONVENTIONS:
 *
 * function parameters start with _
 * private function names start with _
 */

contract IbyFactory {
    event NewRealty(uint realtyId, string location, uint value);

    uint public realtyCounter = 0;
    realty[] public realtyInventory;

    struct realty {
        uint id;
        string location;
        uint value;
    }

    function _createRealty(
        uint _id,
        string memory _location,
        uint _value
    ) private {
        realtyInventory.push(realty(_id, _location, _value));
        emit NewRealty(
            realtyInventory[realtyCounter].id,
            realtyInventory[realtyCounter].location,
            realtyInventory[realtyCounter].value
        );
        realtyCounter++;
    }

    function _generateID(
        string memory _placeholder
    ) private pure returns (uint) {
        return uint(keccak256(abi.encodePacked(_placeholder)));
    }

    function _valuationTick(
        uint _value,
        uint _ratio
    ) private pure returns (uint) {
        return uint(_value * (1 + (1 / _ratio)));
    }

    function createRealty(string memory _location, uint _value) public {
        uint id = _generateID(_location);
        _createRealty(id, _location, _value);
    }
}
