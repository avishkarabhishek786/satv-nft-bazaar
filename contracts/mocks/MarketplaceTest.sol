// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import "../Marketplace.sol";


contract MarketplaceTest is Marketplace {
  constructor (
    address _acceptedToken,
    uint256 _fee,
    address _owner
  ) Marketplace(
    _acceptedToken,
    _fee,
    _owner
  ) {

  }

  function cancelOrderNew(address nftAddress, uint256 assetId) public whenNotPaused {
    _cancelOrder(nftAddress, assetId);
  }
}
