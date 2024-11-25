const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");  // Import user routes

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// Use auth routes
app.use("/api/auth", authRoutes);

// Use user routes (Admin only)
app.use("/api", userRoutes);  // All user-related actions are prefixed with /api

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
