import SearchGroup from "../components/SearchGroup";
import { Stack } from "@mui/material";
import TransactionTable from "../components/TransactionDataTable";
import { useState } from "react";

export default function TransactionHistoryPage() {
  const [walletAddress, setWalletAddress] = useState("");
  const [blockNumber, setBlockNumber] = useState("");
  return (
    <Stack padding="30px" alignItems="center" maxWidth="1440px" margin="auto">
      <SearchGroup
        setWalletAddress={setWalletAddress}
        setBlockNumber={setBlockNumber}
      />
      <TransactionTable
        walletAddress={walletAddress}
        blockNumber={blockNumber}
      />
    </Stack>
  );
}
