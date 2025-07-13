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
      fname varchar(255) not null,
      lname varchar(255) not null,
      password varchar(255) not null,
      role enum("admin", "staff") not null default "staff"
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

  const productsTable = `
    create table if not exists products (
      id int auto_increment primary key,
      name varchar(255) not null,
      description varchar(255),
      imageURL varchar(255),
      price decimal(10,2) not null,
      isAvailable bool not null default true
    );
  `

  const orderItemsTable = `
    create table if not exists orderItems (
      id int auto_increment primary key,
      prodID int not null,
      orderID int not null,
      foreign key (prodID) references products(id) on delete cascade,
      foreign key (orderID) references orders(id) on delete restrict
    );
  `

  function tableExists(tableName, callback) {
    const query = `show tables like ?`;
    connectDB.query(query, [tableName], (err, results) => {
      if (err) return callback(err, false);
      callback(null, results.length > 0);
    });
  }

  const tables = [
    { name: 'users', query: staffTable, readyMsg: 'Staff table ready.', failMsg: 'Failed to create users table:' },
    { name: 'orders', query: ordersTable, readyMsg: 'Orders table ready.', failMsg: 'Failed to create orders table:' },
    { name: 'products', query: productsTable, readyMsg: 'Products table ready.', failMsg: 'Failed to create items table:' },
    { name: 'orderItems', query: orderItemsTable, readyMsg: 'OrderItems table ready.', failMsg: 'Failed to create order items table:' }
  ];

  tables.forEach(table => {
    tableExists(table.name, (err, exists) => {
      if (err) {
        console.error(`Error checking table ${table.name}:`, err);
        return;
      }
      if (exists) {
        console.log(`${table.name} table already initialized.`);
      } else {
        connectDB.query(table.query, (err) => {
          if (err) {
            console.error(table.failMsg, err);
          } else {
            console.log(table.readyMsg);
          }
        });
      }
    });
  });

}

module.exports = { connectDB, initializeTables };
