const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new mongoose.Schema({
  _id: {
    type: Schema.Types.ObjectId, 
    default: mongoose.Types.ObjectId,
    required: true,
    unique: true
  },
  Nome: {
    type: String,
    required: true
  },
  Email: {
    type: String,
    required: true
  },
  Cpf: {
    type: String,
    required: true
  },
  Senha: {
    type: String,
    required: true
  }
});

const Usuario = mongoose.model('usuarios', schema);

module.exports = Usuario;