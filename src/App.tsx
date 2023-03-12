import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Login from "./containers/authentication/Login";
import Register from "./containers/authentication/Register";
import { AuthProvider } from "./context/AuthContext";
import AppRoutes from "./routes";
import { PrivateRoute } from "./routes/PrivateRoute";

function App() {
  return (
    <AuthProvider>
      <NavBar/>
      <AppRoutes/>
    </AuthProvider>
  );
}

export default App;
