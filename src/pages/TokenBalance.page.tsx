import React, { useState } from "react";
import styled from "styled-components";
import { ethers } from "ethers";
import {
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Avatar,
  Stack,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {
  calculateTokenBalance,
  isValidTokenAddress,
  isValidWalletAddress,
} from "../utils/transactions";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs, { Dayjs } from "dayjs";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px;
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 16px;
`;

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 16px;
`;

const ResultContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 16px;
`;

const LoadingIndicator = styled(CircularProgress)`
  margin-right: 8px;
`;

const tokenOptions = [
  {
    label: "Ether",
    value: "ether",
    contractAddress: "",
    logo: "/tokens/Ethereum.png",
  },
  {
    label: "USDT",
    value: "usdt",
    contractAddress: "0xdac17f958d2ee523a2206206994597c13d831ec7",
    logo: "/tokens/USDT.png",
  },
  {
    label: "USDC",
    value: "usdc",
    contractAddress: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
    logo: "/tokens/USDC.png",
  },
  {
    label: "Matic",
    value: "matic",
    contractAddress: "0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0",
    logo: "/tokens/Polygon.png",
  },
  {
    label: "BNB",
    value: "bnb",
    contractAddress: "0xB8c77482e45F1F44dE1745F52C74426C631bDD52",
    logo: "/tokens/Binance.png",
  },
  { label: "Custom Token", value: "custom", logo: "logo-ether.jpg" },
];

function TokenBalancePage() {
  const [walletAddress, setWalletAddress] = useState("");
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(
    dayjs(new Date())
  );
  const [selectedToken, setSelectedToken] = useState(tokenOptions[0]);
  const [customTokenAddress, setCustomTokenAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [tokenAmount, setTokenAmount] = useState("");
  const [walletAddressError, setWalletAddressError] = useState(false);
  const [tokenAddressError, setTokenAddressError] = useState(false);

  const handleCalculate = async () => {
    try {
      // Check address validation
      if (!isValidWalletAddress(walletAddress)) {
        setWalletAddressError(true);
        return;
      } else {
        setWalletAddressError(false);
      }

      if (
        selectedToken.value === "custom" &&
        !isValidTokenAddress(customTokenAddress)
      ) {
        setTokenAddressError(true);
        return;
      } else {
        setTokenAddressError(false);
      }

      setLoading(true);

      let contractAddress = "";
      if (selectedToken.value === "custom") {
        contractAddress = customTokenAddress;
      } else contractAddress = selectedToken.contractAddress ?? "";
      // Call your calculateTokenBalance function here
      const tokenBalance = await calculateTokenBalance(
        walletAddress,
        selectedDate?.toDate() ?? new Date(),
        contractAddress
      );
      setTokenAmount(tokenBalance.toString());
    } catch (error) {
      console.error("Error calculating token amount:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Container>
        <FormContainer>
          <TextField
            label="Wallet Address"
            value={walletAddress}
            onChange={(e) => setWalletAddress(e.target.value)}
            variant="outlined"
            required
            error={walletAddressError}
          />
          <DatePicker
            label="Select Date"
            value={selectedDate}
            onChange={(date) => setSelectedDate(date)}
          />
          <FormControl variant="outlined" required>
            <InputLabel>Token Type</InputLabel>
            <Select
              value={selectedToken.value}
              onChange={(e) => {
                setSelectedToken(
                  tokenOptions.find((item) => item.value === e.target.value) ??
                    tokenOptions[0]
                );
              }}
              label="Token Type"
            >
              {tokenOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  <Stack flexDirection="row">
                    <Avatar
                      src={option.logo}
                      sx={{ marginRight: "8px", width: "24px", height: "24px" }}
                    />
                    <span>{option.label}</span>
                  </Stack>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {selectedToken.value === "custom" && (
            <TextField
              label="Contract Address"
              value={customTokenAddress}
              onChange={(e) => setCustomTokenAddress(e.target.value)}
              variant="outlined"
              required
              error={tokenAddressError}
            />
          )}
          <Button variant="contained" onClick={handleCalculate}>
            Calculate
          </Button>
        </FormContainer>
        {loading ? (
          <LoaderContainer>
            <LoadingIndicator size={24} />
            <Typography variant="subtitle1">
              Calculating token amount...
            </Typography>
          </LoaderContainer>
        ) : (
          <ResultContainer>
            {tokenAmount && (
              <Typography variant="h6">
                Token Amount: {tokenAmount} {selectedToken.label}
              </Typography>
            )}
          </ResultContainer>
        )}
      </Container>
    </LocalizationProvider>
  );
}

export default TokenBalancePage;
