const { ContractFactory, utils } = require("ethers");
const WETH9 = require("../Context/WETH9.json");

const artifacts = {
  UniswapV3Factory: require("@uniswap/v3-core/artifacts/contracts/UniswapV3Factory.sol/UniswapV3Factory.json"),
  SwapRouter: require("@uniswap/v3-periphery/artifacts/contracts/SwapRouter.sol/SwapRouter.json"),
  NFTDescriptor: require("@uniswap/v3-periphery/artifacts/contracts/libraries/NFTDescriptor.sol/NFTDescriptor.json"),
  NonfungibleTokenPositionDescriptor: require("@uniswap/v3-periphery/artifacts/contracts/NonfungibleTokenPositionDescriptor.sol/NonfungibleTokenPositionDescriptor.json"),
  NonfungiblePositionManager: require("@uniswap/v3-periphery/artifacts/contracts/NonfungiblePositionManager.sol/NonfungiblePositionManager.json"),
  WETH9,
};

const linkLibraries = ({ bytecode, LinkReferences }, Libraries) => {
  Object.keys(LinkReferences).forEach((fileName) => {
    Object.keys(LinkReferences[fileName]).forEach((contractName) => {
      if (!Libraries.hasOwnProperty(contractName)) {
        throw new Error(`Missing link library name ${contractName}`);
      }

      const address = utils
        .getAddress(Libraries[contractName])
        .toLowerCase()
        .slice(2);

      LinkReferences[fileName][contractName].forEach(({ start, length }) => {
        const start2 = 2 + start * 2;
        const length2 = length * 2;

        const addressPadded = address.padStart(length2, "0");

        bytecode = bytecode
          .slice(0, start2)
          .concat(addressPadded)
          .concat(bytecode.slice(start2 + length2));
      });
    });
  });

  return bytecode;
};

async function main() {
  const [owner] = await ethers.getSigners();
  const ETH_Bytes32 =
    "0x4554480000000000000000000000000000000000000000000000000000000000";

  const Weth = new ContractFactory(
    artifacts.WETH9.abi,
    artifacts.WETH9.bytecode,
    owner
  );
  const weth = await Weth.deploy();

  const Factory = new ContractFactory(
    artifacts.UniswapV3Factory.abi,
    artifacts.UniswapV3Factory.bytecode,
    owner
  );
  const factory = await Factory.deploy();

  const SwapRouter = new ContractFactory(
    artifacts.SwapRouter.abi,
    artifacts.SwapRouter.bytecode,
    owner
  );
  const swapRouter = await SwapRouter.deploy(factory.address, weth.address);

  const NFTDescriptor = new ContractFactory(
    artifacts.NFTDescriptor.abi,
    artifacts.NFTDescriptor.bytecode,
    owner
  );
  const nftDescriptor = await NFTDescriptor.deploy();

  const linkedBytecode = linkLibraries(
    {
      bytecode: artifacts.NonfungibleTokenPositionDescriptor.bytecode,
      LinkReferences: {
        "NFTDescriptor.sol": {
          NFTDescriptor: [
            {
              length: 20,
              start: 1681,
            },
          ],
        },
      },
    },
    {
      NFTDescriptor: nftDescriptor.address,
    }
  );

  const NonfungibleTokenPositionDescriptor = new ethers.ContractFactory(
    artifacts.NonfungibleTokenPositionDescriptor.abi,
    linkedBytecode,
    owner
  );
  const nonfungibleTokenPositionDescriptor =
    await NonfungibleTokenPositionDescriptor.deploy(weth.address, ETH_Bytes32);

  const NonfungiblePositionManager = new ContractFactory(
    artifacts.NonfungiblePositionManager.abi,
    artifacts.NonfungiblePositionManager.bytecode,
    owner
  );
  const nonfungiblePositionManager = await NonfungiblePositionManager.deploy(
    factory.address,
    weth.address,
    nonfungibleTokenPositionDescriptor.address
  );

  console.log("wethAddress=", weth.address);
  console.log("factoryAddress=", factory.address);
  console.log("swapRouterAddress=", swapRouter.address);
  console.log("nftDescriptorAddress=", nftDescriptor.address);
  console.log(
    "positionDescriptorAddress=",
    nonfungibleTokenPositionDescriptor.address
  );
  console.log("positionManagerAddress=", nonfungiblePositionManager.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
