import { ethers, BigNumber } from "ethers";
import { axios } from "axios";
import Web3Modal from "web3modal";

const bn = require("bignumber.js");
bn.config({ EXPONENTIAL_AT: 999999, DECIMAL_PLACES: 40 });

const UNISWAP_V3_FACTORY_ADDRESS = "0xF48883F2ae4C4bf4654f45997fE47D73daA4da07";
const NON_FUNGABLE_MANAGER = "0x061FB3749C4eD5e3c2d28a284940093cfDFcBa20";

const artifacts = {
  UniswapV3Factory: require("@uniswap/v3-core/artifacts/contracts/UniswapV3Factory.sol/UniswapV3Factory.json"),
  NonfungiblePositionManager: require("@uniswap/v3-periphery/artifacts/contracts/NonfungiblePositionManager.sol/NonfungiblePositionManager.json"),
};

export const fetchPoolContract = (signerOrProvider) =>
  new ethers.Contract(
    UNISWAP_V3_FACTORY_ADDRESS,
    artifacts.UniswapV3Factory.abi,
    signerOrProvider
  );

export const fetchPositionContract = (signerOrProvider) =>
  new ethers.Contract(
    NON_FUNGABLE_MANAGER,
    artifacts.NonfungiblePositionManager.abi,
    signerOrProvider
  );

const encodePriceSqrt = (reserva1, reserva0) => {
  return BigNumber.from(
    new bn(reserva1.toString())
      .div(reserva0.toString())
      .sqrt()
      .multipliedBy(new bn(2).pow(96))
      .integerValue(3)
      .toString()
  );
};

export const connectingWithPoolContract = async (
  address1,
  address2,
  fee,
  tokenFee1,
  tokenFee2
) => {
  console.log(address1, address2, fee, tokenFee1, tokenFee2);
  const web3modal = new Web3Modal();
  const connection = await web3modal.connect();
  const provider = new ethers.providers.Web3Provider(connection);
  const signer = provider.getSigner();

  const createPoolContract = await fetchPositionContract(signer);
  console.log("createPoolContract", createPoolContract);

  const price = encodePriceSqrt(tokenFee1, tokenFee2);
  console.log("price", price);

  const transaction = await createPoolContract
    // .connect(signer)
    // .createAndInitializePoolIfNecessary(address1, address2, fee, price, {
    //   gasLimit: 30000000,
    // });
    .connect(signer)
    .createAndInitializePoolIfNecessary(address1, address2, fee, price, {
      gasLimit: 50000000,
    });

  await transaction.wait();

  const factory = await fetchPoolContract(signer);
  const poolAddress = await factory.getPool(address1, address2, fee);

  return poolAddress;
};
