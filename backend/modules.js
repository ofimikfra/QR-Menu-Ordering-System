require('dotenv').config();
const mysql = require('mysql2');

const connectDB = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER, 
  password: process.env.DB_PASSWORD, 
  database: process.env.DB_NAME,
  port: parseInt(process.env.DB_PORT)
});

connectDB.connect((err) => {
  if (err) {
    console.error("Error connecting to DB:", err.stack);
    return;
  }
  console.log("Successfully connected to", process.env.DB_NAME, "as", process.env.DB_USER);
  console.log("Connected as ID", connectDB.threadId);
});

// create tables 
function initializeTables() {

  const staffTable = `
    create table if not exists users (
      id int auto_increment primary key,
      
      role enum("admin", "staff") not null default "staff",
    );
  `;

  const ordersTable = `
    create table if not exists orders (
      id int auto_increment primary key,
      username varchar(255) not null unique,
      password 
    );
  `;

  const itemsTable = `
    create table if not exists menu (
      id int auto_increment primary key,
      varchar

      availability enum("available", "unavailable") not null default "available"
    );
  `

  const orderItemsTable = `
    create table if not exists orderItems (
      itemID
    );
  `

  connectDB.query(staffTable, (err) => {
    if (err) {
      console.error("Failed to create users table:", err);
    } else {
      console.log("Staff table ready.");
    }
  });

  connectDB.query(ordersTable, (err) => {
    if (err) {
      console.error("Failed to create orders table:", err);
    } else {
      console.log("Orders table ready.");
    }
  });

  connectDB.query(itemsTable, (err) => {
    if (err) {
      console.error("Failed to create orders table:", err);
    } else {
      console.log("Items table ready.");
    }
  });

}

module.exports = connectDB, initializeTables;
