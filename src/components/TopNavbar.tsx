import styled from "styled-components";
import { AppBar, Toolbar, IconButton } from "@mui/material";
import { PageType } from "../utils/types";

// Define the navbar styles using styled components
const StyledAppBar = styled(AppBar)`
  background-color: #fff;
`;

const StyledToolBar = styled(Toolbar)`
  max-width: 1440px;
  width: 100%;
  margin: auto;
`;

const Logo = styled.img`
  height: 50px;
`;

const NavbarItem = styled.div<{ isSelected: boolean }>`
  margin: 0 15px;
  font-size: 20px;
  font-weight: ${(props) => (props.isSelected ? 600 : 400)};
  color: ${(props) => (props.isSelected ? "#fff" : "#aaa")};
  cursor: pointer;
  border-bottom: ${(props) => (props.isSelected ? "3px solid #fff" : "none")};
  padding: 10px;
`;

interface TopNavbarProp {
  selectedNavItem: PageType;
  setSelectedNavItem: (value: PageType) => void;
}

export default function TopNavbar({
  selectedNavItem,
  setSelectedNavItem,
}: TopNavbarProp) {
  const handleNavItemSelect = (item: PageType) => {
    setSelectedNavItem(item);
  };

  return (
    <StyledAppBar position="static">
      <StyledToolBar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="logo"
          sx={{ marginRight: "20px" }}
        >
          <Logo src="/logo.png" alt="Logo" />
        </IconButton>
        <NavbarItem
          onClick={() => handleNavItemSelect("transactions")}
          isSelected={selectedNavItem === "transactions" ? true : false}
        >
          Transactions
        </NavbarItem>
        <NavbarItem
          onClick={() => handleNavItemSelect("tokenBalance")}
          isSelected={selectedNavItem === "tokenBalance" ? true : false}
        >
          Token Balance
        </NavbarItem>
      </StyledToolBar>
    </StyledAppBar>
  );
}
