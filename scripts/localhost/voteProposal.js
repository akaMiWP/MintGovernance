const { ethers } = require("hardhat");

async function main() {
  const [owner] = await ethers.getSigners();
  const governor = await ethers.getContractAt(
    "MyGovernor",
    process.env.HARDHAT_DEPLOYED_GOVERNOR_ADDRESS,
    owner
  );
  governor.connect(owner);
  const tx = await governor.castVote(
    process.env.HARDHAT_DEPLOYED_PROPOSAL_ID,
    1
  );
  const receipt = await tx.wait();
  const voteCastEvent = receipt.events.find((x) => x.event == "VoteCast");
  console.log("Vote Cast event args:", voteCastEvent.args);
}

main();
