// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

import "./ibyFactory.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

/**
 * @title IbyRealtyID
 * @author ibyPlatform DevTeam (Bianca Lima, Luiz Kama, Marcos Florencio)
 *
 * @notice implement ERC721 standard to create unique token for each realty property
 */
contract IbyRealtyID is IbyFactory, ERC721URIStorage {
    /**
     * @notice counter of tokens created should be same as realtyPoolCounter
     * @notice tokens will forever be attached to this contract even though future
     *         owner may transfer directly without government actions being required
     *
     * @dev visibility public : can be called by ANY contract
     * @dev TODO : implement function to collect transaction fee
     */
    uint public tokenCounter = 0;

    /**
     * @dev array of all tokens and their metadata
     * @dev visibility public : can be called by ANY contract
     */
    tokenDescription[] public tokenCollection;

    /**
     * @dev maps each token ID to its current owner address
     * @dev visibility public : can be called by ANY contract
     */
    mapping(uint => address) public tokenToOwner;

    /**
     * @dev maps each owner's address to sum of tokens owned
     * @dev visibility public : can be called by ANY contract
     */
    mapping(address => uint) public ownerToTokenCount;

    /**
     * @dev maps token's ID to address approved to handle approval-required functions
     * @dev visibility private : can be called only from within contract
     */
    mapping(uint => address) private approvals;

    /**
     * @notice token metadata registered in blockchain
     *
     * @param tokenId : same as realtyId deployed using IbyFactory
     * @param owner : address of nft's owner
     * @param tokenUri : graphic resource URI on IPFS
     */
    struct tokenDescription {
        uint tokenId;
        address owner;
        string tokenUri;
    }

    /**
     * @notice stardard constructor ERC721
     *         tokenName : Iby Realty ID
     *         tokenSymbol : IBY
     */
    constructor() ERC721("Iby Realty ID", "IBY") {}

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
    function createNft(
        uint _tokenId,
        string memory _tokenUri
    ) public onlyOwner {
        _safeMint(owner(), _tokenId);
        _setTokenURI(_tokenId, _tokenUri);
        tokenCollection.push(tokenDescription(_tokenId, owner(), _tokenUri));
        tokenToOwner[_tokenId] = msg.sender;
        ownerToTokenCount[msg.sender]++;
        tokenCounter++;
    }

    /**
     * @notice set tokenUri if none was given at inception
     *         1. require caller to be either owner or previouly approved by owner
     *         2. pass parameters to openZeppelin API
     *
     * @param _tokenId : same as realtyId deployed using IbyFactory
     * @param _tokenUri : graphic resource URI on IPFS
     *
     * @dev visibility public : can be called by ANY contract
     */
    function setTokenUri(uint _tokenId, string memory _tokenUri) public {
        require(
            msg.sender == owner() || msg.sender == approvals[_tokenId],
            "Denied @IbyRealtyID.setTokenUri"
        );
        _setTokenURI(_tokenId, _tokenUri);
    }

    /**
     * @notice private API to transfer token to new owner
     *         4. set new owner's address as current owner
     *         5. increase count of current owner's owned tokens by 1
     *         6. safely decrease count of previous owner's owned properties by 1
     *         3. emit standard Transfer event
     * @notice check public API below
     *
     * @dev visibility internal : can be called by inherited contracts (openZeppelin declaration)
     */
    function _transfer(
        address _from,
        address _to,
        uint256 _tokenId
    ) internal override {
        tokenToOwner[_tokenId] = _to;
        ownerToTokenCount[_to]++;
        ownerToTokenCount[_from] = SafeMath.sub(
            ownerToRealtyCount[_from],
            1,
            "Error: underflow @IbyRealtyID._transfer"
        );
        emit Transfer(_from, _to, _tokenId);
    }

    /**
     * @notice public API to transfer token
     *         1. require caller to be either owner or to be previouly approved by owner
     *         2. pass parameters to private API
     *
     * @dev visibility public : can be called by ANY contract
     */
    function transfer(address _from, address _to, uint256 _tokenId) public {
        require(
            tokenToOwner[_tokenId] == msg.sender ||
                approvals[_tokenId] == msg.sender
        );
        if (_to != address(0)) _transfer(_from, _to, _tokenId);
    }

    /**
     * @notice allow gov't or future owner to delegate option to transfer token
     *         1. require only owner can delegate
     *         2. verify _spender is not 0 address, ie not a burn
     *         3. define _spender as approved to transfer
     *         4. emit standard event Approval
     *
     * @param _spender : receiver of option to update
     * @param _tokenId : token id stored in blockchain
     *
     * @dev visibility public : can be called by ANY contract
     * @dev TODO : implement easy tracking of updater's address
     */
    function approveTransfer(address _spender, uint256 _tokenId) public {
        require(realtyToOwner[_tokenId] == msg.sender);
        if (_spender != address(0)) {
            approvals[_tokenId] = _spender;
            emit Approval(msg.sender, _spender, _tokenId);
        }
    }
}
