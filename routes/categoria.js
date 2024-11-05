const express = require('express');
const Categoria = require('../models/Categoria');
const router = express.Router();

router.post('/', async (req, res) => {
    const { nome } = req.body;
    const categoria = await Categoria.create({ nome });
    res.json(categoria);
});

module.exports = router;
