import { AppContextProvider } from "./contexts/AppContext";
import Navbar from "./nav/Navbar";
import Routes from "./routes/routes";
import "./App.css";

function App() {
  return (
    <AppContextProvider>
      <Navbar />
      <Routes/>
    </AppContextProvider>
  );
}

export default App;
