// This is where I will declare my schema
// Data should look like

'use strict';

// bring in mongoose
const mongoose = require('mongoose');

// extract Schema property from the mongoose object

const { Schema } = mongoose;


const bookSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: Boolean, required: true },
});

// define our Model
// this is what gives our database functionality
const BookModel = mongoose.model('Book', bookSchema);


module.exports = bookModel;
