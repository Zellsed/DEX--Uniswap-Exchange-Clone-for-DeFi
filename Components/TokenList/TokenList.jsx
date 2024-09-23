import React from "react";
import Image from "next/image";

import Style from "./TokenList.module.css";
import images from "../../assets";

const TokenList = ({ tokenData, setOpenTokenBox }) => {
  const seenTokens = new Set();
  const tokenList = tokenData.filter((token) => {
    if (!seenTokens.has(token.tokenAddress)) {
      seenTokens.add(token.tokenAddress);
      return true;
    }
    return false;
  });

  const formatTokenBalance = (balance) => {
    if (balance.length <= 8) {
      return balance;
    }
    return `${balance.slice(0, 10)}...${balance.slice(-4)}`;
  };

  return (
    <div className={Style.TokenList}>
      <p
        className={Style.TokenList_close}
        onClick={() => setOpenTokenBox(false)}
      >
        <Image src={images.close} alt="close" width={50} height={50} />
      </p>
      <div className={Style.TokenList_title}>
        <h2>Your Token List</h2>
      </div>

      {tokenList.map((el, i) => (
        <div key={i} className={Style.TokenList_box}>
          <div className={Style.TokenList_box_info}>
            <p className={Style.TokenList_box_info_symbol}>{el.symbol}</p>
            <p>
              <span>{formatTokenBalance(el.tokenBalance)}</span> {el.name}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TokenList;
