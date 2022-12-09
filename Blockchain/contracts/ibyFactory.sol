// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title IbyFactory
 * @author ibyPlatform DevTeam (Bianca Lima, Luiz Kama, Marcos Florencio)
 *
 * @notice base contract to manage state owned realty properties, identified by ID
 * @notice This contract allows creation, update, and read queries.
 *
 * @dev this contract is inherited by ibyRealtyID and ibyRealtyNFT
 */
contract IbyFactory is Ownable {
    /**
     * @notice realty properties will forever be attached to this contract
     *         even though future owner may transfer their property directly
     *         without government actions being required
     *
     * @dev visibility public : can be called by ANY contract
     * @dev TODO : implement function to collect transaction fee
     */
    uint public realtyPoolCounter = 0;

    /**
     * @dev array of all realty properties and their metadata
     *      see struct realtyDescription
     * @dev visibility public : can be called by ANY contract
     */
    realtyDescription[] public realtyPool;

    /**
     * @dev maps each realty property's ID to its current owner address
     * @dev visibility public : can be called by ANY contract
     */
    mapping(uint => address) public realtyToOwner;

    /**
     * @dev maps realty property's ID to address approved to handle approval-required functions
     * @dev visibility private : can be called only from within contract
     */
    mapping(uint => address) private approvals;

    /**
     * @notice realty property's metadata registered in blockchain
     *
     * @param id : unique ID used throughout app, ie in smart contracts and nfts
     * @param lastValuation : last transacted value
     * @param streetAddress : should include { [street, avenue, ...], number, apartment, etc }
     * @param legalOwner : current owner address
     *
     * @dev TODO : implement valuation tracking
     */
    struct realtyDescription {
        uint id;
        uint16 sqMeters;
        uint32 lastValuation;
        string streetAddress;
        string neighborhood;
        string city;
        string state;
        address legalOwner;
    }

    /**
     * @notice allow creation of realty properties
     *         1. generate new id by hashing realty property's core metadata
     *         2. include a new property in realty pool
     *         3. set gov't address as initial owner
     *         4. increase count of gov't owned properties by 1
     *         5. increase realty pool by 1
     *
     * @dev visibility public : can be called by ANY contract
     * @dev onlyOwer : only gov't manager [SPU] is enabled to create a new realty property
     */
    function createRealty(
        uint32 _value,
        uint16 _sqMeters,
        string memory _streetAddress,
        string memory _neighborhood,
        string memory _city,
        string memory _state
    ) public onlyOwner {
        uint _id = _generateID(
            string.concat(_streetAddress, _neighborhood, _city, _state)
        );
        realtyDescription memory _newRealty = realtyDescription(
            _id,
            _sqMeters,
            _value,
            _streetAddress,
            _neighborhood,
            _city,
            _state,
            msg.sender
        );

        realtyPool.push(_newRealty);
        realtyToOwner[_newRealty.id] = msg.sender;
        realtyPoolCounter++;
    }

    /**
     * @notice private API to update owner of a realty property
     *         1. search all properties until a matching ID is found
     *         2. update realty property's object
     *         3. set new owner's address as current owner
     * @notice check public API below
     *
     * @param _realtyId : object's id stored in blockchain
     * @param _newOwner : address of new owner
     *
     * @return void : 0 if successful, -1 if matching ID not found
     *
     * @dev visibility private : can be called only from within contract
     * @dev TODO : implement uint32 overflow handling
     */
    function _updateOwner(
        uint _realtyId,
        address _newOwner
    ) private returns (int8 void) {
        for (uint i = 0; i < realtyPoolCounter; i++) {
            if (realtyPool[i].id == _realtyId) {
                realtyPool[i].legalOwner = _newOwner;
                realtyToOwner[_realtyId] = _newOwner;
                return 0;
            }
        }
        return -1;
    }

    /**
     * @notice public API to update legalOwner parameter of realty property
     *         1. require caller to be either owner or to be previouly approved by owner
     *         2. pass parameters to private API
     *
     * @param _realtyId : object's id stored in blockchain
     * @param _newOwner : address of new owner
     *
     * @dev visibility public : can be called by ANY contract
     */
    function updateOwner(uint _realtyId, address _newOwner) public {
        require(
            realtyToOwner[_realtyId] == msg.sender ||
                approvals[_realtyId] == msg.sender
        );
        _updateOwner(_realtyId, _newOwner);
    }

    /**
     * @notice helper function to generate hashed id
     *
     * @param _plainText : text to be hashed
     *
     * @return _ciphertext : text hashed using keccak256 algorithm
     *
     * @dev visibility private : can be called only from within contract
     * @dev stateMutability pure : do not read or modify state
     */
    function _generateID(string memory _plainText) private pure returns (uint) {
        uint _ciphertext = uint(keccak256(abi.encodePacked(_plainText)));
        return _ciphertext;
    }
}
