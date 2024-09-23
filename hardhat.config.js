// // require("@nomicfoundation/hardhat-toolbox");
// require("@nomiclabs/hardhat-waffle");

// /** @type import('hardhat/config').HardhatUserConfig */
const ETHEREUM_HOLESKY =
  "https://holesky.infura.io/v3/9c481e1168e54cd39869bd50daa755bd";

const PRIVATE_KEY =
  "bab5a6356dd7d87959287261acca67993661aa0256db48a6dfa6d11d37d5e5cb";

// module.exports = {
//   solidity: {
//     compilers: [
//       {
//         version: "0.7.6",
//         settings: {
//           evmVersion: "istanbul",
//           optimizer: {
//             enabled: true,
//             runs: 1000,
//           },
//         },
//       },
//     ],
//   },
//   networks: {
//     hardhat: {
//       forking: {
//         url: "https://eth-mainnet.g.alchemy.com/v2/XbTCI1sk-nWg_2lJu90LU9FjQS6I94qj",
//       },
//     },

//     ethereum: {
//       url: "https://mainnet.infura.io/v3/9c481e1168e54cd39869bd50daa755bd",
//       accounts: [`0x${PRIVATE_KEY}`],
//     },

//     ethereum_holesky: {
//       url: ETHEREUM_HOLESKY,
//       accounts: [`0x${PRIVATE_KEY}`],
//     },
//   },
// };

require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: {
    version: "0.7.6",
    settings: {
      optimizer: {
        enabled: true,
        runs: 5000,
        details: { yul: false },
      },
    },
  },
  networks: {
    hardhat: {
      forking: {
        url: "https://eth-mainnet.g.alchemy.com/v2/XbTCI1sk-nWg_2lJu90LU9FjQS6I94qj",
        accounts: [`0x${PRIVATE_KEY}`],
      },
    },
  },
};
