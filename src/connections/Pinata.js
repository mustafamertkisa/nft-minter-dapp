import { mintNft } from './Connect';

const axios = require('axios');

const pinataApiKey = "74b2194646b33bc4dcf4";
const pinataSecretApiKey = "d64289f47aee99c748a12ec1bc4b06ba58192869f4ee1b9ffb4c097f1303d7c1";

export let metadataKey = null;
export const pinJSONToIPFS = (JSONBody) => {
    const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
    return axios
        .post(url, JSONBody, {
            headers: {
                pinata_api_key: pinataApiKey,
                pinata_secret_api_key: pinataSecretApiKey
            }
        })
        .then(function (response) {
            console.log(response.data["IpfsHash"]);
            metadataKey = response.data["IpfsHash"];
            console.log(metadataKey);
            mintNft();
        })
        .catch(function (error) {
            console.log(error);
        });
};