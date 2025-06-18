const express = require('express');
const path = require('path'); 
const connectDB = require('./modules');
require('dotenv').config(); 

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '../frontend')));

// serve by default
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/public/index.html'));
});

/* ------------------------------ public pages ------------------------------ */

app.get('/menu', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/public/menu.html'));
});

app.get('/order', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/public/order.html'));
});

/* ------------------------------- admin pages ------------------------------ */

app.get('/admin/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/admin/dashboard.html'));
});

app.get('/admin/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/admin/login.html'));
});

/* ------------------------------- db queries ------------------------------- */

connectDB.connect(err => {
  if (err) throw err;
});

initializeTables();

/* --------------------------------- listen --------------------------------- */

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});