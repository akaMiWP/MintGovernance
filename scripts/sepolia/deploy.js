const { ethers } = require("hardhat");

const provider = new ethers.providers.AlchemyProvider(
  "sepolia",
  process.env.ALCHEMY_API_KEY
);
const wallet = new ethers.Wallet(process.env.SEPOLIA_PRIVATE_KEY, [provider]);

async function main() {
  const transactionCount = await wallet.getTransactionCount();

  // gets the address of the token before it is deployed
  const futureAddress = ethers.utils.getContractAddress({
    from: await wallet.getAddress(),
    nonce: transactionCount + 1,
  });

  const MyGovernor = await ethers.getContractFactory("MyGovernor", wallet);
  const governor = await MyGovernor.deploy(futureAddress);

  const MyToken = await ethers.getContractFactory("MyToken", wallet);
  const token = await MyToken.deploy(governor.address);

  console.log(
    `Governor deployed to ${governor.address}`,
    `Token deployed to ${token.address}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
