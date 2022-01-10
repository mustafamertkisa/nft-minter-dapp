import Web3 from "web3";
import { metadataKey } from "../connections/Pinata";

const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");

const contractAbi = require("../connections/ContractAbi.json");
const contractAddress = "0x522CF386461478000286B37DC804E6899e675e05";

let address = null;
export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const obj = {
        address: addressArray[0]
      };
      address = addressArray[0]
      return obj;
    } catch (err) {
      return {
        address: ""
      };
    }
  } else {
    return {
      address: ""
    };
  }
};

export const mintNft = async () => {
const minterContract = new web3.eth.Contract(contractAbi, contractAddress)

  const result = await minterContract.methods
    .createToken(metadataKey)
    .send({from: address});
  console.log(result);
};
