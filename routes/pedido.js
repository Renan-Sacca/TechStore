const express = require('express');
const Pedido = require('../models/Pedido');
const router = express.Router();

router.get('/', async (req, res) => {
    const pedidos = await Pedido.findAll();
    res.json(pedidos);
});

router.post('/', async (req, res) => {
    const { produtoId, quantidade } = req.body;
    const pedido = await Pedido.create({ produtoId, quantidade });
    res.json(pedido);
});

module.exports = router;
