import React, { useEffect, useState } from "react";
import API from "../services/api";
import InputField from "../components/InputField";
import Button from "../components/Button";
import LogoutButton from "../components/LogoutButton";
import axios from 'axios';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    deadline: "",
    user_id: "",
  });

  const fetchUsers = async () => {
    const res = await API.get("/users");
    setUsers(res.data);
  };

  const fetchTasks = async () => {
    const res = await API.get("/tasks");
    setTasks(res.data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAssignTask = async (e) => {
    e.preventDefault();
    await API.post("/tasks", form);
    setForm({ title: "", description: "", deadline: "", user_id: "" });
    fetchTasks();
  };

  const handleDelete = async (taskId) => {
    console.log("Trying to delete task:", taskId);
    try {
      await API.delete(`/tasks/${taskId}`);

      alert("Deleted successfully!");
      fetchTasks(); // refresh task list
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Failed to delete task");
    }
  };
  
  const handleUpdate = async (e) => {
    e.preventDefault();
  
    console.log("Updating task:", currentTask); // ✅ keep this for debugging
  
    try {
      const payload = {
        title: currentTask.title,
        description: currentTask.description,
        deadline: currentTask.deadline,
      };
  
      await API.put(`/tasks/${currentTask.id}`, payload);
  
      alert("Task updated!");
      setShowModal(false);
      fetchTasks();
    } catch (err) {
      console.error("Update error:", err.response?.data || err.message);
      alert("Failed to update task");
    }
  };
  

  const openEditModal = (task) => {
    setCurrentTask(task);
    setShowModal(true);
  };
  

  useEffect(() => {
    fetchUsers();
    fetchTasks();
  }, []);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
    <div className="flex justify-between items-center mb-6">
    <h1 className="text-3xl font-bold text-blue-600">Admin Dashboard</h1>
    <LogoutButton />
    </div>
      {/* Assign Task Form */}
      <div className="bg-white p-6 rounded shadow mb-10 max-w-2xl">
        <h2 className="text-xl font-semibold mb-4">Assign a New Task</h2>
        <form onSubmit={handleAssignTask}>
          <InputField label="Title" name="title" value={form.title} onChange={handleChange} />
          <InputField label="Description" name="description" value={form.description} onChange={handleChange} />
          <InputField label="Deadline" name="deadline" type="datetime-local" value={form.deadline} onChange={handleChange} />
          
          <div className="mb-4">
            <label className="block mb-1 font-medium">Assign To</label>
            <select
              name="user_id"
              value={form.user_id}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            >
              <option value="">-- Select User --</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name} ({user.email})
                </option>
              ))}
            </select>
          </div>

          <Button type="submit">Assign Task</Button>
        </form>
      </div>

      {/* All Tasks Table */}
      <div className="bg-white p-6 rounded shadow max-w-4xl">
        <h2 className="text-xl font-semibold mb-4">All Tasks</h2>
        <table className="w-full text-left border">
          <thead>
            <tr className="bg-gray-100">
                <th className="p-2 border">Title</th>
                <th className="p-2 border">Assigned To</th>
                <th className="p-2 border">Status</th>
                <th className="p-2 border">Deadline</th>
                <th className="p-2 border">Actions</th> {/* ✅ Add this */}
            </tr>
         </thead>

          <tbody>
          {tasks.map((task) => (
            <tr key={task._id}>
                <td className="p-2 border">{task.title}</td>
                <td className="p-2 border">{task.User?.name}</td>
                <td className="p-2 border">{task.status}</td>
                <td className="p-2 border">{new Date(task.deadline).toLocaleDateString()}</td>
                <td className="p-2 border">
                <button 
                    className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                    onClick={() => openEditModal(task)}
                >
                    Edit
                </button>
                <button 
                    className="bg-red-500 text-white px-3 py-1 rounded"
                    onClick={() => handleDelete(task.id)}
                >
                    Delete
                </button>
                </td>
            </tr>
            ))}

          </tbody>
        </table>
        {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded shadow w-[90%] max-w-md">
            <h2 className="text-xl font-semibold mb-4">Edit Task</h2>
            
            <form onSubmit={handleUpdate}>
  <input
    type="text"
    className="w-full border mb-3 p-2"
    placeholder="Title"
    value={currentTask.title}
    onChange={(e) =>
      setCurrentTask({ ...currentTask, title: e.target.value })
    }
  />

  <input
    type="text"
    className="w-full border mb-3 p-2"
    placeholder="Description"
    value={currentTask.description}
    onChange={(e) =>
      setCurrentTask({ ...currentTask, description: e.target.value })
    }
  />

  <input
    type="datetime-local"
    className="w-full border mb-3 p-2"
    value={currentTask.deadline?.slice(0, 16)}
    onChange={(e) =>
      setCurrentTask({ ...currentTask, deadline: e.target.value })
    }
  />

  <div className="flex justify-end gap-2 mt-4">
    <button
      type="button"
      onClick={() => setShowModal(false)}
      className="px-4 py-2 bg-gray-400 text-white rounded"
    >
      Cancel
    </button>
    <button
      type="submit"
      className="px-4 py-2 bg-green-600 text-white rounded"
    >
      Save
    </button>
  </div>
</form>

            </div>
        </div>
        )}

      </div>
    </div>
  );
};

export default AdminDashboard;
