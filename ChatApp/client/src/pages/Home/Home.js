import ChatIcon from "@mui/icons-material/Chat";
import Buttons from "./Buttons";
import Explanation from "./Explanation";
import Typography from "@mui/material/Typography";

const Home = () => {
  return (
    <section className="homeContainer">
      <div className="innerContainer">
        <ChatIcon className="chatIcon" sx={{ width: 90, height: 190 }} />
        <Typography sx={{ fontSize: "60px" }} className="homeTitle">
          Chat App
        </Typography>
      </div>
      <div>
        <Buttons />
        <Explanation />
      </div>
    </section>
  );
};

export default Home;
