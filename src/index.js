//Import express
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables from .env file
const productRoutes = require('./routes/product'); // Import product routes

//Swagger
const path = require("path");
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
// Options
const swaggerOptions = {
  definition: {
    openapi: '3.0.3',
    info: { title: 'Products API', version: '1.0.0' },
    servers: [{ url: 'http://localhost:3000' }],
  },
  apis: [path.resolve(__dirname, './routes/product.js')],
};
const swaggerSpec = swaggerJsDoc(swaggerOptions)

const app = express(); //Initialize express
const PORT = process.env.PORT || 3000; //Environment variables

//Middlewares: intermediate functions that handle requests
app.use(express.json()); // json required for server to understand json data
app.use('/api', productRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

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