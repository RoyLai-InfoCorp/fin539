require("@nomiclabs/hardhat-ethers");
require("dotenv").config();

module.exports = {
    solidity: "0.8.8",
    networks: {
        hardhat: {
            forking: {
                url: process.env.FIN579_ALCHEMY_URLAPIKEY,
            },
            accounts: {
                mnemonic: process.env.FIN579_MNEMONIC,
            },
            timeout: 60000,
        },
    },
};
