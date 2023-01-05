// if props.title === "Register" we do the posts here to send the user and pass to the db, set msg to an empty string and navigate to login, if there's an error then in the catch set the msg to an err which will be sent from the backend
// else when we login we post and send the user and pass we just put in in the body. we then check in the back end if the user and pass are right if yes we naviagte to chat and set msg back to an empty string if not we send the msg and we set msg to the err 
import {useState,useContext, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import { AppContext } from "../../App";
import axios from "axios";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

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
        <div>
            <h1 className="lrTitle">{title}</h1>
            <Box component="form" sx={{display: "flex", flexDirection: "column", margin: "0 auto", width: "50%"}} noValidate autoComplete="off">
                <TextField
                    sx={{m:1}}
                    id="username"
                    label="Enter Username"
                    variant="outlined"
                    required
                    onChange={(event) => setUsername(event.target.value)}
                />
                <TextField
                    sx={{m:1}}
                    id="password"
                    type="password"
                    label="Enter Password"
                    variant="outlined"
                    required
                    onChange={(event) => setPassword(event.target.value)}
                />
                <Button variant="contained" onClick={handleClick}>{title}</Button>
            </Box>
            <p className="userMsg">{userMsg}</p>
        </div>
    )
}

export default LoginRegister;