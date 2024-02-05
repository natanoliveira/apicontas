// Agora preciso que trabalhe um script em node para que eu possa inserir cada item da lista abaixo lendo uma string e armazenando em um banco de dados mysql utilizando sequelize de contas a pagar (entidade abaixo);
// (pk)
// Entrada de dados via console ou interface básica:

// Cartão X - 
// Cartão Y
// Net - 
// Cartão Z - OK
// Telefone - 
// MEI - 

// Observação: lembrando que eu marco como "OK" quando eu pago, então leia todos e o que tiver OK você marca como pago em uma flag.

// Entidade:

// - contasAPagar = id (int(11)), conta (varchar(50)), mes (int(2)), ano (year), pago (enum), dataPagamento (date)

// app.js
const express = require('express');
const cors = require('cors');
const timeout = require('connect-timeout');
const bodyParser = require('body-parser');
const sequelize = require('./config/sequelize'); // Utiliza o arquivo de configuração do Sequelize
const contasPagarRoutes = require('./routes/routesContasPagar');
require('dotenv').config();

const app = express();
const port = 3000;

// Configuração do CORS
app.use(cors());

// Configuração de timeout (30 segundos)
app.use(timeout('30s'));

// Adiciona um middleware para tratar timeout
app.use((req, res, next) => {
    if (!req.timedout) next();
});

app.use(bodyParser.json());

// Rota principal da API
app.get('/api/', (req, res) => {
    res.send('Bem-vindo à API de Contas a Pagar!');
});

// Usar rotas para contas a pagar
app.use('/api/contas-pagar', contasPagarRoutes);

// Sincroniza o modelo com o banco de dados
// sequelize.sync({ alter: true }).then(() => {
sequelize.sync().then(() => {
    console.log('Banco de dados sincronizado.');
    // Inicia o servidor após a sincronização
    app.listen(port, () => {
        console.log(`Servidor rodando em http://localhost:${port}`);
    });
});

