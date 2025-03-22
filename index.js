require('dotenv').config();

const express = require("express");
const cors = require("cors");

const app = express();

// Start the server
const PORT = process.env.PORT || 5000;

//db connection
const dbConnection = require("./dbConnection");
dbConnection()
  .then(() => console.log("db is connected"))
  .catch((err) => console.log(`error occurred while connecting to db ${err}`));

// Middleware for enabling cors and json payload
app.use(cors());
app.use(express.json());

// home route
app.get("/", (req, res) => {
  res.send("Home page is working");
});

// Import routes 
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));