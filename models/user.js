const mongoose = require("mongoose");
const validators = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name"],
    trim: true,
    maxlength: [100, "Name cannot exceed 100 characters"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    trim: true,
    unique: true,
    lowercase: true,
    validate: [validators.isEmail, "Please enter a valid email address"],
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    minlength: [6, "Password cannot be less than 6 characters"],
    validate: {
      validator: function (el) {
        return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/.test(el);
      },
      message:
        "Password must contain at least one digit, one lowercase and one uppercase letter",
    },
    select: false,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "admin",
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

userSchema.methods.getAuthenticationToken = function () {
  const JWT_SECRET = process.env.JWT_SECRET || "IRPIFPIJFSoiroi084ifj9je9jSMMS";

  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
  }
  return jwt.sign({ id: this._id }, JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || "30d",
  });
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.post("save", function (error, doc, next) {
  if (error.name === "MongoServerError" && error.code === 11000) {
    next(new Error("Email already exists. Please use a different email."));
  } else {
    next(error);
  }
});

const User = mongoose.model("User", userSchema);
module.exports = { User };
