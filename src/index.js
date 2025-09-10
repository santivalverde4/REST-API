//Import express
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables from .env file
const userRoutes = require('./routes/users'); // Import user routes


const app = express(); //Initialize express
const PORT = process.env.PORT || 3000; //Environment variables

//Middlewares: intermediate functions that handle requests
app.use(express.json()); // json required for server to understand json data
app.use('/api', userRoutes);

//Routes
app.get('/', (req, res) => {
    res.send('Hello World!');
});

//Connect to MongoDB
mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

//listen on port
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} ip: http://localhost:${PORT}`);
});