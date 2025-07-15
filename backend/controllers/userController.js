import { User } from "../models/index.js";
import bcrypt from "bcrypt";

//Register 
export const registerUser = async (req, res) => {
    try{
        const { name, email, password, role } = req.body;

        const existing = await User.findOne( {where: {email}} );
        if (existing) return res.status(400).json({ message: "Email already exists"});

        const hashed = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashed,
            role: role || "user",
        });

        res.status(201).json({ id: user.id, name:user.name, email:user.email, role:user.role});
    } catch(err) {
        res.status(500).json({ message:"Registration failed", error: err.message});
    }
};

// Login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: "User not found" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ message: "Invalid credentials" });

    res.status(200).json({ id: user.id, name: user.name, email: user.email, role: user.role });
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err.message });
  }
};

// Get all users (admin only)
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({ attributes: { exclude: ["password"] } });
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: "Could not fetch users", error: err.message });
  }
};

// Update user
export const updateUser = async (req, res) => {
  try {
    const { name, email, role } = req.body;
    const user = await User.findByPk(req.params.id);

    if (!user) return res.status(404).json({ message: "User not found" });

    user.name = name || user.name;
    user.email = email || user.email;
    user.role = role || user.role;

    await user.save();

    res.status(200).json({ message: "User updated", user });
  } catch (err) {
    res.status(500).json({ message: "Update failed", error: err.message });
  }
};

// Delete user
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    await user.destroy();
    res.status(200).json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ message: "Deletion failed", error: err.message });
  }
};

// Admin
export const checkAdminExists = async (req, res) => {
  try {
    const admin = await User.findOne({ where: { role: "admin" } });
    if (admin) {
      return res.json({ exists: true });
    }
    return res.json({ exists: false });
  } catch (err) {
    res.status(500).json({ message: "Error checking admin existence" });
  }
};
