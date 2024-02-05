// models/contasPagar.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const ContasPagar = sequelize.define('contas_pagar', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    descricao: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    mes: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    ano: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    pago: {
        type: DataTypes.ENUM('SIM', 'NAO'),
        allowNull: true,
    },
    dataPagamento: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    cadastro: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'cadastro',
    },
}, {
    tableName: 'contas_pagar',
    timestamps: false,
});

module.exports = ContasPagar;
