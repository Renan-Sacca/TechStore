const express = require('express');
const Produto = require('../models/Produto');
const authenticateToken = require('../middleware/auth');
const router = express.Router();

router.get('/', async (req, res) => {
    const produtos = await Produto.findAll();
    res.json(produtos);
});

router.post('/', authenticateToken, async (req, res) => {
    const { nome, preco, categoriaId } = req.body;
    try {
        const produto = await Produto.create({ nome, preco, categoriaId });
        res.status(201).json(produto);
    } catch (error) {
        res.status(400).json({ error: "Erro ao criar produto", details: error.message });
    }
});

router.put('/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;
    const { nome, preco, categoriaId } = req.body;

    try {
        const produto = await Produto.update(
            { nome, preco, categoriaId },
            { where: { id } }
        );

        if (produto[0] === 0) {
            return res.status(404).json({ error: "Produto não encontrado" });
        }

        res.json({ message: "Produto atualizado com sucesso" });
    } catch (error) {
        res.status(400).json({ error: "Erro ao atualizar produto", details: error.message });
    }
});

module.exports = router;
