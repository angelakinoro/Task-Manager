import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import InputField from "../components/InputField";
import Button from "../components/Button";

const SetupAdmin = () => {
  const [adminExists, setAdminExists] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  // Check if an admin user already exists
  const checkAdmin = async () => {
    try {
      const res = await API.get("/users/has-admin");
      setAdminExists(res.data.exists);
    } catch (err) {
      console.error("Failed to check admin existence", err);
      setAdminExists(false); // Fail-safe: allow setup if check fails
    }
  };

  // Run the check once on mount
  useEffect(() => {
    checkAdmin();
  }, []);

  // Redirect if admin exists
  useEffect(() => {
    if (adminExists) {
      navigate("/admin");
    }
  }, [adminExists, navigate]);

  // Form field handler
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 1. Register the admin
      await API.post("/users/register", { ...form, role: "admin" });

      // 2. Log in the admin
      const res = await API.post("/users/login", {
        email: form.email,
        password: form.password,
      });

      // 3. Store in localStorage
      localStorage.setItem("user", JSON.stringify(res.data));

      // 4. Redirect
      navigate("/admin");
    } catch (err) {
      console.error("Admin setup failed", err);
      alert("Something went wrong. Please try again.");
    }
  };

  if (adminExists === null) return <p className="p-8">Checking...</p>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">
          Setup Admin Account
        </h2>
        <InputField
          label="Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <InputField
          label="Email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <InputField
          label="Password"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <Button type="submit">Create Admin</Button>
      </form>
    </div>
  );
};

export default SetupAdmin;
