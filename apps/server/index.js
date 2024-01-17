const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const port = 5000; // Choose your desired port

app.use(bodyParser.json());

// Connect to MongoDB (replace 'your-mongodb-uri' with your actual MongoDB URI)
mongoose.connect('your-mongodb-uri', { useNewUrlParser: true, useUnifiedTopology: true });

// Define Support Agent and Support Ticket models here (use 'mongoose.Schema')

// Define API endpoints for creating support agents and tickets
app.post('/api/support-agents', (req, res) => {
    // Implement agent creation logic here
});

app.post('/api/support-tickets', (req, res) => {
    // Implement ticket creation logic here
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
