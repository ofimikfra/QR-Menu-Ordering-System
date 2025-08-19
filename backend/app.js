const express = require("express");
const path = require("path"); 
const fs = require("fs");
const crypto = require('crypto');
const { connectDB, initializeTables } = require("./modules");
require("dotenv").config(); 

const app = express();
const PORT = process.env.PORT || 3000;

app.use("/media", express.static(path.join(__dirname, "../frontend/media")));
app.use(express.json());

/* ------------------------------- db queries ------------------------------- */

connectDB.connect(err => {
  if (err) throw err;
});

initializeTables();

// fetch products
app.get("/api/products", (req, res) => {
  const category = req.query.category;
  const term = req.query.term;
  
  let sql = "select * from products";
  const params = [];
  const conditions = [];

  if (category) {
    conditions.push("category = ?");
    params.push(category);
  }

  if (term) {
    conditions.push("name like ?");
    params.push(`%${term}%`);
  }

  if (conditions.length > 0) {
    sql += " where " + conditions.join(" and ");
  }

  sql += " order by category, name asc";

  connectDB.query(sql, params, (err, results) => {
    if (err) {
      res.status(500).json({ error: "Database error" });
    } else {
      res.json(results);
    }
  });
});

// fetch categories
app.get("/api/categories", (req, res) => {
  connectDB.query("select distinct category from products where category is not null and category != '' order by category asc", (err, results) => {
    if (err) {
      res.status(500).json({ error: "Database error" });
    } else {
      res.json(results);
    }
  });
});

// add products (w/o image, figure that out later)




/* -------------------------------------------------------------------------- */

app.use(express.static(path.join(__dirname, "../frontend")));

// serve by default
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/public/index.html"));
});

/* ------------------------------ public pages ------------------------------ */

app.get("/menu", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/public/menu.html"));
});

app.get("/order", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/public/order.html"));
});

/* ------------------------------- admin pages ------------------------------ */

app.get("/admin/dashboard", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/admin/dashboard.html"));
});

app.get("/admin/login", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/admin/login.html"));
});

/* --------------------------------- listen --------------------------------- */

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});