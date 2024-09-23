const { ethers } = require("hardhat");

async function main() {
  const [owner] = await ethers.getSigners();

  Shoaib = await ethers.getContractFactory("Shoaib");
  shoaib = await Shoaib.deploy();

  Rayyan = await ethers.getContractFactory("Rayyan");
  rayyan = await Rayyan.deploy();

  PopUp = await ethers.getContractFactory("PopUp");
  popup = await PopUp.deploy();

  console.log("shoaibAddress=", `'${shoaib.address}'`);
  console.log("rayyanAddress=", `'${rayyan.address}'`);
  console.log("popupAddress=", `'${popup.address}'`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
