import {Routes,Route} from "react-router-dom";
import Socket from "./components/Socket";
import Navbar from "./components/Navbar";
import LoginRegister from "./components/LoginRegister";
import './App.css';

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

// push and merge for base and create branch users