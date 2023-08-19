require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const port = process.env.PORT || 8000; // Replace 3000 with the port you want to listen on
const MONGODB_URI = process.env.MONGODB_URI;
app.use(express.json());

//connect to mongodb
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('Error connecting to MongoDB:', err.message);
});


// const authMiddleware = require('./middleware/authMiddleware');
// app.use(authMiddleware);
const corsOptions = {
  origin: 'http://localhost:3000', // Replace with your frontend URL
};

app.use(cors(corsOptions));
const userRoutes = require('./routes/userRoutes');

app.use('/api/user', userRoutes);


// Define a route
app.get('/', (req, res) => {
  res.send('Hello, Express!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on localhost:${port}`);
});