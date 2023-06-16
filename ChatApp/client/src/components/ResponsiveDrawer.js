import SideBarIcon from "./SideBarIcon";
import TemporaryDrawer from "./TemporaryDrawer";
import PermanentDrawer from "./PermanentDrawer";

const ResponsiveDrawer = ({drawer}) => {
  return (
    <>
      <SideBarIcon />
      <TemporaryDrawer drawer={drawer}/>
      <PermanentDrawer drawer={drawer}/>
    </>
  );
};

export default ResponsiveDrawer;
