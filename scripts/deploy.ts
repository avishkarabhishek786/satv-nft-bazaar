const { ethers } = require("hardhat");

enum NETWORKS {
  'MUMBAI' = 'MUMBAI',
  'MATIC' = 'MATIC',
  'GOERLI' = 'GOERLI',
  'LOCALHOST' = 'LOCALHOST',
  'BSC_TESTNET' = 'BSC_TESTNET',
}

enum SATV_TOKEN {
  'MUMBAI' = '',
  'MATIC' = '',
  'GOERLI' = '',
  'LOCALHOST' = '0x5FbDB2315678afecb367f032d93F642f64180aa3',
  'BSC_TESTNET' = '',
}

const OWNER_CUT_PER_MILLION = 25000


/**
 * @dev Steps:
 * Deploy the Collection implementation
 * Deploy the committee with the desired members. The owner will be the DAO bridge
 * Deploy the collection Manager. The owner will be the DAO bridge
 * Deploy the forwarder. Caller Is the collection manager.
 * Deploy the collection Factory. Owner is the forwarder.
 */
async function main() {
  const owner = process.env['OWNER']

  const network = NETWORKS[(process.env['NETWORK'] || 'LOCALHOST') as NETWORKS]
  if (!network) {
    throw ('Invalid network')
  }

  // Deploy collection marketplace
  let acceptedToken: string = SATV_TOKEN[network]

  if (network === 'LOCALHOST') {
    const Satv = await ethers.getContractFactory("ERC20Test")
    const satv = await Satv.deploy("Satv Token", "SATV")
    acceptedToken = satv.address
  }

  console.log('acceptedToken:', acceptedToken);

  const Marketplace = await ethers.getContractFactory("Marketplace")
  const marketplace = await Marketplace.deploy(
    acceptedToken,
    OWNER_CUT_PER_MILLION,
    owner,
  )

  console.log('NFT Marketplace:', marketplace.address)
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })