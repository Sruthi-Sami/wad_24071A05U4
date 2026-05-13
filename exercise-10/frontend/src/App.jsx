import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import LoginPage from "./pages/LoginPage";
import StudentsPage from "./pages/StudentsPage";
import RegisterPage from "./pages/RegisterPage";

const Protected = ({ children }) => {
  const { token } = useAuth();
  return token ? children : <Navigate to="/" />;
};

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/students" element={<Protected><StudentsPage /></Protected>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}