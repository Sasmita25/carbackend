const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.json()); // Middleware to parse JSON

// Replace with your actual MongoDB connection string
const mongoURI = 'mongodb+srv://sasmi2598:Badguy001@cluster0.pfqypjx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// Define a schema1
const carSchema = new mongoose.Schema({
  name: String,
});
// Create a model1
const Model = mongoose.model('Model', carSchema);
  // Define a route handler for fetching cars1
  app.get('/api/Model', async (req, res) => {
    try {
      const cars = await Model.find();
      res.json(cars); // Send the fetched data as JSON response
    } catch (err) {
      res.status(500).send(err);
    }
  });
  
  // Define a route handler for adding a new car1
  app.post('/api/Model', async (req, res) => {
    try {
      const car = new Model(req.body);
      await car.save();
      res.status(201).json(car);
    } catch (err) {
      res.status(400).send(err);
    }
  });
// Define a schema2
const location = new mongoose.Schema({
    district: String,
  });
// Create a model2
const Location = mongoose.model('Location', location);  
  // Define a route handler for fetching district2
  app.get('/api/Location', async (req, res) => {
    try {
      const loca = await Location.find(); //Fetch all the data
      res.json(loca); // Send the fetched data as JSON response
    } catch (err) {
      res.status(500).send(err);
    }
  });
  
  // Define a route handler for adding a new district2
  app.post('/api/Location', async (req, res) => {
    try {
      const car = new Location(req.body);
      await car.save();
      res.status(201).json(car);
    } catch (err) {
      res.status(400).send(err);
    }
  });

//Create  form schema3

const bookdetails = mongoose.Schema({
    firstname: String,
    lastname : String,
    phonenumber : Number,
    age : Number,
    address: String,
    city:String,
    zip:Number,
    pickupdate: Date,
    dropoffdate: Date,
    pickuplocation: String,
    dropofflocation: String,
    carmodel: String,

})


//Create a model3

const Bookdata =mongoose.model('Bookdata',bookdetails);

//Define route handler for fetching data

app.get('/api/Bookdata', async(req,res)=>{
    try{
     const data= await Bookdata.find();
     res.json(data)
    }
    catch(e){
      res.status(500).send(err);
    }
})

// Define route handler to post data

app.post('/api/Bookdata',async(req,res)=>{
    try{
        const book = new Bookdata(req.body);
        await book.save();
        // res.status(201).json(book); // Send the saved book data as JSON response
    }catch(e){
        res.status(400).send(err)
    }
})

// Fetch data function
const fetchData = async () => {
    try {
      const models = await Model.find();
      const locat = await Location.find();
      const bookdata= await Bookdata.find(); // Fetch all documents in the Model collection
      console.log('Model:', models);
      console.log('Location', locat);
      console.log('Bookdata',bookdata);
    } catch (err) {
      console.error('Error fetching models:', err);
    }
  };
app.get('/', (req, res) => {
    res.send('Welcome to the Cars API');
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
