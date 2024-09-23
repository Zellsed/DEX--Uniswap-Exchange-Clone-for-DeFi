const hre = require("hardhat");

async function main() {
  // ERC20 BOO TOKEN
  const BooToken = await hre.ethers.getContractFactory("BooToken");
  const booToken = await BooToken.deploy();
  await booToken.deployTransaction.wait();
  console.log("Boo Token deployed to:", booToken.address);

  // ERC20 LIFE TOKEN
  const LifeToken = await hre.ethers.getContractFactory("LifeToken");
  const lifeToken = await LifeToken.deploy();
  await lifeToken.deployTransaction.wait();
  console.log("Life Token deployed to:", lifeToken.address);

  // SINGLE SWAP TOKEN
  const SingleSwapToken = await hre.ethers.getContractFactory(
    "SingleSwapToken"
  );
  const singleSwapToken = await SingleSwapToken.deploy();
  await singleSwapToken.deployTransaction.wait();
  console.log("Single Swap Token deployed to:", singleSwapToken.address);

  // SWAP MULTI HOP
  const SwapMultiHop = await hre.ethers.getContractFactory("SwapMultiHop");
  const swapMultiHop = await SwapMultiHop.deploy();
  await swapMultiHop.deployTransaction.wait();
  console.log("Swap Multi Hop deployed to:", swapMultiHop.address);

  // USER DATA CONTRACT
  const UserStorageData = await hre.ethers.getContractFactory(
    "UserStorageData"
  );
  const userStorageData = await UserStorageData.deploy();
  await userStorageData.deployTransaction.wait();
  console.log("User Storage Data deployed to:", userStorageData.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Error deploying contract:", error);
    process.exit(1);
  });
