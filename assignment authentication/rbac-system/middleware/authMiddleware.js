const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  let token;

  // Check if there is a token in the request headers
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      // Get token from the Authorization header (Bearer token)
      token = req.headers.authorization.split(" ")[1];

      // Decode token and find the user
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get the user from the database
      const user = await User.findById(decoded.id).select("-password");

      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      // Attach the user to the request object
      req.user = user;

      next(); // Continue to the next middleware or route handler
    } catch (error) {
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    res.status(401).json({ message: "No token, authorization denied" });
  }
};

module.exports = { protect };
