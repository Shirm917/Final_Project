import {useContext} from "react";
import {Link} from "react-router-dom";
import { AppContext } from "../../App";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const Home = () => {
    const {setUserMsg} = useContext(AppContext);

    const chatMsg = () => {
        setUserMsg("");
    }

    return (
        <div>
            <h1>Chat App</h1>
            <Typography>
                A Chat App With Private Messaging and Temporary Group Messaging. 
                In Chat Click Private Chat Tab To Chat Privately With Friends 
                and Click Group Chat Tab To Join A Room and Chat With People In The Same Room. 
                Rooms Are Temporary So Once You Join Another Or Logout, The Messages Will Disappear
            </Typography>
            <Stack direction="row" spacing={2}>
                <Button component={Link} variant="contained" to="/register" onClick={chatMsg}>Register</Button>
                <Button component={Link} variant="contained" to="/login" onClick={chatMsg}>Login</Button>
            </Stack>
        </div>
    );
};

export default Home;