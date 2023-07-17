import { AppContextProvider } from "./contexts/AppContext";
import Navbar from "./nav/Navbar";
import PageRoutes from "./routes/PageRoutes";
import "./App.css";

function App() {
  return (
    <AppContextProvider>
      <Navbar />
      <PageRoutes />
    </AppContextProvider>
  );
}

export default App;