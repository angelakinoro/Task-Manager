import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import InputField from "../components/InputField";
import Button from "../components/Button";

const SetupAdmin = () => {
  const [adminExists, setAdminExists] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const checkAdmin = async () => {
    const res = await API.get("/users/has-admin");
    setAdminExists(res.data.exists);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // 1. Create the admin account
      await API.post("/users/register", { ...form, role: "admin" });
  
      // 2. Log in right after registration
      const res = await API.post("/users/login", {
        email: form.email,
        password: form.password,
      });
  
      // 3. Save user to localStorage
      localStorage.setItem("user", JSON.stringify(res.data));
  
      // 4. Redirect to admin dashboard
      navigate("/admin");
    } catch (err) {
      console.error("Admin setup failed", err);
    }
  };
  

  if (adminExists === null) return <p className="p-8">Checking...</p>;
  if (adminExists) {
    navigate("/admin");
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">
          Setup Admin Account
        </h2>
        <InputField label="Name" name="name" value={form.name} onChange={handleChange} required />
        <InputField label="Email" name="email" type="email" value={form.email} onChange={handleChange} required />
        <InputField label="Password" name="password" type="password" value={form.password} onChange={handleChange} required />
        <Button type="submit">Create Admin</Button>
      </form>
    </div>
  );
};

export default SetupAdmin;
