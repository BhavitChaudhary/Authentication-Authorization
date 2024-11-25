import React, { useState } from "react";
import api from "../services/api";
import "../components/styles/Register.css"; // Import custom styles
import { useNavigate } from "react-router-dom";

const Register = () => {
  // State variables for form inputs
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("User");
  const [error, setError] = useState(null); // To store error messages
  const navigate = useNavigate();

  // Handle form submission
  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null); // Reset any previous error

    // Basic validation
    if (!username || !password) {
      setError("Username and password are required.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    try {
      // Send POST request to register the user
      await api.post("/auth/register", { username, password, role }, {
        headers: {
          "Content-Type": "application/json", // Ensure content type is JSON
        },
      });

      // Navigate to the login page upon successful registration
      navigate("/login");
    } catch (error) {
      // Log detailed error from the server
      console.error("Registration failed:", error.response);
      setError(error.response?.data?.message || "Registration failed. Please try again.");
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleRegister}>
        <div className="register-header">Create Account</div>

        {/* Username Input */}
        <div className="input-group">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        {/* Password Input */}
        <div className="input-group">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {/* Role Selection */}
        <div className="input-group">
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="User">User</option>
            <option value="Admin">Admin</option>
            <option value="Moderator">Moderator</option>
          </select>
        </div>

        {/* Display error message if any */}
        {error && <div className="error-message">{error}</div>}

        {/* Submit Button */}
        <button type="submit" className="submit-btn">Register</button>
      </form>
    </div>
  );
};

export default Register;
