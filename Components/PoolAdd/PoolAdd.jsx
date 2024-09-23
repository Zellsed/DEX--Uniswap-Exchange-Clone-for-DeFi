import React, { useState } from "react";

import Image from "next/image";
import images from "../../assets";
import Style from "./PoolAdd.module.css";

import { Token, SearchToken } from "../../Components/index.js";

const PoolAdd = ({ setClosePool, tokenData, createLiquidityAndPool }) => {
  const [openModel, setOpenModel] = useState(false);
  const [openTokenModelOne, setOpenTokenModelOne] = useState(false);
  const [openTokenModelTwo, setOpenTokenModelTwo] = useState(false);
  const [active, setActive] = useState(1);
  const [openFee, setOpenFee] = useState(false);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);

  //New state
  const [fee, setFee] = useState(0);
  const [slippage, setSlippage] = useState(25);
  const [deadline, setDeadline] = useState(10);
  const [tokenAmount1, setTokenAmount1] = useState(0);
  const [tokenAmount2, setTokenAmount2] = useState(0);

  //Token 1
  const [tokenOne, setTokenOne] = useState({
    name: "",
    image: "",
    symbol: "",
    tokenBalance: "",
    tokenAddress: "",
  });

  //Token 2
  const [tokenTwo, setTokenTwo] = useState({
    name: "",
    image: "",
    symbol: "",
    tokenBalance: "",
    tokenAddress: "",
  });

  const feePairs = [
    {
      fee: "0.05%",
      info: "Best for stable pairs",
      number: "0% Select",
      feeSystem: 500,
    },
    {
      fee: "0.3%",
      info: "Best for stable pairs",
      number: "0% Select",
      feeSystem: 3000,
    },
    {
      fee: "1%",
      info: "Best for stable pairs",
      number: "0% Select",
      feeSystem: 10000,
    },
  ];

  const minPriceRange = (text) => {
    if (text == "+") {
      setMinPrice(minPrice + 1);
    } else if (text == "-") {
      setMinPrice(minPrice - 1);
    }
  };

  const maxPriceRange = (text) => {
    if (text == "+") {
      setMaxPrice(maxPrice + 1);
    } else if (text == "-") {
      setMaxPrice(maxPrice - 1);
    }
  };

  const formatTokenBalance = (balance) => {
    if (balance.length <= 8) {
      return balance;
    }
    return `${balance.slice(0, 4)}...${balance.slice(-4)}`;
  };

  return (
    <div className={Style.PoolAdd}>
      <div className={Style.PoolAdd_box}>
        <div className={Style.PoolAdd_box_header}>
          <div className={Style.PoolAdd_box_header_left}>
            <Image
              src={images.arrowLeft}
              alt="image"
              width={30}
              height={30}
              onClick={() => setClosePool(false)}
            />
          </div>
          <div className={Style.PoolAdd_box_header_middle}>
            <p>Add Liquidity</p>
          </div>
          <div className={Style.PoolAdd_box_header_right}>
            <p>
              {tokenOne.name || ""}{" "}
              {formatTokenBalance(tokenOne.tokenBalance) || ""}
              {"\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0"}
              {tokenTwo.name || ""}{" "}
              {formatTokenBalance(tokenTwo.tokenBalance) || ""}
            </p>

            <Image
              src={images.close}
              alt="image"
              width={50}
              height={50}
              onClick={() => setOpenModel(true)}
            />
          </div>
        </div>

        <div className={Style.PoolAdd_box_price}>
          <div className={Style.PoolAdd_box_price_left}>
            <h4>Select pair</h4>
            <div className={Style.PoolAdd_box_price_left_token}>
              <div
                className={Style.PoolAdd_box_price_left_token_info}
                onClick={() => setOpenTokenModelOne(true)}
              >
                <p>
                  <Image
                    src={images.etherlogo}
                    alt="image"
                    width={20}
                    height={20}
                  />
                </p>
                <p>{tokenOne.name || "ETH"}</p>
              </div>
              <div
                className={Style.PoolAdd_box_price_left_token_info}
                onClick={() => setOpenTokenModelTwo(true)}
              >
                <p>
                  <Image
                    src={images.etherlogo}
                    alt="image"
                    width={20}
                    height={20}
                  />
                </p>
                <p>{tokenTwo.name || "Select"}</p>
              </div>
            </div>

            <div className={Style.PoolAdd_box_price_left_fee}>
              <div className={Style.PoolAdd_box_price_left_fee_left}>
                <h4>Fee teir</h4>
                <p>The % you will earn in fees</p>
              </div>
              {openFee ? (
                <button onClick={() => setOpenFee(false)}>Hide</button>
              ) : (
                <button onClick={() => setOpenFee(true)}>Show</button>
              )}
            </div>

            {openFee && (
              <div className={Style.PoolAdd_box_price_left_list}>
                {feePairs.map((el, i) => (
                  <div
                    className={Style.PoolAdd_box_price_left_list_item}
                    key={i + 1}
                    onClick={() => (setActive(i + 1), setFee(el.feeSystem))}
                  >
                    <div
                      className={Style.PoolAdd_box_price_left_list_item_info}
                    >
                      <p>{el.fee}</p>
                      <p>
                        {active == i + 1 ? (
                          <Image
                            src={images.tick}
                            alt="image"
                            width={20}
                            height={20}
                          />
                        ) : (
                          ""
                        )}
                      </p>
                    </div>

                    <small>{el.info}</small>
                    <p className={Style.PoolAdd_box_price_left_list_item_para}>
                      {el.number}
                    </p>
                  </div>
                ))}
              </div>
            )}

            <div className={Style.PoolAdd_box_deposit}>
              <h4>Deposit Amount</h4>

              <div className={Style.PoolAdd_box_deposit_box}>
                <input
                  type="number"
                  placeholder={formatTokenBalance(tokenOne.tokenBalance)}
                  onChange={(e) => setTokenAmount1(e.target.value)}
                />
                <div className={Style.PoolAdd_box_deposit_box_input}>
                  <p>
                    <small>{tokenOne.name || "ETH"}</small> {""}
                    {""}
                    {tokenOne.symbol || "Ether"}
                  </p>
                </div>
              </div>

              <div className={Style.PoolAdd_box_deposit_box}>
                <input
                  type="number"
                  placeholder={formatTokenBalance(tokenTwo.tokenBalance)}
                  onChange={(e) => setTokenAmount2(e.target.value)}
                />
                <div className={Style.PoolAdd_box_deposit_box_input}>
                  <p>
                    <small>{tokenTwo.name || "ETH"}</small> {""}
                    {""}
                    {tokenTwo.symbol || "Select"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className={Style.PoolAdd_box_price_right}>
            <h4>Set Price Range</h4>
            <div className={Style.PoolAdd_box_price_right_box}>
              <p className={Style.PoolAdd_box_price_right_box_para}>
                Current Price: 41.1494 {tokenOne.name || "ETH"} per{" "}
                {tokenTwo.name || "Select"}
              </p>
              <Image src={images.wallet} alt="wallet" height={80} width={80} />
              <h3>Your position will appear here.</h3>
            </div>

            <div className={Style.PoolAdd_box_price_right_range}>
              <div className={Style.PoolAdd_box_price_right_range_box}>
                <p>Min Price</p>
                <input
                  type="number"
                  placeholder="0.000"
                  min="0.00"
                  step="0.001"
                  className={Style.PoolAdd_box_price_right_range_box_para}
                  onChange={(e) => setMinPrice(e.target.value)}
                />
                <p>
                  {""}
                  {tokenOne.name || "ETH"} per {tokenTwo.name || "Select"}
                </p>
              </div>

              <div className={Style.PoolAdd_box_price_right_range_box}>
                <p>Max Price</p>
                <input
                  type="number"
                  placeholder="0.000"
                  min="0.00"
                  step="0.001"
                  className={Style.PoolAdd_box_price_right_range_box_para}
                  onChange={(e) => setMaxPrice(e.target.value)}
                />
                <p>
                  {""}
                  {tokenOne.name || "ETH"} per {tokenTwo.name || "Select"}
                </p>
              </div>
            </div>

            <div className={Style.PoolAdd_box_price_right_amount}>
              <button
                onClick={() =>
                  createLiquidityAndPool({
                    tokenAddress0: tokenOne.tokenAddress,
                    tokenAddress1: tokenTwo.tokenAddress,
                    fee: fee,
                    tokenPrice1: minPrice,
                    tokenPrice2: maxPrice,
                    slippage: slippage,
                    deadline: deadline,
                    tokenAmmount0: tokenAmount1,
                    tokenAmmount1: tokenAmount2,
                  })
                }
              >
                Add Liquidity
              </button>
            </div>
          </div>
        </div>
      </div>

      {openModel && (
        <div className={Style.token}>
          <Token
            setOpenSetting={setOpenModel}
            setSlippage={setSlippage}
            slippage={slippage}
            deadline={deadline}
            setDeadline={setDeadline}
          />
        </div>
      )}

      {openTokenModelOne && (
        <div className={Style.token}>
          <SearchToken
            openToken={setOpenTokenModelOne}
            tokens={setTokenOne}
            tokenData={tokenData}
          />
        </div>
      )}
      {openTokenModelTwo && (
        <div className={Style.token}>
          <SearchToken
            openToken={setOpenTokenModelTwo}
            tokens={setTokenTwo}
            tokenData={tokenData}
          />
        </div>
      )}
    </div>
  );
};

export default PoolAdd;
