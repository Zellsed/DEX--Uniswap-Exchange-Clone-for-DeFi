import booToken from "../artifacts/contracts/ERC20Boo.sol/BooToken.json";
import lifeToken from "../artifacts/contracts/ERC20Life.sol/LifeToken.json";
import singleSwapToken from "../artifacts/contracts/SwapToken.sol/SingleSwapToken.json";
import swapMultiHop from "../artifacts/contracts/SwapMultiHop.sol/SwapMultiHop.json";
import IWETH from "../artifacts/contracts/Interfaces/IWETH.sol/IWETH.json";
import userStorageData from "../artifacts/contracts/storeUserData.sol/UserStorageData.json";

export const BooTokenAddress = "0xdccF554708B72d0fe9500cBfc1595cDBE3d66e5a";
export const BooTokenABI = booToken.abi;

export const LifeTokenAddress = "0x645B0f55268eF561176f3247D06d0b7742f79819";
export const lifeTokenABI = lifeToken.abi;

export const SingleSwapTokenAddress =
  "0x5fe2f174fe51474Cd198939C96e7dB65983EA307";
export const SingleSwapTokenABI = singleSwapToken.abi;

export const SwapMultiHopAddress = "0x8AFB0C54bAE39A5e56b984DF1C4b5702b2abf205";
export const SwapMultiHopABI = swapMultiHop.abi;

export const IWETHAddress = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
export const IWETHABI = IWETH.abi;

export const userStorageDataAddress =
  "0x81ED8e0325B17A266B2aF225570679cfd635d0bb";
export const userStorageDataABI = userStorageData.abi;
