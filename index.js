const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;


const app = express();
app.use(cors());
app.use(bodyParser.json());




const port = 4000|| process.env.PORT

app.get('/', (req, res) => {
  res.send('Hello World!')
})







const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.fckrr.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const bookCollection = client.db("travelXP").collection("book");
  const reviewCollection = client.db("travelXP").collection("review");
  console.log('db connection successful');



  //posts user book data
  app.post('/book', (req, res) => {
    const book = req.body;
    console.log(book);
    bookCollection.insertOne(book)
    .then(console.log(`successfully Inserted An Item`))
  })



  //get user book databaseName
  app.get('/getBookingList/:email',(req, res)=>{
    const email = req.params.email
    bookCollection.find({email: email})
    .toArray((err, collections)=>{
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
    .toArray((err, collections)=>{
      res.send(collections)
    })
  })


});







app.listen(port)
