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
    required: true,
    unique: true, // Para garantir que o email seja único
    validate: {
      validator: (v) => {
        // Use uma expressão regular para validar o formato de email
        return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(v);
      },
      message: 'Formato de email inválido',
    },
  },
  Cpf: {
    type: String,
    required: true,
    unique: true, // Para garantir que o CPF seja único
    validate: {
      validator: (v) => {
        // Remover "." e "-" antes de aplicar a expressão regular
        const cpfSemPontuacao = v.replace(/[.-]/g, '');
        return /^\d{11}$/.test(cpfSemPontuacao);
      },
      message: 'Formato de CPF inválido (deve conter apenas dígitos numéricos)',
    },
  },
  Senha: {
    type: String,
    required: true
  }
});

const Usuario = mongoose.model('usuarios', schema);

module.exports = Usuario;
