
const mongoose = require('../config/database');
const Schema = mongoose.Schema;

const VendaModel = new Schema({
    _id: {
        type: Schema.Types.ObjectId, 
        default: mongoose.Types.ObjectId,
        required: true,
        unique: true
      },
      idProdutos: {
        type: String,
        required: true
      },
      qtdProduto: {
        type: String,
        required: true
      },
      valorTotal: {
        type: Number,
        required: true
      }
    });

const Venda = mongoose.model('Venda', VendaModel);

module.exports = Venda;