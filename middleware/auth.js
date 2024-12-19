const CatchError = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/errorHandler");
const { User } = require("../models/user");
const jwt = require("jsonwebtoken");

// Protect routes
const auth = CatchError(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    res.status(401).json({ message: "Login first to access this resource" });
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decoded.id);
  next();
});

const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        res.status(403).json({
          message: `Role (${req.user.role}) is not allowed to access this resource`,
        })
      );
    }
    next();
  };
};

module.exports = { auth, authorizeRoles };
