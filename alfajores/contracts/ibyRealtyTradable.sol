// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title IbyRealtyID
 * @author ibyPlatform DevTeam (Bianca Lima, Luiz Kama, Marcos Florencio)
 *
 * @notice implement ERC1155 standard to create collection of tradable tokens
 */

contract IbyRealtyTradable is ERC1155, ERC1155Burnable, Ownable {
    /**
     * @notice stardard constructor ERC1155
     */
    constructor()
        ERC1155(
            "https://ipfs.io/ipfs/QmTJZkVtzhKJw4FrHxm9pbpYm7NnnZxy9iNWnisEdtr9nA"
        )
    {}

    /**
     * @notice mints new token and store metadata
     *
     * @param data : required by standard implementation; can be void
     *
     * @dev visibility public : can be called by ANY contract
     * @dev onlyOwer : only gov't manager [SPU] is enabled to create new token
     */
    function createToken(
        address to,
        uint256 id,
        uint256 amount,
        bytes memory data
    ) public onlyOwner {
        _mint(to, id, amount, data);
    }
}
