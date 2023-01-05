import {TypeAnimation} from "react-type-animation";
import { ExplanationArr } from "./ExplanationArr";

const Home = () => {

    return (
        <div className="homeContainer">
            <h1 className="homeTitle">Chat App</h1>
            <TypeAnimation
                sequence={ExplanationArr}
                repeat={1}
                wrapper="p"
            />
        </div>
    );
};

export default Home;
