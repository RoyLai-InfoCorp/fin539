import { ethers, BigNumber } from "ethers";
const CHRONIUM_ADDRESS = "0xDd6010412b61570bd6f0101460bb80bDbE103E28";
const DISTILLERY_ADDRESS = "0xa20f2c420f14418b580f60A4964727B66f34C88d";
const provider = new ethers.providers.Web3Provider(window.ethereum);

const tokens = [
  {
    symbol: "AAAA",
    tokenAddress: "0xaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  },
  {
    symbol: "BBBB",
    tokenAddress: "0xbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
  },
];

const getAccount = async () => {
  await provider.send("eth_requestAccounts", []); // Login to metamask
  const account = provider.getSigner();
  return account;
};

const distill = async (time) => {
  const account = await getAccount();
  const distillery = new ethers.Contract(
    DISTILLERY_ADDRESS,
    ["function distill(uint256)"],
    account
  );
  const response = await distillery.distill(time - 1);
  const receipt = await response.wait();
  console.log(receipt);
};

const getTimeBalance = async () => {
  const account = await getAccount();
  const chronium = new ethers.Contract(
    CHRONIUM_ADDRESS,
    ["function checkTimeBalance(address) view returns(uint256)"],
    account
  );
  return await chronium.checkTimeBalance(await account.getAddress());
};

// Get balance of ERC20 tokens
const balanceOf = async (tokenAddr) => {
  // TBD
  return 0;
};

// Sell exact amount of input tokens for output tokens using UniswapV2
const sellTokens = async (inputAmt, inputAddr, outputAddr) => {
  // TBD
};

// Buy exact amount of output tokens for input tokens using UniswapV2
const buyTokens = async (outputAmt, outputAddr, inputAddr) => {
  // TBD
};

export {
  tokens,
  distill,
  getTimeBalance,
  getAccount,
  sellTokens,
  buyTokens,
  balanceOf,
  CHRONIUM_ADDRESS,
};
