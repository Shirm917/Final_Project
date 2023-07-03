import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../contexts/AppContext";
import { socket } from "../../utils/socket";
import axios from "axios";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormInput from "./pageComponents/FormInput";

const LoginRegister = (props) => {
  const { title } = props;
  const { userMsg, setUserMsg, setIsLoggedIn, setFromUserId, setFromUsername } =
    useContext(AppContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    setUserMsg("");
  }, []);

  const handleClick = async (event) => {
    event.preventDefault();
    if (title === "Register") {
      try {
        if (username && password) {
          await axios.post("/register", {
            username,
            password,
          });
          setUserMsg("");
          navigate("/login");
        }
      } catch (err) {
        setUserMsg(err.response.data.msg);
      }
    } else {
      try {
        const response = await axios.post("/login", {
          username,
          password,
        });
        handleLoginSuccess(
          response.data.user[0].user_id,
          response.data.user[0].username
        );
      } catch (err) {
        setUserMsg(err.response.data.msg);
      }
    }
  };

  const handleLoginSuccess = (fromUserId, fromUsername) => {
    setUserMsg("");
    setFromUserId(fromUserId);
    setFromUsername(fromUsername);
    userStatus(fromUserId);
    setIsLoggedIn(true);
    connectSocket(fromUserId);
    navigate("/chat");
  };

  const userStatus = async (fromUserId) => {
    try {
      await axios.post("/userStatus", {
        fromUserId,
      });
    } catch (err) {}
  };

  const connectSocket = (fromUserId) => {
    socket.auth = { fromUserId };
    socket.connect();

    socket.on("connect", () => {
      socket.emit("socket connected");
    });
  };

  return (
    <section className="loginRegisterContainer">
      <h1 className="lrTitle">{title}</h1>
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          margin: "0 auto",
          width: "50%",
        }}
        noValidate
        autoComplete="off"
      >
        <FormInput
          id="username"
          type="text"
          label="Enter Username"
          value={username}
          setValue={setUsername}
        />
        <FormInput
          id="password"
          type="password"
          label="Enter Password"
          value={password}
          setValue={setPassword}
        />
        <Button variant="contained" onClick={handleClick}>
          {title}
        </Button>
      </Box>
      <p className="userMsg">{userMsg}</p>
    </section>
  );
};

export default LoginRegister;
