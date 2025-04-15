const express = require('express');
const path = require('path');
const { connectDB, getDB } = require('./modules');

const app = express();
const port = 3000;

// middleware to parse url
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// connect to db
connectDB().then(() => {

}).catch(err => {
    console.error('Failed to connect to MongoDB', err); // error
});