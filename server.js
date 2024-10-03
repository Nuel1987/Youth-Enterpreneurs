const express = require('express');
const app = express();
const mysql = require('mysql2');
const dotenv = require('dotenv')
const path = require('path');

//configure environment variables
dotenv.config();

//create a connection object
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

//Check if db connect works
db.connect((err) => {
    //No connection
    if(err) {
        return console.log("Error connecting to the Mysql db", err);
    }
    //Yes
    console.log("Connected to mysql db successfully as id:", db.threadId)
})

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Set up body parsing
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/mentorship', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'mentorship.html'));
});


// Start server
app.listen(4500, () => {
    console.log('Server running on http://localhost:4500');
});
