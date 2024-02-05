// config/database.js
require('dotenv').config(); // Carrega as variáveis de ambiente do arquivo .env

module.exports = {
    development: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
    },
    // Adicione configurações para produção e teste, se necessário
};
