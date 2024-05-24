const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.json()); // Middleware to parse JSON

// Replace with your actual MongoDB connection string
const mongoURI = 'mongodb+srv://sasmi2598:Badguy001@cluster0.pfqypjx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// Define a schema
const carSchema = new mongoose.Schema({
  name: String,
});

// Create a model
const Model = mongoose.model('Model', carSchema);

// Fetch data function
const fetchData = async () => {
  try {
    const models = await Model.find(); // Fetch all documents in the Model collection
    console.log('Model:', models);
  } catch (err) {
    console.error('Error fetching models:', err);
  }
};
app.get('/', (req, res) => {
    res.send('Welcome to the Cars API');
  });
  // Define a route handler for fetching cars
app.get('/api/Model', async (req, res) => {
    try {
      const cars = await Model.find();
      res.json(cars); // Send the fetched data as JSON response
    } catch (err) {
      res.status(500).send(err);
    }
  });
  
  // Define a route handler for adding a new car
  app.post('/api/Model', async (req, res) => {
    try {
      const car = new Model(req.body);
      await car.save();
      res.status(201).json(car);
    } catch (err) {
      res.status(400).send(err);
    }
  });
// Fetch data on server start
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log('MongoDB connected...');
    await fetchData(); // Fetch data after successful connection
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });

const PORT = 5002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
