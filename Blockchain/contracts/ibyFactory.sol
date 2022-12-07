// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "./helpers.sol";

contract IbyFactory is Ownable, Helpers {
    using SafeMath for uint256;

    event NewRealty(realtyDescription);

    uint public totalRealtyCounter = 0;
    realtyDescription[] public totalRealty;
    mapping(uint => address) public realtyToOwner;
    mapping(address => uint) public ownerToRealtyCount;

    struct realtyDescription {
        uint id;
        uint32 value;
        string streetAddress;
        string neighborhood;
        string city;
        string state;
        string sqMeters;
        address legalOwner;
    }

    function createRealty(
        uint32 _value,
        string memory _streetAddress,
        string memory _neighborhood,
        string memory _city,
        string memory _state,
        string memory _sqMeters
    ) public onlyOwner {
        uint _id = _generateID(
            string.concat(
                _streetAddress,
                _neighborhood,
                _city,
                _state,
                _sqMeters
            )
        );
        realtyDescription memory _newRealty = realtyDescription(
            _id,
            _value,
            _streetAddress,
            _neighborhood,
            _city,
            _state,
            _sqMeters,
            msg.sender
        );

        totalRealty.push(_newRealty);
        realtyToOwner[_newRealty.id] = msg.sender;
        ownerToRealtyCount[msg.sender]++;
        totalRealtyCounter++;
        emit NewRealty(_newRealty);
    }

    function updateValue(
        realtyDescription storage _realty,
        uint32 _newValue
    ) internal onlyOwner {
        _realty.value = _newValue;
    }

    function updateOwner(
        realtyDescription storage _realty,
        address _newOwner
    ) internal onlyOwner {
        address _prevOwner = _realty.legalOwner;
        _realty.legalOwner = _newOwner;
        realtyToOwner[_realty.id] = _newOwner;
        ownerToRealtyCount[_newOwner]++;
        ownerToRealtyCount[_prevOwner] = SafeMath.sub(
            ownerToRealtyCount[_prevOwner],
            1,
            "Error: underflow @IbyFactory.updateOwner"
        );
    }
}
