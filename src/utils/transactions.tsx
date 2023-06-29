import axios from "axios";
import { Transaction } from "./types";
import { ethers } from "ethers";
import erc20Abi from "@openzeppelin/contracts/build/contracts/ERC20.json";

const alchemyApiKey = process.env.REACT_APP_ALCHEMY_API_KEY;
const etherscanApiKey = process.env.REACT_APP_ETHERSCAN_API_KEY;

const provider = new ethers.AlchemyProvider("mainnet", alchemyApiKey);
export async function fetchTransactionData(
  address: string,
  blocknumber: string,
  order: "asc" | "desc",
  page: number,
  limit: number
): Promise<Transaction[]> {
  const response = await axios.get("https://api.etherscan.io/api", {
    params: {
      module: "account",
      action: "txlist",
      address: address,
      sort: order,
      apikey: etherscanApiKey,
      startblock: blocknumber,
      page: page,
      offset: limit,
    },
  });

  if (response.status === 200) {
    try {
      const transactions: Transaction[] = response?.data?.result?.map(
        (tx: any) => {
          return {
            hash: tx.hash,
            blockNumber: tx.blockNumber,
            from: tx.from,
            fromName: "",
            to: tx.to,
            toName: "",
            value: ethers.toBigInt(tx.value),
            timeStamp: tx.timeStamp,
            gasFee: ethers.toBigInt(tx.gasPrice * tx.gasUsed),
          };
        }
      );
      return transactions;
    } catch (error) {
      return [];
    }
  }
  return [];
}

export async function getBlockNumberAtDate(targetDate: Date): Promise<number> {
  const unixTimestamp = Math.floor(targetDate.getTime() / 1000);
  const apiUrl = `https://api.etherscan.io/api?module=block&action=getblocknobytime&timestamp=${unixTimestamp}&closest=before&apikey=${etherscanApiKey}`;

  const response = await axios.get(apiUrl);
  const blockNumber = Number(response.data.result);

  return blockNumber;
}

export async function getETHBalanceOnDate(
  walletAddress: string,
  targetDate: Date
): Promise<string> {
  // Get the block number by timestamp
  const blockNumber = await getBlockNumberAtDate(targetDate);

  // Get the ETH balance of the wallet at the specified block
  const balance = await provider.getBalance(walletAddress, blockNumber);

  return Number(ethers.formatEther(balance)).toFixed(2);
}

export async function calculateTokenBalance(
  walletAddress: string,
  targetDate: Date,
  contractAddress: string
) {
  const provider = new ethers.AlchemyProvider("mainnet", alchemyApiKey);
  if (contractAddress === "") {
    return await getETHBalanceOnDate(walletAddress, targetDate);
  }

  // Step 1: Get current USDT balance by directly calling USDT contract
  const usdtContract = new ethers.Contract(
    contractAddress,
    erc20Abi.abi,
    provider
  );

  const currentBalance = await usdtContract.balanceOf(walletAddress);
  const decimals = await usdtContract.decimals();
  const targetBlock = await getBlockNumberAtDate(targetDate);

  const apiUrl = `https://api.etherscan.io/api?module=account&action=tokentx&page=1&offset=100&startblock=${targetBlock}&endblock=latest&contractaddress=${contractAddress}&address=${walletAddress}&apikey=${etherscanApiKey}&sort=desc`;
  const response = await axios.get(apiUrl);

  let token_balance = Number(
    ethers.formatUnits(currentBalance.toString(), decimals)
  );
  for (const transaction of response.data?.result) {
    let transaction_value = Number(
      ethers.formatUnits(transaction.value.toString(), decimals)
    );
    if (
      transaction.from.toString().toLowerCase() ===
      walletAddress.toString().toLowerCase()
    ) {
      token_balance += transaction_value;
    }
    if (
      transaction.to.toString().toLowerCase() ===
      walletAddress.toString().toLowerCase()
    ) {
      token_balance = token_balance - transaction_value;
    }
  }

  return token_balance.toFixed(2).toString();
}

// Validate Ethereum token address format
export const isValidTokenAddress = (address: string) => {
  return ethers.isAddress(address);
};

// Validate Ethereum wallet address format
export const isValidWalletAddress = (address: string) => {
  return ethers.isAddress(address);
};
