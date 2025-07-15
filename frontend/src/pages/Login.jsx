import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import Button from "../components/Button";
import API from "../services/api";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/users/login", form);
      const user = res.data;

      localStorage.setItem("user", JSON.stringify(user));

      if (user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">
          Task Manager Login
        </h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <InputField
          label="Email"
          name="email"
          type="email"
          onChange={handleChange}
          required
        />
        <InputField
          label="Password"
          name="password"
          type="password"
          onChange={handleChange}
          required
        />
        <Button type="submit">Login</Button>

        <p className="text-sm text-center mt-4">
        Are you an admin setting up the system?{" "}
        <a
        href="/setup"
        className="text-blue-600 underline hover:text-blue-800"
        >
        Create Admin Account
        </a>
      </p>
      </form>

      

    </div>
  );
};

export default Login;
