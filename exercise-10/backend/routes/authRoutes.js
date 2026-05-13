import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const USERS_FILE = path.join(__dirname, "../users.json");

const readUsers = async () => {
  try {
    const data = await fs.readFile(USERS_FILE, "utf-8");
    return JSON.parse(data || "[]");
  } catch {
    return [];
  }
};

const saveUsers = async (users) => {
  await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2));
};

const generateToken = (user) => {
  return jwt.sign(
    { username: user.username },
    process.env.JWT_SECRET || "secretKey",
    { expiresIn: "1h" }
  );
};

router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required" });
    }

    const users = await readUsers();

    const existingUser = users.find((u) => u.username === username);
    if (existingUser) {
      return res.status(409).json({ message: "Username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      username,
      password: hashedPassword,
    };

    users.push(newUser);
    await saveUsers(users);

    const token = generateToken(newUser);

    res.status(201).json({
      token,
      user: { username: newUser.username },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required" });
    }

    const users = await readUsers();

    const user = users.find((u) => u.username === username);
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user);

    res.json({
      token,
      user: { username: user.username },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

export default router;