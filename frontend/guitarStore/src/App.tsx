import "./App.css";
import Homepage from "./pages/Homepage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

import { Routes, Route, BrowserRouter } from "react-router-dom";

import AuthProvider from "./authProvider";
import AuthAdminProvider from "./authAdminProvider";
import Cartpage from "./pages/Cartpage";
import ProtectedRoute from "./routes/ProtectedRoute";
import ProtectedRouteAdmin from "./routes/ProtectedAdminRoute";
import Adminpage from "./pages/AdminPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Public */}
            <Route path="/" element={<Homepage />} />
            <Route path="/login" element={<LoginPage admin={0} />} />
            <Route path="/login/admin" element={<LoginPage admin={1} />} />
            <Route path="/register" element={<RegisterPage />} />
            {/* Protected */}
            <Route element={<ProtectedRoute />}>
              <Route path="/cart" element={<Cartpage />} />
            </Route>
          </Routes>
        </AuthProvider>
        <AuthAdminProvider>
          <Routes>
            <Route element={<ProtectedRouteAdmin />}></Route>
            <Route path="/admin" element={<Adminpage />} />
          </Routes>
        </AuthAdminProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
