const { response } = require('express');
const jwt = require('jsonwebtoken');
const VendaModel = require('../models/UsuarioModel.js');
class UsuarioController {

    async createUser(req, res) {
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
        const token = req.header('Authorization');
        if (!token) {
            return res.status(401).json({ message: 'Token de autorização não fornecido' });
        }

        try {
            const decoded = jwt.verify(token, 'sua_chave_secreta');
            await VendaModel.findOneAndUpdate(
                { "_id": req.params.id }, req.body, { new: true })
                .then(response => {
                    return res.status(200).json(response)
                })
                .catch(error => {
                    return res.status(500).json(response)
                });
        } catch (error) {
            return res.status(401).json({ message: 'Token de autorização inválido' });
        }
    }

    async delete(req, res) {
        const token = req.header('Authorization');
        if (!token) {
            return res.status(401).json({ message: 'Token de autorização não fornecido' });
        }

        try {
            const decoded = jwt.verify(token, 'sua_chave_secreta');
            await VendaModel.findOneAndDelete({ "_id": req.params.id })
                .then(response => {
                    return res.status(200).json(response)
                })
                .catch(error => {
                    return res.status(500).json(response)
                });
        } catch (error) {
            return res.status(401).json({ message: 'Token de autorização inválido' });
        }
    }

    async get(req, res) {
        const token = req.header('Authorization');
        if (!token) {
            return res.status(401).json({ message: 'Token de autorização não fornecido' });
        }

        try {
            const decoded = jwt.verify(token, 'sua_chave_secreta');
            await VendaModel.findOne({ "_id": req.params.id })
                .then(response => {
                    return res.status(200).json(response)
                })
                .catch(error => {
                    return res.status(500).json(response)
                });
        } catch (error) {
            return res.status(401).json({ message: 'Token de autorização inválido' });
        }
    }

    async authenticate(req, res) {
        const { Email, Senha } = req.body;

        const user = await VendaModel.findOne({ Email, Senha });

        if (!user) {
            return res.status(401).json({ message: 'Credenciais inválidas' });
        }

        const token = jwt.sign({ userId: user._id }, 'sua_chave_secreta', { expiresIn: '1h' });

        return res.status(200).json({ token });
    }
}

module.exports = new UsuarioController();
