const { response } = require('express');
const ProdutoModel = require('../models/ProdutoModel');
class ProdutosController {

    async create(req, res) {
        const prod = new ProdutoModel(req.body);
        await prod.save()
            .then(response => {
                return res.status(200).json(response)
            })
            .catch(error => {
                return res.status(500).json(error);
            });
    }


    async update(req, res) {
        await ProdutoModel.findOneAndUpdate(
            { "_id": req.params.id }, req.body, { new: true })
            .then(response => {
                return res.status(200).json(response)
            })
            .catch(error => {
                return res.status(500).json(response)
            });
    }

    async delete(req, res) {
        await ProdutoModel.findOneAndDelete({ "_id": req.params.id })
            .then(response => {
                return res.status(200).json(response)
            })
            .catch(error => {
                return res.status(500).json(response)
            });
    }

    async get(req, res) {
        await ProdutoModel.findOne({ "_id": req.params.id })
            .then(response => {
                return res.status(200).json(response)
            })
            .catch(error => {
                return res.status(500).json(response)
            });
    }

    async getAll(req, res) {
        await ProdutoModel.find().sort("id")
            .then(response => {
                return res.status(200).json(response)
            })
            .catch(error => {
                console.log(error)
                return res.status(500).json(response)
            });
    }

    /* async getAllFiltered(req, res) {
        let ordem = req.params.ordem;
        if (ordem == 'c')
            ordem = 'id';
        else if (ordem == 'd')
            ordem = 'descricao';
        else
            ordem = 'qtdeEstoque';


        let filtroCampoAtivo = {
        }
        if (req.params.situacao == 'a') {
            filtroCampoAtivo = {
                Ativo: true
            }
        }
        else if (req.params.situacao == 'i') {
            filtroCampoAtivo = {
                Ativo: false
            }
        }

        //help: https://www.mongodb.com/docs/manual/reference/operator/query/expr/
        let filtroQtde = {}
        if (req.params.filtroQtde && req.params.filtroQtde == 'true') {
            filtroQtde = { $expr: { $lte: ["$qtdeEstoque", "$qtdeMinima"] } }
        }

        await ProdutoModel.find()
            .where(filtroCampoAtivo)
            .where(filtroQtde)
            .sort(ordem)
            .then(response => {
                return res.status(200).json(response)
            })
            .catch(error => {
                return res.status(500).json(response)
            });
    }


    async getEstoqueBaixo(req, res) {

        let filtroCampoAtivo = { Ativo: true }

        let filtroQtde = { $expr: { $lte: ["$qtdeEstoque", "$qtdeMinima"] } }

        let qtde = await ProdutoModel
            .where(filtroCampoAtivo)
            .where(filtroQtde)
            .countDocuments();

        if (qtde >= 1)
            return res.status(200).json(true);
        else
            return res.status(200).json(false);
    }
 */


}

module.exports = new ProdutosController();
