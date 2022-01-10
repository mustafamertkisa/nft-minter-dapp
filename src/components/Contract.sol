pragma solidity ^0.6.6;

import "github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v3.4/contracts/token/ERC721/ERC721.sol";

contract NftMinter is ERC721 {
    uint256 public tokenCounter;
    
    constructor () public ERC721 ("MSTFMRT", "MRT"){
        tokenCounter = 0;
    }

    function createToken(string memory tokenURI) public returns (uint256) {
        uint256 newTokenId = tokenCounter;
        _safeMint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, tokenURI);
        tokenCounter = tokenCounter + 1;
        return newTokenId;
    }
}