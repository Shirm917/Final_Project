import ChatIcon from "@mui/icons-material/Chat";
import Buttons from "./pageComponents/Buttons";
import Explanation from "./pageComponents/Explanation";
import Typography from "@mui/material/Typography";

const Home = () => {
  return (
    <section className="homeContainer">
      <div className="innerContainer">
        <ChatIcon className="chatIcon" sx={{ width: 90, height: 90 }} />
        <Typography sx={{ fontSize: "60px" }} className="homeTitle">
          Chat App
        </Typography>
      </div>
        <Buttons />
        <Explanation />
    </section>
  );
};

export default Home;
