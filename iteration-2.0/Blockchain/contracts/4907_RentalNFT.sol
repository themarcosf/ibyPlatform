//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

import "./../node_modules/@openzeppelin/contracts/access/Ownable.sol";
import "./../node_modules/@openzeppelin/contracts/utils/Counters.sol";
import "./../node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

/**
 * @title RentalNFT
 * @author ibyPlatform dev team
 *
 * @notice access control ownership for prototyping; should use multisig and
 * role-based access control (ie user, moderator, minter, burner, admin, etc) for production
 *
 * @notice EIP4907-compliant NFT add time-limited user role with restricted permissions to EIP721-tokens
 */

contract RentalNFT is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenCounter;

    constructor() ERC721("RentalNFT", "RNFT") {}

    function someFunction() public onlyOwner {}

    function grantTokens(
        address _owner,
        string memory _tokenUri
    ) public returns (uint256) {
        uint256 _tokenId = _tokenCounter.current();
        _mint(_owner, _tokenId);
        _setTokenURI(_tokenId, _tokenUri);

        _tokenCounter.increment();
        return _tokenId;
    }
}
