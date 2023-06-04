import { NavLink } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ChatIcon from "@mui/icons-material/Chat";

const NavbarLarge = ({ pages }) => {
  return (
    <Box>
      <NavLink to="/" className="link titleContainer">
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="chat"
          sx={{ display: { xs: "none", md: "flex" }, mr: 2 }}
        >
          <ChatIcon />
        </IconButton>
        <Typography
          sx={{
            mr: 2,
            display: { xs: "none", md: "flex" },
          }}
        >
          CHAT APP
        </Typography>
      </NavLink>
      <Box
        sx={{
          flexGrow: 1,
          display: { xs: "none", md: "flex" },
          justifyContent: "space-evenly",
        }}
      >
        {pages.map((page) => (
          <NavLink
            key={page.id}
            className="link bigPage"
            to={page.toLink}
            onClick={page.onClick}
            sx={{ my: 2, display: "block" }}
          >
            {page.name}
          </NavLink>
        ))}
      </Box>
    </Box>
  );
};

export default NavbarLarge;
