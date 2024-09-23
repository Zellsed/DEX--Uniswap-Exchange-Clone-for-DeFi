// Token address
shoaibAddress = "0x9581c795DBcaf408E477F6f1908a41BE43093122";
rayyanAddress = "0x3CA5269B5c54d4C807Ca0dF7EeB2CB7a5327E77d";
popupAddress = "0x8a6E9a8E0bB561f8cdAb1619ECc4585aaF126D73";

// Uniswap contract address
wethAddress = "0x6B763F54D260aFF608CbbAeD8721c96992eC24Db";
factoryAddress = "0xF48883F2ae4C4bf4654f45997fE47D73daA4da07";
swapRouterAddress = "0x226A19c076a3047a53e5430B14bcDB42dbccA159";
nftDescriptorAddress = "0xA5c9020ea95324a05B48491FB3e61Ba111E5dd95";
positionDescriptorAddress = "0x093D305366218D6d09bA10448922F10814b031dd";
positionManagerAddress = "0x061FB3749C4eD5e3c2d28a284940093cfDFcBa20";

const artifacts = {
  UniswapV3Factory: require("@uniswap/v3-core/artifacts/contracts/UniswapV3Factory.sol/UniswapV3Factory.json"),
  NonfungiblePositionManager: require("@uniswap/v3-periphery/artifacts/contracts/NonfungiblePositionManager.sol/NonfungiblePositionManager.json"),
};

const { Contract, BigNumber } = require("ethers");
const bn = require("bignumber.js");
bn.config({ EXPONENTIAL_AT: 999999, DECIMAL_PLACES: 40 });

const MAINNET_URL =
  "https://eth-mainnet.g.alchemy.com/v2/XbTCI1sk-nWg_2lJu90LU9FjQS6I94qj";

const provider = new ethers.providers.JsonRpcProvider(MAINNET_URL);

function encodePriceSqrt(reserve1, reserve0) {
  return BigNumber.from(
    new bn(reserve1.toString())
      .div(reserve0.toString())
      .sqrt()
      .multipliedBy(new bn(2).pow(96))
      .integerValue(3)
      .toString()
  );
}

const nonfungiblePositionManager = new Contract(
  positionManagerAddress,
  artifacts.NonfungiblePositionManager.abi,
  provider
);

const factory = new Contract(
  factoryAddress,
  artifacts.UniswapV3Factory.abi,
  provider
);

async function deployPool(token0, token1, fee, price) {
  const [owner] = await ethers.getSigners();
  await nonfungiblePositionManager
    .connect(owner)
    .createAndInitializePoolIfNecessary(token0, token1, fee, price, {
      gasLimit: 30000000,
    });

  // console.log(nonfungiblePositionManager);
  const poolAddress = await factory.connect(owner).getPool(token0, token1, fee);

  return poolAddress;
}

async function main() {
  const shoRay = await deployPool(
    // shoaibAddress,
    // rayyanAddress,
    // popupAddress,
    rayyanAddress,
    popupAddress,
    500,
    encodePriceSqrt(1, 1)
  );
  // console.log("SHO_RAY=", `'${shoRay}'`);
  console.log("SHO_POP=", `'${shoRay}'`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
