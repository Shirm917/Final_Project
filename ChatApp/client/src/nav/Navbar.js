import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AppContext } from "../contexts/AppContext";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import "./Navbar.css";

const Navbar = () => {
  const { fromUserId, setFromUserId, setIsLoggedIn, reset, setUserMsg } =
    useContext(AppContext);
  const [anchorElNav, setAnchorElNav] = useState(null);

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

  const resetUserMsg = () => {
    setUserMsg("");
  };

  return (
    <>
      <AppBar className="appbar" position="fixed">
        <Toolbar className="toolbar"></Toolbar>
      </AppBar>
      <Toolbar />
    </>
  );
};

export default Navbar;
