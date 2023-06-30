require("@nomiclabs/hardhat-ethers");
require("dotenv").config();

module.exports = {
  networks: {
    hardhat: {
      accounts: {
        mnemonic: process.env.GOERLI_MNEMONIC,
      },
    },
  },
};
