import {Routes,Route} from "react-router-dom";
import Socket from "./components/Socket";
import Navbar from "./components/Navbar";
import LoginRegister from "./components/LoginRegister";
import './App.css';

// don't have link for chat in navbar when we successfully log in we want to be directed to socket component, so /chat,
// socket compoennt will hold all chat things

function App() {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path="/register" element={<LoginRegister title="Register"/>}/>
        <Route path="/login" element={<LoginRegister title="Login"/>}/>
        <Route path="/chat" element={<Socket/>}/>
      </Routes>
    </div>
  );
}

export default App;

