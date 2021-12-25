// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";


contract ERC721Test is ERC721, ERC721URIStorage {
  constructor(string memory _name, string memory _symbol) ERC721(_name, _symbol) {
  }


  function mint(address _to, uint256 _tokenId) public {
    super._mint(_to, _tokenId);
  }

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

  function setTokenURI(uint256 _tokenId, string memory _uri) public {
    super._setTokenURI(_tokenId, _uri);
  }

    // The following functions are overrides required by Solidity.

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }
}
