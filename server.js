'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');

const mongoose = require('mongoose');

const Book = require('./models/book.js');

// connect Mongoose to our MongDB
mongoose.connect(process.env.DB_URL);
// mongoose.connect(process.env.DB_URL);

// add validation to confirm we are wired up to our mongoDB
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Mongoose is connected');
});

const app = express();

app.use(cors());

const PORT = process.env.PORT || 3001;

app.get('/test', (request, response) => {
  
  response.send('test request received')
  
})


// ROUTES
app.get('/', (request, response) => {
  response.status(200).send('Welcome!');
});

// ENDPOINT  - GET Cats from our DB and send it to our Front End
app.get('/books', getBooks);

async function getBooks(request, response, next) {
  try {
    let results = await Book.find();
    response.status(200).send(results);
  } catch (error) {
    next(error);
  }
}

app.get('*', (request, response) => {
  response.status(404).send('Not availabe');
});

// ERROR
app.use((error, request, response, next) => {
  response.status(500).send(error.message);
});



app.listen(PORT, () => console.log(`listening on ${PORT}`));






