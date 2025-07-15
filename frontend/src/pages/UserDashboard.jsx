import React, { useEffect, useState } from "react";
import API from "../services/api";
import Button from "../components/Button";
import LogoutButton from "../components/LogoutButton";


const UserDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  const fetchUserTasks = async () => {
    const res = await API.get(`/tasks/user/${user.id}`);
    setTasks(res.data);
  };

  const handleStatusChange = async (taskId, newStatus) => {
    await API.put(`/tasks/${taskId}/status`, { status: newStatus });
    fetchUserTasks(); // Refresh list after update
  };

  useEffect(() => {
    fetchUserTasks();
  }, []);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-600">
            Welcome, {user?.name}
        </h1>
        <LogoutButton />
      </div>

      <div className="bg-white p-6 rounded shadow max-w-4xl">
        <h2 className="text-xl font-semibold mb-4">Your Tasks</h2>
        {tasks.length === 0 ? (
          <p>No tasks assigned yet.</p>
        ) : (
          <table className="w-full text-left border">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 border">Title</th>
                <th className="p-2 border">Status</th>
                <th className="p-2 border">Deadline</th>
                <th className="p-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task.id} className="border-t">
                  <td className="p-2 border">{task.title}</td>
                  <td className="p-2 border">{task.status}</td>
                  <td className="p-2 border">
                    {task.deadline
                      ? new Date(task.deadline).toLocaleString()
                      : "—"}
                  </td>
                  <td className="p-2 border">
                    <select
                      value={task.status}
                      onChange={(e) =>
                        handleStatusChange(task.id, e.target.value)
                      }
                      className="px-2 py-1 border rounded"
                    >
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
