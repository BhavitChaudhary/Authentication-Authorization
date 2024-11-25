const express = require("express");
const { getAllUsers, updateUserRole, deleteUser } = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

// Admin-only route to get all users
router.get("/admin/users", protect, roleMiddleware("Admin"), getAllUsers);

// Admin-only route to update user role
router.put("/admin/users/:id", protect, roleMiddleware("Admin"), updateUserRole);

// Admin-only route to delete a user
router.delete("/admin/users/:id", protect, roleMiddleware("Admin"), deleteUser);

module.exports = router;
