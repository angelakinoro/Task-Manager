import React from "react";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <button
      onClick={handleLogout}
      className="text-md text-blue-600 p-2 bg-gray-200 rounded hover:underline"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
