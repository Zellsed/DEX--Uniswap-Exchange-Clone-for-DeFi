import { ethers } from "ethers";
import Web3Modal from "web3modal";
import { Web3Provider } from "@ethersproject/providers";

import {
  BooTokenAddress,
  BooTokenABI,
  LifeTokenAddress,
  lifeTokenABI,
  SingleSwapTokenAddress,
  SingleSwapTokenABI,
  SwapMultiHopAddress,
  SwapMultiHopABI,
  IWETHAddress,
  IWETHABI,
  userStorageDataAddress,
  userStorageDataABI,
} from "../Context/constants";

//Check if wallet is connect
export const checkIfWalletConnected = async () => {
  try {
    if (!window.ethereum) return console.log("Install MetaMask");
    const accounst = await window.ethereum.request({
      method: "eth_accounts",
    });

    const firstAccount = accounst[0];
    return firstAccount;
  } catch (error) {
    console.log(error);
  }
};

//Connect wallet
export const connectWallet = async () => {
  try {
    if (!window.ethereum) return console.log("Install MetaMask");
    const accounst = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    const firstAccount = accounst[0];
    return firstAccount;
  } catch (error) {
    console.log(error);
  }
};

//Fetching contract=============================================

// Boo Token Fetching
export const fetchBooContract = (signerOrProvider) =>
  new ethers.Contract(BooTokenAddress, BooTokenABI, signerOrProvider);

//Connectting with boo token contract
export const connecttingWithBooToken = async () => {
  try {
    const web3modal = new Web3Modal();
    const connection = await web3modal.connect();
    const provider = new Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = fetchBooContract(signer);
    return contract;
  } catch (error) {
    console.log(error);
  }
};

//Fetching contract=============================================

// Life Token Fetching
export const fetchLifeContract = (signerOrProvider) =>
  new ethers.Contract(LifeTokenAddress, lifeTokenABI, signerOrProvider);

//Connectting with life token contract
export const connecttingWithLifeToken = async () => {
  try {
    const web3modal = new Web3Modal();
    const connection = await web3modal.connect();
    const provider = new Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = fetchLifeContract(signer);
    return contract;
  } catch (error) {
    console.log(error);
  }
};

//Fetching contract=============================================

// Swap Multi Hop Fetching
export const fetchSwapMultiHolContract = (signerOrProvider) =>
  new ethers.Contract(SwapMultiHopAddress, SwapMultiHopABI, signerOrProvider);

//Connectting with swap multi hop contract
export const connecttingWithSwapMultiHopToken = async () => {
  try {
    const web3modal = new Web3Modal();
    const connection = await web3modal.connect();
    const provider = new Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = fetchSwapMultiHolContract(signer);
    return contract;
  } catch (error) {
    console.log(error);
  }
};

//Fetching contract=============================================

// Single swap Fetching
export const fetchSingleSwapContract = (signerOrProvider) =>
  new ethers.Contract(
    SingleSwapTokenAddress,
    SingleSwapTokenABI,
    signerOrProvider
  );

//Connectting with single swap contract
export const connecttingWithSingleSwapToken = async () => {
  try {
    const web3modal = new Web3Modal();
    const connection = await web3modal.connect();
    const provider = new Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = fetchSingleSwapContract(signer);
    return contract;
  } catch (error) {
    console.log(error);
  }
};

//Fetching contract=============================================

// IWETH Fetching
export const fetchIWETHContract = (signerOrProvider) =>
  new ethers.Contract(IWETHAddress, IWETHABI, signerOrProvider);

//Connectting with IWETH contract
export const connecttingWithIWETHToken = async () => {
  try {
    const web3modal = new Web3Modal();
    const connection = await web3modal.connect();
    const provider = new Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = fetchIWETHContract(signer);
    return contract;
  } catch (error) {
    console.log(error);
  }
};

//Fetching contract=============================================

// DAI Fetching
const DAIAddress = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
export const fetchDAIContract = (signerOrProvider) =>
  new ethers.Contract(DAIAddress, IWETHABI, signerOrProvider);

//Connectting with DAI contract
export const connecttingWithDAIToken = async () => {
  try {
    const web3modal = new Web3Modal();
    const connection = await web3modal.connect();
    const provider = new Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = fetchDAIContract(signer);
    return contract;
  } catch (error) {
    console.log(error);
  }
};

//Fetching contract=============================================

// User Storage Fetching
export const fetchUserStorageContract = (signerOrProvider) =>
  new ethers.Contract(
    userStorageDataAddress,
    userStorageDataABI,
    signerOrProvider
  );

//Connectting with User Storage contract
export const connecttingWithUserStorageContract = async () => {
  try {
    const web3modal = new Web3Modal();
    const connection = await web3modal.connect();
    const provider = new Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = fetchUserStorageContract(signer);
    return contract;
  } catch (error) {
    console.log(error);
  }
};
