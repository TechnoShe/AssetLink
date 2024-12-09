import { PinataSDK } from "pinata-web3";
import dotenv from "dotenv";
dotenv.config();

const pinata = new PinataSDK({
  pinataJwt:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIxZGQ0MjMzYS0wYmYxLTRjYzctYmQ5Yi0xM2YzZjAyODllMmQiLCJlbWFpbCI6ImFsaXNoYWtvbmRhcHUxMjc2QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6IkZSQTEifSx7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6Ik5ZQzEifV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiIwOTY2Yzg0ODBkZTBiZDMzNGYwZCIsInNjb3BlZEtleVNlY3JldCI6ImU1M2JiZjNmNGRkNjAyMzQ0ZmUxNGNkZDBkYTdhYWViYTczZmRmNmE3ZjdjM2JjMzZlM2NlNzM3MTdhY2Q4NDEiLCJleHAiOjE3NjUyMTQ3NTV9.zgfniJmqMKFEVbCDsDpOY_DAZxeC1kJhGigWIchE3h4",
  pinataGateway: "bronze-hollow-primate-785.mypinata.cloud",
});
export const uploadToIPFS = async(data, isFile = true) => {
  try {
    let upload;
    if (isFile) {
      upload = await pinata.upload.file(data);
    } else {
      upload = await pinata.upload.json(data);
    }

    console.log("Upload response:", upload);
    const ipfsHash = upload.IpfsHash;
    console.log("IPFS Hash:", ipfsHash);
    const ipfsURL = `https://gateway.pinata.cloud/ipfs/${ipfsHash}`;

    console.log("IPFS URL:", ipfsURL);
    return ipfsURL;
  } catch (error) {
    console.error("Error uploading to IPFS:", error);
    throw error;
  }
};
