const { ethers } = require("hardhat");

async function main() {
  const [owner] = await ethers.getSigners();
  const myToken = await ethers.getContractAt(
    "MyToken",
    process.env.HARDHAT_DEPLOYED_TOKEN_ADDRESS
  );
  myToken.connect(owner);

  await myToken.delegate(await owner.getAddress());
}

main();
