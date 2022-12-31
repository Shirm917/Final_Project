// if props.title === "Register" we do the posts here to send the user and pass to the db, set msg to an empty string and navigate to login, if there's an error then in the catch set the msg to an err which will be sent from the backend
// else when we login we post and send the user and pass we just put in in the body. we then check in the back end if the user and pass are right if yes we naviagte to chat and set msg back to an empty string if not we send the msg and we set msg to the err 
import {useState,useContext, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import { AppContext } from "../../App";
import axios from "axios";

const LoginRegister = (props) => {
    const {title} = props;
    const {userMsg,setUserMsg,setIsLoggedIn,setFromUserId,setFromUsername,reset} = useContext(AppContext);
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        setUserMsg("");
    },[]);

    const handleSubmit = async(event) => {
        event.preventDefault();
        if (title === "Register") {
            try {
                const response = await axios.post("/register", 
                {
                    username,
                    password
                })
                setUserMsg("");
                navigate("/login");
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
                reset();  // If user doesn't log out 
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
            console.log(err);
        };
    };

    return (
        <div>
            <h1>{title}</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username: </label>
                <input type="text" id="username" onChange={(event) => setUsername(event.target.value)}/><br/>
                <label htmlFor="password">Password: </label>
                <input type="password" id="password" onChange={(event) => setPassword(event.target.value)}/><br/>
                <button>{title}</button>
            </form>
            <p>{userMsg}</p>
        </div>
    )
}

export default LoginRegister;