import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { socket } from "../utils/socket";
import { AppContext } from "../contexts/AppContext";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import NavbarSmall from "./NavbarSmall";
import NavbarLarge from "./NavbarLarge";
import "./Navbar.css";

const Navbar = () => {
  const {
    isLoggedIn,
    reset,
    setUserMsg,
  } = useContext(AppContext);

  const navigate = useNavigate();

  const logout = () => {
    reset();
    navigate("/");
  };

  const resetUserMsg = () => {
    setUserMsg("");
  };

  const pages = [
    { id: 1, name: "Register", toLink: "/register", onClick: resetUserMsg },
    { id: 2, name: "Login", toLink: "/login", onClick: resetUserMsg },
    { id: 3, name: "Chat", toLink: "/chat"},
  ];

  return (
    <nav>
      <AppBar className="appBar" position="fixed">
        <Toolbar className="toolbar">
          <NavbarSmall pages={pages} logout={logout} isLoggedIn={isLoggedIn} />
          <NavbarLarge pages={pages} logout={logout} isLoggedIn={isLoggedIn} />
        </Toolbar>
      </AppBar>
      <Toolbar />
    </nav>
  );
};

export default Navbar;
