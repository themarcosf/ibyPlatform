// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

import "./ibyFactory.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

/**
 * _tokenId == _realtyId
 */

contract IbyRealtyID is IbyFactory, ERC721URIStorage {
    struct nftDescription {
        uint tokenId;
        address owner;
        string tokenUri;
    }

    uint public nftCounter = 0;
    nftDescription[] public nftCollection;

    mapping(uint => address) private transferApprovals;

    constructor() ERC721("IbyRealtyID", "IBY") {}

    function createNft(
        address _owner,
        uint _tokenId,
        string memory _tokenUri
    ) public onlyOwner {
        _safeMint(_owner, _tokenId);
        _setTokenURI(_tokenId, _tokenUri);
        nftCollection.push(nftDescription(_tokenId, _owner, _tokenUri));
        nftCounter++;
    }

    function setTokenUri(uint _tokenId, string memory _tokenUri) public {
        require(
            msg.sender == owner() || msg.sender == transferApprovals[_tokenId],
            "Denied @IbyRealtyID.setTokenUri"
        );
        _setTokenURI(_tokenId, _tokenUri);
    }

    function approve(
        address _spender,
        uint256 _tokenId
    ) public virtual override {
        require(realtyToOwner[_tokenId] == msg.sender);
        if (_spender != address(0)) {
            transferApprovals[_tokenId] = _spender;
            emit Approval(msg.sender, _spender, _tokenId);
        }
    }
}
