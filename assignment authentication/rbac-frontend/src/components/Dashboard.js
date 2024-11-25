import React, { useEffect, useState } from "react";
import api from "../services/api";
import "../components/styles/Dashboard.css"; // Import your custom styles
import "bootstrap/dist/css/bootstrap.min.css"; // Import the latest Bootstrap CSS

const Dashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
      return;
    }
    api
      .get("/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => setUser(response.data))
      .catch(() => window.location.href = "/login");
  }, []);

  if (!user) return <div className="loading">Loading...</div>;

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <div className="dashboard-header">Welcome to your Dashboard!</div>
        <div className="dashboard-info">
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Role:</strong> {user.role}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
