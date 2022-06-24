const DAI_ADDRESS = "";
const TUT_ADDRESS = ""; // From Lab 6

const getAccount = async () => {};

const getAddressA = () => DAI_ADDRESS;

const getAddressB = () => TUT_ADDRESS;

const getBalance = async (tokenAddrA, tokenAddrB, account) => {};

const sellTokens = async (inputAmt, inputAddr, outputAddr, account) => {};

const buyTokens = async (outputAmt, outputAddr, inputAddr, account) => {
    throw new Error("ECA");
};

export {
    getAddressA,
    getAddressB,
    getBalance,
    getAccount,
    sellTokens,
    buyTokens,
};
