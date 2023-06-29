import React from "react";
import styled from "styled-components";
import { Button, Grid, TextField } from "@mui/material";

// Define the search group styles using styled components
const StyledGrid = styled(Grid)`
  margin: 20px 0;
`;

const SearchButton = styled(Button)`
  margin-left: 10px;
`;

// Prop type
type SearchGroupPropType = {
  setWalletAddress: (value: string) => void;
  setBlockNumber: (value: string) => void;
};

export default function SearchGroup(props: SearchGroupPropType) {
  const [wallet, setWallet] = React.useState("");
  const [block, setBlock] = React.useState("");

  const handleSearch = () => {
    if (wallet !== "") props.setWalletAddress(wallet);
    if (block !== "") props.setBlockNumber(block);
  };
  return (
    <StyledGrid container gap="10px" alignItems="center" margin="auto">
      <Grid item xs={12} sm={4}>
        <TextField
          fullWidth
          label="Wallet Address"
          variant="outlined"
          size="small"
          value={wallet}
          onChange={(e) => setWallet(e.target.value)}
        />
      </Grid>
      <Grid item xs={12} sm={3}>
        <TextField
          fullWidth
          label="Start Block Number"
          variant="outlined"
          size="small"
          value={block}
          onChange={(e) => setBlock(e.target.value)}
        />
      </Grid>
      <Grid item xs={12} sm={2}>
        <SearchButton
          variant="contained"
          color="primary"
          size="medium"
          onClick={handleSearch}
        >
          Search
        </SearchButton>
      </Grid>
    </StyledGrid>
  );
}
