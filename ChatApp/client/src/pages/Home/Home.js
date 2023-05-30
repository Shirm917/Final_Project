import ChatIcon from "@mui/icons-material/Chat";
import Buttons from "./Buttons";
import Explanation from "./Explanation";

const Home = () => {
  return (
    <section className="homeContainer">
      <ChatIcon className="chatIcon" sx={{ width: 100, height: 100 }} />
      <h1 className="homeTitle">Chat App</h1>
      <Buttons />
      <Explanation/>
    </section>
  );
};

export default Home;
