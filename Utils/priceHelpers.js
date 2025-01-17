const axios = require("axios");

const ETHERSCAN_API_KEY = "GWUC36QUJQSYT7PDC94M2WN6T6T8SN51G1";

exports.getAbi = async (address) => {
  const url = `https://api.etherscan.io/api?module=contract&action=getabi&address=${address}&apikey=${ETHERSCAN_API_KEY}`;

  const res = await axios.get(url);
  console.log(res.data);
  const abi = JSON.parse(res.data.result);

  return abi;
};

exports.getPoolImmutables = async (poolContract) => {
  const [token0, token1, fee] = await Promise.all([
    poolContract.token0(),
    poolContract.token1(),
    poolContract.fee(),
  ]);

  const immutables = {
    token0: token0,
    token1: token1,
    fee: fee,
  };

  return immutables;
};
