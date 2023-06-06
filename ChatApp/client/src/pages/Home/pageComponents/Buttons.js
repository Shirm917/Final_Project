import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../../contexts/AppContext";
import Button from "@mui/material/Button";

const Buttons = () => {
  const { setUserMsg } = useContext(AppContext);

  const navigate = useNavigate();

  const resetUserMsg = () => {
    setUserMsg("");
  };

  const register = () => {
    resetUserMsg();
    navigate("/register");
  };

  const login = () => {
    resetUserMsg();
    navigate("/login");
  };

  return (
    <section className="loginRegBtns">
      <Button sx={{backgroundColor: "#1a237e", marginRight: "2%", width: "48%"}} variant="contained" onClick={register}>
        Register
      </Button>
      <Button sx={{backgroundColor: "#1a237e", marginLeft: "2%", width: "48%"}} variant="contained" onClick={login}>
        Login
      </Button>
    </section>
  );
};

export default Buttons;
