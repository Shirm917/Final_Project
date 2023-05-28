import { Routes, Route } from "react-router-dom";
import { AppContextProvider } from "./contexts/AppContext";
import Home from "./pages/Home/Home";
import ChatNavbar from "./components/ChatNavbar";
import Navbar from "./components/Navbar";
import LoginRegister from "./pages/LoginRegister/LoginRegister";
import Protected from "./components/Protected";
import "./App.css";

function App() {
  return (
    <AppContextProvider>
      <Navbar />
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
    </AppContextProvider>
  );
}

export default App;
