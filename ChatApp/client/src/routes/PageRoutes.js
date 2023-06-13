import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import ChatNavbar from "../nav/ChatNavbar";
import LoginRegister from "../pages/LoginRegister/LoginRegister";
import Protected from "../components/Protected";

const PageRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<LoginRegister title="Register" />} />
      <Route path="/login" element={<LoginRegister title="Login" />} />
      <Route
        path="/chat"
        element={
          <Protected>
            <ChatNavbar />
          </Protected>
        }
      />
    </Routes>
  );
};

export default PageRoutes;
