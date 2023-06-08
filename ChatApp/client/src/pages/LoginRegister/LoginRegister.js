import {useState,useContext, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import { AppContext } from "../../contexts/AppContext";
import axios from "axios";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormInput from "./pageComponents/FormInput";

const LoginRegister = (props) => {
    const {title} = props;
    const {userMsg,setUserMsg,setIsLoggedIn,setFromUserId,setFromUsername,reset} = useContext(AppContext);
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        setUserMsg("");
    },[]);

    const handleClick = async(event) => {
        event.preventDefault();
        if (title === "Register") {
            try {
                if (username && password) {
                    const response = await axios.post("/register",
                    {
                        username,
                        password
                    })
                    setUserMsg("");
                    navigate("/login");
                }
            } catch (err) {
                setUserMsg(err.response.data.msg);
            }
        } else {
            try {
                const response = await axios.post("/login",
                {
                    username,
                    password
                })
                setUserMsg("");
                setFromUserId(response.data.user[0].user_id);
                setFromUsername(response.data.user[0].username);
                userStatus(response.data.user[0].user_id);
                setIsLoggedIn(true);
                navigate("/chat");
            } catch (err) {
                console.log(err);
                setUserMsg(err.response.data.msg);
            }
        }
    }

    const userStatus = async(fromId) => {
        try {
            const result = await axios.post("/userStatus",{
                fromId
            })
        } catch (err) {
        };
    };

    return (
        <section className="loginRegisterContainer">
            <h1 className="lrTitle">{title}</h1>
            <Box component="form" sx={{display: "flex", flexDirection: "column", margin: "0 auto", width: "50%"}} noValidate autoComplete="off">
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
                <Button variant="contained" onClick={handleClick}>{title}</Button>
            </Box>
            <p className="userMsg">{userMsg}</p>
        </section>
    )
}

export default LoginRegister;