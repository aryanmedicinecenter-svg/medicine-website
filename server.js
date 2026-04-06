const express = require("express");
const fs = require("fs");
const app = express();

app.use(express.json());
app.use(express.static("public"));

const DB_FILE = "./db.json";

// 🔐 Admin credentials
const ADMIN_USER = "admin";
const ADMIN_PASS = "1234";

// ---------------- LOGIN ----------------
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === ADMIN_USER && password === ADMIN_PASS) {
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});

// ---------------- GET ORDERS ----------------
app.get("/orders", (req, res) => {
  const data = JSON.parse(fs.readFileSync(DB_FILE));
  res.json(data.orders);
});

// ---------------- CREATE ORDER ----------------
app.post("/order", (req, res) => {
  const data = JSON.parse(fs.readFileSync(DB_FILE));
  data.orders.push(req.body);

  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
  res.json({ success: true });
});

// ---------------- DELETE ORDER ----------------
app.delete("/order/:index", (req, res) => {
  const data = JSON.parse(fs.readFileSync(DB_FILE));
  const index = req.params.index;

  data.orders.splice(index, 1);

  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
  res.json({ success: true });
});

// ---------------- EDIT ORDER ----------------
app.put("/order/:index", (req, res) => {
  const data = JSON.parse(fs.readFileSync(DB_FILE));
  const index = req.params.index;

  data.orders[index] = req.body;

  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
  res.json({ success: true });
});

// ---------------- START SERVER ----------------
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});