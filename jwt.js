const express = require("express");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

const app = express();
app.use(express.json());

const accessToken = process.env.ACCESS_TOKEN || "12345";

const users = [
  { _id: 1, username: "user1", password: "pass1" },
  { _id: 2, username: "user2", password: "pass2" },
  { _id: 3, username: "user3", password: "pass3" },
];

const authenticate = (req, res, next) => {
  const authorized = req.headers["authorization"];
  const token = authorized && authorized.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  jwt.verify(token, accessToken, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Forbidden" });
    }
    req.user = user;
    next();
  });
};

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (!user) {
    return res.json({
      message: "Invalid Credentials",
    });
  }

  const payload = { username: user.username, _id: user._id };

  const token = jwt.sign(payload, accessToken, { expiresIn: "1h" });

  res.header("Authorization", "Bearer" + token).json({
    message: "Login Successful",
    token: token,
  });
});

app.get("/dashboard", authenticate, (req, res) => {
  const user = req.user;
  res.json({
    message: `Welcome to the dashboard, ${user.username}!`,
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
