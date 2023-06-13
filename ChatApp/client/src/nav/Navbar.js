import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AppContext } from "../contexts/AppContext";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import NavbarSmall from "./NavbarSmall";
import NavbarLarge from "./NavbarLarge";
import "./Navbar.css";

const Navbar = () => {
  const {
    fromUserId,
    setFromUserId,
    isLoggedIn,
    setIsLoggedIn,
    reset,
    setUserMsg,
  } = useContext(AppContext);

  const navigate = useNavigate();

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

  const pages = [
    { id: 1, name: "Register", toLink: "/register", onClick: resetUserMsg },
    { id: 2, name: "Login", toLink: "/login", onClick: resetUserMsg },
    { id: 3, name: "Chat", toLink: "/chat", onClick: null },
  ];

  if (isLoggedIn) {
    pages.push({ id: 4, name: "Logout", toLink: null, onClick: logout });
  };

  return (
    <>
      <AppBar className="appBar" position="fixed">
        <Toolbar className="toolbar">
          <NavbarSmall pages={pages} />
          <NavbarLarge pages={pages} />
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  );
};

export default Navbar;
