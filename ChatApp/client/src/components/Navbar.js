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
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import "./Navbar.css";

const pages = [
  { id: 1, name: "Chat", toLink: "/chat", onClick: null },
  { id: 2, name: "Register", toLink: "/register", onClick: "chatMsg" },
  { id: 3, name: "Login", toLink: "/login", onClick: "chatMsg" },
  { id: 4, name: "Logout", toLink: null, onClick: "logout" },
];

const Navbar = () => {
  const { fromUserId, setFromUserId, setIsLoggedIn, reset, setUserMsg } =
    useContext(AppContext);
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
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

  return (
    <Box>
      <AppBar position="fixed" className="bar">
        <Toolbar className="toolbar">
          <NavLink to="/" className="link">
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="chat"
              sx={{ mr: 2 }}
            >
              <ChatIcon />
              <Typography>CHAT APP</Typography>
            </IconButton>
          </NavLink>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
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
            sx={{
              display: { xs: "block", sm: "block", md: "none", lg: "none" },
            }}
          >
            {pages.map((page) => (
              <MenuItem key={page.id} onClick={handleCloseNavMenu}>
                <NavLink className="link" to={page.toLink} onClick={page.onClick}>
                  {page.name}
                </NavLink>
              </MenuItem>
            ))}
          </Menu>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', sm: "none", md: 'flex', lg: "flex" }, justifyContent: "space-evenly" }}>
            {pages.map((page) => (
              <NavLink
                key={page.id}
                className="link"
                to={page.toLink}
                onClick={page.onClick}
                sx={{ my: 2, display: 'block' }}
              >
                {page.name}
              </NavLink>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
