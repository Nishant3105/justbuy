const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../user/user");
const redis = require("../../config/redis");
const { OAuth2Client } = require("google-auth-library");

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
};

const generateAccessToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN }
  );
};

exports.adminCreateUser = async (req, res, next) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      password,
      role,
      status,
    } = req.body;

    // 🔐 Only admin can do this (middleware handles it)
    if (!password) {
      return res.status(400).json({
        message: "Password is required for admin-created users",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      firstName,
      lastName,
      email,
      phone,
      password: hashedPassword,
      role: role || "customer",
      status: status || "active",
      authProvider: "email",
      emailVerified: true, 
    });

    const { password: _, ...safeUser } = user.toObject();

    res.status(201).json({
      message: "User created successfully",
      user: safeUser,
    });
  } catch (err) {
    next(err);
  }
};

exports.createUserByAdmin = async (req, res) => {
  const { firstName, email, password, role, permissions } = req.body;

  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Admins only" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    firstName,
    email,
    password: hashedPassword,
    role,
    permissions:
      role === "staff"
        ? {
            read: permissions?.read ?? true,
            edit: permissions?.edit ?? false,
          }
        : undefined,
  });

  res.status(201).json({ message: "User created", user });
};

