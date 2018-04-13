const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// No HACE falta crear el id, mongo ya lo crea solo
const bookSchema = new Schema({
  name: String,
  genre: String,
  authorId: String
});

module.exports = mongoose.model('Book', bookSchema);
