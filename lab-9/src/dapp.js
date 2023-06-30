import { ethers, BigNumber } from "ethers";
const DISTILLERY_ADDRESS = "0xa20f2c420f14418b580f60A4964727B66f34C88d";
const CHRONIUM_ADDRESS = "0xDd6010412b61570bd6f0101460bb80bDbE103E28";
const provider = new ethers.providers.Web3Provider(window.ethereum);

const getAccount = async () => {
  await provider.send("eth_requestAccounts", []); // Login to metamask
  const account = provider.getSigner();
};

const distill = async (time) => {
  console.log("distill");
};

const getChroniumBalance = async () => {
  console.log("getChroniumBalance");
  return 0;
};

const getTimeBalance = async () => {
  console.log("getTimeBalance");
  return 0;
};

export { distill, getChroniumBalance, getTimeBalance, getAccount };
