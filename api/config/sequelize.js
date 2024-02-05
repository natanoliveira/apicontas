// config/sequelize.js
const { Sequelize } = require('sequelize');
require('dotenv').config();

// const sequelize = new Sequelize(
//     process.env.DB_DATABASE,
//     process.env.DB_USERNAME,
//     process.env.DB_PASSWORD,
//     {
//         host: process.env.DB_HOST,
//         dialect: process.env.DB_DIALECT,
//         // logging: false, // Desativa os logs do Sequelize (opcional)
//         define: {
//             timestamps: false, // Desativa a criação automática de campos createdAt e updatedAt
//         },
//         sync: { force: false }, // Impede a sincronização forçada (criação automática da tabela)
//     }
// );

const sequelize = new Sequelize({
    dialect: process.env.DB_DIALECT,
    host: process.env.DB_HOST || 'localhost',
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_DATABASE || 'sua_base_de_dados',
    // logging: false,
});

module.exports = sequelize;
