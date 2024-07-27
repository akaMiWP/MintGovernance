const { ethers } = require("hardhat");

async function main() {
  const [owner] = await ethers.getSigners();
  const token = await ethers.getContractAt(
    "MyToken",
    process.env.HARDHAT_DEPLOYED_TOKEN_ADDRESS
  );
  const governor = await ethers.getContractAt(
    "MyGovernor",
    process.env.HARDHAT_DEPLOYED_GOVERNOR_ADDRESS
  );
  governor.connect(owner);
  const tx = await governor.propose(
    [token.address],
    [0],
    [
      token.interface.encodeFunctionData("mint", [
        owner.address,
        ethers.utils.parseEther("25000"),
      ]),
    ],
    "Give the owner more tokens!"
  );

  const receipt = await tx.wait();
  const proposalCreatedEvent = receipt.events.find(
    (x) => x.event == "ProposalCreated"
  );
  console.log("Vote Cast event args:", proposalCreatedEvent.args);

  await ethers.provider.send("evm_mine", []);
}

main();
