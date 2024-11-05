const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Produto = require('./Produto');

const Pedido = sequelize.define('Pedido', {
    produtoId: { type: DataTypes.INTEGER, references: { model: Produto, key: 'id' } },
    quantidade: { type: DataTypes.INTEGER, allowNull: false },
    data: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW }
});

module.exports = Pedido;
