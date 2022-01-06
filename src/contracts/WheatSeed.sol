// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;


import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v3.3.0/contracts/token/ERC20/ERC20.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v3.3.0/contracts/token/ERC20/ERC20Burnable.sol";


contract WheatSeed is ERC20, ERC20Burnable {
  address private minter = 0x6e5Fa679211d7F6b54e14E187D34bA547c5d3fe0;

  event MinterChanged(address indexed from, address to);

  constructor() ERC20("Sunflower Farmers Wheat Seed", "SFWS") {}

  function mint(address account, uint256 amount) public {
    require(msg.sender == minter, "You are not the minter");
	_mint(account, amount);
  }

  function burn(address account, uint256 amount) public {
    require(msg.sender == minter, "You are not the minter");
	_burn(account, amount);
  }
}
