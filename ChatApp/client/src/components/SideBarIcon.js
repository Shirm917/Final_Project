import { useContext } from "react";
import { AppContext } from "../App";
import IconButton from "@mui/material/IconButton";
import ViewSidebarIcon from "@mui/icons-material/ViewSidebar";

const SideBarIcon = () => {
  const { mobileOpen, setMobileOpen } = useContext(AppContext);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <IconButton
      color="inherit"
      aria-label="open drawer"
      edge="start"
      onClick={handleDrawerToggle}
      sx={{ mr: 2, display: { sm: "none" }, position: "absolute", top: "50%" }}
    >
      <ViewSidebarIcon />
    </IconButton>
  );
};

export default SideBarIcon;
