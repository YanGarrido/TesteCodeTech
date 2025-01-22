const express = require("express");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const studentRoutes = require("./routes/studentRoutes");

const app = express();
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/api", studentRoutes);

app.get("/", (req, res) => {
  res.status(200).json({ msg: "Bem-vindo à API!" });
});

module.exports = app;
