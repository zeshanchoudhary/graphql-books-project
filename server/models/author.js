const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// No HACE falta crear el id, mongo ya lo crea solo
const authorSchema = new Schema({
  name: String,
  age: Number
});

module.exports = mongoose.model('Author', authorSchema);
