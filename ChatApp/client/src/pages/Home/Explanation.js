import { useState } from "react";
import Typography from "@mui/material/Typography";

const Explanation = () => {
  const [visible, setVisible] = useState(false);
  return (
    <section className="explanationContainer">
      <Typography
        className="explanationTitle"
        sx={{ fontSize: "20px" }}
        onClick={() => setVisible(!visible)}
      >
        Learn More
      </Typography>
      <Typography
        className="explanationPara"
        sx={{ display: visible ? "block" : "none", fontSize: "15px" }}
      >
        A Chat App With Private Messaging and Temporary Group Messaging. In Chat
        Click Private Chat Tab To Chat Privately With Friends and Click Group
        Chat Tab And Enter Any Text To Join A Room and Chat With People Who
        Joined The Same Room. Rooms Are Temporary So Once You Join Another Or
        Logout, The Messages Will Disappear.
      </Typography>
    </section>
  );
};

export default Explanation;
