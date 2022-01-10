import Web3 from "web3";
import { metadataKey } from "../connections/Pinata";

const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");

const contractAbi = require("../connections/ContractAbi.json");
const contractAddress = "0x522CF386461478000286B37DC804E6899e675e05";

export let address = null;
export const connectWallet = async () => {
  const network = await web3.eth.net.getNetworkType();
  const accounts = await web3.eth.getAccounts();
  address = accounts[0];
};

export const mintNft = async () => {
const minterContract = new web3.eth.Contract(contractAbi, contractAddress)

  const result = await minterContract.methods
    .createToken(metadataKey)
    .send({from: address});
  console.log(result);
};
