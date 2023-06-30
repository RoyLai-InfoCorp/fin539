require("@nomiclabs/hardhat-ethers");
require("dotenv").config();

module.exports = {
  networks: {
    hardhat: {
      accounts: {
        mnemonic: process.env.GOERLI_MNEMONIC,
      },
    },
    goerli: {
      chainId: 5,
      url: process.env.GOERLI_APIURL,
      accounts: {
        mnemonic: process.env.GOERLI_MNEMONIC,
      },
    },
  },
};
