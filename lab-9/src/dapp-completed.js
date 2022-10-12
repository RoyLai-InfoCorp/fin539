import { ethers, BigNumber } from "ethers";
const DISTILLERY_ADDRESS = "0xa20f2c420f14418b580f60A4964727B66f34C88d";
const CHRONIUM_ADDRESS = "0xDd6010412b61570bd6f0101460bb80bDbE103E28";
const provider = new ethers.providers.Web3Provider(window.ethereum);

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

const getChroniumBalance = async () => {
  const account = await getAccount();
  const chronium = new ethers.Contract(
    CHRONIUM_ADDRESS,
    ["function balanceOf(address) view returns(uint256)"],
    account
  );
  return await chronium.balanceOf(await account.getAddress());
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

export { distill, getChroniumBalance, getTimeBalance, getAccount };
