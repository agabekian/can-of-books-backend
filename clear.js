'use strict';

require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.DB_URL);

const Book = require('./models/book');

async function clear() {
  try {
    await Book.deleteMany({});
    console.log('books cleared from DB');
  } catch (err) {
    console.error(err);
  // a 'finally' callback allows you to execute logic once your Promise has been settled, resolved or rejected, one way or the other. It has no impact on the value that your promise will resolve to
  } finally {
    mongoose.disconnect();
  }
}

clear();
