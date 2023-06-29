import { ethers } from "ethers";

export interface Transaction {
  hash: string;
  blockNumber: string;
  from: string;
  fromName: string;
  to: string;
  toName: string;
  value: ethers.BigNumberish;
  timeStamp: string;
  gasFee: ethers.BigNumberish;
}

export type PageType = "transactions" | "tokenBalance";
