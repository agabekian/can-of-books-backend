'use strict';

const { default: mongoose } = require('mongoose');

require('dotenv').config();
mongoose.connect(process.env.DB_URL);

const Book = require('./models/book.js');

async function seed() {

  await Book.create({
    name: 'The Big Book',
    description:'some big book',
    status: true
  });
  console.log('Book was added');

  // await Cat.create({
  //   name: 'Karl',
  //   color: 'Black and white tabby',
  //   spayNeuter: true,
  //   location: 'Seattle'
  // });
  // console.log('Karl was added');

  // await Cat.create({
  //   name: 'Victor',
  //   color: 'brown/black/white tabby',
  //   spayNeuter: true,
  //   location: 'Seattle'
  // });
  // console.log('Victor was added');

  mongoose.disconnect();
}

seed();
