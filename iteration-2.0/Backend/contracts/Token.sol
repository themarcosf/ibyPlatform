//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

/**
 * @title Token
 * @author hardHat sample contract, adapted
 *
 * @notice implements simple ERC20-non-compliant token
 * @notice totalSupply initially assigned to msg.sender
 *
 * @dev events help off-chain app understand on-chain events
 * @dev external modifier: function *only* callable from *outside* the contract
 * @dev view modifier: no change to blockchain and no executing costs
 */
contract Token {
    string public name = "My Hardhat Token";
    string public symbol = "MHT";

    uint256 public totalSupply = 1000000;
    address public owner;

    mapping(address => uint256) balances;

    event Transfer(address indexed _from, address indexed _to, uint256 _value);

    constructor() {
        balances[msg.sender] = totalSupply;
        owner = msg.sender;
    }

    function transfer(address to, uint256 amount) external {
        // Check if sender has enough tokens
        require(balances[msg.sender] >= amount, "Not enough tokens");

        // Transfer the amount
        balances[msg.sender] -= amount;
        balances[to] += amount;

        // Notify off-chain app of the transfer.
        emit Transfer(msg.sender, to, amount);
    }

    function balanceOf(address account) external view returns (uint256) {
        return balances[account];
    }
}
