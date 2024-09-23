import React, { useEffect, useState } from "react";
import Image from "next/image";

import Style from "../styles/Tokens.module.css";
import images from "../assets";
import { AllTokens } from "../Components/index";

const Tokens = () => {
  const [allTokenList, setAllTokenList] = useState([
    {
      number: 1,
      image: images.etherlogo,
      name: "Ether1",
      symbol: "ETH1",
      price: "$12,345",
      change: "+ 234.5",
      tvl: "$7894.5 M",
      volume: "$716.5 M",
    },
    {
      number: 2,
      image: images.etherlogo,
      name: "Ether2",
      symbol: "ETH2",
      price: "$12,345",
      change: "+ 234.5",
      tvl: "$7894.5 M",
      volume: "$716.5 M",
    },
    {
      number: 3,
      image: images.etherlogo,
      name: "Ether3",
      symbol: "ETH3",
      price: "$12,345",
      change: "+ 234.5",
      tvl: "$7894.5 M",
      volume: "$716.5 M",
    },
    {
      number: 4,
      image: images.etherlogo,
      name: "Ether4",
      symbol: "ETH4",
      price: "$12,345",
      change: "+ 234.5",
      tvl: "$7894.5 M",
      volume: "$716.5 M",
    },
  ]);

  const [coppyAllTokenList, setCoppyAllTokenList] = useState(allTokenList);
  const [search, setSearch] = useState("");
  const [searchItem, setSearchItem] = useState(search);

  const onHandleSearch = (value) => {
    const fillteredTokens = allTokenList.filter(({ name }) =>
      name.toLowerCase().includes(value.toLowerCase())
    );

    if (fillteredTokens.length === 0) {
      setAllTokenList(coppyAllTokenList);
    } else {
      setAllTokenList(fillteredTokens);
    }
  };

  const onClearSearch = () => {
    if (allTokenList.length && coppyAllTokenList.length) {
      setAllTokenList(coppyAllTokenList);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => setSearch(searchItem), 1000);

    return () => clearTimeout(timer);
  }, [searchItem]);

  useEffect(() => {
    if (search) {
      onHandleSearch(search);
    } else {
      onClearSearch();
    }
  }, [search]);

  return (
    <div className={Style.Tokens}>
      <div className={Style.Tokens_box}>
        <h2>Top tokens on Uniswap</h2>
        <div className={Style.Tokens_box_header}>
          <div className={Style.Tokens_box_ethereum}>
            <p>
              <Image
                src={images.etherlogo}
                alt="etehr"
                width={20}
                height={20}
              />
            </p>
            <p>Ethereum</p>
          </div>
          <div className={Style.Tokens_box_search}>
            <p>
              <Image src={images.search} alt="image" width={20} height={20} />
            </p>
            <input
              type="text"
              placeholder="Filter tokes"
              onChange={(e) => setSearchItem(e.target.value)}
              value={searchItem}
            />
          </div>
        </div>

        <AllTokens allTokenList={allTokenList} />
      </div>
    </div>
  );
};

export default Tokens;
