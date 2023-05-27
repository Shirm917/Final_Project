import { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { AppContext } from "../App";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ChatIcon from "@mui/icons-material/Chat";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import "./Navbar.css";

const Navbar = () => {
  const { fromUserId, setFromUserId, setIsLoggedIn, reset, setUserMsg } =
    useContext(AppContext);
  const [anchorElNav, setAnchorElNav] = useState(null);
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const logout = async () => {
    try {
      const dateNow = new Date();
      await axios.put("/logout", {
        timestamp: dateNow.toUTCString(),
        fromUserId,
      });
      setIsLoggedIn(false);
      setFromUserId(null);
      reset();
      navigate("/");
    } catch (err) {}
  };

  const chatMsg = () => {
    setUserMsg("");
  };

  const pages = [
    { id: 1, name: "Chat", toLink: "/chat", onClick: null },
    { id: 2, name: "Register", toLink: "/register", onClick: chatMsg },
    { id: 3, name: "Login", toLink: "/login", onClick: chatMsg },
    { id: 4, name: "Logout", toLink: null, onClick: logout },
  ];

  return (
    <Box>
      <AppBar position="fixed" className="bar">
        <Toolbar className="toolbar">
          <NavLink to="/" className="link titleContainer">
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="chat"
              sx={{ display: { xs: "none", md: "flex" }, mr: 2 }}
            >
              <ChatIcon />
            </IconButton>
            <Typography
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
              }}
            >
              CHAT APP
            </Typography>
          </NavLink>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "space-evenly",
            }}
          >
            {pages.map((page) => (
              <NavLink
                key={page.id}
                className="link bigPage"
                to={page.toLink}
                onClick={page.onClick}
                sx={{ my: 2, display: "block" }}
              >
                {page.name}
              </NavLink>
            ))}
          </Box>

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
              </Menu>
            </Box>
            <NavLink to="/" className="link titleContainer center">
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="chat"
              >
                <ChatIcon />
              </IconButton>
              <Typography>CHAT APP</Typography>
            </NavLink>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
