import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";
import PrivateRoute from "./components/PrivateRoute";
import SetupAdmin from "./pages/SetupAdmin";


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin" 
        element={<PrivateRoute role="admin">
                    <AdminDashboard />
                  </PrivateRoute>} /> 
        <Route path="/dashboard" 
        element={<PrivateRoute role="user">
                    <UserDashboard />
                  </PrivateRoute>} /> 
        <Route path="/setup" element={<SetupAdmin />} />
          
      </Routes>
    </Router>
  );
};

export default App;
