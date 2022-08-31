'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');


const mongoose = require('mongoose');
const Book = require('./models/book.js');

// connect Mongoose to our MongDB
mongoose.connect(process.env.DB_URL);

// add validation to confirm we are wired up to our mongoDB
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Mongoose is connected');
});

const app = express();

app.use(cors());
app.use(express.json());

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
app.post('/books', postBook);

async function postBook(request, response, next) {
  console.log('line 53', request.body);
  try {
    const newCat = await Book.create(request.body);
    response.status(201).send(newCat);
  } catch (error) {
    next(error);
  }
}

app.delete('/books/:bookid', deleteBook);

async function deleteBook(request, response, next) {
  // matches the 'variable' after the colon on line 65
  const id = request.params.bookid;
  console.log('line67', id);
  try {
    await Book.findByIdAndDelete(id);
    response.status(204).send('success!');
  } catch (error) {
    next(error);
  }
}


app.put('/books/:bookid', putBooks);

async function putBooks(request, response, next){
  let id = request.params.bookid;
  try {
    // updated cat information coming in on the body
    let data = request.body;

    //findByIdAndUpdate method - 3 arguments
    // 1. id of the thing to update
    // 2. updated data object
    // 3. option objects - { new: true, overwrite: true }

    const updateBook = await Book.findByIdAndUpdate(id, data, { new: true, overwrite: true });
    response.status(201).send(updateCat);

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






