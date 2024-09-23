import React, { useEffect, useState } from "react";
import { BigNumber, ethers } from "ethers";
import Web3Modal from "web3modal";
import { Web3Provider } from "@ethersproject/providers";
import { formatUnits } from "ethers/lib/utils";
import axios from "axios";

import { Token, CurrencyAmount, TradeType, Percent } from "@uniswap/sdk-core";

import { getPrice } from "../Utils/fetchingPrice";
import { swapUpdatePrice } from "../Utils/swapUpdatePrice";
import { addLiquidityExtrenal } from "../Utils/addLiquidity";
import { getLiquidityData } from "../Utils/checkLiquidity";
import { connectingWithPoolContract } from "../Utils/deployPool";

import {
  checkIfWalletConnected,
  connectWallet,
  connecttingWithBooToken,
  connecttingWithLifeToken,
  connecttingWithSingleSwapToken,
  connecttingWithIWETHToken,
  connecttingWithDAIToken,
  connecttingWithUserStorageContract,
} from "../Utils/appFeatures";

import { IWETHABI } from "./constants";
import ERC20 from "../artifacts/@openzeppelin/contracts/token/ERC20/ERC20.sol/ERC20.json";

export const SwapTokenContext = React.createContext();

export const SwapTokenContextProvider = ({ children }) => {
  const [account, setAccount] = useState("");
  const [ether, setEther] = useState("");
  const [networkConnect, setNetworkConnect] = useState("");
  const [weth9, setWeth9] = useState("");
  const [dai, setDai] = useState("");

  const [tokenData, setTokenData] = useState([]);
  const [getAllLiquidity, setGetAllLiquidity] = useState([]);

  const [topTokenList, setTopTokenList] = useState([]);

  const addToken = [
    "0xdccF554708B72d0fe9500cBfc1595cDBE3d66e5a",
    "0x645B0f55268eF561176f3247D06d0b7742f79819",

    "0x9581c795DBcaf408E477F6f1908a41BE43093122",
    "0x3CA5269B5c54d4C807Ca0dF7EeB2CB7a5327E77d",
    "0x8a6E9a8E0bB561f8cdAb1619ECc4585aaF126D73",

    "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
    "0xdAC17F958D2ee523a2206206994597C13D831ec7",
    "0xB8c77482e45F1F44dE1745F52C74426C631bDD52",
    "0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0",
    "0x6B175474E89094C44Da98b954EedeAC495271d0F",
    "0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE",
  ];

  const fetchingData = async () => {
    try {
      //Get user account
      const userAccount = await checkIfWalletConnected();
      setAccount(userAccount);

      //Create provider
      const web3modal = new Web3Modal();
      const connection = await web3modal.connect();
      const provider = new Web3Provider(window.ethereum);

      //Check balance
      const balance = await provider.getBalance(userAccount);
      const convertBal = formatUnits(balance, 18);
      setEther(convertBal);

      //All Token Balnace
      addToken.map(async (el, i) => {
        //Getting Contract
        const contract = new ethers.Contract(el, ERC20.abi, provider);

        //Convert Balance
        const userBalance = await contract.balanceOf(userAccount);
        const tokenLeft = BigNumber.from(userBalance).toString();
        const convertTokenBal = ethers.utils.formatEther(tokenLeft);

        //Get Network
        const network = await provider.getNetwork();
        setNetworkConnect(network.name);

        //Get Name And Symbol
        const symbol = await contract.symbol();
        const name = await contract.name();

        tokenData.push({
          name: name,
          symbol: symbol,
          tokenBalance: convertTokenBal,
          tokenAddress: el,
        });

        //console.log(tokenData);
      });

      //Get Liquidity
      const userStorageData = await connecttingWithUserStorageContract();
      const userLiquidity = await userStorageData.getAllTransactions();
      console.log(userLiquidity);

      userLiquidity.map(async (el, i) => {
        const liquidityData = await getLiquidityData(
          el.poolAddress,
          el.tokenAddress0,
          el.tokenAddress1
        );

        getAllLiquidity.push(liquidityData);
        console.log("getAllLiquidity", getAllLiquidity);
      });

      // const URL = "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3";

      const URL =
        "https://gateway.thegraph.com/api/{api-key}/subgraphs/id/5zvR82QoaXYFyDEKLZ9t6v9adgnptxYpKpSbxtgVENFV";

      const query = `{
      tokens(orderBy: volumeUSD, orderDirection: desc, first: 20) {
      id
      name
      symbol
      decimals
      volume
      volumeUSD
      totalSupply
      feesUSD
      txCount
      poolCount
      totalValueLockedUSD
      totalValueLocked
      derivedETH
      }
    }`;

      const axiosData = await axios.post(URL, { query: query });
      // console.log("axiosData.data.data.tokens", axiosData.data.data.tokens);

      // setTopTokenList(axiosData.data.data.tokens);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchingData();
  }, []);

  //Create and add Liquidity
  const createLiquidityAndPool = async ({
    tokenAddress0,
    tokenAddress1,
    fee,
    tokenPrice1,
    tokenPrice2,
    slippage,
    deadline,
    tokenAmmount0,
    tokenAmmount1,
  }) => {
    try {
      console.log(
        tokenAddress0,
        tokenAddress1,
        fee,
        tokenPrice1,
        tokenPrice2,
        slippage,
        deadline,
        tokenAmmount0,
        tokenAmmount1
      );

      //Create pool
      const createPool = await connectingWithPoolContract(
        tokenAddress0,
        tokenAddress1,
        fee,
        tokenPrice1,
        tokenPrice2,
        { gasLimit: 500000 }
      );
      const poolAddress = createPool;
      console.log("poolAddress", poolAddress);

      //Create liquidity
      // const info = await addLiquidityExtrenal(
      //   tokenAddress0,
      //   tokenAddress1,
      //   poolAddress,
      //   fee,
      //   tokenAmmount0,
      //   tokenAmmount1
      // );
      // // console.log("info", info);

      // //Add data
      // const userStorageData = await connecttingWithUserStorageContract();
      // // console.log("userStorageData", userStorageData);

      // const userLiquidity = await userStorageData.addToBockchain(
      //   poolAddress,
      //   tokenAddress0,
      //   tokenAddress1
      // );
      // console.log("userLiquidity", userLiquidity);
    } catch (error) {
      console.log(error);
    }
  };

  //Single Swap Token
  const singleSwapToken = async ({ token1, token2, swapAmount }) => {
    console.log("token1.tokenAddress", token1.tokenAddress);
    console.log("token2.tokenAddress", token2.tokenAddress);
    console.log("swapAmount", swapAmount);
    try {
      let singleSwapToken;
      let weth;
      let dai;

      singleSwapToken = await connecttingWithSingleSwapToken();
      weth = await connecttingWithIWETHToken();
      dai = await connecttingWithDAIToken();

      const decimals0 = 18;
      const inputAmount = swapAmount;
      const amountIn = ethers.utils.parseUnits(
        inputAmount.toString(),
        decimals0
      );

      console.log("amountIn", amountIn);

      await weth.deposit({ value: amountIn.toString() });

      await weth.approve(singleSwapToken.address, amountIn);

      //Swap
      const transaction = await singleSwapToken.swapExactInputString(
        token1.tokenAddress,
        token2.tokenAddress,
        amountIn,
        {
          gasLimit: 300000,
        }
      );

      await transaction.wait();
      console.log(transaction);

      const balance = await dai.balanceOf(account);
      const transferAmount = BigNumber.from(balance).toString();
      const ethValue = ethers.utils.formatEther(transferAmount);
      setDai(ethValue);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SwapTokenContext.Provider
      value={{
        singleSwapToken,
        connectWallet,
        getPrice,
        swapUpdatePrice,
        createLiquidityAndPool,
        getAllLiquidity,
        account,
        networkConnect,
        ether,
        weth9,
        dai,
        tokenData,
      }}
    >
      {children}
    </SwapTokenContext.Provider>
  );
};
