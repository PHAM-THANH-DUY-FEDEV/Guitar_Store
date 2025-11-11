import "./App.css";
import Homepage from "./pages/Homepage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        {/* Đã xác thực tài khoản -> chuyển route */}
        <Route path="/" element={<Homepage />} />
      </Routes>
    </Router>
  );
}

export default App;
