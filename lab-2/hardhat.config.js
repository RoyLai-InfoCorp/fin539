require("@nomiclabs/hardhat-ethers");
module.exports = {
  networks: {
    hardhat: {
      accounts: {
        mnemonic: "--REPLACE-WITH-METAMASK-MNEMONIC-PASSPHRASE--",
      },
    },
  },
};
