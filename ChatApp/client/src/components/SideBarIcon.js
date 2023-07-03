import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";
import IconButton from "@mui/material/IconButton";
import ViewSidebarIcon from "@mui/icons-material/ViewSidebar";
import Badge from "@mui/material/Badge";

const SideBarIcon = () => {
  const { mobileOpen, setMobileOpen, badgeNotifs } = useContext(AppContext);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    !mobileOpen && (
      <Badge
        badgeContent={badgeNotifs.length}
        color="success"
        sx={{ display: {xs: "block", sm: "none" }, position: "absolute", top: "50%" }}
      >
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
        >
          <ViewSidebarIcon />
        </IconButton>
      </Badge>
    )
  );
};

export default SideBarIcon;
