const { response } = require('express');
const VendaModel = require('../models/VendaModel');
class VendaController {

    async createVenda(req, res) {
        const prod = new VendaModel(req.body);
        await prod.save()
            .then(response => {
                return res.status(200).json(response)
            })
            .catch(error => {
                return res.status(500).json(error);
            });
    }


    async update(req, res) {
        await VendaModel.findOneAndUpdate(
            { "_id": req.params.id }, req.body, { new: true })
            .then(response => {
                return res.status(200).json(response)
            })
            .catch(error => {
                return res.status(500).json(response)
            });
    }

    async delete(req, res) {
        await VendaModel.findOneAndDelete({ "_id": req.params.id })
            .then(response => {
                return res.status(200).json(response)
            })
            .catch(error => {
                return res.status(500).json(response)
            });
    }

    async get(req, res) {
        await VendaModel.findOne({ "_id": req.params.id })
            .then(response => {
                return res.status(200).json(response)
            })
            .catch(error => {
                return res.status(500).json(response)
            });
    }

    async getAll(req, res) {
        await VendaModel.find().sort("id")
            .then(response => {
                return res.status(200).json(response)
            })
            .catch(error => {
                console.log(error)
                return res.status(500).json(response)
            });
    }
}

module.exports = new VendaController();
