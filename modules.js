const { MongoClient } = require('mongodb');
const express = require('express');
const url = '';
const client = new MongoClient(url);

let db;

async function connectDB() {
    try {
        await client.connect();
        db = client.db('QRMenuOrderSystem'); 
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

function getDB() {
    if (!db) {
        throw new Error('Database not connected');
    }
    console.log('Database connected');
    return db;
}

module.exports = { connectDB, getDB };