const { ethers } = require("hardhat");

async function main() {
  const [owner] = await ethers.getSigners();

  const token = await ethers.getContractAt(
    "MyToken",
    process.env.HARDHAT_DEPLOYED_TOKEN_ADDRESS,
    owner
  );
  const governor = await ethers.getContractAt(
    "MyGovernor",
    process.env.HARDHAT_DEPLOYED_GOVERNOR_ADDRESS,
    owner
  );

  const tx = await governor.execute(
    [token.address],
    [0],
    [
      token.interface.encodeFunctionData("mint", [
        owner.address,
        ethers.utils.parseEther("25000"),
      ]),
    ],
    ethers.utils.keccak256(
      ethers.utils.toUtf8Bytes("Give the owner more tokens!")
    )
  );

  await tx.wait();

  const balance = await token.balanceOf(owner.address);
  console.log("Updated balance:", balance);
}

main();
