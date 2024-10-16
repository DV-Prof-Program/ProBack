const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// Enable CORS for cross-origin requests
app.use(cors());

// Parse incoming JSON requests
app.use(bodyParser.json());

// MySQL database connection setup
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'headphones_landing_page',
});

// Test the database connection
db.getConnection((err) => {
    if (err) {
        console.error('Database connection error:', err);
        return;
    }
    console.log('Connected to the MySQL database');
});

// POST route to store email addresses in the database
app.post('/api/email-signup', (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ error: 'Email is required' });
    }

    const sql = 'INSERT INTO email_signups (email) VALUES (?)';
    db.query(sql, [email], (err, result) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        return res.status(201).json({ message: 'Email added successfully' });
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
