// SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.17;

/**
 * @dev IERC721: interface to represent token being auctioned for each individual auction
 * @dev IERC721Receiver: implement method required by ERC721 protocol to receive tokens
 */
import "./../node_modules/@openzeppelin/contracts/access/Ownable.sol";
import "./../node_modules/@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "./../node_modules/@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";

/**
 * @notice AuctionFactory structure
 * 1. listing of individual auctions
 * 2. method to allow bids received and verified to be placed
 * 3. determine when individual auction is finished
 * 4. transfer tokens to highest bidder or to owner (if no bid placed)
 */
contract AuctionFactory is Ownable {
    struct Auction {
        IERC721 token;
        uint tokenId;
        uint minPrice;
        uint flashPrice;
        uint highestBid;
        address highestBidder;
        uint endTime;
        address owner;
    }

    uint auctionNonce;
    mapping(uint => Auction) auctions;

    event newAuction(
        address indexed owner,
        IERC721 indexed token,
        uint indexed tokenId,
        uint auctionId,
        uint minPrice,
        uint flashPrice,
        uint endTime,
        uint timestamp
    );

    event newBid(
        address indexed bidder,
        uint indexed auctionId,
        uint amount,
        uint timestamp
    );

    modifier auctionExists(uint auctionId) {
        require(auctions[auctionId].owner != address(0), "invalid auction");
        _;
    }

    // @dev method required by ERC721 protocol to receive tokens
    // solc-ignore-next-line unused-param
    function onERC721Received(
        address operator,
        address from,
        uint tokenId,
        bytes calldata data
    ) public returns (bytes4) {
        return IERC721Receiver.onERC721Received.selector;
    }

    /**
     * @notice requirements to auction a token:
     * 1. access to token address, token id, minimum price, duration of auction, flashPrice (if any)
     * 2. transfer token to iby for the duration of auction
     * 3. when auction finished, token is tranferred to highest bidder or owner (if no valid bid)
     */
    function auction(
        IERC721 token,
        uint tokenId,
        uint minPrice,
        uint numHours,
        uint flashPrice
    ) external onlyOwner {
        address _tokenOwner = token.ownerOf(tokenId);

        // @dev check if transfer privileges granted by token owner
        require(
            token.getApproved(tokenId) == address(this),
            "transfer privileges not granted by token owner"
        );

        // @dev transfer token to iby for the duration of auction
        token.safeTransferFrom(_tokenOwner, address(this), tokenId);

        // @dev create new auction listing and emit event
        Auction storage _listing = auctions[auctionNonce];
        _listing.token = token;
        _listing.tokenId = tokenId;
        _listing.minPrice = minPrice;
        _listing.flashPrice = flashPrice;
        _listing.highestBidder = _tokenOwner;
        _listing.endTime = block.timestamp + (numHours * 1 hours);
        _listing.owner = _tokenOwner;

        emit newAuction(
            _listing.owner,
            _listing.token,
            _listing.tokenId,
            auctionNonce,
            _listing.minPrice,
            _listing.flashPrice,
            _listing.endTime,
            block.timestamp
        );

        auctionNonce++;
    }

    /**
     * @notice requirements to bid:
     * 1. check if bidPrice greater than or equal to minimun price
     * 2. check if bidPrice greater than current highest bid price
     * 3. check if auction is not finished
     */
    function bid(
        uint auctionId,
        uint amount,
        address bidder
    ) external onlyOwner auctionExists(auctionId) {
        Auction storage _auction = auctions[auctionId];

        require(
            amount >= _auction.minPrice && amount > _auction.highestBid,
            "invalid bid price"
        );

        require(block.timestamp < _auction.endTime, "auction is finished");

        _auction.highestBid = amount;
        _auction.highestBidder = bidder;

        if (_auction.flashPrice != 0 && amount >= _auction.flashPrice) {
            return end(auctionId);
        }

        emit newBid(bidder, auctionId, amount, block.timestamp);
    }

    // @dev i/o _auction.owner = address(0) : delete _auction
    function end(uint auctionId) public auctionExists(auctionId) onlyOwner {
        Auction storage _auction = auctions[auctionId];

        require(
            block.timestamp > _auction.endTime ||
                _auction.highestBid >= _auction.flashPrice,
            "request denied"
        );

        _auction.token.safeTransferFrom(
            address(this),
            _auction.highestBidder,
            _auction.tokenId
        );
        _auction.owner = address(0);
    }

    // @dev getter method for auction
    function getAuction(
        uint auctionId
    )
        external
        view
        auctionExists(auctionId)
        returns (address, uint, uint, uint, uint, uint)
    {
        Auction storage _auction = auctions[auctionId];

        return (
            address(_auction.token),
            _auction.tokenId,
            _auction.highestBid,
            _auction.minPrice,
            _auction.flashPrice,
            _auction.endTime
        );
    }
}
