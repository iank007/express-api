const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = 3000;

// MySQL connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: ''
});
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

app.use(express.json());

app.get('/users', async (req, res) => {
    connection.query("SELECT * FROM users", (error, results) => {
        if (error) {
            return res.status(500).json({ error: error.message });
        }
        res.json(results);
    });
});

app.post('/users', (req, res) => {
    const newUser = req.body;
    connection.query("INSERT INTO users SET ?", newUser, (error, results) => {
        if (error) {
            return res.status(500).json({ error: error.message });
        }
        res.status(201).json({ message: 'User created', userId: results.insertId });
    });
});

app.put('/users/:id', (req, res) => {
    const userId = req.params.id;
    const updatedUser = req.body;
    res.json({ message: `User with ID ${userId} updated`, updatedUser });
});

app.delete('/users/:id', (req, res) => {
    const userId = req.params.id;
    res.json({ message: `User with ID ${userId} deleted` });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});