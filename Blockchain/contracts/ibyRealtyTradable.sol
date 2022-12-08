// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title IbyRealtyID
 * @author ibyPlatform DevTeam (Bianca Lima, Luiz Kama, Marcos Florencio)
 *
 * @notice implement ERC721 standard to create unique token for each realty property
 */
contract IbyRealtyID is ERC721URIStorage, Ownable {
    using Strings for string;

    /**
     * @notice stardard constructor ERC721
     *         tokenName : Iby Realty ID
     *         tokenSymbol : IBY
     */
    constructor() ERC721("Iby Realty Tradable", "IBY-T") {}

    /**
     * @notice mints a new token and store metadata
     *         1. safely mint new token and set gov't address as initial owner
     *         2. set token URI provided by IPFS [optional]
     *         3. include new token in token collection
     *         4. set gov't address as initial owner
     *         5. increase count of gov't owned tokens by 1
     *         6. increase token counter by 1
     *         7. automatically emits a event Transfer(address from, address to, uint256 tokenId)
     *
     * @param _tokenId : same as realtyId deployed using IbyFactory
     * @param _tokenUri : graphic resource URI on IPFS
     *
     * @dev visibility public : can be called by ANY contract
     * @dev onlyOwer : only gov't manager [SPU] is enabled to create a new token
     */
    function createToken(
        uint _tokenId,
        string memory _tokenUri
    ) public onlyOwner {
        uint _id = _tokenId + 1;
        for (uint i = 0; i < 20; i++) {
            _safeMint(owner(), _id);
            _setTokenURI(_id, _tokenUri);
            _id++;
        }
    }
}
