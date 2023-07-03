import { useEffect, useState } from "react";
import SideBarIcon from "./SideBarIcon";
import TemporaryDrawer from "./TemporaryDrawer";
import PermanentDrawer from "./PermanentDrawer";

const ResponsiveDrawer = ({ drawer }) => {
  const [isXs, setIsXs] = useState(window.innerWidth < 600);

  useEffect(() => {
    const handleResize = () => {
      setIsXs(window.innerWidth < 600);
    };
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    }
  }, []);

  return (
    <>
      {isXs ? (
        <>
          <SideBarIcon />
          <TemporaryDrawer drawer={drawer} />
        </>
      ) : (
        <PermanentDrawer drawer={drawer} />
      )}
    </>
  );
};

export default ResponsiveDrawer;
