const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;
const express = require('express');

const objectId= require('mongodb').ObjectId;
const { ObjectId } = require('bson');


const app = express();
app.use(cors());
app.use(bodyParser.json());




const port = 4000 

app.get('/', (req, res) => {
  res.send('Hello World!')
})







const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.fckrr.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const bookCollection = client.db("travelXP").collection("book");
  const reviewCollection = client.db("travelXP").collection("review");
  const eventCollection = client.db("travelXP").collection("event");
  const adminCollection = client.db("travelXP").collection("admin");
  const loggedInUserCollection = client.db("travelXP").collection("loggedInUser");

  console.log('db connection successful');



  //posts user book data
  app.post('/book', (req, res) => {
    const book = req.body;
    console.log(book);
    bookCollection.insertOne(book)
      .then(console.log(`successfully Inserted An Item`))
  })



  //get user book databaseName
  app.get('/getBookingList/:email', (req, res) => {
    const email = req.params.email
    bookCollection.find({ email: email })
      .toArray((err, collections) => {
        res.send(collections)
      })
  })




  //to post review
  app.post('/addReview', (req, res) => {
    const review = req.body
    reviewCollection.insertOne(review)
      .then(console.log(`Inserted Review Successfully`))
  })



  //to get review and show it on home page

  app.get('/getReview', (req, res) => {
    reviewCollection.find({})
      .toArray((err, collections) => {
        res.send(collections)
      })
  })



  //to show all orders to admin
  app.get('/allOrders', (req, res) => {
    
      bookCollection.find({})
        .toArray((err, collections) => {
          res.send(collections)
        })
    

  })



  //to post events

  app.post('/addEvent', (req, res) => {
    const event = req.body;
    eventCollection.insertOne(event)
      .then(console.log('event added Successfully'))
  })



  //all events to show it on home page
  app.get('/allEvents', (req, res) => {
    eventCollection.find({})
      .toArray((err, collections) => {
        res.send(collections)
      })
  })



  // to receive admin email
  app.post('/adminEmail', (req, res) => {
    const adminEmail = req.body
    adminCollection.insertOne(adminEmail)
      .then(console.log('Admin Email Added Successfully'))
  })



  //to save user loggedin

  app.post('/loggedIn', (req, res) => {
    const loggedInData = req.body;
    console.log(loggedInData);
    loggedInUserCollection.insertOne(loggedInData)
      .then(console.log('saved loggedinUser'))

   
  })



  app.post('/delete', (req, res)=>{
    console.log(req.body);
    eventCollection.deleteOne({_id : ObjectId(req.body.id)})
    .then(console.log('deleted Successfully'))
  })

});






app.listen(process.env.PORT || port)
