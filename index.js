import express, { json } from 'express';
import User from './user.js';

const app = express();
const port = 3000;

app.use(json());

app.get('/users', async (_req, res) => {

    // Fetch all users from the database
    const users = await User.findAll();

    res.json(users);
});

app.post('/users', async (req, res) => {
    const newUser = req.body;
    
    // create a new instance of User
    const user = new User(newUser);

    // save the user to the database
    const results = await user.save();

    res.status(201).json({ message: 'User created', userId: results.insertId });
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