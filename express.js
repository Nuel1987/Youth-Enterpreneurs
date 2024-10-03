// Import dependencies
const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const app = express();

// Set up middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // Serve static files
app.set("view engine", "ejs");

// MySQL database connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect((err) => {
    if (err) throw err;
    console.log("Connected to MySQL");
});

// Route to render profile page
app.get("/profile", (req, res) => {
    const userId = 1; // Assuming user with ID 1 is logged in
    const sql = "SELECT * FROM profiles WHERE user_id = ?";
    db.query(sql, [userId], (err, result) => {
        if (err) throw err;
        res.render("profile", { profile: result[0] });
    });
});

// Route to update profile data
app.post("/update-profile", (req, res) => {
    const { name, email, phone, business_name, industry, description, funding_status, mentor_assigned } = req.body;
    const userId = 1; // Assuming user with ID 1 is logged in

    const sql = "UPDATE profiles SET name = ?, email = ?, phone = ?, business_name = ?, industry = ?, description = ?, funding_status = ?, mentor_assigned = ? WHERE user_id = ?";
    const values = [name, email, phone, business_name, industry, description, funding_status, mentor_assigned, userId];

    db.query(sql, values, (err, result) => {
        if (err) throw err;
        res.redirect("/profile");
    });
});

// Start server
app.listen(4500, () => {
    console.log("Server is running on port 4500");
});
