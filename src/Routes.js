import React, { useEffect, useMemo } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/DashboardComponent";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const username = useMemo(() => localStorage.getItem("username"), []);

  useEffect(() => {
    if (!username) {
      navigate("/");
    }
  }, [username, navigate]);

  return username ? children : null;
};

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
