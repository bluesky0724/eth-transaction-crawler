import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { ethers } from "ethers";
import styled from "styled-components";
import { Transaction } from "../utils/types";
import { fetchTransactionData } from "../utils/transactions";

const columns = [
  {
    name: "Transaction Hash",
    sortable: false,
    wrap: true,
    cell: (row: Transaction) => (
      <a
        href={`https://etherscan.io/tx/${row.hash}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {row.hash}
      </a>
    ),
  },
  {
    name: "From",
    sortable: false,
    wrap: true,
    cell: (row: Transaction) => (
      <a
        href={`https://etherscan.io/address/${row.from}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {row.from}
      </a>
    ),
  },
  {
    name: "To",
    sortable: false,
    wrap: true,
    cell: (row: Transaction) => (
      <a
        href={`https://etherscan.io/address/${row.to}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {row.to}
      </a>
    ),
  },
  {
    name: "Value",
    sortable: false,
    wrap: true,
    cell: (row: Transaction) => `${ethers.formatEther(row.value)} ETH`,
  },
  {
    name: "Gas Fee",
    sortable: false,
    wrap: true,
    cell: (row: Transaction) => `${ethers.formatEther(row.gasFee)} ETH`,
  },
  {
    name: "Time Stamp",
    sortable: true,
    wrap: true,
    cell: (row: Transaction) =>
      new Date(parseInt(row.timeStamp) * 1000).toLocaleString(),
  },
];

// Transaction Table Prop Type
type TransactionTablePropType = {
  walletAddress: string;
  blockNumber: string;
};

export default function TransactionTable(props: TransactionTablePropType) {
  const [data, setData] = useState<Transaction[]>([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [timestampOrder, setTimeStampOrder] = useState<"asc" | "desc">("desc");

  function validateEthereumAddress(address: string) {
    const isAddress = ethers.isAddress(address);
    return isAddress;
  }

  useEffect(() => {
    (async () => {
      if (
        validateEthereumAddress(props.walletAddress) &&
        page &&
        limit &&
        props.blockNumber
      ) {
        const response = await fetchTransactionData(
          props.walletAddress,
          props.blockNumber,
          timestampOrder,
          page,
          limit
        );
        setData(response);
      }
    })();
  }, [props.walletAddress, props.blockNumber, page, limit, timestampOrder]);

  return (
    <CustomTable
      title="Ethereum Transactions"
      columns={columns as any}
      data={data}
      paginationTotalRows={100}
      pagination
      paginationServer
      paginationDefaultPage={page}
      paginationPerPage={limit}
      onSort={(col, sortDirection) => {
        setPage(1);
        if (col.name === "Time Stamp") setTimeStampOrder(sortDirection);
      }}
      onChangePage={(newpage) => {
        setPage(newpage);
      }}
      onChangeRowsPerPage={(newlimit) => setLimit(newlimit)}
    />
  );
}

const CustomTable = styled(DataTable)`
  .rdt_TableRow {
    font-size: 16px;
  }
  .rdt_TableCol {
    font-weight: bold;
    color: #333;
  }
  .rdt_TableHeadRow {
    background-color: #f5f5f5;
  }
  .rdt_TableHeadRow > div:first-child {
    border-radius: 10px 0 0 0;
  }
  .rdt_TableHeadRow > div:last-child {
    border-radius: 0 10px 0 0;
  }
  .rdt_TableRow:nth-child(even) {
    background-color: #f5f5f5;
  }
`;
