//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

import "./../node_modules/@openzeppelin/contracts/access/Ownable.sol";
import "./../node_modules/@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

/**
 * @title RentalNFT
 * @author ibyPlatform dev team
 *
 * @notice access control ownership for prototyping; should use multisig and
 * role-based access control (ie user, moderator, minter, burner, admin, etc) for production
 */

contract RentalNFT is ERC1155, Ownable {
    constructor() ERC1155("ipfsUri") {}

    function someFunction() public onlyOwner {}
}
