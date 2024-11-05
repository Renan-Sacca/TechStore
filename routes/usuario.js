const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');
require('dotenv').config();

const router = express.Router();

router.post('/registro', async (req, res) => {
    const { nome, email, senha } = req.body;
    const hashedPassword = await bcrypt.hash(senha, 8);
    const usuario = await Usuario.create({ nome, email, senha: hashedPassword });
    res.json(usuario);
});

router.post('/login', async (req, res) => {
    const { email, senha } = req.body;
    const usuario = await Usuario.findOne({ where: { email } });
    if (!usuario || !(await bcrypt.compare(senha, usuario.senha))) {
        return res.status(401).json({ error: "Credenciais inválidas" });
    }
    const token = jwt.sign({ id: usuario.id }, process.env.JWT_SECRET);
    res.json({ token });
});

module.exports = router;
