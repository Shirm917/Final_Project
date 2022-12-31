import {useContext} from "react";
import {NavLink,useNavigate} from "react-router-dom";
import axios from "axios";
import { AppContext } from "../App";
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ChatIcon from '@mui/icons-material/Chat';
import "./Navbar.css"

// don't need chat link when we login we want to redirect to the /chat
// Use this for app bar, on home page there will be buttons for login register 

const Navbar = () => {
    const {fromUserId,setIsLoggedIn,reset} = useContext(AppContext);
    const navigate = useNavigate();

    const logout = async() => {
        try {
            
            const dateNow = new Date();
            await axios.put("/logout", {
                timestamp: dateNow.toUTCString(),
                fromUserId
            });
            setIsLoggedIn(false);
            reset();
            navigate("/");
        } catch (err) {
            console.log(err);
        }
    }


    return (
        <Box>
            <AppBar position="sticky" className="bar">
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
                    <NavLink to="/register" className="link">Register</NavLink>
                    <NavLink to="/login" className="link">Login</NavLink>
                    <NavLink onClick={logout} className="link">Logout</NavLink>
                    {/* <NavLink to="/chat">Chat</NavLink> */}
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default Navbar;