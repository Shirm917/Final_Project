import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";
import Drawer from "@mui/material/Drawer";
import SideBarIcon from "./SideBarIcon";

const ResponsiveDrawer = (props) => {
  const { mobileOpen, setMobileOpen } = useContext(AppContext);
  const { window, drawer } = props;

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <>
      <SideBarIcon />
      <Drawer
        container={container}
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        anchor="left"
        sx={{
          display: { xs: "block", sm: "none" },
          width: 200,
          flexShrink: 0,
          zIndex: 0,
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: 200,
            marginTop: 6.6,
            marginRight: 20,
          },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        anchor="left"
        sx={{
          display: { xs: "none", sm: "block" },
          width: 200,
          flexShrink: 0,
          zIndex: 0,
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: 200,
            marginTop: 7.6,
            marginRight: 20,
          },
        }}
        open
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default ResponsiveDrawer;
