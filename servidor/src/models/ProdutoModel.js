
const Mongoose = require('../config/database');
const Schema = Mongoose.Schema;

const ProdutoModel = new Schema({
    _id: {
        type: Schema.Types.ObjectId, 
        default: Mongoose.Types.ObjectId,
        required: true,
        unique: true
    },
    NomeProduto: {
        type: String,
        required: true
    },
    CategoriaProduto: {
        type: String,
        required: true
    },
    QtdEstoque: {
        type: Number,
        required: true
    },
    Preco: {
        type: Number,
        required: true
    }
});

const Produto = Mongoose.model('produtos', ProdutoModel);

module.exports = Produto;