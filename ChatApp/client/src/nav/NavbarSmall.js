import { useState } from "react";
import { NavLink } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ChatIcon from "@mui/icons-material/Chat";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";

const NavbarSmall = (props) => {
  const { pages, logout, isLoggedIn } = props;

  const [anchorElNav, setAnchorElNav] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: { xs: "flex", md: "none" },
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Box>
        <IconButton
          size="large"
          aria-label="nav menu"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleOpenNavMenu}
          color="inherit"
        >
          <MenuIcon />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorElNav}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          open={Boolean(anchorElNav)}
          onClose={handleCloseNavMenu}
        >
          {pages.map((page) => (
            <MenuItem key={page.id} onClick={handleCloseNavMenu}>
              <NavLink
                className="link smallPage"
                to={page.toLink}
                onClick={page.onClick}
              >
                {page.name}
              </NavLink>
            </MenuItem>
          ))}
          {isLoggedIn ? (
            <MenuItem>
              <button className="logoutBtn smallPage" onClick={logout}>
                Logout
              </button>
            </MenuItem>
          ) : null}
        </Menu>
      </Box>
      <NavLink to="/" className="link titleContainer center">
        <IconButton size="large" edge="start" color="inherit" aria-label="chat">
          <ChatIcon />
        </IconButton>
        <Typography>CHAT APP</Typography>
      </NavLink>
    </Box>
  );
};

export default NavbarSmall;
