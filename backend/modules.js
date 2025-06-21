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
      username varchar(255) not null unique,
      password varchar(255) not null,
      role enum("admin", "staff") not null default "staff",

    );
  `;

  const ordersTable = `
    create table if not exists orders (
      id int auto_increment primary key,
      notes varchar(255),
      tableNo int not null,
      order_time timestamp default current_timestamp
    );
  `;

  const itemsTable = `
    create table if not exists items (
      id int auto_increment primary key,
      description varchar(255),
      imageURL varchar(255),
      price decimal(10,2) not null,
      availability enum("available", "unavailable") not null default "available"
    );
  `

  const orderItemsTable = `
    create table if not exists orderItems (
      id int auto_increment primary key,
      itemID int not null,
      orderID int not null,
      foreign key itemID references items(id) on delete cascade,
      foreign key orderID references orders(id) on delete restrict
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
