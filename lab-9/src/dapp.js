import { ethers, BigNumber } from "ethers";
const DISTILLERY_ADDRESS = "0x22902DBbB26fAF3fAfB76dfc0Ceb2d6Fb0EEd0a9";
const CHRONIUM_ADDRESS = "0xA9cc515ab245df0F0B6Fd6d270A18679C99474ff";
const provider = new ethers.providers.Web3Provider(window.ethereum);

const getAccount = async () => {
    await provider.send("eth_requestAccounts", []); // Login to metamask
    const account = provider.getSigner();
    return account;
};

const distill = async(time)=>{
    console.log('distill');
}

const getChroniumBalance = async()=>{
    console.log('getChroniumBalance');
    return 0;
}

const getTimeBalance = async()=>{
    console.log('getTimeBalance');
    return 0;
}

export {
    distill,
    getChroniumBalance,
    getTimeBalance,
    getAccount,
};
