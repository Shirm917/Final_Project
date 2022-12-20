import {NavLink} from "react-router-dom";

const Navbar = () => {
    return (
        <nav>
            <NavLink to="/register">Register</NavLink>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/chat">Chat</NavLink>
        </nav>
    )
}

export default Navbar;