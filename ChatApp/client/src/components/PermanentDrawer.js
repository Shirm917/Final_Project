import Drawer from "@mui/material/Drawer";

const PermanentDrawer = ({ drawer }) => {
  return (
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
          marginTop: 6.6,
          marginRight: 20,
        },
      }}
      open
    >
      {drawer}
    </Drawer>
  );
};

export default PermanentDrawer;
