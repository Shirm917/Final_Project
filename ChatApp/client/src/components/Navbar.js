import {NavLink} from "react-router-dom";

// don't need chat link when we login we want to redirect to the /chat

const Navbar = () => {
    return (
        <nav>
            <NavLink to="/register">Register</NavLink>
            <NavLink to="/login">Login</NavLink>
            {/* <NavLink to="/chat">Chat</NavLink> */}
        </nav>
    )
}

export default Navbar;