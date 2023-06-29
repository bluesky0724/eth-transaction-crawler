import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import TransactionHistoryPage from "./pages/TransactionHistory.page";
import { AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import styled from "styled-components";
import TopNavbar from "./components/TopNavbar";
import { PageType } from "./utils/types";
import TokenBalnacePage from "./pages/TokenBalance.page";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

function App() {
  const [selectedNavItem, setSelectedNavItem] =
    useState<PageType>("transactions");
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="App">
        <TopNavbar
          selectedNavItem={selectedNavItem}
          setSelectedNavItem={setSelectedNavItem}
        />
        {selectedNavItem === "transactions" && <TransactionHistoryPage />}
        {selectedNavItem === "tokenBalance" && <TokenBalnacePage />}
      </div>
    </LocalizationProvider>
  );
}

export default App;
