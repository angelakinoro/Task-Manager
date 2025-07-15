# 🗂️ Task Management System

A full-stack Task Management System built with modern web development practices to streamline task assignment, tracking, and management for both administrators and users.

---

## 🚀 Tech Stack

### 🧠 Backend
- **Node.js**
- **Express.js**
- **Sequelize ORM**
- **PostgreSQL**
- **bcrypt.js** for password hashing
- **Nodemailer** for email notifications

### 🎨 Frontend
- **React** (with Vite)
- **TailwindCSS** for styling
- **Axios** for HTTP requests
- **React Router v6** for routing

---

## ✅ Key Features

### 🔐 Authentication
- Single login form used by both **admin** and **users**
- Role-based redirection after login:
  - Admins → `/admin` dashboard
  - Users → `/dashboard`

### 👤 Admin Features
- Create, edit, and delete users
- Assign tasks to users with a title, description, deadline
- View all tasks in the system
- See task statuses for every user
- Receive an email notification when a task is created for a user

### 👨‍💼 User Features
- Log in and view only their assigned tasks
- Update task status (`Pending`, `In Progress`, `Completed`)
- See deadlines and descriptions clearly

### 📬 Email Notification
- Users receive email alerts when new tasks are assigned

### 🛡️ Route Protection
- Routes are protected based on login status and user role
- Admin dashboard cannot be accessed by users and vice versa

---

## 🧭 How It Works

### 🔁 Unified Login
Both **admin** and **users** use the same login page. Based on their role:
- If `role = 'admin'`, they are redirected to the admin dashboard
- If `role = 'user'`, they are redirected to their own task view

The role is stored in the database and verified upon login.

---

## ⚙️ Setup Instructions

### 1. Clone the Project

```bash
git clone https://github.com/yourusername/task-manager.git
cd task-manager



