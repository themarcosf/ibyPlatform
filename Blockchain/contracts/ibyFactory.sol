// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "./helpers.sol";

/**
 * @title IbyFactory
 * @author ibyPlatform DevTeam (Bianca Lima, Luiz Kama, Marcos Florencio)
 *
 * @notice base contract to manage state owned realty properties, identified by ID
 * @notice This contract allows creation, update, and read queries.
 *
 * @dev this contract is inherited by ibyRealtyID and ibyRealtyNFT
 */
contract IbyFactory is Ownable, Helpers {
    /**
     * @dev used to avoid counter underflow
     */
    using SafeMath for uint256;

    /**
     * @dev event fired whenever a new realty property is created
     */
    event NewRealty(realtyDescription);

    /**
     * @dev event fired whenever a realty property is updated
     */
    event UpdatedRealty(realtyDescription);

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
     * @dev maps each owner's address to the sum of properties owned
     * @dev visibility public : can be called by ANY contract
     */
    mapping(address => uint) public ownerToRealtyCount;

    /**
     * @dev maps realty property's ID to address approved to handle approval-required functions
     * @dev visibility private : can be called only from within the contract
     */
    mapping(uint => address) private updateApprovals;

    /**
     * @notice realty property's metadata registered in the blockchain
     *
     * @param id : unique ID used throughout the app, ie in smart contracts and nfts
     * @param lastValuation : last transacted value
     * @param streetAddress : should include { [street, avenue, ...], number, apartment, etc }
     * @param legalOwner : current owner address
     *
     * @dev TODO : implement valuation tracking
     */
    struct realtyDescription {
        uint id;
        uint32 lastValuation;
        string streetAddress;
        string neighborhood;
        string city;
        string state;
        string sqMeters;
        address legalOwner;
    }

    /**
     * @notice allow creation of realty properties
     *         1. generate new id by hashing realty property's core metadata
     *         2. include a new property in the realty pool
     *         3. set the gov't address as the initial owner
     *         4. increase the count of gov't owned properties by 1
     *         5. increase the realty pool by 1
     *         6. emit event that new realty property was created
     *
     * @dev visibility public : can be called by ANY contract
     * @dev onlyOwer : only the gov't manager [SPU] is enabled to create a new realty property
     */
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

        realtyPool.push(_newRealty);
        realtyToOwner[_newRealty.id] = msg.sender;
        ownerToRealtyCount[msg.sender]++;
        realtyPoolCounter++;
        emit NewRealty(_newRealty);
    }

    /**
     * @notice private API to update owner of a realty property
     *         1. search all properties until a matching ID is found
     *         2. store previous owner in scoped variable
     *         3. update realty property's object
     *         4. set new owner's address as current owner
     *         5. increase count of current owner's owned properties by 1
     *         6. safely decrease count of previous owner's owned properties by 1
     *         3. emit event that realty was updated
     * @notice check public API below
     *
     * @param _realtyId : object's id stored in the blockchain
     * @param _newOwner : address of new owner
     *
     * @return void : 0 if successful, -1 if matching ID not found
     *
     * @dev visibility private : can be called only from within the contract
     * @dev TODO : implement uint32 overflow handling
     */
    function _updateOwner(
        uint _realtyId,
        address _newOwner
    ) private returns (int8 void) {
        for (uint i = 0; i < realtyPoolCounter; i++) {
            if (realtyPool[i].id == _realtyId) {
                address _prevOwner = realtyPool[i].legalOwner;
                realtyPool[i].legalOwner = _newOwner;
                realtyToOwner[_realtyId] = _newOwner;
                ownerToRealtyCount[_newOwner]++;
                ownerToRealtyCount[_prevOwner] = SafeMath.sub(
                    ownerToRealtyCount[_prevOwner],
                    1,
                    "Error: underflow @IbyFactory._updateOwner"
                );
                emit UpdatedRealty(realtyPool[i]);
                return 0;
            }
        }
        return -1;
    }

    /**
     * @notice private API to update lastValuation parameter of a realty property
     *         1. search all properties until a matching ID is found
     *         2. update the realty property's object
     *         3. emit event that realty was updated
     * @notice check public API below
     *
     * @param _realtyId : object's id stored in the blockchain
     * @param _newValue : accepts valuations up to 4.0 billion
     *
     * @return void : 0 if successful, -1 if matching ID not found
     *
     * @dev visibility private : can be called only from within the contract
     * @dev TODO : implement uint32 overflow handling
     */
    function _updateValue(
        uint _realtyId,
        uint32 _newValue
    ) private returns (int8 void) {
        for (uint i = 0; i < realtyPoolCounter; i++) {
            if (realtyPool[i].id == _realtyId) {
                realtyPool[i].lastValuation = _newValue;
                emit UpdatedRealty(realtyPool[i]);
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
     * @param _realtyId : object's id stored in the blockchain
     * @param _newOwner : address of new owner
     *
     * @dev visibility public : can be called by ANY contract
     */
    function updateOwner(uint _realtyId, address _newOwner) public {
        require(
            realtyToOwner[_realtyId] == msg.sender ||
                updateApprovals[_realtyId] == msg.sender
        );
        _updateOwner(_realtyId, _newOwner);
    }

    /**
     * @notice public API to update lastValuation parameter of realty property
     *         1. require caller to be either owner or to be previouly approved by owner
     *         2. pass parameters to private API
     *
     * @param _realtyId : object's id stored in the blockchain
     * @param _newValue : accepts valuations up to 4.0 billion
     *
     * @dev visibility public : can be called by ANY contract
     * @dev TODO : implement uint32 overflow handling
     */
    function updateValue(uint _realtyId, uint32 _newValue) public {
        require(
            realtyToOwner[_realtyId] == msg.sender ||
                updateApprovals[_realtyId] == msg.sender
        );
        _updateValue(_realtyId, _newValue);
    }

    /**
     * @notice allow gov't or future owner to delegate option to update realty's object
     *         1. require only owner can delegate
     *         2. verify _updater is not the 0 address, ie not a burn
     *         3. define _updater as approved to update
     *
     * @param _updater : receiver of option to update
     * @param _realtyId : object's id stored in the blockchain
     *
     * @dev visibility public : can be called by ANY contract
     * @dev TODO : implement easy tracking of updater's address
     */
    function updateDelegate(address _updater, uint256 _realtyId) public {
        require(realtyToOwner[_realtyId] == msg.sender);
        if (_updater != address(0)) updateApprovals[_realtyId] = _updater;
    }
}
